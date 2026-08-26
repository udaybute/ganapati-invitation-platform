import { supabaseAdmin } from "@/lib/supabase-admin";
import PaymentButton from "@/components/PaymentButton";
import CopyButton from "@/components/CopyButton";

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ slug?: string }> }) {
  const { slug } = await searchParams;

  if (!slug) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-amber-50">
        <p className="text-amber-700">Slug missing.</p>
      </main>
    );
  }

  const { data: mandal } = await supabaseAdmin
    .from("mandals")
    .select("mandal_name, payment_status")
    .eq("slug", slug)
    .single();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ganapati-invitation-platform.vercel.app";
  const fullLink = `${siteUrl}/${slug}`;
  const isPaid = mandal?.payment_status === "paid";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-amber-50">
      <p className="text-4xl mb-3">🙏</p>
      <h1 className="text-2xl font-bold text-amber-900">धन्यवाद!</h1>

      {mandal && <p className="text-amber-700 mt-1 font-medium">{mandal.mandal_name}</p>}

      <p className="text-amber-700 mt-2 max-w-sm">
        तुमचे निमंत्रण मिळाले आहे.
        {isPaid
          ? " Payment यशस्वी झाले आहे — तुमची लिंक आता live आहे!"
          : " Payment पूर्ण झाल्यावर लगेच तुमची लिंक live होईल."}
      </p>

      <div className="mt-5 w-full max-w-sm">
        <p className="text-amber-500 text-xs mb-1">तुमची लिंक (जपून ठेवा):</p>
        <div className="flex items-center gap-2 bg-white border border-amber-300 rounded-xl px-3 py-2">
          <span className="flex-1 font-mono text-xs text-amber-900 truncate">{fullLink}</span>
          <CopyButton text={fullLink} />
        </div>
        <p className="text-amber-400 text-[11px] mt-2">
          ही लिंक save करून ठेवा — payment झाल्यावर याच लिंकवर तुमची सर्व माहिती दिसेल.
        </p>
      </div>

      <div className="mt-6">
        {isPaid ? (
          <a href={fullLink} className="inline-block px-8 py-3 rounded-full bg-orange-500 text-white font-semibold">
            आपले निमंत्रण पहा →
          </a>
        ) : (
          <PaymentButton slug={slug} />
        )}
      </div>
    </main>
  );
}