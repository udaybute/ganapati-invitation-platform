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
