"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type MurtiCarouselProps = {
  mandalName: string;
  establishedYear: string;
  photos: string[]; // Supabase Storage URLs
};

export default function MurtiCarousel({
  mandalName,
  establishedYear,
  photos,
}: MurtiCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);

  const total = photos.length;

  // =====================================================
  // CHANGE SLIDE
  // =====================================================

  const changeSlide = useCallback(
    (direction: "next" | "previous") => {
      if (total <= 1 || isShuffling) return;

      setIsShuffling(true);

      window.setTimeout(() => {
        setActiveIndex((prev) => {
          if (direction === "next") {
            return prev === total - 1 ? 0 : prev + 1;
          }

          return prev === 0 ? total - 1 : prev - 1;
        });

        window.setTimeout(() => {
          setIsShuffling(false);
        }, 650);
      }, 180);
    },
    [isShuffling, total]
  );

  const goNext = useCallback(() => {
    changeSlide("next");
  }, [changeSlide]);

  const goPrevious = useCallback(() => {
    changeSlide("previous");
  }, [changeSlide]);

  // =====================================================
  // AUTO SLIDESHOW
  // =====================================================

  useEffect(() => {
    if (total <= 1) return;

    const interval = window.setInterval(() => {
      changeSlide("next");
    }, 3000);

    return () => {
      window.clearInterval(interval);
    };
  }, [changeSlide, total]);

  // =====================================================
  // NO PHOTOS
  // =====================================================

  if (total === 0) {
    return null;
  }

  return (
    <section
      className="
        relative
        min-h-[720px]
        overflow-hidden
        py-14

        sm:min-h-[760px]
        sm:py-16

        lg:min-h-[850px]
        lg:py-20
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 z-0">
        <Image
          src="/images/backgrounds/festival-background.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />

        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* =====================================================
          LEFT GARLAND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-0
          top-[110px]
          z-20
          w-[115px]

          sm:w-[165px]

          md:w-[210px]

          lg:top-[125px]
          lg:w-[250px]

          xl:w-[290px]
        "
      >
        <div className="garland-swing-left">
          <Image
            src="/images/decorations/flower-garland-left.webp"
            alt=""
            width={600}
            height={900}
            sizes="
              (max-width: 639px) 115px,
              (max-width: 767px) 165px,
              (max-width: 1023px) 210px,
              (max-width: 1279px) 250px,
              290px
            "
            className="block h-auto w-full object-contain"
          />
        </div>
      </div>

      {/* =====================================================
          RIGHT GARLAND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-[110px]
          z-20
          w-[115px]

          sm:w-[165px]

          md:w-[210px]

          lg:top-[125px]
          lg:w-[250px]

          xl:w-[290px]
        "
      >
        <div className="garland-swing-right">
          <Image
            src="/images/decorations/flower-garland-right.webp"
            alt=""
            width={600}
            height={900}
            sizes="
              (max-width: 639px) 115px,
              (max-width: 767px) 165px,
              (max-width: 1023px) 210px,
              (max-width: 1279px) 250px,
              290px
            "
            className="block h-auto w-full object-contain"
          />
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-30
          mx-auto
          flex
          max-w-6xl
          flex-col
          items-center
          px-5
        "
      >
       {/* =====================================================
    HEADING
====================================================== */}

<motion.div
  initial={{ opacity: 0, y: -18 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.4 }}
  transition={{
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="relative z-30 text-center"
>
  {/* Small decorative glow */}
  <motion.div
    className="
      pointer-events-none
      absolute
      left-1/2
      top-1/2
      -z-10
      h-20
      w-64
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      bg-amber-300/20
      blur-3xl
    "
    animate={{
      opacity: [0.25, 0.5, 0.25],
      scale: [0.95, 1.08, 0.95],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />

  {/* श्री गणेशाय नमः */}

  <motion.p
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.7,
      delay: 0.1,
    }}
    className="
      text-[15px]
      mt-[-40px]
      font-semibold
      tracking-[0.16em]
      text-[#6b2b12]
      drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]

      sm:text-xs
      sm:tracking-[0.2em]
    "
  >
    ॥ श्री गणेशाय नमः ॥
  </motion.p>


  {/* MANDAL NAME */}

  <motion.h2
    initial={{
      opacity: 0,
      y: 18,
      scale: 0.96,
    }}
    whileInView={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    viewport={{
      once: true,
      amount: 0.4,
    }}
    transition={{
      duration: 0.85,
      delay: 0.18,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      
      text-center
      text-[40px]
      font-bold
      leading-tight
      text-[#4a1c0b]

      drop-shadow-[0_2px_2px_rgba(255,255,255,0.9)]
      drop-shadow-[0_4px_8px_rgba(70,25,5,0.28)]

      sm:text-3xl

      md:text-4xl
    "
  >
    {mandalName}
  </motion.h2>


  {/* DECORATIVE LINE */}

  <motion.div
    initial={{
      opacity: 0,
      scaleX: 0,
    }}
    whileInView={{
      opacity: 1,
      scaleX: 1,
    }}
    viewport={{
      once: true,
    }}
    transition={{
      duration: 0.7,
      delay: 0.35,
      ease: "easeOut",
    }}
    className="
      mx-auto
      mt-2
      h-[2px]
      w-12
      origin-center
      rounded-full
      bg-[#b56a18]

      shadow-[0_2px_6px_rgba(120,60,10,0.3)]

      sm:w-16
    "
  />


  {/* INVITATION TEXT */}

  <motion.p
    initial={{
      opacity: 0,
      y: 12,
    }}
    whileInView={{
      opacity: 1,
      y: 0,
    }}
    viewport={{
      once: true,
    }}
    transition={{
      duration: 0.7,
      delay: 0.45,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      mt-2
      text-center
      text-[10px]
      font-semibold
      leading-relaxed
      text-[#6b3217]

      drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]
      drop-shadow-[0_2px_5px_rgba(80,30,5,0.22)]

      sm:text-xs
    "
  >
    गणेशोत्सवाच्या मंगलमय सोहळ्यात
    <br />
    आपले हार्दिक स्वागत
  </motion.p>
</motion.div>

        {/* ===================================================
            CAROUSEL
        ==================================================== */}

        <div
          className="
            relative
            mt-8
            w-full

            sm:mt-10
          "
        >
          <div
            className="
              relative
              mx-auto
              h-[430px]
              w-full
              overflow-hidden

              sm:h-[515px]

              md:h-[560px]
            "
          >
            {photos.map((photo, index) => {
              let offset = index - activeIndex;

              if (offset > total / 2) {
                offset -= total;
              }

              if (offset < -total / 2) {
                offset += total;
              }

              const isVisible = Math.abs(offset) <= 1;
              const isActive = offset === 0;

              /*
               * Mobile side spacing.
               * Desktop CSS transforms are adjusted below.
               */
              const mobileDistance = 165;

              return (
                <div
                  key={`${photo}-${index}`}
                  className="
                    absolute
                    left-1/2
                    top-0
                    flex
                    justify-center
                    will-change-transform
                    transition-all
                    duration-[800ms]
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                  "
                  style={{
                    zIndex: isActive ? 20 : 10,

                    opacity: isVisible
                      ? isActive
                        ? 1
                        : 0.58
                      : 0,

                    transform: `
                      translateX(
                        calc(-50% + ${offset * mobileDistance}px)
                      )
                      scale(${isActive ? 1 : 0.82})
                      rotateY(${offset * -4}deg)
                    `,

                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  {/* =================================================
                      PHOTO CARD
                  ================================================== */}

                  <div
                    className="
                      relative
                      h-[400px]
                      w-[300px]
                      overflow-hidden
                      rounded-[28px]
                      bg-[var(--color-ivory)]
                      shadow-[0_18px_45px_rgba(30,10,0,0.38)]

                      sm:h-[430px]
                      sm:w-[420px]

                      md:h-[470px]
                      md:w-[520px]

                      lg:h-[500px]
                      lg:w-[560px]
                    "
                  >
                    <div className="relative h-full w-full overflow-hidden">
                      {/* =================================================
                          SUPABASE IMAGE

                          IMPORTANT:
                          Do NOT use next/image here.

                          Supabase Storage URL goes directly
                          from browser to Supabase.
                      ================================================== */}

                      <img
                        src={photo}
                        alt=""
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        className="
                          absolute
                          inset-0
                          h-full
                          w-full
                          object-cover
                          object-center
                        "
                      />

                      {/* PHOTO GRADIENT */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/25
                          via-transparent
                          to-transparent
                        "
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ===================================================
              CONTROLS
          ==================================================== */}

          {total > 1 && (
            <div
              className="
                relative
                z-40
                mt-5
                flex
                items-center
                justify-center
                gap-3

                sm:mt-6
              "
            >
              {/* PREVIOUS */}

              <button
                type="button"
                onClick={goPrevious}
                disabled={isShuffling}
                aria-label="Previous photo"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--color-gold-light)]
                  text-[var(--color-maroon-dark)]
                  shadow-[0_5px_15px_rgba(0,0,0,0.25)]
                  transition-all
                  duration-300

                  hover:scale-110

                  active:scale-95

                  disabled:cursor-not-allowed
                  disabled:opacity-60

                  sm:h-10
                  sm:w-10
                "
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              {/* NEXT */}

              <button
                type="button"
                onClick={goNext}
                disabled={isShuffling}
                aria-label="Next photo"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--color-gold-light)]
                  text-[var(--color-maroon-dark)]
                  shadow-[0_5px_15px_rgba(0,0,0,0.25)]
                  transition-all
                  duration-300

                  hover:scale-110

                  active:scale-95

                  disabled:cursor-not-allowed
                  disabled:opacity-60

                  sm:h-10
                  sm:w-10
                "
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          BOTTOM CURVE
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          z-10
          h-[65px]
          w-full
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            -bottom-[48px]
            left-1/2
            h-[95px]
            w-[120%]
            -translate-x-1/2
            rounded-[50%_50%_0_0]
            bg-[var(--color-ivory)]
          "
        />
      </div>
    </section>
  );
}