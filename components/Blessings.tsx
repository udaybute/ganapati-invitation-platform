"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const PETAL_IMAGES = ["/images/decorations/marigold.png", "/images/decorations/Plumeria.png"];

type Petal = {
  id: number;
  startX: number; // % relative to container, can be <0 or >100 (off to the side)
  startY: number; // % relative to container, negative = above
  midX: number;
  midY: number;
  endX: number;
  endY: number;
  img: string;
  delay: number;
  duration: number;
  rotateEnd: number;
  size: number;
};

type LightParticle = {
  id: number;
  x: number;
  y: number;
  size: number;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
};

// A throw arc from somewhere around the murti, converging near it, then settling downward —
// mimics people offering flowers from different sides rather than uniform rain from the top.
function makePetal(id: number): Petal {
  const side = Math.random();
  let startX: number, startY: number;

  if (side < 0.35) {
    // from the left
    startX = -25 - Math.random() * 20;
    startY = 10 + Math.random() * 50;
  } else if (side < 0.7) {
    // from the right
    startX = 105 + Math.random() * 20;
    startY = 10 + Math.random() * 50;
  } else {
    // from above
    startX = Math.random() * 100;
    startY = -20 - Math.random() * 15;
  }

  const midX = 35 + Math.random() * 30; // converge near the murti, center-ish
  const midY = 30 + Math.random() * 25;
  const endX = midX + (Math.random() - 0.5) * 40;
  const endY = 100 + Math.random() * 20;

  return {
    id,
    startX,
    startY,
    midX,
    midY,
    endX,
    endY,
    img: PETAL_IMAGES[Math.floor(Math.random() * PETAL_IMAGES.length)],
    delay: Math.random() * 1.4,
    duration: 4.5 + Math.random() * 2.5, // slowed down
    rotateEnd: (Math.random() - 0.5) * 540,
    size: 22 + Math.random() * 14,
  };
}

export default function Blessings() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [lights, setLights] = useState<LightParticle[]>([]);

  // Ambient light particles behind the murti — generated after mount to avoid SSR/client mismatch
  useEffect(() => {
    setLights(
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        x: 20 + Math.random() * 60,
        y: 15 + Math.random() * 60,
        size: 3 + Math.random() * 5,
        driftX: (Math.random() - 0.5) * 40,
        driftY: (Math.random() - 0.5) * 40,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 3,
      }))
    );
  }, []);

  const showerFlowers = () => {
    const newPetals = Array.from({ length: 22 }).map((_, i) => makePetal(Date.now() + i));
    setPetals((p) => [...p, ...newPetals]);
    setTimeout(() => {
      setPetals((p) => p.filter((pt) => !newPetals.includes(pt)));
    }, 9000);
  };

  return (
    <section className="relative px-6 py-14 text-center overflow-hidden">
      {/* RESPONSIVE BACKGROUND */}
      <Image
        src="/images/backgrounds/invitation-desktop-bg.png"
        alt=""
        fill
        className="object-cover -z-20 hidden md:block"
      />
      <Image
        src="/images/backgrounds/invitation-mobile-bg.png"
        alt=""
        fill
        className="object-cover -z-20 md:hidden"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-amber-950/70 to-amber-900/70" />

      <h2 className="text-2xl font-bold text-amber-100">बाप्पाचे आशीर्वाद</h2>
      <p className="text-amber-300 text-sm mt-2">स्पर्श करा आणि गणरायाचे मंगल आशीर्वाद प्राप्त करा</p>

      <div className="relative w-52 mx-auto mt-6">
        {/* AMBIENT LIGHT PARTICLES — behind the murti */}
        <div className="pointer-events-none absolute inset-[-40%] z-0">
          {lights.map((l) => (
            <motion.span
              key={l.id}
              className="absolute rounded-full bg-amber-200"
              style={{
                left: `${l.x}%`,
                top: `${l.y}%`,
                width: l.size,
                height: l.size,
                boxShadow: "0 0 8px 2px rgba(251,191,36,0.7)",
              }}
              animate={{
                x: [0, l.driftX, 0],
                y: [0, l.driftY, 0],
                opacity: [0.2, 0.9, 0.2],
              }}
              transition={{ duration: l.duration, delay: l.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* FALLING / THROWN PETALS — positioned relative to this murti container so they converge on it */}
        <div className="pointer-events-none absolute inset-[-60%] z-20 overflow-visible">
          <AnimatePresence>
            {petals.map((p) => (
              <motion.div
                key={p.id}
                className="absolute"
                style={{ width: p.size, height: p.size }}
                initial={{ left: `${p.startX}%`, top: `${p.startY}%`, opacity: 0, rotate: 0, scale: 0.6 }}
                animate={{
                  left: [`${p.startX}%`, `${p.midX}%`, `${p.endX}%`],
                  top: [`${p.startY}%`, `${p.midY}%`, `${p.endY}%`],
                  opacity: [0, 1, 1, 0],
                  rotate: [0, p.rotateEnd * 0.4, p.rotateEnd],
                  scale: [0.6, 1, 0.9],
                }}
                transition={{ duration: p.duration, delay: p.delay, ease: "easeInOut", times: [0, 0.35, 1] }}
              >
                <Image src={p.img} alt="" width={p.size} height={p.size} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* MURTI */}
        <motion.div
          className="relative z-10"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/images/ganapati/ganapati-murti.png" alt="" width={300} height={340} />
        </motion.div>
      </div>

      <button
        onClick={showerFlowers}
        className="relative z-30 mt-6 px-7 py-3 rounded-full bg-orange-500 text-white font-medium"
      >
        🌸 फुलांची उधळण करा
      </button>
    </section>
  );
}
