"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const PETAL_IMAGES = ["/images/decorations/marigold.png", "/images/decorations/Plumeria.png"];

type Petal = { id: number; left: number; img: string; delay: number; duration: number; rotate: number };

export default function Blessings() {
  const [petals, setPetals] = useState<Petal[]>([]);

  const showerFlowers = () => {
    const newPetals: Petal[] = Array.from({ length: 20 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      img: PETAL_IMAGES[Math.floor(Math.random() * PETAL_IMAGES.length)],
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 1.5,
      rotate: Math.random() * 360,
    }));
    setPetals((p) => [...p, ...newPetals]);
    setTimeout(() => {
      setPetals((p) => p.filter((pt) => !newPetals.includes(pt)));
    }, 4000);
  };

  return (
    <section className="relative px-6 py-14 text-center overflow-hidden bg-gradient-to-b from-amber-950 to-amber-900">
      {/* falling petals layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <AnimatePresence>
          {petals.map((p) => (
            <motion.div
              key={p.id}
              className="absolute top-0"
              style={{ left: `${p.left}%` }}
              initial={{ y: -40, opacity: 1, rotate: 0 }}
              animate={{ y: "110vh", opacity: [1, 1, 0], rotate: p.rotate }}
              transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
            >
              <Image src={p.img} alt="" width={28} height={28} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <h2 className="text-2xl font-bold text-amber-100">बाप्पाचे आशीर्वाद</h2>
      <p className="text-amber-300 text-sm mt-2">स्पर्श करा आणि गणरायाचे मंगल आशीर्वाद प्राप्त करा</p>

      <motion.div
        className="relative w-52 mx-auto mt-6"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src="/images/ganapati/ganapati-murti.png" alt="" width={300} height={340} />
      </motion.div>

      <button
        onClick={showerFlowers}
        className="mt-6 px-7 py-3 rounded-full bg-orange-500 text-white font-medium"
      >
        🌸 फुलांची उधळण करा
      </button>
    </section>
  );
}
