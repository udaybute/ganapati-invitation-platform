"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../animations/gsap";

interface ScrollRevealProps {
  children: React.ReactNode;
}

export default function ScrollReveal({
  children,
}: ScrollRevealProps) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) {
      return;
    }

    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions:
            "play none none reverse",
        },
      }
    );
  });

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
}