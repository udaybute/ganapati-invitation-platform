"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);



export default function LocationSection() {

    const sectionRef = useRef<HTMLElement>(null);

const dividerRef = useRef<HTMLDivElement>(null);

const titleRef = useRef<HTMLDivElement>(null);

const cardRef = useRef<HTMLDivElement>(null);

const buttonRef = useRef<HTMLAnchorElement>(null);

useGSAP(
  () => {
    if (dividerRef.current) {
  gsap.from(dividerRef.current, {
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 80%",
    },
    opacity: 0,
    scale: 0,
    duration: 0.2,
  });
}

    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },

      opacity: 0,
      y: -80,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(cardRef.current, {
      scrollTrigger: {
  trigger: sectionRef.current,
  start: "top 80%",
},

      opacity: 0,
      scale: 0.8,
      y: 100,
      duration: 1,
      ease: "back.out(1.7)",
    });

    gsap.to(cardRef.current, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(buttonRef.current, {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  },
  {
   scope: sectionRef,
    revertOnUpdate: true,
  }
);

  return (
<section
  ref={sectionRef}
  className="relative overflow-hidden py-20"
>
      {/* Background */}

      <Image
        src="/images/backgrounds/location-background.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />

      {/* Content */}

      <div className="relative z-10 mx-auto max-w-md px-4">
        {/* Top divider */}

        <div
  ref={dividerRef}
  className="mb-6 flex justify-center"
>
          <Image
            src="/images/decorations/divider.png"
            alt=""
            width={140}
            height={30}
          />
        </div>

        {/* Title */}

        <div
  ref={titleRef}
  className="text-center"
>
          <h2 className="text-5xl font-bold text-amber-900">
            कार्यक्रम स्थळ
          </h2>

          <p className="mt-4 text-amber-800">
            गणरायाच्या दर्शनासाठी आपले सहर्ष स्वागत आहे
          </p>
        </div>

        {/* Location card */}

        <div
  ref={cardRef}
  className="
    mt-12
    rounded-[35px]
    bg-amber-950
    p-6
    shadow-2xl
  "
>
          <div className="overflow-hidden rounded-2xl border-2 border-amber-200">
  <iframe
    title="Ganapati Location"
    src="https://maps.google.com/maps?q=Pune&t=&z=13&ie=UTF8&iwloc=&output=embed"
    className="h-[220px] w-full"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>

          <h3 className="mt-8 text-center text-4xl font-bold text-amber-100">
            श्री गणेश युवा शक्ती मंडळ
          </h3>

          <p className="mt-6 text-center text-amber-200">
            📍 मंगलमूर्ती नगर, गणेश चौक, शिवाजीनगर, पुणे, महाराष्ट्र – 411005
          </p>

         <a
         ref={buttonRef}
  href="https://maps.google.com/?q=Pune"
  target="_blank"
  rel="noopener noreferrer"
  className="
    mx-auto
    mt-8
    flex
    w-fit
    items-center
    justify-center
    rounded-full
    bg-gradient-to-b
    from-amber-200
    to-amber-400
    px-10
    py-4
    text-xl
    font-semibold
    text-amber-950
    shadow-lg
    transition-all
    duration-300
    hover:scale-105
  "
>
  Open Maps
</a>
          <p className="mt-8 text-center text-sm text-amber-200">
            आपल्या सहर्ष उपस्थितीने
            <br />
            उत्सवाची शोभा वाढेल
          </p>
        </div>

        {/* Bottom divider */}

        <div className="mt-12 flex justify-center">
          <Image
            src="/images/decorations/divider.png"
            alt=""
            width={140}
            height={30}
          />
        </div>
      </div>
    </section>
  );
}