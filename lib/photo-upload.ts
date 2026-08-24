import imageCompression from "browser-image-compression";
import { supabase } from "./supabase-client";

// Compresses a photo to png in the browser BEFORE upload — keeps Supabase's
// free storage tier lasting far longer across 1000 clients, and makes pages load fast.
async function compressTopng(file: File): Promise<File> {
  const compressed = await imageCompression(file, {
    maxSizeMB: 0.35,
    maxWidthOrHeight: 1600,
    fileType: "image/png",
    useWebWorker: true,
  });
  return compressed;
}

// Compresses + uploads one photo, returns its public URL
export async function uploadPhoto(file: File, folder: string): Promise<string> {
  const compressed = await compressTopng(file);
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.png`;

  const { error } = await supabase.storage.from("mandal-photos").upload(filename, compressed, {
    contentType: "image/png",
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from("mandal-photos").getPublicUrl(filename);
  return data.publicUrl;
}

// Compresses + uploads a batch of photos, reports progress via callback
export async function uploadPhotos(
  files: File[],
  folder: string,
  onProgress?: (done: number, total: number) => void
): Promise<string[]> {
  const urls: string[] = [];
  for (let i = 0; i < files.length; i++) {
    urls.push(await uploadPhoto(files[i], folder));
    onProgress?.(i + 1, files.length);
  }
  return urls;
}
