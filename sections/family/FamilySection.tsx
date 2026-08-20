"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import FamilyCard from "@/components/family/FamilyCard";
import { familyMembers } from "./familyData";

const AUTOPLAY_DELAY = 3000;

export default function FamilySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  const totalMembers = familyMembers.length;

  /* ---------------------------------------------------------
     SAFE SLIDE INDEX
  --------------------------------------------------------- */

  const goToSlide = useCallback(
    (index: number) => {
      if (totalMembers === 0) return;

      const nextIndex =
        ((index % totalMembers) + totalMembers) %
        totalMembers;

      setActiveIndex(nextIndex);
    },
    [totalMembers]
  );

  /* ---------------------------------------------------------
     NEXT / PREVIOUS
  --------------------------------------------------------- */

  const nextSlide = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  const previousSlide = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  /* ---------------------------------------------------------
     AUTOPLAY
  --------------------------------------------------------- */

  useEffect(() => {
    if (totalMembers <= 1 || isPaused) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((previous) =>
        previous === totalMembers - 1
          ? 0
          : previous + 1
      );
    }, AUTOPLAY_DELAY);

    return () => {
      window.clearTimeout(timer);
    };
  }, [activeIndex, isPaused, totalMembers]);

  /* ---------------------------------------------------------
     KEYBOARD NAVIGATION
  --------------------------------------------------------- */

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previousSlide();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      nextSlide();
    }

    if (event.key === "Home") {
      event.preventDefault();
      goToSlide(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      goToSlide(totalMembers - 1);
    }
  };

  /* ---------------------------------------------------------
     TOUCH / SWIPE
  --------------------------------------------------------- */

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: {
      offset: { x: number };
      velocity: { x: number };
    }
  ) => {
    const swipeDistance = Math.abs(info.offset.x);
    const swipeVelocity = Math.abs(info.velocity.x);

    if (
      swipeDistance > 60 ||
      swipeVelocity > 500
    ) {
      if (info.offset.x < 0) {
        nextSlide();
      } else {
        previousSlide();
      }
    }
  };

  /* ---------------------------------------------------------
     EMPTY STATE
  --------------------------------------------------------- */

  if (totalMembers === 0) {
    return null;
  }

  return (
    <section
      className="
        relative
        min-h-screen
        overflow-hidden
        py-14
        sm:py-16
        md:py-20
      "
      aria-label="देशपांडे परिवार"
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 -z-20">
        <div
          className="
            absolute
            inset-0
            bg-cover
            bg-center
            bg-no-repeat
          "
          style={{
            backgroundImage:
              'url("/images/backgrounds/FamilySection.webp")',
          }}
        />

        {/* Readability overlay */}
        <div className="absolute inset-0 bg-black/[0.04]" />

        {/* Warm center glow */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(
              circle_at_50%_45%,
              rgba(255,180,70,0.10),
              transparent_58%
            )]
          "
        />
      </div>

      {/* =====================================================
          DECORATIVE TOP GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-40
          w-72
          -translate-x-1/2
          rounded-full
          bg-amber-400/5
          blur-3xl
        "
      />

      {/* =====================================================
          LEFT FLOWER GARLAND
      ====================================================== */}

      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                x: -80,
              }
        }
        whileInView={
          shouldReduceMotion
            ? undefined
            : {
                opacity: 1,
                x: 0,
              }
        }
        viewport={{ once: true }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className="
          pointer-events-none
          absolute
          left-[-12px]
          top-[180px]
          z-10
          w-[125px]
          sm:left-[-35px]
          sm:top-[190px]
          sm:w-[160px]
          md:left-[-20px]
          md:top-[180px]
          md:w-[210px]
          lg:left-0
          lg:w-[250px]
        "
      >
        <motion.img
          src="/images/decorations/flower-garland-left.webp"
          alt=""
          aria-hidden="true"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, 8, 0],
                }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            h-auto
            w-full
            object-contain
            drop-shadow-[0_8px_20px_rgba(0,0,0,0.25)]
          "
        />
      </motion.div>

      {/* =====================================================
          RIGHT FLOWER GARLAND
      ====================================================== */}

      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                x: 80,
              }
        }
        whileInView={
          shouldReduceMotion
            ? undefined
            : {
                opacity: 1,
                x: 0,
              }
        }
        viewport={{ once: true }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className="
          pointer-events-none
          absolute
          right-[-12px]
          top-[180px]
          z-10
          w-[125px]
          sm:right-[-35px]
          sm:top-[190px]
          sm:w-[160px]
          md:right-[-20px]
          md:top-[180px]
          md:w-[210px]
          lg:right-0
          lg:w-[250px]
        "
      >
        <motion.img
          src="/images/decorations/flower-garland-right.webp"
          alt=""
          aria-hidden="true"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -8, 0],
                }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            h-auto
            w-full
            object-contain
            drop-shadow-[0_8px_20px_rgba(0,0,0,0.25)]
          "
        />
      </motion.div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-20
          mx-auto
          flex
          min-h-[720px]
          w-full
          max-w-md
          flex-col
          items-center
          px-4
        "
      >
        {/* ===================================================
            HEADER
        ==================================================== */}

        <header className="mb-8 w-full text-center sm:mb-10">
          <motion.p
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: -10,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="
              mb-2
              text-xs
              font-semibold
              tracking-[0.2em]
              text-amber-200
              sm:text-sm
            "
          >
            ॥ आयोजक ॥
          </motion.p>

          <motion.h2
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.05,
            }}
            className="
              text-3xl
              font-bold
              tracking-wide
              text-amber-50
              drop-shadow-[0_3px_8px_rgba(0,0,0,0.45)]
              sm:text-4xl
            "
          >
            देशपांडे परिवार
          </motion.h2>

          {/* Decorative divider */}

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    scaleX: 0.5,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    scaleX: 1,
                  }
            }
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.15,
            }}
            className="
              mx-auto
              mt-3
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <span className="h-px w-10 bg-amber-300/70" />

            <span className="text-xs text-amber-300">
              ✦
            </span>

            <span className="h-px w-10 bg-amber-300/70" />
          </motion.div>

          <motion.p
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 8,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="
              mx-auto
              mt-3
              max-w-xs
              text-xs
              leading-5
              text-amber-100/90
              sm:text-sm
            "
          >
            गणेशोत्सवाच्या आयोजनात सहभागी कुटुंबीय
          </motion.p>
        </header>

        {/* ===================================================
            CAROUSEL
        ==================================================== */}

        <div
          className="relative w-full max-w-[360px]"
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="देशपांडे परिवार सदस्य"
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <motion.div
            className="
              relative
              h-[390px]
              w-full
              touch-pan-y
              sm:h-[410px]
            "
            drag="x"
            dragConstraints={{
              left: 0,
              right: 0,
            }}
            dragElastic={0.18}
            onDragStart={() =>
              setIsPaused(true)
            }
            onDragEnd={handleDragEnd}
          >
            {familyMembers.map(
              (member, index) => {
                const position =
                  (index -
                    activeIndex +
                    totalMembers) %
                  totalMembers;

                const isActive =
                  position === 0;

                const isNext =
                  position === 1;

                const isPrevious =
                  position ===
                  totalMembers - 1;

                /*
                 * Only render active card
                 * and immediate neighbours.
                 */

                if (
                  !isActive &&
                  !isNext &&
                  !isPrevious
                ) {
                  return null;
                }

                let x = 0;
                let rotate = 0;
                let scale = 0.88;
                let opacity = 0.35;
                let zIndex = 10;

                if (isActive) {
                  x = 0;
                  rotate = 0;
                  scale = 1;
                  opacity = 1;
                  zIndex = 30;
                } else if (isNext) {
                  x = 52;
                  rotate = 8;
                  scale = 0.91;
                  opacity = 0.42;
                  zIndex = 20;
                } else if (isPrevious) {
                  x = -52;
                  rotate = -8;
                  scale = 0.91;
                  opacity = 0.42;
                  zIndex = 20;
                }

                return (
                  <motion.div
                    key={member.id}
                    className="
                      absolute
                      inset-0
                      flex
                      justify-center
                    "
                    style={{
                      zIndex,
                      pointerEvents:
                        isActive
                          ? "auto"
                          : "none",
                    }}
                    initial={false}
                    animate={{
                      x,
                      rotate,
                      scale,
                      opacity,
                    }}
                    transition={
                      shouldReduceMotion
                        ? {
                            duration: 0,
                          }
                        : {
                            type: "spring",
                            stiffness: 260,
                            damping: 24,
                            mass: 0.8,
                          }
                    }
                  >
                    
                    <FamilyCard
                      image={member.image}
                      name={member.name}
                      className="
                        left-1/2
                        -translate-x-1/2
                        transition-shadow
                        duration-500
                      "
                    />
                  </motion.div>
                );
              }
            )}
          </motion.div>
        </div>

        {/* ===================================================
            NAVIGATION
        ==================================================== */}

        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              setIsPaused(true);
              previousSlide();
            }}
            aria-label="मागील कुटुंब सदस्य"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-amber-200/40
              bg-amber-50/95
              text-amber-900
              shadow-[0_5px_20px_rgba(0,0,0,0.25)]
              transition-all
              duration-300
              hover:scale-105
              hover:bg-white
              active:scale-90
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-amber-300
              focus-visible:ring-offset-2
              focus-visible:ring-offset-amber-950
            "
          >
            <ChevronLeft
              size={20}
              strokeWidth={2.2}
            />
          </button>

          <button
            type="button"
            onClick={() => {
              setIsPaused(true);
              nextSlide();
            }}
            aria-label="पुढील कुटुंब सदस्य"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-amber-200/40
              bg-amber-50/95
              text-amber-900
              shadow-[0_5px_20px_rgba(0,0,0,0.25)]
              transition-all
              duration-300
              hover:scale-105
              hover:bg-white
              active:scale-90
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-amber-300
              focus-visible:ring-offset-2
              focus-visible:ring-offset-amber-950
            "
          >
            <ChevronRight
              size={20}
              strokeWidth={2.2}
            />
          </button>
        </div>

        {/* ===================================================
            PAGINATION
        ==================================================== */}

        <div
          className="
            mt-5
            flex
            items-center
            justify-center
            gap-2
          "
          role="tablist"
          aria-label="कुटुंब सदस्य स्लाइड्स"
        >
          {familyMembers.map(
            (member, index) => {
              const isActive =
                index === activeIndex;

              return (
                <button
                  key={member.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`${member.name} पहा`}
                  onClick={() => {
                    setIsPaused(true);
                    goToSlide(index);
                  }}
                  className={`
                    rounded-full
                    transition-all
                    duration-300
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-amber-300

                    ${
                      isActive
                        ? "h-2.5 w-7 bg-amber-300 shadow-[0_0_12px_rgba(252,211,77,0.65)]"
                        : "h-2 w-2 bg-amber-100/55 hover:bg-amber-200"
                    }
                  `}
                />
              );
            }
          )}
        </div>

        {/* ===================================================
            DIVIDER
        ==================================================== */}

        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  scaleX: 0.5,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  scaleX: 1,
                }
          }
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
          }}
          className="
            mt-7
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <div className="h-px w-12 bg-amber-300/60" />

          <span className="text-sm text-amber-300">
            ✦
          </span>

          <div className="h-px w-12 bg-amber-300/60" />
        </motion.div>

        {/* ===================================================
            INVITATION MESSAGE
        ==================================================== */}

        <motion.p
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 10,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.1,
          }}
          className="
            mx-auto
            mt-4
            max-w-xs
            px-3
            text-center
            text-xs
            leading-6
            text-amber-50/95
            drop-shadow-[0_2px_5px_rgba(0,0,0,0.55)]
            sm:max-w-md
            sm:text-sm
          "
        >
          गणरायाच्या आगमन सोहळ्यास आपली
          उपस्थिती हीच आमच्यासाठी आशीर्वाद
          असेल.
        </motion.p>
      </div>
    </section>
  );
}