"use client";

import { useState } from "react";
import Image from "next/image";

// Photos come from Supabase Storage (client-uploaded, png compressed)
export type GalleryPhoto = { url: string; caption?: string };

type GalleryProps = { photos: GalleryPhoto[] }; // 6-10 photos

export default function Gallery({ photos }: GalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <section className="relative px-6 py-12 text-center overflow-hidden bg-amber-950">
      <p className="text-amber-400 text-xs tracking-widest">आमच्या आठवणी</p>
      <h2 className="text-2xl font-bold text-amber-100 mt-1">छायाचित्र गॅलरी</h2>
      <p className="text-amber-400 text-sm mt-2 max-w-xs mx-auto">
        गणरायाच्या आगमनापासून विसर्जनापर्यंतच्या मंगलमय क्षणांच्या आठवणी
      </p>

      <div className="relative max-w-md mx-auto mt-6 rounded-2xl overflow-hidden">
        <div className="relative aspect-[4/3]">
          <Image src={photos[active].url} alt={photos[active].caption ?? ""} fill className="object-cover" />
        </div>
        <div className="absolute top-3 left-3 bg-black/50 text-amber-100 text-xs px-3 py-1 rounded-full">
          {String(active + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </div>
        {photos[active].caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-left">
            <p className="text-amber-100 font-medium">{photos[active].caption}</p>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-2 mt-4 overflow-x-auto max-w-md mx-auto pb-2">
        {photos.map((p, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative w-14 h-14 shrink-0 rounded-lg overflow-hidden border-2 ${
              active === i ? "border-amber-400" : "border-transparent opacity-70"
            }`}
          >
            <Image src={p.url} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>
    </section>
  );
}
