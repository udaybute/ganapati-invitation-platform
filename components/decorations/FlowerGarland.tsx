"use client";

import Image from "next/image";

interface FlowerGarlandProps {
  position: "left" | "right";
}

export default function FlowerGarland({
  position,
}: FlowerGarlandProps) {
  return (
    <div
      className={`
        absolute
        top-0
        z-20
        ${position === "left" ? "left-0" : "right-0"}
      `}
    >
      <div
        className={`
          relative
          h-[180px]
          w-[120px]
          origin-top
          animate-garland-swing
          ${position === "right" ? "scale-x-[-1]" : ""}
        `}
      >
        <Image
          src="/images/decorations/flower-garland.png"
          alt="Flower Garland"
          fill
          sizes="70px"
          className="object-contain"
        />
      </div>
    </div>
  );
}