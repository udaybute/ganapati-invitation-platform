import Image from "next/image";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import PaymentButton from "@/components/PaymentButton";
import CopyButton from "@/components/CopyButton";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string; editToken?: string }>;
}) {
  const { slug, editToken } = await searchParams;

  if (!slug) {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[#1c0609] text-[#fef9eb]">
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <Image
            src="/images/backgrounds/background3.webp"
            alt="Festive Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        <div className="relative z-10 rounded-3xl border border-[#e8a93b]/40 bg-[#1c0609]/90 backdrop-blur-xl p-8 max-w-md">
          <p className="text-xl text-[#f3d089] font-bold">⚠️ माहिती सापडली नाही (Slug Missing)</p>
          <Link
            href="/"
            className="mt-5 inline-block rounded-xl bg-gradient-to-r from-[#e8a93b] to-[#d96a2b] px-6 py-2.5 text-sm font-bold text-[#1c0609]"
          >
            मुख्य पानावर जा →
          </Link>
        </div>
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
  const editLink = editToken ? `${siteUrl}/edit/${editToken}` : null;
  const isPaid = mandal?.payment_status === "paid";

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center bg-[#1c0609] text-[#fef9eb] overflow-x-hidden selection:bg-[#e8a93b] selection:text-[#1c0609]">
      
      {/* =====================================================
          BACKGROUND IMAGE (PURE & UNFILTERED)
      ====================================================== */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <Image
          src="/images/backgrounds/background3.webp"
          alt="Festive Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Main Content Card */}
      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-[#e8a93b]/40 bg-gradient-to-b from-[#24080d]/95 via-[#1b0508]/95 to-[#150306]/95 p-6 sm:p-8 md:p-10 shadow-2xl shadow-black/80 backdrop-blur-xl">
        
        {/* Transparent Ganpati Photo with Soft Gold Aura and Floating Animation */}
        <div className="relative mb-5 flex items-center justify-center">
          <div className="animate-ganapati-float flex items-center justify-center">
            <Image
              src="/images/ganesh/ganeshmurti.png"
              alt="श्री गणपती बाप्पा"
              width={200}
              height={200}
              priority
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain select-none"
            />
          </div>
        </div>

        {/* Sacred Header */}
        <p className="text-xs sm:text-sm font-rozha text-[#f3d089] tracking-widest mb-1">
          ॥ श्री गणेशाय नमः ॥
        </p>

        <h1 className="font-rozha text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#fef9eb] text-shadow-gold">
          हार्दिक धन्यवाद! 🙏
        </h1>

        {mandal && (
          <div className="mt-3 inline-block rounded-full border border-[#e8a93b]/40 bg-amber-950/40 px-4 py-1.5 text-sm sm:text-base font-bold text-[#f3d089]">
            🚩 {mandal.mandal_name}
          </div>
        )}

        <p className="text-sm sm:text-base text-[#fef9eb]/85 mt-4 leading-relaxed font-normal">
          आपली डिजिटल निमंत्रण पत्रिका यशस्वीरीत्या तयार झाली आहे.
          {isPaid
            ? " Payment यशस्वी झाले आहे — आपली लिंक आता Live आहे!"
            : " खालील लिंक वापरून आपण पत्रिका पाहू शकता व शेअर करू शकता."}
        </p>

        {/* Shareable Link Box */}
        <div className="mt-6 w-full text-left space-y-1.5">
          <label className="block text-xs sm:text-sm font-semibold text-[#f3d089]">
            🔗 आपली डिजिटल निमंत्रण पत्रिका लिंक (Shareable Link):
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-[#e8a93b]/40 bg-[#140305]/90 p-2 sm:p-2.5 shadow-inner">
            <span className="flex-1 font-mono text-xs sm:text-sm text-[#fef9eb] truncate px-2 select-all">
              {fullLink}
            </span>
            <CopyButton text={fullLink} />
          </div>
        </div>

        {/* WhatsApp Share Button */}
        <div className="mt-3">
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              `🚩 *${mandal?.mandal_name || "श्री गणेशोत्सव"}* 🚩\n\nआमच्या गणेशोत्सवाचे डिजिटल निमंत्रण पत्रिका पाहण्यासाठी खालील लिंकवर क्लिक करा:\n\n👉 ${fullLink}\n\n॥ गणपती बाप्पा मोरया ॥`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 text-sm sm:text-base font-bold shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>📲</span>
            <span>व्हॉट्सॲपवर निमंत्रण शेअर करा</span>
          </a>
        </div>

        {/* Secret Edit Link Box */}
        {editLink && (
          <div className="mt-5 w-full text-left space-y-1.5 pt-4 border-t border-[#e8a93b]/20">
            <label className="block text-xs sm:text-sm font-semibold text-[#f3d089]">
              🔒 Edit Link (भविष्यात माहिती व फोटो बदलण्यासाठी ही लिंक जपून ठेवा):
            </label>
            <div className="flex items-center gap-2 rounded-2xl border border-amber-500/40 bg-[#140305]/90 p-2 sm:p-2.5 shadow-inner">
              <span className="flex-1 font-mono text-xs text-[#fef9eb]/80 truncate px-2 select-all">
                {editLink}
              </span>
              <CopyButton text={editLink} />
            </div>
            <p className="text-[11px] sm:text-xs text-[#f3d089]/70 leading-relaxed pt-1">
              ⚠️ ही लिंक कोणाशीही शेअर करू नका — हीच लिंक वापरून आपण भविष्यात माहिती, फोटो आणि वेळापत्रक अपडेट करू शकता.
            </p>
          </div>
        )}

        {/* Action Button: View Card */}
        <div className="mt-6 pt-2">
          {isPaid ? (
            <a
              href={fullLink}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#e8a93b] via-[#f3d089] to-[#d96a2b] px-8 py-3.5 text-base sm:text-lg font-bold text-[#1c0609] shadow-xl shadow-amber-900/40 hover:brightness-110 active:scale-95 transition-all"
            >
              <span>आपले निमंत्रण पहा →</span>
            </a>
          ) : (
            <div className="space-y-3">
              <a
                href={fullLink}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#e8a93b] via-[#f3d089] to-[#d96a2b] px-8 py-3.5 text-base sm:text-lg font-bold text-[#1c0609] shadow-xl shadow-amber-900/40 hover:brightness-110 active:scale-95 transition-all"
              >
                <span>आपले निमंत्रण पहा →</span>
              </a>
              <div className="pt-2">
                <PaymentButton slug={slug} />
              </div>
            </div>
          )}
        </div>

        {/* Back to Home Link */}
        <div className="mt-6 border-t border-[#e8a93b]/20 pt-4">
          <Link
            href="/"
            className="text-xs sm:text-sm font-semibold text-[#f3d089]/80 hover:text-white transition-colors"
          >
            ← मुख्य पानावर परत जा
          </Link>
        </div>

      </div>
    </main>
  );
}
