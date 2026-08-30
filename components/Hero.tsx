"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import CoconutBreak from "./coconut/CoconutBreak";

// Doors overlay uses Framer Motion's AnimatePresence, which measures
// layout on mount via a layout effect. SSR-ing that subtree races
// against hydration timing (worse on slow dev compiles) and can get
// flagged as a hydration failure even though it's a legitimate
// post-mount update. ssr:false removes the server render for this
// subtree entirely, so there is nothing for React to reconcile
// against on the client — no race, no mismatch. This is the
// documented pattern for AnimatePresence + Next.js SSR.
const DoorsOverlay = dynamic(() => import("./DoorsOverlay"), {
  ssr: false,
});

type HeroProps = {
  mandalName: string;
  inviteLine: string;
  aartiTimes?: {
    morning?: string;
    evening?: string;
  } | string;
};

export default function Hero({
  mandalName,
  inviteLine,
  aartiTimes,
}: HeroProps) {
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle door opening with smooth flower shower
  const handleOpenDoors = (e?: React.MouseEvent) => {
    if (doorsOpen) return;
    setDoorsOpen(true);

    // Trigger flower shower at center of screen / tap location
    if (typeof window !== "undefined") {
      const clickX = e?.clientX ?? window.innerWidth / 2;
      const clickY = e?.clientY ?? window.innerHeight / 2;
      window.dispatchEvent(
        new CustomEvent("trigger-flower-burst", {
          detail: { x: clickX, y: clickY, count: 48 },
        })
      );
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          setPlaying(false);
        });
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* =====================================================
          INTRO DOORS
          Client-only via next/dynamic ssr:false — see comment
          on the import above. Do not put this back inline with
          AnimatePresence rendered directly in this file; that
          reintroduces the hydration mismatch.
      ====================================================== */}
      <DoorsOverlay doorsOpen={doorsOpen} onOpen={handleOpenDoors} />

      {/* =====================================================
          BACKGROUND - VIDEO ON MOBILE, IMAGE ON DESKTOP
          preload="metadata": poster paints instantly, actual
          video bytes stream in once playback starts, instead
          of blocking on a full video download at page load.
      ====================================================== */}

      {/* MOBILE — video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/backgrounds/hero-background-mobile.webp"
        className="absolute inset-0 -z-10 h-full w-full object-cover md:hidden"
      >
        <source src="/video/bg-video-mobile.mp4" type="video/mp4" />
      </video>

      {/* DESKTOP — static image background (unchanged) */}
      <Image
        src="/images/backgrounds/hero-background-desktop.webp"
        alt="Festive Background"
        fill
        priority
        className="-z-10 hidden object-cover md:block"
      />

      {/* =====================================================
          TOP CORNER GARLANDS
      ====================================================== */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 overflow-visible">
        {/* LEFT CORNER */}
        <motion.div
          className="absolute left-[-25px] top-0 w-[160px] sm:left-[-30px] sm:w-[190px] md:left-[-35px] md:w-[220px] lg:left-[-40px] lg:w-[250px] xl:left-[-45px] xl:w-[280px] origin-top-left"
          animate={{
            rotate: [-2, 1.5, -1, 2, -2],
            x: [0, 2, -1, 2, 0],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/images/decorations/hero-garland.png"
            alt=""
            width={280}
            height={360}
            priority
            sizes="(max-width: 639px) 160px, (max-width: 767px) 190px, (max-width: 1023px) 220px, (max-width: 1279px) 250px, 280px"
            className="block h-auto w-full object-contain drop-shadow-[0_12px_14px_rgba(0,0,0,0.3)]"
          />
        </motion.div>

        {/* RIGHT CORNER */}
        <motion.div
          className="absolute right-[-25px] top-0 w-[160px] sm:right-[-30px] sm:w-[190px] md:right-[-35px] md:w-[220px] lg:right-[-40px] lg:w-[250px] xl:right-[-45px] xl:w-[280px] origin-top-right"
          animate={{
            rotate: [2, -1.5, 1, -2, 2],
            x: [0, -2, 1, -2, 0],
          }}
          transition={{
            duration: 7.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        >
          <Image
            src="/images/decorations/hero-garland.png"
            alt=""
            width={280}
            height={360}
            priority
            sizes="(max-width: 639px) 160px, (max-width: 767px) 190px, (max-width: 1023px) 220px, (max-width: 1279px) 250px, 280px"
            className="block h-auto w-full object-contain -scale-x-100 drop-shadow-[0_12px_14px_rgba(0,0,0,0.3)]"
          />
        </motion.div>
      </div>

      {/* =====================================================
          MAIN HERO CONTENT
      ====================================================== */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center mt-35 sm:mt-12 md:mt-28 lg:mt-36">

        {/* TEXT CONTAINER WITH ADAPTIVE MARATHI TYPOGRAPHY */}
        <div className="w-full px-3.5 sm:px-6">
          {/* श्री गणेशाय नमः */}
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#8a2b00] drop-shadow-sm">
            ॥ श्री गणेशाय नमः ॥
          </p>

          {/* DIVIDER */}
          <div className="mx-auto mt-2.5 sm:mt-3.5 h-[2.5px] w-14 sm:w-20 rounded-full bg-gradient-to-r from-transparent via-[#d97706] to-transparent" />

          {/* INVITATION LINE */}
          <p className="mx-auto mt-2.5 sm:mt-3 max-w-md text-sm sm:text-base md:text-lg font-medium leading-relaxed text-[#78350f]">
            {inviteLine}
          </p>

          {/* STATIC AARTI TIMETABLE BADGE */}
          <div className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-950/10 px-3.5 py-1.5 backdrop-blur-md shadow-sm sm:gap-3 sm:px-5 sm:py-2">
            <span className="text-sm sm:text-base">🪔</span>
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 text-xs sm:text-sm font-semibold text-[#5c1d0a]">
              <span>दैनिक आरती:</span>
              <span className="text-[#872e0a]">
                सकाळी ८:०० | संध्याकाळी ७:३०
              </span>
            </div>

          </div>
           {/* MANDAL NAME - MOBILE FIRST SCALING TO PREVENT AWKWARD BREAKS */}
          <h1 className="mt-5 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.22] text-[#4a1005] tracking-normal break-words drop-shadow-sm">
            {mandalName}
          </h1>
        </div>

        {/* ===================================================
            GANAPATI MURTI WITH SUBTLE PULSATING GOLDEN HALO
        ==================================================== */}
        <div className="relative mt-4 sm:mt-5 flex items-center justify-center">
          {/* Subtle Ambient Light (Warm Pulsating Golden Halo) */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[220px] w-[220px] sm:h-[280px] sm:w-[280px] md:h-[340px] md:w-[340px] rounded-full bg-gradient-to-r from-amber-400/25 via-yellow-400/35 to-orange-400/25 blur-3xl animate-divine-halo"
            aria-hidden="true"
          />

          {/* Inner Golden Ring Halo */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[170px] w-[170px] sm:h-[210px] sm:w-[210px] md:h-[250px] md:w-[250px] rounded-full border border-amber-400/20 bg-amber-200/5 blur-sm"
            aria-hidden="true"
          />

          {/* Floating Idol */}
          <motion.div
            className="relative z-10 w-[230px] sm:w-[260px] md:w-[310px] lg:w-[340px]"
            animate={{
              y: [0, -9, 0],
            }}
            transition={{
              duration: 4.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >

          </motion.div>
        </div>

        {/* ===================================================
            COCONUT BREAK
        ==================================================== */}
        <div className="relative z-20 mt-120 flex flex-col items-center justify-center sm:mt-2 md:mt-3">
          <CoconutBreak
            size={105}
            upwardDistance={55}
            downwardDistance={45}
          />

          <motion.p
            initial={{
              opacity: 0,
              y: 8,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="-mt-1 max-w-[230px] text-center text-xs font-medium leading-relaxed text-[#78350f] sm:text-sm"
          >
            नारळ धरून वर उचला आणि परत खाली आणून फोडा 🥥
          </motion.p>
        </div>
      </div>

      {/* =====================================================
          AUDIO
      ====================================================== */}
      <audio
        ref={audioRef}
        src="/audio/bhajan.mp3"
        preload="none"
        loop
      />
    </section>
  );
}