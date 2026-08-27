"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";


const invitationUrl =
  "https://ganapati-invitation-platform.vercel.app/mandal-zw5m9l";

const platformUrl =
  "https://ganapati-invitation-platform.vercel.app/";

const whatsappMessage = `🧡 गणपती निमंत्रणासाठी Instagram Caption

🙏 यंदाच्या गणेशोत्सवाचे निमंत्रण आता डिजिटल करा! 🐘✨

तुमच्या गणपती मंडळाचे सुंदर, आकर्षक आणि आधुनिक Digital Invitation तयार करा आणि एका क्लिकमध्ये WhatsApp वर आपल्या नातेवाईक, मित्रपरिवार आणि भक्तांना पाठवा! ❤️

✨ मंडळाची संपूर्ण माहिती

📸 गणपती बाप्पांचे फोटो

🗓️ कार्यक्रमांची माहिती

🙏 आरती • महाप्रसाद • मिरवणूक • विसर्जन

📍 मंडळाचे लोकेशन

📱 WhatsApp वर सहज शेअर करता येणारी लिंक

कागदी पत्रिका नको… यंदा बाप्पांचे निमंत्रण Digital करा! 🚩

👉 तुमच्या मंडळासाठी आजच Digital Invitation तयार करा.

${platformUrl}

गणपती बाप्पा मोरया! ❤️🚩`;

