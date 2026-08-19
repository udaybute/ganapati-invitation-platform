"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FlowerGarland from "@/components/decorations/FlowerGarland";
import FamilyCard from "@/components/family/FamilyCard";
import { familyMembers } from "./familyData";

export default function FamilySection() {
  const [activeIndex, setActiveIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setActiveIndex((previous) =>
      previous === familyMembers.length - 1
        ? 0
        : previous + 1
    );
  }, 3000);

  return () => clearInterval(interval);
}, []);

  const nextSlide = () => {
    setActiveIndex((previous) =>
      previous === familyMembers.length - 1 ? 0 : previous + 1
    );
  };

  const previousSlide = () => {
    setActiveIndex((previous) =>
      previous === 0 ? familyMembers.length - 1 : previous - 1
    );
  };

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}

      <div className="absolute inset-0 bg-amber-900" />

      {/* Top curve */}

      <div className="absolute top-0 left-0 h-20 w-full rounded-b-[100%] bg-amber-50" />

      {/* Bottom curve */}

      <div className="absolute bottom-0 left-0 h-20 w-full rounded-t-[100%] bg-amber-50" />

      {/* Lamp */}

      <div className="absolute bottom-6 left-6">
        <div className="relative h-16 w-16 md:h-20 md:w-20">
          <Image
            src="/images/decorations/lamp.png"
            alt="Temple lamp"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Content */}

      <div className="relative z-10 mx-auto flex min-h-[700px] max-w-md flex-col items-center justify-center px-4">
        {/* Heading */}

        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold text-amber-200">
            ॥ आयोजक ॥
          </p>

          <h2 className="text-3xl font-bold text-amber-50">
            देशपांडे परिवार
          </h2>

          <p className="mt-3 text-sm text-amber-200">
            गणेशोत्सवाच्या आयोजनात सहभागी कुटुंबीय
          </p>
        </div>

        {/* Cards */}

<div className="relative h-[400px] w-[360px]">
  {familyMembers.map((member, index) => {
    const position =
      (index - activeIndex + familyMembers.length) %
      familyMembers.length;

    let className = "";

    if (position === 0) {
      className =
        "left-1/2 z-20 -translate-x-1/2";
    } else if (position === 1) {
      className =
        "-right-8 rotate-[12deg] opacity-50";
    } else {
      className =
        "-left-8 rotate-[-12deg] opacity-50";
    }

    return (
      <FamilyCard
        key={member.id}
        image={member.image}
        name={member.name}
        className={className}
      />
    );
  })}
</div>

        {/* Navigation */}

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={previousSlide}
            className="rounded-full bg-amber-100 p-3 shadow-lg transition-transform hover:scale-105"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="rounded-full bg-amber-100 p-3 shadow-lg transition-transform hover:scale-105"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Divider */}

<div className="mt-8 flex justify-center">
  <div className="h-[2px] w-20 rounded-full bg-amber-300" />
</div>

{/* Invitation message */}

<p className="mx-auto mt-4 max-w-xs px-6 text-center text-sm leading-6 text-amber-100 md:max-w-md md:text-base">
  गणरायाच्या आगमन सोहळ्यास आपली उपस्थिती हीच आमच्यासाठी आशीर्वाद असेल.
</p>

      </div>
    </section>
  );
}