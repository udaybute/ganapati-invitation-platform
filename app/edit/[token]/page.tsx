import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import EditForm from "@/components/EditForm";

export default async function EditPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  // Server-only lookup via the admin client — bypasses RLS intentionally, but only
  // returns data when the token matches exactly. This never runs in the browser.
  if (!token || token.length < 10) notFound();

  const { data: mandal } = await supabaseAdmin
    .from("mandals")
    .select("mandal_name, language, invite_message, established_year, contact, address, maps_link, instagram_url, timeline, gallery")
    .eq("edit_token", token)
    .single();

  if (!mandal) notFound(); // wrong/guessed token gets the same generic 404 as a bad slug — no hint given either way

  return (
    <main className="min-h-screen bg-amber-50">
      <EditForm token={token} initial={mandal as any} />
    </main>
  );
}