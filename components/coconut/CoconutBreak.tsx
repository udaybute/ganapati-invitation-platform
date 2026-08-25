"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

/* =========================================================
   TYPES
========================================================= */

export type CoconutBreakHandle = {
  reset: () => void;
};

type CoconutBreakProps = {
  size?: number;
  className?: string;

  /**
   * Minimum upward movement required
   * before the coconut can break.
   */
  upwardDistance?: number;

  /**
   * Minimum downward movement required
   * after reaching the top.
   */
  downwardDistance?: number;

  /**
   * Called after the coconut breaks.
   */
  onBreak?: () => void;
};

/* =========================================================
   PARTICLES
========================================================= */

const particles = [
  {
    x: -48,
    y: -48,
    rotate: -20,
    size: 5,
    delay: 0,
  },
  {
    x: 42,
    y: -55,
    rotate: 18,
    size: 4,
    delay: 0.02,
  },
  {
    x: -68,
    y: -10,
    rotate: -12,
    size: 3,
    delay: 0.04,
  },
  {
    x: 65,
    y: 5,
    rotate: 15,
    size: 5,
    delay: 0.06,
  },
  {
    x: -50,
    y: 35,
    rotate: -18,
    size: 4,
    delay: 0.08,
  },
  {
    x: 50,
    y: 40,
    rotate: 20,
    size: 3,
    delay: 0.1,
  },
  {
    x: -20,
    y: -72,
    rotate: -8,
    size: 4,
    delay: 0.12,
  },
  {
    x: 22,
    y: -70,
    rotate: 10,
    size: 3,
    delay: 0.14,
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const CoconutBreak = forwardRef<
  CoconutBreakHandle,
  CoconutBreakProps
>(function CoconutBreak(
  {
    size = 280,
    className = "",
    upwardDistance = 100,
    downwardDistance = 80,
    onBreak,
  },
  ref
) {
  /* =======================================================
     STATE
  ======================================================= */

  const [broken, setBroken] = useState(false);

  const [isHolding, setIsHolding] = useState(false);

  const [hasReachedTop, setHasReachedTop] =
    useState(false);

  const [showImpact, setShowImpact] =
    useState(false);

  const [showMessage, setShowMessage] =
    useState(false);

  const [dragProgress, setDragProgress] =
    useState(0);

  /* =======================================================
     REFS
  ======================================================= */

  const highestPosition = useRef(0);

  const hasTriggeredBreak = useRef(false);

  /* =======================================================
     MOTION VALUES
  ======================================================= */

  const dragY = useMotionValue(0);

  /*
   * Convert drag movement into a subtle rotation.
   */

  const dragRotate = useTransform(
    dragY,
    [-140, 0, 140],
    [-5, 0, 5]
  );

  /*
   * Slight scale while dragging.
   */

  const dragScale = useTransform(
    dragY,
    [-140, 0, 140],
    [0.97, 1, 0.97]
  );

  /* =======================================================
     RESET
  ======================================================= */

  const reset = useCallback(() => {
    setBroken(false);
    setIsHolding(false);
    setHasReachedTop(false);
    setShowImpact(false);
    setShowMessage(false);
    setDragProgress(0);

    highestPosition.current = 0;
    hasTriggeredBreak.current = false;

    dragY.set(0);
  }, [dragY]);

  useEffect(() => {
  if (!broken) return;

  const timer = window.setTimeout(() => {
    reset();
  }, 3000);

  return () => {
    window.clearTimeout(timer);
  };
}, [broken, reset]);

  useImperativeHandle(
    ref,
    () => ({
      reset,
    }),
    [reset]
  );

  /* =======================================================
     BREAK FUNCTION
  ======================================================= */

  const breakCoconut = useCallback(() => {
    if (hasTriggeredBreak.current) return;

    hasTriggeredBreak.current = true;

    setIsHolding(false);

    /*
     * Tiny impact before actual split.
     */

    setShowImpact(true);

    window.setTimeout(() => {
      setBroken(true);
      setShowImpact(false);

      onBreak?.();

      /*
       * Show devotional message after
       * the pieces start moving.
       */

      window.setTimeout(() => {
        setShowMessage(true);
      }, 650);
    }, 120);
  }, [onBreak]);

  /* =======================================================
     DRAG START
  ======================================================= */

  const handleDragStart = () => {
    if (broken) return;

    setIsHolding(true);

    setShowMessage(false);

    /*
     * Reset current gesture progress.
     */

    highestPosition.current = 0;

    setHasReachedTop(false);

    setDragProgress(0);
  };

  /* =======================================================
     DRAG
  ======================================================= */

  const handleDrag = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: {
      offset: {
        x: number;
        y: number;
      };
    }
  ) => {
    if (broken) return;

    const currentY = info.offset.y;

    /*
     * UPWARD MOVEMENT
     *
     * Negative Y means user is dragging upward.
     */

    if (currentY < 0) {
      const upwardAmount = Math.abs(currentY);

      /*
       * Store the highest point reached.
       */

      highestPosition.current = Math.max(
        highestPosition.current,
        upwardAmount
      );

      const progress = Math.min(
        highestPosition.current /
          upwardDistance,
        1
      );

      setDragProgress(progress);

      /*
       * User has reached required top distance.
       */

      if (
        highestPosition.current >=
        upwardDistance
      ) {
        setHasReachedTop(true);
      }

      return;
    }

    /*
     * DOWNWARD MOVEMENT
     */

    if (
      hasReachedTop &&
      currentY > 0
    ) {
      const downwardAmount = currentY;

      /*
       * Break only after:
       *
       * 1. User reached required upward distance
       * 2. User brought coconut down enough
       */

      if (
        downwardAmount >=
        downwardDistance
      ) {
        breakCoconut();
      }
    }
  };

  /* =======================================================
     DRAG END
  ======================================================= */

  const handleDragEnd = () => {
    if (broken) return;

    setIsHolding(false);

    /*
     * If user didn't complete the gesture,
     * smoothly return coconut to original position.
     */

    if (!hasTriggeredBreak.current) {
      dragY.set(0);
      setDragProgress(0);
      setHasReachedTop(false);
      highestPosition.current = 0;
    }
  };

  /* =======================================================
     KEYBOARD SUPPORT
  ======================================================= */

  const handleKeyboard = (
    event: React.KeyboardEvent
  ) => {
    if (broken) return;

    /*
     * Space / Enter gives a simulated
     * devotional interaction.
     *
     * Actual mobile users will use drag.
     */

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();

      breakCoconut();
    }
  };

  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      /*
       * No external timers to clean here.
       * Kept intentionally simple for reusable component.
       */
    };
  }, []);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      {/* ===================================================
          AMBIENT GLOW
      ================================================== */}

      <AnimatePresence>
        {!broken && (
          <motion.div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-[15%]
              rounded-full
              bg-amber-400/10
              blur-3xl
            "
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: [0.2, 0.45, 0.2],
              scale: [0.96, 1.04, 0.96],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </AnimatePresence>

      {/* ===================================================
          FULL COCONUT
      ================================================== */}

      <AnimatePresence>
        {!broken && (
          <motion.div
            className="
              absolute
              inset-0
              z-30
              flex
              items-center
              justify-center
            "
            style={{
              y: dragY,
              rotate: dragRotate,
              scale: dragScale,
            }}
          >
            <motion.button
              type="button"
              aria-label="नारळ वर घेऊन खाली आणा"
              onKeyDown={handleKeyboard}
              drag="y"
              dragConstraints={{
                top: -size * 0.65,
                bottom: size * 0.65,
              }}
              dragElastic={0.12}
              dragMomentum={false}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              className="
                relative
                h-full
                w-full
                cursor-grab
                touch-none
                rounded-full
                border-0
                bg-transparent
                p-0
                outline-none
                active:cursor-grabbing
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-amber-400
                focus-visible:ring-offset-2
              "
              initial={{
                opacity: 0,
                scale: 0.88,
              }}
              animate={{
                opacity: 1,
                scale: isHolding
                  ? 0.97
                  : 1,
                y: isHolding
                  ? -2
                  : [0, -3, 0],
              }}
              transition={{
                opacity: {
                  duration: 0.45,
                },
                scale: {
                  duration: 0.15,
                },
                y: isHolding
                  ? {
                      duration: 0.15,
                    }
                  : {
                      duration: 2.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
              }}
            >
              <Image
                src="/images/decorations/coconut.png"
                alt="नारळ"
                fill
                priority
                sizes={`${size}px`}
                draggable={false}
                className="
                  select-none
                  object-contain
                  drop-shadow-[0_18px_24px_rgba(60,30,10,0.28)]
                "
              />

              {/* =========================================
                  HOLD GLOW
              ========================================== */}

              <AnimatePresence>
                {isHolding && (
                  <motion.div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-[15%]
                      rounded-full
                      border
                      border-amber-300/50
                      bg-amber-300/5
                      blur-[1px]
                    "
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: [
                        0.2,
                        0.7,
                        0.2,
                      ],
                      scale: [
                        0.95,
                        1.05,
                        0.95,
                      ],
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================
          DRAG PROGRESS
      ================================================== */}

      <AnimatePresence>
        {!broken && isHolding && (
          <motion.div
            className="
              pointer-events-none
              absolute
              bottom-[-8px]
              left-1/2
              z-50
              flex
              -translate-x-1/2
              flex-col
              items-center
            "
            initial={{
              opacity: 0,
              y: 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <div
              className="
                h-1
                w-20
                overflow-hidden
                rounded-full
                bg-amber-900/10
              "
            >
              <motion.div
                className="
                  h-full
                  rounded-full
                  bg-amber-500
                "
                style={{
                  width: `${dragProgress * 100}%`,
                }}
              />
            </div>

            <span className="mt-2 text-[10px] font-medium text-amber-800/70">
              {hasReachedTop
                ? "आता खाली आणा"
                : "वर घ्या"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================
          IMPACT FLASH
      ================================================== */}

      <AnimatePresence>
        {showImpact && (
          <>
            <motion.div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                z-[60]
                h-5
                w-5
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-amber-100
                blur-[2px]
              "
              initial={{
                opacity: 0,
                scale: 0.3,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.3, 3, 5],
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            />

            {/* =========================================
                CRACK LINES
            ========================================== */}

            <motion.div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                z-[61]
                h-[55%]
                w-[2px]
                -translate-x-1/2
                -translate-y-1/2
                origin-center
                rotate-[-8deg]
                rounded-full
                bg-amber-100
              "
              initial={{
                opacity: 0,
                scaleY: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                scaleY: [0, 1, 1.1],
              }}
              transition={{
                duration: 0.25,
              }}
            />

            <motion.div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                z-[61]
                h-[25%]
                w-[2px]
                -translate-x-1/2
                -translate-y-1/2
                origin-top
                rotate-[25deg]
                rounded-full
                bg-amber-100/80
              "
              initial={{
                opacity: 0,
                scaleY: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                scaleY: [0, 1, 1.1],
              }}
              transition={{
                duration: 0.2,
                delay: 0.03,
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* ===================================================
          LEFT COCONUT HALF
      ================================================== */}

      <AnimatePresence>
        {broken && (
          <motion.div
            className="
              pointer-events-none
              absolute
              inset-0
              z-20
            "
            initial={{
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              x: -(size * 0.58),
              y: size * 0.72,
              rotate: -32,
              scale: 0.88,
              opacity: 1,
            }}
            transition={{
              duration: 1.15,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          >
            <Image
              src="/images/decorations/coconut-left.png"
              alt=""
              fill
              sizes={`${size}px`}
              draggable={false}
              className="
                select-none
                object-contain
                drop-shadow-[0_18px_18px_rgba(60,30,10,0.2)]
              "
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================
          RIGHT COCONUT HALF
      ================================================== */}

      <AnimatePresence>
        {broken && (
          <motion.div
            className="
              pointer-events-none
              absolute
              inset-0
              z-20
            "
            initial={{
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              x: size * 0.58,
              y: size * 0.72,
              rotate: 32,
              scale: 0.88,
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          >
            <Image
              src="/images/decorations/coconut-right.png"
              alt=""
              fill
              sizes={`${size}px`}
              draggable={false}
              className="
                select-none
                object-contain
                drop-shadow-[0_18px_18px_rgba(60,30,10,0.2)]
              "
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================
          PARTICLES
      ================================================== */}

      <AnimatePresence>
        {broken &&
          particles.map((particle, index) => (
            <motion.span
              key={index}
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                z-[70]
                rounded-full
                bg-amber-300
              "
              style={{
                width: particle.size,
                height: particle.size,
              }}
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: particle.x,
                y: particle.y,
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: particle.rotate,
              }}
              transition={{
                duration: 0.6,
                delay: particle.delay,
                ease: "easeOut",
              }}
            />
          ))}
      </AnimatePresence>

      {/* ===================================================
          DEVOTIONAL MESSAGE
      ================================================== */}

      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[108%]
              z-[80]
              w-max
              -translate-x-1/2
              text-center
            "
            initial={{
              opacity: 0,
              y: 12,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="text-sm font-semibold tracking-wide text-amber-900">
              श्री गणेशाय नमः 🙏
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default CoconutBreak;