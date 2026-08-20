"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

import TempleBell from "../bells/TempleBell";
import OmSymbol from "../symbols/OmSymbol";
import { useMusic } from "@/components/contexts/MusicContext";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  const murtiRef = useRef<HTMLDivElement>(null);

  const glowRef = useRef<HTMLDivElement>(null);

  const haloRef = useRef<HTMLDivElement>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const { isPlaying, toggleMusic } = useMusic();

  useGSAP(
    () => {
      const timeline = gsap.timeline();

      timeline
        .from(titleRef.current, {
          opacity: 0,
          y: -80,
          duration: 1,
          ease: "back.out(1.7)",
        })
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: -60,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          murtiRef.current,
          {
            opacity: 0,
            y: 300,
            scale: 0.7,
            duration: 1.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          buttonRef.current,
          {
            opacity: 0,
            scale: 0,
            duration: 0.6,
          },
          "-=0.8"
        );

      gsap.to(murtiRef.current, {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.8,
      });

      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.7,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(haloRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });
    },
    {
      scope: containerRef,
    }
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Desktop background */}

      <Image
        src="/images/backgrounds/hero-background-desktop.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden object-cover md:block"
      />

      {/* Mobile background */}

      <Image
        src="/images/backgrounds/hero-background-mobile.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover md:hidden"
      />

      <OmSymbol />

      <TempleBell position="left" />

      <TempleBell position="right" />

      <div className="absolute inset-0 bg-black/5" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="mb-2 flex flex-col items-center">
          <p className="mb-1 text-sm font-semibold tracking-wider text-amber-700 sm:text-base md:text-lg">
            ॥ श्री गणेशाय नमः ॥
          </p>

          <h1
            ref={titleRef}
            className="text-3xl font-extrabold leading-tight text-amber-900 sm:text-4xl md:text-5xl"
          >
            बाप्पाचे आगमन
          </h1>

          <h2
            ref={subtitleRef}
            className="mt-2 text-base font-medium text-amber-800 sm:text-lg md:text-xl"
          >
            आपणास सस्नेह निमंत्रण!
          </h2>
        </div>

        <div
          ref={murtiRef}
          className="relative mb-6 h-[320px] w-[240px] sm:h-[420px] sm:w-[320px] md:h-[550px] md:w-[420px]"
        >
          <div
            ref={glowRef}
            className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300/40 blur-3xl"
          />

          <div
            ref={haloRef}
            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-300/20"
          />

          <Image
            src="/images/ganapati/ganapati-murti.png"
            alt="Ganapati Murti"
            fill
            priority
            className="object-contain"
          />
        </div>

        <button
          ref={buttonRef}
          className="rounded-full bg-amber-700 px-8 py-3 font-medium text-white transition-transform hover:scale-105"
        >
          दर्शन घ्या
        </button>

        <button
          onClick={toggleMusic}
          className="
            mt-4
            rounded-full
            border
            border-amber-300
            bg-white/20
            px-8
            py-3
            text-white
            backdrop-blur-md
            transition-all
            duration-300
            hover:scale-105
          "
        >
          {isPlaying
            ? "🔊 संगीत बंद करा"
            : "🎵 संगीत सुरू करा"}
        </button>
      </div>
    </section>
  );
}