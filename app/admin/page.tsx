import { isAdmin, adminLogin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { approveMandal, rejectMandal } from "@/lib/admin-actions";

export default async function AdminPage() {
  const loggedIn = await isAdmin();

  if (!loggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-amber-50 px-6">
        <form
          action={async (formData: FormData) => {
            "use server";
            await adminLogin(formData);
          }}
          className="bg-white rounded-2xl p-8 max-w-xs w-full shadow-sm border border-amber-200"
        >
          <h1 className="text-xl font-bold text-amber-900 text-center">Admin लॉगिन</h1>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="mt-5 w-full border border-amber-300 rounded-lg px-4 py-2.5"
          />
          <button className="mt-4 w-full bg-orange-500 text-white rounded-full py-2.5 font-medium">
            लॉगिन करा
          </button>
        </form>
      </main>
    );
  }

  const { data: pending, error: pendingError } = await supabaseAdmin
    .from("mandals")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  const { data: approved, error: approvedError } = await supabaseAdmin
    .from("mandals")
    .select("id, slug, mandal_name, created_at")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(20);

  const queryError = pendingError || approvedError;

  return (
    <main className="min-h-screen bg-amber-50 px-6 py-10">
      {queryError && (
        <div className="bg-red-100 border border-red-400 text-red-700 rounded-xl p-4 mb-6 max-w-2xl text-sm">
          <strong>Query error:</strong> {queryError.message}
          <br />Check SUPABASE_SECRET_KEY in .env.local — this should be the "Secret key" from Supabase Settings → API Keys, not the "Publishable key".
        </div>
      )}
      <h1 className="text-2xl font-bold text-amber-900">Pending submissions ({pending?.length ?? 0})</h1>

      <div className="flex flex-col gap-4 mt-6 max-w-2xl">
        {pending?.length === 0 && <p className="text-amber-600">Koi pending submission nahi hai.</p>}
        {pending?.map((m) => (
          <div key={m.id} className="bg-white rounded-xl border border-amber-200 p-5">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-amber-900">{m.mandal_name}</h2>
                <p className="text-sm text-amber-600 mt-1">slug: {m.slug}</p>
                <p className="text-sm text-amber-600">{m.contact} · {m.address}</p>
                <p className="text-xs text-amber-400 mt-1">
                  {(m.gallery as any[])?.length ?? 0} photos · {(m.timeline as any[])?.length ?? 0} events
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <form action={async () => { "use server"; await approveMandal(m.id); }}>
                  <button className="bg-green-600 text-white text-sm px-4 py-2 rounded-full">Approve</button>
                </form>
                <form action={async () => { "use server"; await rejectMandal(m.id); }}>
                  <button className="bg-red-500 text-white text-sm px-4 py-2 rounded-full">Reject</button>
                </form>
              </div>
            </div>
            {((m.gallery as any[]) ?? []).length > 0 && (
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {(m.gallery as any[]).map((g, i) => (
                  <img key={i} src={g.url} className="w-16 h-16 object-cover rounded-lg shrink-0" />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-amber-900 mt-10">Recently approved</h2>
      <div className="flex flex-col gap-2 mt-4 max-w-2xl">
        {approved?.map((m) => (
          <a key={m.id} href={`/${m.slug}`} target="_blank" className="text-amber-700 underline text-sm">
            {m.mandal_name} → /{m.slug}
          </a>
        ))}
      </div>
    </main>
  );
}
