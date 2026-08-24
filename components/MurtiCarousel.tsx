"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type MurtiCarouselProps = {
  mandalName: string;
  establishedYear: string;
  photos: string[]; // e.g. ["/images/family/person-1.png", ...]
};

export default function MurtiCarousel({ mandalName, establishedYear, photos }: MurtiCarouselProps) {
  const [index, setIndex] = useState(0);
  const total = photos.length;

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  return (
    <section className="relative px-6 py-10 text-center overflow-hidden">
      <Image src="/images/backgrounds/festival-background.webp" alt="" fill className="object-cover -z-10" />
      <p className="text-amber-200 text-xs tracking-widest">॥ श्री गणेशाय नमः ॥</p>
      <h2 className="text-2xl font-bold text-amber-50 mt-1">{mandalName}</h2>

      <div className="relative max-w-sm mx-auto mt-6 rounded-2xl overflow-hidden border-4 border-amber-400/60">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative aspect-[3/4]"
          >
            <Image src={photos[index]} alt="" fill className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-3 left-0 right-0 text-center">
          <span className="bg-black/50 text-amber-100 text-sm px-4 py-1 rounded-full">
            स्थापना : {establishedYear}
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-5">
        <button onClick={prev} className="w-10 h-10 rounded-full bg-amber-50/90 flex items-center justify-center text-amber-800">‹</button>
        <button onClick={next} className="w-10 h-10 rounded-full bg-amber-50/90 flex items-center justify-center text-amber-800">›</button>
      </div>
    </section>
  );
}
