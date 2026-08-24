"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export type TimelineEvent = {
  title: string;
  summary: string;
  date?: string;
  time?: string;
  place?: string;
};

type TimelineProps = {
  events: TimelineEvent[]; // dynamic, client can add up to 10 in admin panel
};

export default function Timeline({ events }: TimelineProps) {
  const [active, setActive] = useState<TimelineEvent | null>(null);

  return (
    <section className="relative px-6 py-12 bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="text-center mb-8">
        <p className="text-amber-700 text-xs tracking-widest">॥ श्री गणेशाय नमः ॥</p>
        <Image src="/images/decorations/om.png" alt="" width={36} height={36} className="mx-auto my-2" />
        <h2 className="text-3xl font-bold text-amber-900">उत्सवाचा मंगल प्रवास</h2>
        <p className="text-amber-700 text-sm mt-2 max-w-xs mx-auto">
          गणरायाच्या आगमनापासून विसर्जनापर्यंत प्रत्येक मंगल क्षणाची माहिती
        </p>
      </div>

      <div className="max-w-md mx-auto flex flex-col gap-4">
        {events.map((ev, i) => (
          <button
            key={i}
            onClick={() => setActive(ev)}
            className="text-left bg-white rounded-2xl p-4 shadow-sm border border-amber-200 flex items-start gap-4"
          >
            <span className="shrink-0 w-11 h-11 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1">
              <span className="block font-semibold text-amber-900">{ev.title}</span>
              <span className="block text-sm text-amber-700 mt-1">{ev.summary}</span>
              <span className="block text-xs text-amber-500 mt-2">अधिक माहिती →</span>
            </span>
          </button>
        ))}
      </div>

      {/* ===== DETAIL MODAL ===== */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative bg-amber-50 rounded-2xl max-w-sm w-full p-6 border border-amber-300"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-amber-700"
              >
                ×
              </button>
              <p className="text-amber-700 text-xs text-center tracking-widest">॥ श्री गणेशाय नमः ॥</p>
              <h3 className="text-2xl font-bold text-amber-900 text-center mt-2">{active.title}</h3>
              <p className="text-amber-700 text-sm text-center mt-2">{active.summary}</p>

              <div className="flex flex-col gap-3 mt-5">
                {active.date && (
                  <div className="bg-white rounded-xl px-4 py-3">
                    <p className="text-xs text-amber-500">दिनांक</p>
                    <p className="font-semibold text-amber-900">{active.date}</p>
                  </div>
                )}
                {active.time && (
                  <div className="bg-white rounded-xl px-4 py-3">
                    <p className="text-xs text-amber-500">वेळ</p>
                    <p className="font-semibold text-amber-900">{active.time}</p>
                  </div>
                )}
                {active.place && (
                  <div className="bg-white rounded-xl px-4 py-3">
                    <p className="text-xs text-amber-500">स्थळ</p>
                    <p className="font-semibold text-amber-900">{active.place}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
