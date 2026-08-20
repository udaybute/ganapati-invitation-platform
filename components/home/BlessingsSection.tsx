"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Flower = {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  direction: "left" | "right" | "top";
};

type Sparkle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
};

export default function BlessingsSection() {
  const flowerIdRef = useRef(0);

  /*
   * Generate sparkles only once.
   * This prevents them from jumping whenever
   * the component re-renders.
   */
  const [sparkles] = useState<Sparkle[]>(() =>
    Array.from({ length: 55 }, (_, index) => ({
      id: index,

      x: Math.random() * 100,

      y: Math.random() * 100,

      size: 3 + Math.random() * 7,

      duration: 4 + Math.random() * 7,

      delay: Math.random() * 6,

      driftX: -50 + Math.random() * 100,

      driftY: -80 - Math.random() * 120,
    }))
  );

  const [flowers, setFlowers] =
    useState<Flower[]>([]);

  const [isBlessingActive, setIsBlessingActive] =
    useState(false);

  /*
   * =====================================================
   * FLOWER RAIN
   * =====================================================
   */

  const createFlowerRain = () => {
    setIsBlessingActive(true);

    const leftFlowers: Flower[] = Array.from(
      { length: 5 },
      () => ({
        id: ++flowerIdRef.current,

        direction: "left",

        x: 8,

        y: 55 + Math.random() * 10,

        size: 25 + Math.random() * 20,

        rotation: Math.random() * 720,

        opacity: 0.6 + Math.random() * 0.4,
      })
    );

    const rightFlowers: Flower[] = Array.from(
      { length: 5 },
      () => ({
        id: ++flowerIdRef.current,

        direction: "right",

        x: 92,

        y: 55 + Math.random() * 10,

        size: 25 + Math.random() * 20,

        rotation: Math.random() * 720,

        opacity: 0.6 + Math.random() * 0.4,
      })
    );

    const topFlowers: Flower[] = Array.from(
      { length: 5 },
      () => ({
        id: ++flowerIdRef.current,

        direction: "top",

        x: 30 + Math.random() * 40,

        y: -20,

        size: 25 + Math.random() * 20,

        rotation: Math.random() * 720,

        opacity: 0.6 + Math.random() * 0.4,
      })
    );

    const newFlowers = [
      ...leftFlowers,
      ...rightFlowers,
      ...topFlowers,
    ];

    setFlowers((previous) => {
      const updated = [
        ...previous,
        ...newFlowers,
      ];

      return updated.slice(-60);
    });

    window.setTimeout(() => {
      setFlowers((previous) =>
        previous.filter(
          (flower) =>
            !newFlowers.some(
              (newFlower) =>
                newFlower.id === flower.id
            )
        )
      );

      setIsBlessingActive(false);
    }, 4000);
  };

  return (
    <section
      className="
        relative
        min-h-[800px]
        overflow-hidden
        py-24
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <Image
        src="/images/backgrounds/background3.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* =====================================================
          DARK OVERLAY
      ====================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-amber-950/65
        "
      />

      {/* =====================================================
          FULL SECTION SPARKLES
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[5]
          overflow-hidden
        "
        aria-hidden="true"
      >
        {sparkles.map((sparkle) => (
          <span
            key={sparkle.id}
            className="
              sparkle
              absolute
              rounded-full
            "
            style={
              {
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
                "--sparkle-duration": `${sparkle.duration}s`,
                "--sparkle-delay": `${sparkle.delay}s`,
                "--sparkle-x": `${sparkle.driftX}px`,
                "--sparkle-y": `${sparkle.driftY}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-20
          mx-auto
          max-w-5xl
          px-4
          text-center
        "
      >
        {/* =====================================================
            TITLE
        ====================================================== */}

        <div className="relative">
          <h2
            className="
              text-4xl
              font-bold
              text-amber-200
              drop-shadow-[0_4px_12px_rgba(255,193,7,0.3)]
              md:text-6xl
            "
          >
            बाप्पाचे आशीर्वाद
          </h2>

          {/* Small decorative sparkles */}

          <span className="title-sparkle left-[15%] top-1">
            ✦
          </span>

          <span className="title-sparkle right-[15%] top-4">
            ✦
          </span>
        </div>

        <p
          className="
            mt-4
            text-amber-100
            drop-shadow-md
          "
        >
          स्पर्श करा आणि गणरायाचे मंगल आशीर्वाद प्राप्त करा
        </p>

        {/* =====================================================
            MURTI
        ====================================================== */}

        <div
          className="
            relative
            mx-auto
            mt-12
            h-[450px]
            w-[320px]
            overflow-visible
          "
        >
          {/* ===================================================
              MURTI GLOW
          ==================================================== */}

          <div
            className={`
              absolute
              inset-0
              rounded-full
              ${
                isBlessingActive
                  ? "animate-ganesh-glow"
                  : ""
              }
            `}
          />

          {/* ===================================================
              INNER SPARKLES
          ==================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-[-40px]
              z-10
              overflow-visible
            "
          >
            {sparkles
              .slice(0, 18)
              .map((sparkle) => (
                <span
                  key={`murti-${sparkle.id}`}
                  className="
                    sparkle
                    absolute
                    rounded-full
                  "
                  style={
                    {
                      left: `${sparkle.x}%`,
                      top: `${sparkle.y}%`,
                      width: `${sparkle.size}px`,
                      height: `${sparkle.size}px`,
                      "--sparkle-duration": `${sparkle.duration}s`,
                      "--sparkle-delay": `${sparkle.delay}s`,
                      "--sparkle-x": `${sparkle.driftX}px`,
                      "--sparkle-y": `${sparkle.driftY}px`,
                    } as React.CSSProperties
                  }
                />
              ))}
          </div>

          {/* ===================================================
              GANESH MURTI
          ==================================================== */}

          <Image
            src="/images/ganesh/ganeshmurti.png"
            alt="Ganesh Murti"
            fill
            priority
            sizes="320px"
            className="
              relative
              z-20
              object-contain
            "
          />

          {/* ===================================================
              FLOWERS
          ==================================================== */}

          {flowers.map((flower) => (
            <div
              key={flower.id}
              className={`
                absolute
                z-30
                ${
                  flower.direction === "left"
                    ? "animate-left-flower"
                    : flower.direction === "right"
                    ? "animate-right-flower"
                    : "animate-top-flower"
                }
              `}
              style={{
                left: `${flower.x}%`,
                top:
                  flower.direction === "top"
                    ? "-120px"
                    : `${flower.y}%`,
              }}
            >
              <Image
                src="/images/decorations/Plumeria.webp"
                alt=""
                width={flower.size}
                height={flower.size}
                style={{
                  opacity: flower.opacity,
                  transform: `rotate(${flower.rotation}deg)`,
                }}
              />
            </div>
          ))}

          {/* ===================================================
              BLESSING PARTICLES
          ==================================================== */}

          {isBlessingActive &&
            Array.from({ length: 25 }).map(
              (_, index) => (
                <span
                  key={index}
                  className="
                    animate-particle
                    absolute
                    z-40
                    h-2
                    w-2
                    rounded-full
                    bg-yellow-300
                  "
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${
                      Math.random() * 1.5
                    }s`,
                  }}
                />
              )
            )}
        </div>

        {/* =====================================================
            DESCRIPTION
        ====================================================== */}

        <p
          className="
            mt-6
            text-amber-100
            drop-shadow-md
          "
        >
          बाप्पांच्या चरणी मनःपूर्वक फुलांची अर्पण करा
        </p>

        {/* =====================================================
            BUTTON
        ====================================================== */}

        <button
          onClick={createFlowerRain}
          className="
            mt-8
            rounded-full
            border
            border-amber-300
            bg-gradient-to-r
            from-amber-700
            via-amber-600
            to-orange-600
            px-10
            py-4
            text-xl
            font-medium
            text-amber-50
            shadow-[0_10px_30px_rgba(245,158,11,0.3)]
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-[0_15px_40px_rgba(245,158,11,0.5)]
            active:scale-95
          "
        >
          🌸 फुलांची वर्षाव करा
        </button>
      </div>
    </section>
  );
}