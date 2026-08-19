"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

export default function OmSymbol() {
  const omRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(omRef.current, {
      opacity: 0,
      scale: 0,
      y: -50,
      duration: 1.5,
      delay: 1,
      ease: "elastic.out(1, 0.5)",
    });

    gsap.to(omRef.current, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });

  return (
   <div
  ref={omRef}
  className="
    absolute
    left-1/2
    top-[13%]
    z-30
    -translate-x-1/2
  "
>
      <div className="relative h-15 w-15 sm:h-32 sm:w-32 md:h-40 md:w-40">
        <Image
          src="/images/symbols/om.png"
          alt="Om"
          fill
          priority
          className="object-contain"
        />
      </div>
    </div>
  );
}