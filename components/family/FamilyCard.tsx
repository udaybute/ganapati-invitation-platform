"use client";

import Image from "next/image";
import FlowerGarland from "@/components/decorations/FlowerGarland";

interface FamilyCardProps {
  image: string;
  name: string;
  className?: string;
}

export default function FamilyCard({
  image,
  name,
  className = "",
}: FamilyCardProps) {
  return (
    <div
      className={`
        absolute
        h-[420px]
        w-[280px]
        rounded-[32px]
        bg-amber-50
        shadow-2xl
        transition-all
        duration-1000
        ease-in-out
        will-change-transform
        ${className}
      `}
    >
      {/* Photo container */}

      <div className="relative h-[360px] w-full overflow-hidden rounded-[32px]">
        {/* Left garland */}

        <FlowerGarland position="left" />

        {/* Right garland */}

        <FlowerGarland position="right" />

        {/* Photo */}

        <Image
          src={image}
          alt={name}
          fill
          sizes="280px"
          className="object-cover"
        />
      </div>

      {/* Name */}

      <div className="flex h-[60px] items-center justify-center">
        <p className="text-center text-base font-bold text-amber-900">
          {name}
        </p>
      </div>
    </div>
  );
}