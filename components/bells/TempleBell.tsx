"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";


interface TempleBellProps {
  position: "left" | "right";
}

export default function TempleBell({ position }: TempleBellProps) {
  const bellRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(bellRef.current, {
      y: -300,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      delay: 1,
    });

    gsap.to(bellRef.current, {
  rotation: position === "left" ? -12 : 12,
  duration: 2.2,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  transformOrigin: "50% 0%",
});
  });

  return (
    <div
      ref={bellRef}
      className={`absolute top-[-30px] z-20 ${
        position === "left" ? "left-[1%]" : "right-[1%]"
      }`}
    >
      <div className="relative h-[220px] w-[90px] sm:h-[260px] sm:w-[110px] md:h-[320px] md:w-[140px]">
        <Image
          src="/images/bells/temple-bell.png"
          alt="Temple Bell"
          fill
          priority
          sizes="(max-width:768px) 90px,140px"
          className="object-contain"
        />
      </div>
    </div>
  );
}