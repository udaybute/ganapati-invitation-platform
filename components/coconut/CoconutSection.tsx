"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CoconutSection() {
  const [isBroken, setIsBroken] = useState(false);

  const handleBreakCoconut = () => {
    if (isBroken) return;

    setIsBroken(true);
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#f7ead0] px-4">
      
      {/* ================================
          CONTENT
      ================================= */}

      <div className="relative z-10 flex w-full max-w-md flex-col items-center justify-center">

        {/* ================================
            COCONUT AREA
        ================================= */}

        <div
          className="relative flex h-[360px] w-full items-center justify-center sm:h-[420px]"
        >

          {/* =================================
              FULL COCONUT
          ================================= */}

          <AnimatePresence>
            {!isBroken && (
              <motion.button
                type="button"
                onClick={handleBreakCoconut}
                aria-label="नारळ फोडा"
                className="absolute z-20 flex h-[300px] w-[300px] cursor-pointer items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 sm:h-[350px] sm:w-[350px]"
                
                initial={{
                  opacity: 0,
                  scale: 0.85,
                  y: 20,
                }}

                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}

                exit={{
                  opacity: 0,
                  scale: 0.95,
                }}

                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >

                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    scale: 1.04,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  className="relative h-full w-full"
                >
                  <Image
                    src="/images/decorations/coconut.png"
                    alt="नारळ"
                    fill
                    priority
                    className="object-contain drop-shadow-[0_18px_25px_rgba(60,30,10,0.25)]"
                    sizes="350px"
                  />
                </motion.div>
              </motion.button>
            )}
          </AnimatePresence>


          {/* =================================
              LEFT BROKEN PART
          ================================= */}

          <AnimatePresence>
            {isBroken && (
              <motion.div
                className="absolute z-20 h-[300px] w-[300px] sm:h-[350px] sm:w-[350px]"
                
                initial={{
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 0.98,
                  opacity: 1,
                }}

                animate={{
                  x: "-30vw",
                  y: 190,
                  rotate: -28,
                  scale: 0.9,
                  opacity: 0.98,
                }}

                transition={{
                  duration: 1.25,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
              >
                <Image
                  src="/images/decorations/coconut-left.png"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="350px"
                />
              </motion.div>
            )}
          </AnimatePresence>


          {/* =================================
              RIGHT BROKEN PART
          ================================= */}

          <AnimatePresence>
            {isBroken && (
              <motion.div
                className="absolute z-20 h-[300px] w-[300px] sm:h-[350px] sm:w-[350px]"
                
                initial={{
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 0.98,
                  opacity: 1,
                }}

                animate={{
                  x: "30vw",
                  y: 190,
                  rotate: 28,
                  scale: 0.9,
                  opacity: 0.98,
                }}

                transition={{
                  duration: 1.3,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
              >
                <Image
                  src="/images/decorations/coconut-right.png"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="350px"
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>


        {/* ================================
            INSTRUCTION
        ================================= */}

        <AnimatePresence mode="wait">

          {!isBroken ? (
            <motion.div
              key="instruction"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.4,
              }}
              className="mt-2 text-center"
            >
              <p className="text-base font-semibold text-[#6b3515] sm:text-lg">
                नारळ फोडण्यासाठी नारळावर क्लिक करा
              </p>

              <p className="mt-2 text-xs text-[#9a6a42]">
                श्री गणेशाच्या चरणी अर्पण करण्यासाठी
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="broken"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.45,
              }}
              className="mt-2 text-center"
            >
              <p className="text-base font-semibold text-[#6b3515] sm:text-lg">
                श्री गणेशाय नमः 🙏
              </p>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
}