"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import CoconutBreak from "./coconut/CoconutBreak";

type HeroProps = {
  mandalName: string;
  inviteLine: string;
};

export default function Hero({
  mandalName,
  inviteLine,
}: HeroProps) {
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

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
      ====================================================== */}

     {/* =====================================================
    INTRO DOORS
====================================================== */}

<AnimatePresence>
  {!doorsOpen && (
    <motion.div
      className="
        fixed
        inset-0
        z-50
        cursor-pointer
        bg-[#241005]
      "
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: {
          delay: 1.15,
          duration: 0.25,
        },
      }}
      onClick={() => setDoorsOpen(true)}
    >
      {/* =================================================
          MOBILE DOORS
          < md
      ================================================== */}

      <div className="flex h-full w-full md:hidden">
        {/* LEFT */}

        <motion.div
          className="
            relative
            h-full
            w-1/2
            overflow-hidden
          "
          initial={{ x: 0 }}
          exit={{
            x: "-100%",
          }}
          transition={{
            duration: 1.3,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <Image
            src="/images/doors/left-door.png"
            alt=""
            fill
            priority
            className="object-cover object-right"
          />
        </motion.div>

        {/* RIGHT */}

        <motion.div
          className="
            relative
            h-full
            w-1/2
            overflow-hidden
          "
          initial={{ x: 0 }}
          exit={{
            x: "100%",
          }}
          transition={{
            duration: 1.3,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <Image
            src="/images/doors/right-door.png"
            alt=""
            fill
            priority
            className="object-cover object-left"
          />
        </motion.div>
      </div>

      {/* =================================================
          TABLET + DESKTOP DOORS
          md and above
      ================================================== */}

      <div className="hidden h-full w-full md:flex">
        {/* LEFT DESKTOP DOOR */}

        <motion.div
          className="
            relative
            h-full
            w-1/2
            overflow-hidden
          "
          initial={{ x: 0 }}
          exit={{
            x: "-100%",
          }}
          transition={{
            duration: 1.4,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <Image
            src="/images/doors/desktop-left-door.png"
            alt=""
            fill
            priority
            sizes="50vw"
            className="
              object-cover
              object-right
            "
          />
        </motion.div>

        {/* RIGHT DESKTOP DOOR */}

        <motion.div
          className="
            relative
            h-full
            w-1/2
            overflow-hidden
          "
          initial={{ x: 0 }}
          exit={{
            x: "100%",
          }}
          transition={{
            duration: 1.4,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <Image
            src="/images/doors/desktop-right-door.png"
            alt=""
            fill
            priority
            sizes="50vw"
            className="
              object-cover
              object-left
            "
          />
        </motion.div>
      </div>

      {/* =================================================
          CENTER CLICK AREA
          No visible text
      ================================================== */}

      <motion.button
        type="button"
        aria-label="उत्सवाचे दार उघडा"
        onClick={(event) => {
          event.stopPropagation();
          setDoorsOpen(true);
        }}
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 0.5,
          duration: 0.6,
          ease: "easeOut",
        }}
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.94,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          z-30
          h-28
          w-28
          -translate-x-1/2
          -translate-y-1/2
          cursor-pointer
          rounded-full
          border
          border-amber-300/40
          bg-amber-100/[0.04]
          shadow-[0_0_50px_rgba(251,191,36,0.12)]
          backdrop-blur-[1px]
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-amber-300
          sm:h-32
          sm:w-32
        "
      >
        {/* Outer pulse */}

        <motion.span
          aria-hidden="true"
          className="
            absolute
            inset-0
            rounded-full
            border
            border-amber-300/30
          "
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />

        {/* Inner glow */}

        <motion.span
          aria-hidden="true"
          className="
            absolute
            inset-[28%]
            rounded-full
            bg-amber-300/10
            blur-xl
          "
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Center light */}

        <span
          aria-hidden="true"
          className="
            absolute
            left-1/2
            top-1/2
            h-2
            w-2
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-amber-200
            shadow-[0_0_18px_rgba(253,230,138,0.9)]
          "
        />
      </motion.button>
    </motion.div>
  )}
</AnimatePresence>

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <picture>
        <source
          media="(min-width: 768px)"
          srcSet="/images/backgrounds/hero-background-desktop.webp"
        />

        <Image
          src="/images/backgrounds/hero-background-mobile.webp"
          alt=""
          fill
          priority
          className="-z-10 object-cover"
        />
      </picture>

      {/* =====================================================
          TOP GARLAND
      ====================================================== */}

      <div
        className="
          flex
          justify-center
          gap-16
          pt-4
          sm:gap-28
          md:gap-40
        "
      >
        <motion.div
          animate={{
            rotate: [-6, 6, -6],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transformOrigin: "top center",
          }}
        >
          <Image
            src="/images/decorations/hero-garland.png"
            alt=""
            width={210}
            height={240}
          />
        </motion.div>

        <motion.div
          animate={{
            rotate: [6, -6, 6],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transformOrigin: "top center",
          }}
        >
          <Image
            src="/images/decorations/hero-garland.png"
            alt=""
            width={210}
            height={240}
          />
        </motion.div>
      </div>

      {/* =====================================================
          TEXT
      ====================================================== */}

      <div className="mt-6 px-6 text-center">
        <p className="text-sm tracking-widest text-amber-700">
          ॥ श्री गणेशाय नमः ॥
        </p>

        <h1 className="mt-2 text-3xl font-bold text-amber-900 md:text-5xl">
          {mandalName}
        </h1>

        <p className="mt-2 text-amber-800">
          {inviteLine}
        </p>
      </div>

      {/* =====================================================
          FLOATING MURTI
      ====================================================== */}

      <motion.div
        className="
          relative
          mx-auto
          mt-6
          w-64
          md:w-80
        "
        animate={{
          y: [0, -14, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/images/ganapati/ganapati-murti.png"
          alt="Ganapati murti"
          width={400}
          height={480}
          className="drop-shadow-2xl"
          priority
        />
      </motion.div>

      {/* =====================================================
          MUSIC
      ====================================================== */}

      <audio
        ref={audioRef}
        src="/audio/bhajan.mp3"
        loop
      />

      <div className="mt-8 flex justify-center pb-16">
        <button
          type="button"
          onClick={toggleMusic}
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-amber-400
            bg-amber-50/80
            px-6
            py-3
            text-amber-800
            backdrop-blur-sm
          "
        >
          <span>🎵</span>

          <span>
            {playing
              ? "संगीत थांबवा"
              : "संगीत सुरू करा"}
          </span>
        </button>
      </div>
    </section>
  );
}