"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

export default function InvitationSection() {
  const containerRef = useRef<HTMLElement>(null);

  const dividerTopRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const dividerBottomRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(dividerTopRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
      })
        .from(
          cardRef.current,
          {
            opacity: 0,
            y: 100,
            scale: 0.9,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          messageRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.3"
        )
        .from(
          dividerBottomRef.current,
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
          },
          "-=0.2"
        );

      gsap.to(cardRef.current, {
        y: -6,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative -mt-10 overflow-hidden px-4 py-20"
    >
      {/* Transition from Hero */}

      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-transparent to-amber-50/40" />

      <div className="relative z-10 mx-auto max-w-md">
        {/* Top Divider */}

        <div ref={dividerTopRef} className="mb-6 flex justify-center">
          <div className="relative h-12 w-full max-w-xs">
            <Image
  src="/images/decorations/divider.png"
  alt="Decoration"
  fill
  sizes="320px"
  className="object-contain"
/>
          </div>
        </div>

        {/* Card */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-amber-300/50
            bg-gradient-to-b
            from-amber-100
            via-amber-50
            to-amber-100
            p-8
            shadow-[0_20px_60px_rgba(180,120,20,0.25)]
          "
        >
          {/* Inner Glow */}

          <div className="absolute inset-0 rounded-[40px] bg-white/10" />
{/* Top Left */}

<div className="absolute left-4 top-4 h-10 w-10">
 <Image
  src="/images/ornaments/corner.png"
  alt=""
  fill
  sizes="40px"
  className="object-contain"
/>
</div>

{/* Top Right */}

<div className="absolute right-4 top-4 h-10 w-10 rotate-90">
  <Image
    src="/images/ornaments/corner.png"
    alt=""
    fill
    className="object-contain"
  />
</div>

{/* Bottom Right */}

<div className="absolute bottom-4 right-4 h-10 w-10 rotate-180">
  <Image
    src="/images/ornaments/corner.png"
    alt=""
    fill
    className="object-contain"
  />
</div>

{/* Bottom Left */}

<div className="absolute bottom-4 left-4 h-10 w-10 -rotate-90">
  <Image
    src="/images/ornaments/corner.png"
    alt=""
    fill
    className="object-contain"
  />
</div>
          {/* Content */}

          <div className="relative z-10">
            <p className="text-center text-sm font-semibold text-amber-800 sm:text-base">
              ॥ सप्रेम निमंत्रक ॥
            </p>

            <h2
              ref={titleRef}
              className="my-6 text-center text-4xl font-extrabold text-amber-900 sm:text-5xl"
            >
              देशपांडे परिवार
            </h2>

            <div className="mx-auto mb-6 h-[2px] w-20 bg-amber-300" />

            <p
              ref={messageRef}
              className="text-center text-base text-amber-800 sm:text-lg"
            >
              आपण व आपल्या परिवारास
              <br />
              सस्नेह निमंत्रण !
            </p>
          </div>
        </div>

        {/* Bottom Divider */}

        <div ref={dividerBottomRef} className="mt-6 flex justify-center">
          <div className="relative h-12 w-full max-w-xs">
            <Image
              src="/images/decorations/divider.png"
              alt="Decoration"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}