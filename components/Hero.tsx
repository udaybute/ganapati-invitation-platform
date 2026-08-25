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
    TOP CORNER GARLANDS
====================================================== */}

<div
  className="
    pointer-events-none
    absolute
    inset-x-0
    top-0
    z-20
    overflow-visible
  "
>
  {/* ===================================================
      LEFT CORNER
  ==================================================== */}

  <motion.div
    className="
      absolute
      left-[-25px]
      top-0
      w-[160px]

      sm:left-[-30px]
      sm:w-[190px]

      md:left-[-35px]
      md:w-[220px]

      lg:left-[-40px]
      lg:w-[250px]

      xl:left-[-45px]
      xl:w-[280px]

      origin-top-left
    "
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
      sizes="
        (max-width: 639px) 160px,
        (max-width: 767px) 190px,
        (max-width: 1023px) 220px,
        (max-width: 1279px) 250px,
        280px
      "
      className="
        block
        h-auto
        w-full
        object-contain
        drop-shadow-[0_12px_14px_rgba(0,0,0,0.3)]
      "
    />
  </motion.div>


  {/* ===================================================
      RIGHT CORNER
  ==================================================== */}

  <motion.div
    className="
      absolute
      right-[-25px]
      top-0
      w-[160px]

      sm:right-[-30px]
      sm:w-[190px]

      md:right-[-35px]
      md:w-[220px]

      lg:right-[-40px]
      lg:w-[250px]

      xl:right-[-45px]
      xl:w-[280px]

      origin-top-right
    "
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
      sizes="
        (max-width: 639px) 160px,
        (max-width: 767px) 190px,
        (max-width: 1023px) 220px,
        (max-width: 1279px) 250px,
        280px
      "
      className="
        block
        h-auto
        w-full
        object-contain
        -scale-x-100
        drop-shadow-[0_12px_14px_rgba(0,0,0,0.3)]
      "
    />
  </motion.div>
</div>


     {/* =====================================================
    MAIN HERO CONTENT
    TEXT + MURTI + COCONUT
====================================================== */}

<div
  className="
    relative
    z-10
    mx-auto
    flex
    w-full
    max-w-3xl
    flex-col
    items-center
    text-center

    mt-25

    sm:mt-5

    md:mt-50

    lg:mt-70
  "
>
  {/* ===================================================
      TEXT
  ==================================================== */}

  <div
    className="
      w-full
      px-5
      sm:px-6
    "
  >
    {/* श्री गणेशाय नमः */}

    <p
      className="
        text-xs
        font-medium
        tracking-[0.18em]
        text-amber-700

        sm:text-sm
        sm:tracking-[0.22em]
      "
    >
      ॥ श्री गणेशाय नमः ॥
    </p>


    {/* MANDAL NAME */}

    <h1
      className="
        mt-2
        text-3xl
        font-bold
        leading-[1.2]
        text-amber-900

        sm:text-4xl

        md:mt-3
        md:text-5xl

        lg:text-6xl
      "
    >
      {mandalName}
    </h1>


    {/* DIVIDER */}

    <div
      className="
        mx-auto
        mt-3
        h-[2px]
        w-12
        rounded-full
        bg-amber-400/80

        sm:mt-4
        sm:w-16
      "
    />


    {/* INVITATION */}

    <p
      className="
        mx-auto
        mt-3
        max-w-md
        text-sm
        font-normal
        leading-relaxed
        text-amber-800

        sm:mt-4
        sm:text-base

        md:max-w-xl
        md:text-lg
      "
    >
      {inviteLine}
    </p>
  </div>


  {/* ===================================================
      GANAPATI MURTI
  ==================================================== */}

  <motion.div
    className="
      relative
      mt-3
      w-[240px]

      sm:mt-4
      sm:w-[260px]

      md:mt-5
      md:w-[310px]

      lg:mt-6
      lg:w-[340px]
    "
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      duration: 4.8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Image
      src="/images/ganapati/ganapati-murti.png"
      alt="Ganapati murti"
      width={400}
      height={480}
      priority
      sizes="
        (max-width: 639px) 240px,
        (max-width: 767px) 260px,
        (max-width: 1023px) 310px,
        340px
      "
      className="
        block
        h-auto
        w-full
        object-contain
        drop-shadow-[0_18px_22px_rgba(0,0,0,0.28)]
      "
    />
  </motion.div>


  {/* ===================================================
      COCONUT BREAK
  ==================================================== */}

  <div
    className="
      relative
      z-20
      mt-1
      flex
      flex-col
      items-center
      justify-center

      sm:mt-2

      md:mt-3
    "
  >
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
      className="
        -mt-1
        max-w-[230px]
        text-center
        text-xs
        font-medium
        leading-relaxed
        text-amber-800/90

        sm:text-sm
      "
    >
      नारळ धरून वर उचला आणि परत खाली आणून फोडा 🥥
    </motion.p>
  </div>
</div>


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