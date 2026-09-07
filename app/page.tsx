"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { FestiveAudioAndBlessing } from "@/components/FestiveAudioAndBlessing";

const invitationUrl =
  "https://ganapati-invitation-platform.vercel.app/mandal-13k04e";

const platformUrl =
  "https://ganapati-invitation-platform.vercel.app/";

const whatsappMessage = `🚩 *यंदाच्या गणेशोत्सवाचे निमंत्रण आता डिजिटल करा!* 🐘✨

तुमच्या गणपती मंडळाचे किंवा घरगुती गणपतीचे सुंदर, आधुनिक Digital Invitation तयार करा आणि एका क्लिकमध्ये WhatsApp वर नातेवाईक, मित्रपरिवार व भाविकांना पाठवा! ❤️

✨ मंडळाची / कुटुंबाची संपूर्ण माहिती
📸 गणपती बाप्पांचे मनमोहक फोटो
🗓️ दैनिक आरती, महाप्रसाद व कार्यक्रमांचे वेळापत्रक
📍 Google Maps अचूक लोकेशन
📱 WhatsApp वर सहज शेअर करता येणारी लिंक

👉 आजच तुमचे Digital Invitation तयार करा:
${platformUrl}

गणपती बाप्पा मोरया! 🚩🙏`;

