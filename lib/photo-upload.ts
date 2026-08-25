// lib/photo-upload.ts — poori file replace karo
import { supabase } from "./supabase-client";

// Uploads the photo EXACTLY as the client selected it — no compression,
// no format conversion. Original quality, resolution, and file type
// (jpg/png/whatever they uploaded) are preserved as-is.
export async function uploadPhoto(file: File, folder: string): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage.from("mandal-photos").upload(filename, file, {
    contentType: file.type || "image/jpeg",
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from("mandal-photos").getPublicUrl(filename);
  return data.publicUrl;
}

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