import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  const body = await request.json();
  const { token, ...updates } = body;

  if (!token || typeof token !== "string") {
    return NextResponse.json({ error: "Token required" }, { status: 400 });
  }

  // Re-verify the token independently of the page load — never trust that the
  // client reaching this endpoint already passed the gate on app/edit/[token]/page.tsx.
  const { data: mandal, error: findError } = await supabaseAdmin
    .from("mandals")
    .select("id")
    .eq("edit_token", token)
    .single();

  if (findError || !mandal) {
    return NextResponse.json({ error: "Invalid edit link" }, { status: 404 });
  }

  // Only these fields are ever writable through this endpoint — status, payment_status,
  // slug, and edit_token itself are deliberately excluded even if present in the body.
  const allowedFields = [
    "mandal_name",
    "language",
    "invite_message",
    "established_year",
    "contact",
    "address",
    "maps_link",
    "instagram_url",
    "timeline",
    "gallery",
  ];

  const safeUpdates: Record<string, any> = {};
  for (const key of allowedFields) {
    if (key in updates) safeUpdates[key] = updates[key];
  }

  if (Array.isArray(safeUpdates.gallery) && safeUpdates.gallery.length < 6) {
    return NextResponse.json({ error: "Kam se kam 6 photos chahiye" }, { status: 400 });
  }

  const { error: updateError } = await supabaseAdmin.from("mandals").update(safeUpdates).eq("id", mandal.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}