const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
  whatsappMessage
)}`;

const typingText =
  "एक सुंदर, animated आणि share करण्यायोग्य Ganpati invitation website — फक्त ₹499 मध्ये.";

export default function HomePage() {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < typingText.length) {
        setDisplayText(typingText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-maroon-dark)] text-[var(--color-ivory)]">
      {/* =====================================================
          RESPONSIVE BACKGROUND
      ====================================================== */}

      {/* Mobile Background */}
      <div className="absolute inset-0 z-0 md:hidden">
        <Image
          src="/images/backgrounds/ganpati-mobile-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-[var(--color-maroon-dark)]/10" />
      </div>

      {/* Desktop Background */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <Image
          src="/images/backgrounds/ganpati-desktop-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-[var(--color-maroon-dark)]/10" />
      </div>

      {/* =====================================================
          AMBIENT LIGHT
      ====================================================== */}

      <div className="pointer-events-none absolute left-1/2 top-[35%] z-[1] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[var(--color-gold)]/10 blur-[120px]" />

      {/* =====================================================
          FLOATING PARTICLES
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 z-[2]">
        <span className="absolute left-[12%] top-[28%] h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]/70 animate-particle-one" />

        <span className="absolute right-[14%] top-[42%] h-2 w-2 rounded-full bg-[var(--color-gold-light)]/50 animate-particle-two" />

        <span className="absolute left-[25%] top-[62%] h-1 w-1 rounded-full bg-[var(--color-gold)]/60 animate-particle-three" />

        <span className="absolute right-[25%] top-[68%] h-1.5 w-1.5 rounded-full bg-[var(--color-gold-light)]/50 animate-particle-one" />
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center px-5 pb-10 pt-10 text-center sm:px-8 md:justify-center md:px-10 md:py-14">

        {/* =================================================
            GANESH MANTRA
        ================================================== */}

        <div className="animate-fade-down">
          <p className="text-[11px] font-medium tracking-[0.28em] text-[var(--color-gold-light)] sm:text-sm">
            ॥ श्री गणेशाय नमः ॥
          </p>
        </div>

    {/* =================================================
    GANAPATI MURTI
================================================= */}

<div className="relative z-30 mt-5 h-[270px] w-[220px] sm:mt-7 sm:h-[320px] sm:w-[260px] md:mt-5 md:h-[390px] md:w-[330px] lg:h-[430px] lg:w-[370px]">
  
  {/* Soft glow */}
  <div className="absolute left-1/2 top-1/2 z-0 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-gold)]/20 blur-[60px]" />

  {/* Ganapati */}
  <div className="relative z-20 h-full w-full animate-ganapati-float">
    <Image
      src="/images/ganapati/ganapati-murti.png"
      alt="Ganapati Murti"
      width={370}
      height={430}
      priority
      className="relative z-20 h-full w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
    />
  </div>
</div>

        {/* =================================================
            MAIN HEADING
        ================================================== */}

        <div className="mt-1 animate-fade-up sm:mt-2 md:-mt-1">
          <h1 className="font-display text-[2.15rem] font-bold leading-[1.12] tracking-tight text-[var(--color-gold-light)] sm:text-5xl md:text-6xl lg:text-7xl">
            आपल्या मंडळाचे
            <br />
            <span className="relative inline-block">
              निमंत्रण
              <span className="absolute -bottom-2 left-1/2 h-px w-20 -translate-x-1/2 bg-[var(--color-gold)]/70 sm:w-28" />
            </span>
            <br />
            फक्त ₹499 मध्ये
          </h1>
        </div>

        {/* =================================================
            TYPING DESCRIPTION
        ================================================== */}

        <div className="mt-5 min-h-[58px] max-w-[340px] animate-fade-up-delay sm:mt-6 sm:max-w-xl md:max-w-2xl">
          <p className="text-sm leading-6 text-[var(--color-ivory)]/85 sm:text-base sm:leading-7 md:text-lg">
            {displayText}
            <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-[var(--color-gold)] animate-cursor-blink" />
          </p>
        </div>

        {/* =================================================
            PRICE BADGE
        ================================================== */}

        <div className="mt-5 animate-fade-up-delay-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/30 bg-black/15 px-4 py-2 backdrop-blur-sm">
            <span className="text-sm text-[var(--color-gold-light)]">
              Premium Invitation
            </span>

            <span className="h-1 w-1 rounded-full bg-[var(--color-gold)]" />

            <span className="text-sm font-bold text-[var(--color-gold-light)]">
              ₹499 only
            </span>
          </div>
        </div>

        {/* =================================================
            CTA
        ================================================== */}

        <div className="mt-6 animate-fade-up-delay-3 sm:mt-7">
          <Link
            href="/submit"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--color-gold)] px-8 py-3.5 text-base font-bold text-[var(--color-maroon-dark)] shadow-[0_10px_35px_rgba(212,160,23,0.25)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:bg-[var(--color-gold-light)] hover:shadow-[0_15px_45px_rgba(212,160,23,0.4)] active:scale-95 sm:px-10 sm:py-4 sm:text-lg"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-700 group-hover:translate-x-full" />

            <span className="relative flex items-center gap-2">
              ✨
              <span>निमंत्रण तयार करा</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>

          <p className="mt-2 text-[10px] text-[var(--color-ivory)]/50">
            काही मिनिटांत तुमचे digital invitation तयार
          </p>
        </div>

        {/* =================================================
    DIGITAL INVITATION LINK
================================================= */}

<div className="mt-5 w-full max-w-[420px] animate-fade-up-delay-3 sm:mt-6">
  <a
    href={invitationUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--color-gold)]/35 bg-black/20 px-5 py-3.5 text-sm font-semibold text-[var(--color-gold-light)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-gold)]/60 hover:bg-black/30 sm:text-base"
  >
    <span className="text-lg">🪔</span>

    <span className="min-w-0 break-words text-center">
      Digital Invitation चे उदाहरण पहा
    </span>

    <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  </a>
</div>

{/* =================================================
    MARATHI INFORMATION
================================================= */}

<section className="mt-12 w-full max-w-2xl animate-fade-in sm:mt-14">
  <div className="rounded-[28px] border border-[var(--color-gold)]/20 bg-black/15 p-5 text-left backdrop-blur-md sm:p-7 md:p-8">

    {/* Heading */}
    <div className="mb-5 text-center sm:mb-6">
      <span className="text-xl">🙏</span>

      <h2 className="mt-2 text-xl font-bold leading-relaxed text-[var(--color-gold-light)] sm:text-2xl md:text-3xl">
        मंडळासाठीच नाही,
        <br className="sm:hidden" />
        घरगुती गणपतीसाठीही!
      </h2>

      <div className="mx-auto mt-3 h-px w-16 bg-[var(--color-gold)]/50" />
    </div>

    {/* Content */}
    <div className="space-y-4 text-sm leading-7 text-[var(--color-ivory)]/80 sm:text-base sm:leading-8">

      <p>
        हे डिजिटल निमंत्रण फक्त गणपती मंडळासाठीच नाही,
        तर तुम्ही तुमच्या <strong className="font-semibold text-[var(--color-gold-light)]">
          घरगुती गणपतीसाठीही
        </strong>{" "}
        तयार करू शकता! 🙏🌺
      </p>

      <p>
        तुमच्या घरगुती गणपतीच्या{" "}
        <strong className="font-semibold text-[var(--color-gold-light)]">
          निमंत्रणाची माहिती
        </strong>{" "}
        भरून हे सुंदर डिजिटल निमंत्रण तुमचे{" "}
        <strong className="font-semibold text-[var(--color-gold-light)]">
          नातेवाईक, मित्रपरिवार आणि पाहुण्यांना
        </strong>{" "}
        सहज पाठवू शकता.
      </p>

      <p>
        तुमच्याकडे मागील वर्षीच्या गणपतीचे सुंदर फोटो असतील,
        तर तेही फॉर्ममध्ये जोडा. 📸✨
      </p>

      {/* Highlight */}
      <div className="my-5 rounded-2xl border border-[var(--color-gold)]/20 bg-[var(--color-gold)]/5 p-4 text-center sm:p-5">
        <p className="text-sm font-semibold leading-7 text-[var(--color-gold-light)] sm:text-base sm:leading-8">
          आणि खास गोष्ट म्हणजे —
          <br />
          सुंदर, आकर्षक आणि मनमोहक डिजिटल गणपती निमंत्रण
          <br className="hidden sm:block" />
          <span className="text-lg sm:text-xl">
            अवघ्या ५ मिनिटांत तयार होईल! 🪔❤️
          </span>
        </p>
      </div>

      <p>
        तुमच्या{" "}
        <strong className="font-semibold text-[var(--color-gold-light)]">
          WhatsApp ग्रुपमध्येही ही लिंक नक्की शेअर करा
        </strong>
        , जेणेकरून तुमच्या मित्रपरिवारातील आणि नातेवाईकांनाही
        त्यांच्या घरगुती गणपतीसाठी असे सुंदर डिजिटल निमंत्रण
        तयार करता येईल.
      </p>

      <div className="pt-2 text-center">
        <p className="text-base font-bold text-[var(--color-gold-light)] sm:text-lg">
          गणपती बाप्पा मोरया! ❤️🙏
        </p>
      </div>

    </div>
  </div>
</section>

{/* =================================================
    WHATSAPP SHARE
================================================= */}

<div className="mt-6 w-full max-w-2xl sm:mt-7">
  <a
    href={whatsappShareUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-5 py-4 text-center text-sm font-bold text-white shadow-[0_10px_35px_rgba(37,211,102,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(37,211,102,0.28)] active:scale-[0.98] sm:px-7 sm:py-4.5 sm:text-base"
  >

    <span className="min-w-0 break-words leading-6">
      WhatsApp वर मंडळ आणि मित्रांना शेअर करा
    </span>

    <span className="shrink-0 text-lg transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  </a>

  <p className="mt-2 px-4 text-center text-[10px] leading-5 text-[var(--color-ivory)]/45 sm:text-xs">
    तुमच्या मित्रपरिवाराला आणि नातेवाईकांना ही माहिती शेअर करा ❤️
  </p>
</div>
        {/* =================================================
            FEATURES
        ================================================== */}

        <div className="mt-10 grid w-full max-w-[430px] grid-cols-3 gap-2 sm:mt-12 sm:max-w-xl sm:gap-4 md:mt-14">
          {/* Feature 1 */}
          <Feature
            icon="🎬"
            title="सुंदर"
            subtitle="Animation"
            delay="0s"
          />

          {/* Feature 2 */}
          <Feature
            icon="📸"
            title="फोटो"
            subtitle="Gallery"
            delay="0.15s"
          />

          {/* Feature 3 */}
          <Feature
            icon="📲"
            title="सहज"
            subtitle="WhatsApp Share"
            delay="0.3s"
          />
        </div>

        {/* =================================================
            TRUST LINE
        ================================================== */}

        <div className="mt-8 animate-fade-in sm:mt-10">
          <p className="text-[10px] tracking-wide text-[var(--color-ivory)]/45 sm:text-xs">
            सुंदर design • mobile friendly • WhatsApp sharing
          </p>
        </div>

        {/* =================================================
            BRAND
        ================================================== */}

        <p className="mt-5 text-[9px] tracking-[0.18em] text-[var(--color-ivory)]/30 sm:text-[10px]">
          POWERED BY ELVATRIXA
        </p>
      </section>

      {/* =====================================================
          ANIMATIONS
      ====================================================== */}

      <style jsx>{`
        @keyframes ganapatiFloat {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-13px);
          }
        }

        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes cursorBlink {
          0%,
          45% {
            opacity: 1;
          }

          46%,
          100% {
            opacity: 0;
          }
        }

        @keyframes particleOne {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.3;
          }

          50% {
            transform: translate3d(8px, -18px, 0);
            opacity: 0.9;
          }
        }

        @keyframes particleTwo {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.2;
          }

          50% {
            transform: translate3d(-12px, 14px, 0);
            opacity: 0.8;
          }
        }

        @keyframes particleThree {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.2;
          }

          50% {
            transform: translate3d(10px, -12px, 0);
            opacity: 0.7;
          }
        }

        .animate-ganapati-float {
          animation: ganapatiFloat 4.5s ease-in-out infinite;
        }

        .animate-fade-down {
          animation: fadeDown 0.9s ease-out both;
        }

        .animate-fade-up {
          animation: fadeUp 1s ease-out 0.15s both;
        }

        .animate-fade-up-delay {
          animation: fadeUp 1s ease-out 0.35s both;
        }

        .animate-fade-up-delay-2 {
          animation: fadeUp 1s ease-out 0.55s both;
        }

        .animate-fade-up-delay-3 {
          animation: fadeUp 1s ease-out 0.7s both;
        }

        .animate-fade-in {
          animation: fadeIn 1.2s ease-out 1s both;
        }

        .animate-cursor-blink {
          animation: cursorBlink 0.8s steps(1) infinite;
        }

        .animate-particle-one {
          animation: particleOne 4s ease-in-out infinite;
        }

        .animate-particle-two {
          animation: particleTwo 5s ease-in-out infinite;
        }

        .animate-particle-three {
          animation: particleThree 4.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-ganapati-float,
          .animate-fade-down,
          .animate-fade-up,
          .animate-fade-up-delay,
          .animate-fade-up-delay-2,
          .animate-fade-up-delay-3,
          .animate-fade-in,
          .animate-cursor-blink,
          .animate-particle-one,
          .animate-particle-two,
          .animate-particle-three {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}

/* =========================================================
   FEATURE COMPONENT
========================================================= */

function Feature({
  icon,
  title,
  subtitle,
  delay,
}: {
  icon: string;
  title: string;
  subtitle: string;
  delay: string;
}) {
  return (
    <div
      className="group rounded-2xl border border-[var(--color-gold)]/20 bg-black/10 px-2 py-3 backdrop-blur-[2px] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-gold)]/50 hover:bg-black/20 sm:px-4 sm:py-4"
      style={{
        animation: `fadeUp 0.9s ease-out ${delay} both`,
      }}
    >
      <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 text-lg transition-transform duration-500 group-hover:scale-110 sm:h-11 sm:w-11 sm:text-xl">
        {icon}
      </div>

      <p className="mt-2 text-[11px] font-semibold text-[var(--color-gold-light)] sm:text-sm">
        {title}
      </p>

      <p className="text-[10px] text-[var(--color-ivory)]/55 sm:text-xs">
        {subtitle}
      </p>
    </div>
  );
}