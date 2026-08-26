import { supabaseAdmin } from "@/lib/supabase-admin";
import PaymentButton from "@/components/PaymentButton";
import CopyButton from "@/components/CopyButton";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;

  if (!slug) {
    return (
      <main
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-amber-50"
        style={{
          backgroundImage:
            "url('/images/submitform-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-amber-50/75" />

        <div className="relative z-10">
          <p className="text-amber-900 font-medium">
            Slug missing.
          </p>
        </div>
      </main>
    );
  }

  const { data: mandal } = await supabaseAdmin
    .from("mandals")
    .select("mandal_name, payment_status")
    .eq("slug", slug)
    .single();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://ganapati-invitation-platform.vercel.app";

  const fullLink = `${siteUrl}/${slug}`;

  const isPaid =
    mandal?.payment_status === "paid";

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-10 text-center bg-amber-50"
      style={{
        backgroundImage:
          "url('/images/submitform-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* =====================================================
          BACKGROUND OVERLAY
          Keeps the background visible while making
          dark text easy to read.
          ===================================================== */}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-amber-50/70"
      />

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">

        {/* ===================================================
            GANESH MURTI
            =================================================== */}

        <div className="mb-4 flex items-center justify-center">
          <img
            src="/images/ganesh/ganeshmurti.png"
            alt="Ganesh Murti"
            className="h-24 w-24 object-contain drop-shadow-xl sm:h-28 sm:w-28"
          />
        </div>

        {/* ===================================================
            THANK YOU
            =================================================== */}

        <h1 className="text-3xl font-bold tracking-tight text-amber-950 sm:text-4xl">
          धन्यवाद!
        </h1>

        {/* ===================================================
            MANDAL NAME
            =================================================== */}

        {mandal && (
          <p className="mt-2 font-semibold text-amber-900">
            {mandal.mandal_name}
          </p>
        )}

        {/* ===================================================
            DESCRIPTION
            =================================================== */}

        <p className="mt-3 max-w-sm text-sm leading-7 text-amber-950">
          तुमचे निमंत्रण मिळाले आहे.
          {isPaid
            ? " Payment यशस्वी झाले आहे — तुमची लिंक आता live आहे!"
            : " Payment पूर्ण झाल्यावर लगेच तुमची लिंक live होईल."}
        </p>

        {/* ===================================================
            INVITATION LINK
            =================================================== */}

        <div className="mt-6 w-full max-w-sm">
          <p className="mb-2 text-xs font-semibold text-amber-800">
            तुमची लिंक (जपून ठेवा):
          </p>

          <div className="flex items-center gap-2 rounded-xl border border-amber-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm">
            <span className="flex-1 truncate font-mono text-xs text-amber-950">
              {fullLink}
            </span>

            <CopyButton text={fullLink} />
          </div>

          <p className="mt-2 text-[11px] leading-5 text-amber-800">
            ही लिंक save करून ठेवा — payment झाल्यावर
            याच लिंकवर तुमची सर्व माहिती दिसेल.
          </p>
        </div>

        {/* ===================================================
            PAYMENT / INVITATION BUTTON
            =================================================== */}

        <div className="mt-7">
          {isPaid ? (
            <a
              href={fullLink}
              className="inline-block rounded-full bg-orange-500 px-8 py-3 font-semibold text-white shadow-lg shadow-orange-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-orange-600"
            >
              आपले निमंत्रण पहा →
            </a>
          ) : (
            <PaymentButton slug={slug} />
          )}
        </div>

      </div>
    </main>
  );
}