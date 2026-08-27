"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { isAdmin } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

export async function approveMandal(id: string) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  const { error } = await supabaseAdmin.from("mandals").update({ status: "approved" }).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin");
}

export async function rejectMandal(id: string) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  const { error } = await supabaseAdmin.from("mandals").update({ status: "rejected" }).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin");
}

// Moves a published invitation back to "pending" — unpublishes it from /[slug]
// (RLS only allows public reads when status = 'approved'), without losing any data.
export async function unapproveMandal(id: string) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  const { error } = await supabaseAdmin.from("mandals").update({ status: "pending" }).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin");
}

// Permanently removes a client's row. Does not delete their uploaded photos from
// Storage (kept simple on purpose) — only the database record and its public page.
export async function deleteMandal(id: string) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  const { error } = await supabaseAdmin.from("mandals").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin");
}