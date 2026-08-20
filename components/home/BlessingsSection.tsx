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
};


export default function BlessingsSection() {
  const flowerIdRef = useRef(0);
const sparkles: Sparkle[] = Array.from(
  { length: 35 },
  (_, index) => ({
    id: index,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 8,
    duration: 4 + Math.random() * 6,
    delay: Math.random() * 5,
  })
);
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [isBlessingActive, setIsBlessingActive] = useState(false);

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

    setTimeout(() => {
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
    <section className="relative overflow-hidden py-24">
      {/* Background */}

      <Image
        src="/images/backgrounds/background3.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-amber-950/65" />

      {/* Content */}

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-4xl font-bold text-amber-200 md:text-6xl">
          बाप्पाचे आशीर्वाद
        </h2>

        <p className="mt-4 text-amber-100">
          स्पर्श करा आणि गणरायाचे मंगल आशीर्वाद प्राप्त करा
        </p>

        {/* Murti */}

        <div className="relative mx-auto mt-12 h-[450px] w-[320px] overflow-visible">
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

          <Image
            src="/images/ganesh/ganeshmurti.png"
            alt="Ganesh Murti"
            fill
            priority
            sizes="320px"
            className="relative z-20 object-contain"
          />

          {/* Random Moving Sparkles */}

<div className="absolute inset-0 z-10 overflow-hidden">
  {sparkles.map((sparkle) => (
    <span
      key={sparkle.id}
      className="absolute animate-random-sparkle rounded-full"
      style={{
        left: `${sparkle.x}%`,
        top: `${sparkle.y}%`,
        width: `${sparkle.size}px`,
        height: `${sparkle.size}px`,
        animationDuration: `${sparkle.duration}s`,
        animationDelay: `${sparkle.delay}s`,
        boxShadow:
          "0 0 10px rgba(255,255,255,0.9), 0 0 20px rgba(255,215,0,0.8)",
        background:
          "radial-gradient(circle, #fff 0%, #fcd34d 70%, transparent 100%)",
      }}
    />
  ))}
</div>

          {/* Flowers */}

          {flowers.map((flower) => (
            <div
              key={flower.id}
              className={`absolute z-30 ${
                flower.direction === "left"
                  ? "animate-left-flower"
                  : flower.direction === "right"
                  ? "animate-right-flower"
                  : "animate-top-flower"
              }`}
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

          {/* Particles */}

          {isBlessingActive &&
            [...Array(15)].map((_, index) => (
              <span
                key={index}
                className="animate-particle absolute h-2 w-2 rounded-full bg-yellow-300"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
        </div>

        <p className="mt-6 text-amber-100">
          बाप्पांच्या चरणी मनःपूर्वक फुलांची अर्पण करा
        </p>

        <button
          onClick={createFlowerRain}
          className="
            mt-8
            rounded-full
            border
            border-amber-300
            bg-amber-700
            px-10
            py-4
            text-xl
            text-amber-100
            transition-all
            duration-300
            hover:scale-105
          "
        >
          🌸 फुलांची वर्षाव करा
        </button>
      </div>
    </section>
  );
}