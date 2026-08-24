"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type InvitationCardProps = {
  mandalName: string;
  message: string;
};

export default function InvitationCard({
  mandalName,
  message,
}: InvitationCardProps) {
  return (
    <section className="relative overflow-visible bg-gradient-to-b from-amber-50 to-white px-6 py-10">
      {/* =====================================================
          TOP DIVIDER
      ====================================================== */}

      <div className="mb-4 flex justify-center">
        <Image
          src="/images/decorations/divider.png"
          alt=""
          width={140}
          height={40}
          className="object-contain"
        />
      </div>

      {/* =====================================================
          INVITATION CARD
      ====================================================== */}

      <div className="relative mx-auto w-full max-w-md overflow-visible">
        {/* ===================================================
            LEFT BAL GANESH
        ==================================================== */}

        <motion.div
          className="
            pointer-events-none
            absolute
            left-[-72px]
            top-[-35px]
            z-30
            h-[210px]
            w-[170px]
            sm:left-[-85px]
            sm:top-[-40px]
            sm:h-[230px]
            sm:w-[185px]
          "
          animate={{
            opacity: [0, 1, 1, 0],
            x: [-20, 0, 0, -18],
            y: [12, 0, -3, 8],
            rotate: [-4, 0, 1, -3],
            scale: [0.92, 1, 1.015, 0.94],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatDelay: 0.2,
            times: [0, 0.12, 0.38, 0.5],
            ease: "easeInOut",
          }}
        >
          <Image
            src="/images/decorations/bal-ganesh-left.png"
            alt=""
            fill
            priority
            sizes="185px"
            className="select-none object-contain"
          />
        </motion.div>

        {/* ===================================================
            RIGHT BAL GANESH
        ==================================================== */}

        <motion.div
          className="
            pointer-events-none
            absolute
            right-[-72px]
            top-[-35px]
            z-30
            h-[210px]
            w-[170px]
            sm:right-[-85px]
            sm:top-[-40px]
            sm:h-[230px]
            sm:w-[185px]
          "
          animate={{
            opacity: [0, 0, 1, 1, 0],
            x: [18, 18, 0, 0, 20],
            y: [8, 8, -3, 0, 12],
            rotate: [3, 3, -1, 0, 4],
            scale: [0.94, 0.94, 1, 1.015, 0.93],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatDelay: 0.2,
            times: [0, 0.5, 0.62, 0.88, 1],
            ease: "easeInOut",
          }}
        >
          <Image
            src="/images/decorations/bal-ganesh-right.png"
            alt=""
            fill
            sizes="185px"
            className="select-none object-contain"
          />
        </motion.div>

        {/* ===================================================
            MAIN CARD
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            z-10
            rounded-3xl
            border
            border-amber-300
            bg-amber-50
            px-6
            py-8
            text-center
            shadow-[0_12px_40px_rgba(120,70,20,0.12)]
          "
        >
          {/* ===============================================
              TOP LEFT CORNER
          ================================================ */}

          <Image
            src="/images/decorations/corner.png"
            alt=""
            width={40}
            height={40}
            className="absolute left-3 top-3"
          />

          {/* ===============================================
              TOP RIGHT CORNER
          ================================================ */}

          <Image
            src="/images/decorations/corner.png"
            alt=""
            width={40}
            height={40}
            className="absolute right-3 top-3 -scale-x-100"
          />

          {/* ===============================================
              CONTENT
          ================================================ */}

          <p className="text-xs tracking-widest text-amber-700">
            ॥ सप्रेम निमंत्रक ॥
          </p>

          <h2 className="mt-3 text-2xl font-bold text-amber-900">
            {mandalName}
          </h2>

          <div className="mx-auto my-4 h-0.5 w-16 bg-amber-400" />

          <p className="leading-relaxed text-amber-800">
            {message}
          </p>

          {/* ===============================================
              BOTTOM LEFT CORNER
          ================================================ */}

          <Image
            src="/images/decorations/corner.png"
            alt=""
            width={40}
            height={40}
            className="absolute bottom-3 left-3 scale-y-[-1]"
          />

          {/* ===============================================
              BOTTOM RIGHT CORNER
          ================================================ */}

          <Image
            src="/images/decorations/corner.png"
            alt=""
            width={40}
            height={40}
            className="absolute bottom-3 right-3 -scale-100"
          />
        </motion.div>
      </div>

      {/* =====================================================
          BOTTOM DIVIDER
      ====================================================== */}

      <div className="mt-4 flex justify-center">
        <Image
          src="/images/decorations/divider.png"
          alt=""
          width={140}
          height={40}
          className="object-contain"
        />
      </div>
    </section>
  );
}