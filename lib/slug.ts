import { supabase } from "./supabase-client";

// "जय शंकर गणेश मंडळ" / "Jai Shankar Ganesh Mandal" → "jai-shankar-ganesh-mandal"
// Devanagari input: falls back to a short random slug since Marathi/Hindi
// script doesn't transliterate cleanly — client can also type an English name.
export function slugify(input: string): string {
  const ascii = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (ascii.length >= 3) return ascii;
  return "mandal-" + Math.random().toString(36).slice(2, 8);
}

// Checks Supabase and appends -2, -3 etc. if the slug is already taken
export async function getUniqueSlug(baseName: string): Promise<string> {
  const base = slugify(baseName);
  let candidate = base;
  let attempt = 1;

  while (true) {
    const { data } = await supabase.from("mandals").select("id").eq("slug", candidate).maybeSingle();
    if (!data) return candidate;
    attempt += 1;
    candidate = `${base}-${attempt}`;
  }
}
