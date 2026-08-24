"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export type GalleryPhoto = { url: string; caption?: string };
type GalleryProps = { photos: GalleryPhoto[] };

const FRAME = {
  mobile: { top: "32.5%", bottom: "11.5%", left: "13.5%", right: "14%" },
  desktop: { top: "38%", bottom: "10%", left: "12.5%", right: "12.5%" },
};

// Continuously auto-scrolls right-to-left, no visible scrollbar, and the user
// can grab it with a finger to drag — auto-scroll pauses while touching, then resumes.
function MarqueeStrip({ photos, onSelect }: { photos: GalleryPhoto[]; onSelect: (i: number) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);
  const doubled = [...photos, ...photos]; // duplicated for a seamless loop

  useEffect(() => {
    let raf: number;
    const speed = 0.6; // px per frame — smooth, continuous, no jump/delay
    const step = () => {
      const el = trackRef.current;
      if (el && !isInteracting.current) {
        el.scrollLeft += speed;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half; // seamless reset
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [photos.length]);

  return (
    <div
      ref={trackRef}
      onPointerDown={() => (isInteracting.current = true)}
      onPointerUp={() => setTimeout(() => (isInteracting.current = false), 1500)}
      onPointerLeave={() => (isInteracting.current = false)}
      className="no-scrollbar flex gap-1.5 overflow-x-auto max-w-full pb-1"
      style={{ touchAction: "pan-x" }}
    >
      {doubled.map((p, i) => (
        <button
          key={i}
          onClick={() => onSelect(i % photos.length)}
          className="relative w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-md overflow-hidden border-2 border-amber-400/40 hover:border-amber-400 transition-colors"
        >
          <Image src={p.url} alt="" fill className="object-cover" />
        </button>
      ))}
    </div>
  );
}

// MOBILE — single photo, auto-changes every 3.5s with a crossfade
function MobileShowcase({ photos }: { photos: GalleryPhoto[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    const id = setInterval(() => setActive((a) => (a + 1) % photos.length), 3500);
    return () => clearInterval(id);
  }, [photos.length]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-1">
      <div className="relative w-full max-w-[420px] flex-1 min-h-0 rounded-xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image src={photos[active].url} alt={photos[active].caption ?? ""} fill className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute top-2 left-2 z-10 bg-black/50 text-amber-100 text-[10px] px-2 py-0.5 rounded-full">
          {String(active + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </div>
        {photos[active].caption && (
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-2 text-left">
            <p className="text-amber-100 text-xs font-medium">{photos[active].caption}</p>
          </div>
        )}
      </div>
      <MarqueeStrip photos={photos} onSelect={setActive} />
    </div>
  );
}

// DESKTOP — 3x3 grid, cells rotate through all photos every 4s with a crossfade
function DesktopShowcase({ photos }: { photos: GalleryPhoto[] }) {
  const cells = 9;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (photos.length <= cells) return; // nothing to rotate if everything already fits
    const id = setInterval(() => setOffset((o) => (o + 1) % photos.length), 4000);
    return () => clearInterval(id);
  }, [photos.length]);

  const shown = Array.from({ length: Math.min(cells, photos.length) }).map(
    (_, i) => photos[(offset + i) % photos.length]
  );

  return (
    <div className="flex h-full w-full flex-col gap-3 px-2 py-1">
      <div className="grid grid-cols-3 grid-rows-3 gap-2 flex-1 min-h-0">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.div
              key={`${offset}-${i}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="relative rounded-lg overflow-hidden"
            >
              <Image src={p.url} alt={p.caption ?? ""} fill className="object-cover" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <MarqueeStrip photos={photos} onSelect={setOffset} />
    </div>
  );
}

export default function Gallery({ photos }: GalleryProps) {
  if (photos.length === 0) return null;

  return (
    <section className="relative">
      <h2 className="sr-only">छायाचित्र गॅलरी</h2>

      {/* MOBILE */}
      <div className="relative w-full md:hidden" style={{ aspectRatio: "1023 / 1537" }}>
        <Image src="/images/backgrounds/gallery-mobile-bg.png" alt="" fill className="object-cover -z-10" />
        <div
          className="absolute"
          style={{ top: FRAME.mobile.top, bottom: FRAME.mobile.bottom, left: FRAME.mobile.left, right: FRAME.mobile.right }}
        >
          <MobileShowcase photos={photos} />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="relative w-full hidden md:block" style={{ aspectRatio: "1536 / 1024" }}>
        <Image src="/images/backgrounds/gallery-desktop-bg.png" alt="" fill className="object-cover -z-10" />
        <div
          className="absolute"
          style={{ top: FRAME.desktop.top, bottom: FRAME.desktop.bottom, left: FRAME.desktop.left, right: FRAME.desktop.right }}
        >
          <DesktopShowcase photos={photos} />
        </div>
      </div>
    </section>
  );
}