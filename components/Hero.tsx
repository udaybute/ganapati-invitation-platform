"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Maps to your client's config (from admin panel / Supabase row)
type HeroProps = {
  mandalName: string;
  inviteLine: string;
};

export default function Hero({ mandalName, inviteLine }: HeroProps) {
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* ===== INTRO DOORS ===== */}
      <AnimatePresence>
        {!doorsOpen && (
          <div className="fixed inset-0 z-50 flex">
            <motion.div
              className="w-1/2 h-full relative"
              initial={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
            >
              <Image src="/images/doors/left-door.png" alt="" fill className="object-cover object-right" priority />
            </motion.div>
            <motion.div
              className="w-1/2 h-full relative"
              initial={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
            >
              <Image src="/images/doors/right-door.png" alt="" fill className="object-cover object-left" priority />
            </motion.div>
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 gap-4 text-center px-6">
              <button
                onClick={() => setDoorsOpen(true)}
                className="px-9 py-3 rounded-full border-2 border-amber-400 text-amber-100 tracking-wide"
              >
                दार उघडा · Enter
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ===== BACKGROUND ===== */}
      <picture>
        <source media="(min-width: 768px)" srcSet="/images/backgrounds/hero-background-desktop.webp" />
        <Image
          src="/images/backgrounds/hero-background-mobile.webp"
          alt=""
          fill
          className="object-cover -z-10"
          priority
        />
      </picture>

      {/* ===== TOP GARLAND (swinging) ===== */}
      <div className="flex justify-center pt-4 gap-40">
        <motion.div
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top center" }}
        >
          <Image src="/images/decorations/flower-garland-left.webp" alt="" width={110} height={140} />
        </motion.div>
        <motion.div
          animate={{ rotate: [6, -6, 6] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top center" }}
        >
          <Image src="/images/decorations/flower-garland-right.webp" alt="" width={110} height={140} />
        </motion.div>
      </div>

      {/* ===== TEXT ===== */}
      <div className="text-center mt-6 px-6">
        <p className="text-amber-700 text-sm tracking-widest">॥ श्री गणेशाय नमः ॥</p>
        <h1 className="text-3xl md:text-5xl font-bold text-amber-900 mt-2">{mandalName}</h1>
        <p className="text-amber-800 mt-2">{inviteLine}</p>
      </div>

      {/* ===== FLOATING MURTI ===== */}
      <motion.div
        className="relative w-64 md:w-80 mx-auto mt-6"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
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

      {/* ===== MUSIC TOGGLE ===== */}
      <audio ref={audioRef} src="/audio/bhajan.mp3" loop />
      <div className="flex justify-center mt-8 pb-16">
        <button
          onClick={toggleMusic}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-amber-50/80 border border-amber-400 text-amber-800"
        >
          <span>🎵</span>
          <span>{playing ? "संगीत थांबवा" : "संगीत सुरू करा"}</span>
        </button>
      </div>
    </section>
  );
}