const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
  whatsappMessage
)}`;

const typingText =
  "आपल्या गणेश मंडळाचे किंवा घरगुती गणपतीचे सुंदर animated digital निमंत्रण तयार करा — काही मिनिटांत WhatsApp वर शेअर करा.";

export default function HomePage() {
  const [displayText, setDisplayText] = useState("");
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < typingText.length) {
        setDisplayText(typingText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 28);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen bg-white text-[#14213d] selection:bg-[#fca311]/30 selection:text-[#14213d]">

      {/* Ambient premium accent glows — replaces the old festive background photo */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#fca311]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[320px] w-[320px] translate-x-1/4 translate-y-1/4 rounded-full bg-[#14213d]/5 blur-[100px]" />
      </div>

      {/* Top banner strip */}
      <div className="relative z-10 w-full bg-[#14213d] py-2 px-4 text-center">
        <div className="mx-auto flex max-w-5xl items-center justify-between text-xs sm:text-sm">
          <span className="flex items-center gap-1.5 font-semibold text-white">
            <span>॥ श्री गणेशाय नमः ॥</span>
          </span>
          <span className="hidden sm:inline text-white/70 text-xs">
            🚩 गणेशोत्सव २०२६ विशेष Digital निमंत्रण
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#fca311] px-2.5 py-0.5 text-[11px] font-bold text-[#14213d]">
            ✓ मोफत Preview उपलब्ध
          </span>
        </div>
      </div>

      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 pt-10 pb-14 text-center sm:px-6 sm:pt-14 sm:pb-20">

        <div className="relative mb-6 flex items-center justify-center">
          <div className="animate-ganapati-float flex items-center justify-center drop-shadow-xl">
            {imgFailed ? (
              <span className="text-6xl sm:text-7xl select-none">🐘</span>
            ) : (
              <Image
                src="/images/ganesh/ganeshmurti.png"
                alt="श्री गणपती बाप्पा"
                width={240}
                height={240}
                priority
                onError={() => setImgFailed(true)}
                className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 object-contain select-none"
              />
            )}
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="font-display text-3xl font-bold tracking-normal text-[#14213d] sm:text-5xl md:text-6xl leading-[1.2]">
          यंदा गणपतीचे निमंत्रण <br className="hidden sm:inline" />
          <span className="text-[#fca311]">असू द्या Digital!</span> 🚩
        </h1>

        {/* Subtitle / Value Proposition */}
        <div className="mt-4 min-h-[48px] max-w-2xl px-2">
          <p className="text-sm leading-relaxed text-[#14213d]/70 sm:text-base md:text-lg font-normal">
            {displayText}
            <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 bg-[#fca311] animate-pulse" />
          </p>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-[#14213d] font-medium">
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#e5e5e5] px-3 py-1.5">
            ⚡ अवघ्या ५ मिनिटांत तयार
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#e5e5e5] px-3 py-1.5">
            📲 WhatsApp वर एका क्लिकमध्ये शेअर
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#e5e5e5] px-3 py-1.5">
            📍 अचूक Google Maps लोकेशन
          </span>
        </div>

        {/* Main Action CTAs */}
        <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/submit"
            onClick={() => track("landing_cta_click")}
            className="group relative flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-[#fca311] px-7 py-4 text-base sm:text-lg font-bold text-[#14213d] shadow-[0_12px_35px_rgba(252,163,17,0.35)] transition-all duration-200 hover:scale-[1.02] hover:bg-[#e6940a] active:scale-95"
          >
            <span>✨</span>
            <span>माझे Digital निमंत्रण तयार करा</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>

          <a
            href={invitationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("live_demo_click")}
            className="group flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl border border-[#14213d]/20 bg-white px-6 py-4 text-sm sm:text-base font-semibold text-[#14213d] shadow-sm transition-all duration-200 hover:border-[#14213d]/40 hover:bg-[#e5e5e5]/60 active:scale-95"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span>Live Demo पहा</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        </div>

        <p className="mt-3 text-xs text-[#14213d]/50">
          कोणत्याही ॲप डाऊनलोडची गरज नाही • सर्व मोबाईलवर त्वरित चालते
        </p>
      </section>

      {/* =====================================================
          WHY CHOOSE DIGITAL INVITATION (FEATURES)
      ====================================================== */}
      <section className="relative z-10 border-t border-[#e5e5e5] bg-[#e5e5e5]/50 py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">

          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#fca311]">
              खास वैशिष्ट्ये
            </span>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[#14213d]">
              डिजिटल निमंत्रण का निवडावे?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#14213d]/60 max-w-xl mx-auto">
              कागदी पत्रिका हरवू शकतात, पण डिजिटल निमंत्रण प्रत्येक भक्ताच्या आणि पाहुण्यांच्या मोबाईलमध्ये सुरक्षित राहते.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Feature 1 */}
            <div className="rounded-2xl border border-[#e5e5e5] bg-white p-5 text-left shadow-sm transition-all hover:border-[#fca311]/40 hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fca311]/15 text-2xl">
                📍
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-[#14213d]">
                अचूक Google Maps दिशा
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#14213d]/65 leading-relaxed">
                पाहुण्यांना पत्ता विचारण्याची गरज नाही — एका क्लिकवर थेट मंडपापर्यंत नेणारा रस्ता मिळतो.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-[#e5e5e5] bg-white p-5 text-left shadow-sm transition-all hover:border-[#fca311]/40 hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fca311]/15 text-2xl">
                ⏱️
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-[#14213d]">
                आरती व कार्यक्रमांचे वेळापत्रक
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#14213d]/65 leading-relaxed">
                प्राणप्रतिष्ठा, दैनिक आरती, महाप्रसाद व विसर्जनाची अचूक वेळ सर्वांना एकाच ठिकाणी दिसते.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-[#e5e5e5] bg-white p-5 text-left shadow-sm transition-all hover:border-[#fca311]/40 hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fca311]/15 text-2xl">
                📸
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-[#14213d]">
                सुंदर फोटो गॅलरी व देखावा
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#14213d]/65 leading-relaxed">
                बाप्पांचे विलोभनीय रूप आणि मागील वर्षांतील उत्सवाचे अविस्मरणीय क्षण सर्वांसोबत शेअर करा.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-2xl border border-[#e5e5e5] bg-white p-5 text-left shadow-sm transition-all hover:border-[#fca311]/40 hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fca311]/15 text-2xl">
                📲
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-[#14213d]">
                WhatsApp वर १-क्लिक शेअर
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#14213d]/65 leading-relaxed">
                कागदी पत्रिका छापण्याची व वाटण्याची धावपळ संपली. एका क्लिकमध्ये शेकडो लोकांपर्यंत पोहोचवा.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS (3 SIMPLE STEPS)
      ====================================================== */}
      <section className="relative z-10 py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">

          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#fca311]">
              अतिशय सोपे
            </span>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[#14213d]">
              अवघ्या ३ पायऱ्यांत तुमचे निमंत्रण तयार करा
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Step 1 */}
            <div className="relative rounded-2xl border border-[#e5e5e5] bg-white p-5 text-center shadow-sm">
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#14213d] font-bold text-white text-sm mb-3">
                १
              </div>
              <h3 className="font-display text-base font-bold text-[#14213d]">
                माहिती भरा
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#14213d]/65 leading-relaxed">
                मंडळाचे / कुटुंबाचे नाव, पत्ता, संपर्क आणि कार्यक्रमांची वेळ फॉर्ममध्ये भरा.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-2xl border border-[#e5e5e5] bg-white p-5 text-center shadow-sm">
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#14213d] font-bold text-white text-sm mb-3">
                २
              </div>
              <h3 className="font-display text-base font-bold text-[#14213d]">
                Live Preview तपासा
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#14213d]/65 leading-relaxed">
                मोबाईलवर निमंत्रण कसे दिसेल ते त्वरित तपासून आवश्यकतेनुसार बदल करा.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-2xl border border-[#e5e5e5] bg-white p-5 text-center shadow-sm">
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#14213d] font-bold text-white text-sm mb-3">
                ३
              </div>
              <h3 className="font-display text-base font-bold text-[#14213d]">
                WhatsApp वर पाठवा
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#14213d]/65 leading-relaxed">
                आपली खास निमंत्रण लिंक मिळवा आणि एका क्लिकमध्ये सर्वांसोबत शेअर करा.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          MANDAL & GHARGUTI GANPATI TRUST HIGHLIGHT — dark navy break for rhythm
      ====================================================== */}
      <section className="relative z-10 py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-3xl bg-[#14213d] p-6 sm:p-8 text-center shadow-xl">
          <span className="text-2xl">🙏</span>
          <h2 className="mt-2 font-display text-xl sm:text-3xl font-bold text-white">
            मंडळासाठीच नाही, घरगुती गणपतीसाठीही!
          </h2>
          <div className="mx-auto my-3 h-0.5 w-16 bg-[#fca311]/60" />

          <p className="text-sm sm:text-base leading-relaxed text-white/80 max-w-xl mx-auto">
            तुम्ही तुमच्या <strong className="text-[#fca311] font-semibold">घरगुती गणपतीच्या दर्शनासाठी</strong>, पूजेसाठी आणि स्नेहभोजनासाठीसुद्धा हे सुंदर डिजिटल निमंत्रण तयार करून नातेवाईक व आप्तेष्टांना सहज पाठवू शकता.
          </p>

          <div className="mt-6">
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[#fca311] px-6 py-3 text-sm sm:text-base font-bold text-[#14213d] shadow-lg transition-all hover:bg-white active:scale-95"
            >
              <span>✨ आताच निमंत्रण तयार करा</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHATSAPP SHARE BANNER — kept WhatsApp's own brand green, universally recognized
      ====================================================== */}
      <section className="relative z-10 py-10 px-4 sm:px-6">
        <div className="mx-auto max-w-2xl rounded-2xl border border-[#e5e5e5] bg-[#e5e5e5]/60 p-5 sm:p-6 text-center">
          <p className="text-xs sm:text-sm font-semibold text-[#14213d]/70 mb-3">
            ही उपयुक्त माहिती आपल्या मंडळाच्या व मित्रांच्या WhatsApp ग्रुपवर शेअर करा:
          </p>
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_share_click")}
            className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg hover:bg-[#20bd5a] active:scale-95 transition-all"
          >
            <span>💬</span>
            <span>WhatsApp वर मंडळ व मित्रांना शेअर करा</span>
            <span>→</span>
          </a>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="relative z-10 bg-[#000000] py-8 px-4 text-center text-xs text-white/50">
        <div className="mx-auto max-w-md space-y-2">
          <p className="font-display text-sm text-white/85 font-bold">
            गणपती डिजिटल निमंत्रण प्लॅटफॉर्म २०२६
          </p>
          <p>
            गणपती बाप्पा मोरया, मंगलमूर्ती मोरया! 🚩
          </p>
          <p className="text-[10px] tracking-wider text-[#fca311]/60 pt-2">
            POWERED BY ELVATRIXA
          </p>
        </div>
      </footer>

      {/* =====================================================
          STICKY MOBILE BOTTOM CTA BAR
      ====================================================== */}
      <div className="fixed inset-x-0 bottom-0 z-40 block sm:hidden border-t border-[#e5e5e5] bg-white/95 p-3 backdrop-blur-lg shadow-2xl">
        <Link
          href="/submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#fca311] py-3 text-sm font-bold text-[#14213d] shadow-lg active:scale-95"
        >
          <span>✨</span>
          <span>माझे Digital निमंत्रण तयार करा</span>
          <span>→</span>
        </Link>
      </div>

      {/* Festive Digital Aarti Audio, Temple Bell & Floral Blessing(पुष्पार्पण) */}
      <FestiveAudioAndBlessing />

    </main>
  );
}