"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { FestiveAudioAndBlessing } from "@/components/FestiveAudioAndBlessing";

const invitationUrl =
  "https://ganapati-invitation-platform.vercel.app/mandal-zw5m9l";

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
    <main className="relative min-h-screen bg-[#1c0609] text-[#fef9eb] selection:bg-[#e8a93b] selection:text-black">
      
      {/* =====================================================
          BACKGROUND IMAGE (RESPONSIVE DESKTOP & MOBILE)
      ====================================================== */}
      <picture className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <source
          media="(min-width: 768px)"
          srcSet="/images/backgrounds/hero-background-desktop.webp"
        />
        <Image
          src="/images/backgrounds/hero-background-mobile.webp"
          alt="Festive Background"
          fill
          priority
          className="object-cover object-center"
        />
      </picture>

      {/* Subtle traditional toran top border */}
      <div className="relative z-10 w-full border-b border-[#e8a93b]/25 bg-[#2a0a0e]/80 backdrop-blur-md py-2 px-4 text-center">
        <div className="mx-auto flex max-w-5xl items-center justify-between text-xs sm:text-sm">
          <span className="flex items-center gap-1.5 font-semibold text-[#f3d089]">
            <span>॥ श्री गणेशाय नमः ॥</span>
          </span>
          <span className="hidden sm:inline text-[#f3d089]/75 text-xs">
            🚩 गणेशोत्सव २०२६ विशेष Digital निमंत्रण
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#e8a93b]/15 border border-[#e8a93b]/30 px-2.5 py-0.5 text-[11px] font-medium text-[#f3d089]">
            ✓ मोफत Preview उपलब्ध
          </span>
        </div>
      </div>

      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 pt-8 pb-14 text-center sm:px-6 sm:pt-12 sm:pb-20">
        
        {/* Transparent Ganpati Photo with Soft Gold Aura and Floating Animation */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="animate-ganapati-float flex items-center justify-center">
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
        <h1 className="font-display text-3xl font-bold tracking-normal text-[#f3d089] sm:text-5xl md:text-6xl leading-[1.2]">
          यंदा गणपतीचे निमंत्रण <br className="hidden sm:inline" />
          <span className="text-white drop-shadow-md">असू द्या Digital!</span> 🚩
        </h1>

        {/* Subtitle / Value Proposition */}
        <div className="mt-4 min-h-[48px] max-w-2xl px-2">
          <p className="text-sm leading-relaxed text-[#fef9eb]/90 sm:text-base md:text-lg font-normal">
            {displayText}
            <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 bg-[#e8a93b] animate-pulse" />
          </p>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-[#f3d089]/90 font-medium">
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-black/30 border border-[#e8a93b]/20 px-3 py-1.5">
            ⚡ अवघ्या ५ मिनिटांत तयार
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-black/30 border border-[#e8a93b]/20 px-3 py-1.5">
            📲 WhatsApp वर एका क्लिकमध्ये शेअर
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-black/30 border border-[#e8a93b]/20 px-3 py-1.5">
            📍 अचूक Google Maps लोकेशन
          </span>
        </div>

        {/* Main Action CTAs */}
        <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/submit"
            onClick={() => track("landing_cta_click")}
            className="group relative flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#e8a93b] to-[#d96a2b] px-7 py-4 text-base sm:text-lg font-bold text-[#200608] shadow-[0_12px_35px_rgba(217,106,43,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_16px_45px_rgba(232,169,59,0.45)] active:scale-95"
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
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-[#e8a93b]/40 bg-black/30 px-6 py-4 text-sm sm:text-base font-semibold text-[#f3d089] backdrop-blur-sm transition-all duration-200 hover:bg-[#e8a93b]/10 active:scale-95"
          >
            <span>👀</span>
            <span>Live Demo पहा</span>
            <span>↗</span>
          </a>
        </div>

        <p className="mt-3 text-xs text-[#fef9eb]/60">
          कोणत्याही ॲप डाऊनलोडची गरज नाही • सर्व मोबाईलवर त्वरित चालते
        </p>
      </section>

      {/* =====================================================
          WHY CHOOSE DIGITAL INVITATION (FEATURES)
      ====================================================== */}
      <section className="relative z-10 border-t border-[#e8a93b]/20 bg-[#24080c]/60 py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#e8a93b]">
              खास वैशिष्ट्ये
            </span>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[#f3d089]">
              डिजिटल निमंत्रण का निवडावे?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#fef9eb]/75 max-w-xl mx-auto">
              कागदी पत्रिका हरवू शकतात, पण डिजिटल निमंत्रण प्रत्येक भक्ताच्या आणि पाहुण्यांच्या मोबाईलमध्ये सुरक्षित राहते.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Feature 1 */}
            <div className="rounded-2xl border border-[#e8a93b]/20 bg-black/30 p-5 text-left backdrop-blur-sm transition-all hover:border-[#e8a93b]/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8a93b]/15 text-2xl text-[#e8a93b]">
                📍
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-[#f3d089]">
                अचूक Google Maps दिशा
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#fef9eb]/80 leading-relaxed">
                पाहुण्यांना पत्ता विचारण्याची गरज नाही — एका क्लिकवर थेट मंडपापर्यंत नेणारा रस्ता मिळतो.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-[#e8a93b]/20 bg-black/30 p-5 text-left backdrop-blur-sm transition-all hover:border-[#e8a93b]/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8a93b]/15 text-2xl text-[#e8a93b]">
                ⏱️
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-[#f3d089]">
                आरती व कार्यक्रमांचे वेळापत्रक
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#fef9eb]/80 leading-relaxed">
                प्राणप्रतिष्ठा, दैनिक आरती, महाप्रसाद व विसर्जनाची अचूक वेळ सर्वांना एकाच ठिकाणी दिसते.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-[#e8a93b]/20 bg-black/30 p-5 text-left backdrop-blur-sm transition-all hover:border-[#e8a93b]/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8a93b]/15 text-2xl text-[#e8a93b]">
                📸
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-[#f3d089]">
                सुंदर फोटो गॅलरी व देखावा
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#fef9eb]/80 leading-relaxed">
                बाप्पांचे विलोभनीय रूप आणि मागील वर्षांतील उत्सवाचे अविस्मरणीय क्षण सर्वांसोबत शेअर करा.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-2xl border border-[#e8a93b]/20 bg-black/30 p-5 text-left backdrop-blur-sm transition-all hover:border-[#e8a93b]/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8a93b]/15 text-2xl text-[#e8a93b]">
                📲
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-[#f3d089]">
                WhatsApp वर १-क्लिक शेअर
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#fef9eb]/80 leading-relaxed">
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
            <span className="text-xs font-semibold uppercase tracking-widest text-[#e8a93b]">
              अतिशय सोपे
            </span>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[#f3d089]">
              अवघ्या ३ पायऱ्यांत तुमचे निमंत्रण तयार करा
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Step 1 */}
            <div className="relative rounded-2xl border border-[#e8a93b]/20 bg-black/25 p-5 text-center">
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#e8a93b] font-bold text-[#200608] text-sm mb-3">
                १
              </div>
              <h3 className="font-display text-base font-bold text-[#f3d089]">
                माहिती भरा
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#fef9eb]/80 leading-relaxed">
                मंडळाचे / कुटुंबाचे नाव, पत्ता, संपर्क आणि कार्यक्रमांची वेळ फॉर्ममध्ये भरा.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-2xl border border-[#e8a93b]/20 bg-black/25 p-5 text-center">
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#e8a93b] font-bold text-[#200608] text-sm mb-3">
                २
              </div>
              <h3 className="font-display text-base font-bold text-[#f3d089]">
                Live Preview तपासा
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#fef9eb]/80 leading-relaxed">
                मोबाईलवर निमंत्रण कसे दिसेल ते त्वरित तपासून आवश्यकतेनुसार बदल करा.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-2xl border border-[#e8a93b]/20 bg-black/25 p-5 text-center">
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#e8a93b] font-bold text-[#200608] text-sm mb-3">
                ३
              </div>
              <h3 className="font-display text-base font-bold text-[#f3d089]">
                WhatsApp वर पाठवा
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#fef9eb]/80 leading-relaxed">
                आपली खास निमंत्रण लिंक मिळवा आणि एका क्लिकमध्ये सर्वांसोबत शेअर करा.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          MANDAL & GHARGUTI GANPATI TRUST HIGHLIGHT
      ====================================================== */}
      <section className="relative z-10 py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#e8a93b]/30 bg-gradient-to-b from-[#2e0b11] to-[#1a0407] p-6 sm:p-8 text-center shadow-xl">
          <span className="text-2xl">🙏</span>
          <h2 className="mt-2 font-display text-xl sm:text-3xl font-bold text-[#f3d089]">
            मंडळासाठीच नाही, घरगुती गणपतीसाठीही!
          </h2>
          <div className="mx-auto my-3 h-0.5 w-16 bg-[#e8a93b]/40" />

          <p className="text-sm sm:text-base leading-relaxed text-[#fef9eb]/85 max-w-xl mx-auto">
            तुम्ही तुमच्या <strong className="text-[#f3d089] font-semibold">घरगुती गणपतीच्या दर्शनासाठी</strong>, पूजेसाठी आणि स्नेहभोजनासाठीसुद्धा हे सुंदर डिजिटल निमंत्रण तयार करून नातेवाईक व आप्तेष्टांना सहज पाठवू शकता.
          </p>

          <div className="mt-6">
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[#e8a93b] px-6 py-3 text-sm sm:text-base font-bold text-[#200608] shadow-lg transition-all hover:bg-[#f3d089] active:scale-95"
            >
              <span>✨ आताच निमंत्रण तयार करा</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHATSAPP SHARE BANNER
      ====================================================== */}
      <section className="relative z-10 py-10 px-4 sm:px-6">
        <div className="mx-auto max-w-2xl rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 sm:p-6 text-center backdrop-blur-sm">
          <p className="text-xs sm:text-sm font-semibold text-emerald-300 mb-3">
            ही उपयुक्त माहिती आपल्या मंडळाच्या व मित्रांच्या WhatsApp ग्रुपवर शेअर करा:
          </p>
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_share_click")}
            className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-emerald-950/40 hover:bg-[#20bd5a] active:scale-95 transition-all"
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
      <footer className="relative z-10 border-t border-[#e8a93b]/15 bg-[#140305] py-8 px-4 text-center text-xs text-[#fef9eb]/50">
        <div className="mx-auto max-w-md space-y-2">
          <p className="font-display text-sm text-[#f3d089]/80 font-bold">
            गणपती डिजिटल निमंत्रण प्लॅटफॉर्म २०२६
          </p>
          <p>
            गणपती बाप्पा मोरया, मंगलमूर्ती मोरया! 🚩
          </p>
          <p className="text-[10px] tracking-wider text-[#f3d089]/30 pt-2">
            POWERED BY ELVATRIXA
          </p>
        </div>
      </footer>

      {/* =====================================================
          STICKY MOBILE BOTTOM CTA BAR
      ====================================================== */}
      <div className="fixed inset-x-0 bottom-0 z-40 block sm:hidden border-t border-[#e8a93b]/30 bg-[#1e0609]/95 p-3 backdrop-blur-lg shadow-2xl">
        <Link
          href="/submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#e8a93b] to-[#d96a2b] py-3 text-sm font-bold text-[#200608] shadow-lg active:scale-95"
        >
          <span>✨</span>
          <span>माझे Digital निमंत्रण तयार करा</span>
          <span>→</span>
        </Link>
      </div>

      {/* Festive Digital Aarti Audio, Temple Bell & Floral Blessing (पुष्पार्पण) */}
      <FestiveAudioAndBlessing />

    </main>
  );
}