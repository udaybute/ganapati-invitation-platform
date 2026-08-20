"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    id: 1,
    title: "स्थापना",
    description: "गणरायाचे आगमन आणि स्थापनेचा शुभ मुहूर्त",
    details: {
      date: "२७ ऑगस्ट २०२६",
      time: "सकाळी १०:००",
      location: "श्री सिद्धिविनायक मंदिर",
    },
    side: "left",
  },

  {
    id: 2,
    title: "आरती",
    description: "दररोजची आरती आणि मंगल वातीची वेळ",
    details: {
      date: "दररोज",
      time: "सायंकाळी ७:००",
      location: "मंडप",
    },
    side: "right",
  },

  {
    id: 3,
    title: "दीपआरती",
    description: "संध्याकाळची दीपआरती आणि प्रार्थना",
    details: {
      date: "दररोज",
      time: "सायंकाळी ६:३०",
      location: "मंडप",
    },
    side: "left",
  },

  {
    id: 4,
    title: "सत्यनारायण पूजा",
    description: "श्री सत्यनारायण महाराजांची पूजा आणि कथा",
    details: {
      date: "३० ऑगस्ट २०२६",
      time: "सकाळी ९:००",
      location: "मंदिर",
    },
    side: "right",
  },

  {
    id: 5,
    title: "महाप्रसाद",
    description: "महाप्रसादाचा नैवेद्य आणि वितरण",
    details: {
      date: "३१ ऑगस्ट २०२६",
      time: "दुपारी १२:००",
      location: "प्रसाद कक्ष",
    },
    side: "left",
  },

  {
    id: 6,
    title: "कार्यक्रम",
    description: "विविध सांस्कृतिक आणि सामाजिक कार्यक्रम",
    details: {
      date: "१ सप्टेंबर २०२६",
      time: "सायंकाळी ६:००",
      location: "मंडप",
    },
    side: "right",
  },

  {
    id: 7,
    title: "विसर्जन",
    description: "गणरायाच्या निरोपाचा भावपूर्ण क्षण",
    details: {
      date: "५ सप्टेंबर २०२६",
      time: "दुपारी ३:००",
      location: "विसर्जन घाट",
    },
    side: "left",
  },
];

export default function FestivalJourneySection() {
    const containerRef = useRef<HTMLElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
    const [selectedEvent, setSelectedEvent] = useState<
  (typeof events)[0] | null
>(null);

useEffect(() => {
  if (selectedEvent && popupRef.current) {
    gsap.fromTo(
      popupRef.current,
      {
        opacity: 0,
        scale: 0.7,
        y: 50,
        rotate: -5,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotate: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      }
    );
  }
}, [selectedEvent]);

useGSAP(
  () => {
    gsap.from(".timeline-title", {
      scrollTrigger: {
        trigger: ".timeline-title",
        start: "top 80%",
      },
      opacity: 0,
      y: -80,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".timeline-image", {
      scrollTrigger: {
        trigger: ".timeline-image",
        start: "top 80%",
      },
      opacity: 0,
      scaleY: 0,
      duration: 1.5,
      transformOrigin: "top center",
    });

    gsap.utils.toArray(".timeline-card").forEach((card) => {
      gsap.from(card as Element, {
        scrollTrigger: {
          trigger: card as Element,
          start: "top 85%",
        },
        opacity: 0,
        y: 80,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(card as Element, {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  },
  {
    scope: containerRef,
  }
);

    return (
    <section
  ref={containerRef}
  className="relative bg-amber-50 py-20"
>
      {/* Background */}

      <Image
        src="/images/backgrounds/festival-background.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Title */}

        <div className="timeline-title mb-16 text-center">
          <h2 className="text-4xl font-bold text-amber-900 md:text-6xl">
            उत्सवाचा मंगल प्रवास
          </h2>

          <p className="mt-4 text-lg text-amber-800">
            गणरायाच्या आगमनापासून विसर्जनापर्यंत प्रत्येक मंगल क्षणाची माहिती
          </p>
        </div>

       <div className="relative mx-auto max-w-6xl">
  {/* Timeline PNG */}

  <div className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 md:block">
   <div className="timeline-image relative h-full min-h-[1400px] w-[140px]">
      <Image
        src="/images/decorations/timeline.png"
        alt="Timeline"
        fill
        sizes="140px"
        className="object-contain"
      />
    </div>
  </div>

  {/* Cards */}

  <div className="relative flex flex-col gap-16">
    {events.map((event) => (
      <div
        key={event.id}
        className={`flex ${
          event.side === "left"
            ? "justify-start"
            : "justify-end"
        }`}
      >
       <button
  onClick={() => setSelectedEvent(event)}
  className="
    timeline-card
    w-full
    max-w-md
    rounded-[32px]
   bg-gradient-to-b
from-white
to-amber-50
    p-8
    text-left
    shadow-2xl
    transition-all
    duration-500
    hover:-translate-y-3
hover:scale-[1.03]
hover:shadow-[0_25px_60px_rgba(0,0,0,0.25)]
  "
>
          <h3 className="text-3xl font-bold text-amber-900">
            {event.title}
          </h3>

          <p className="mt-4 text-lg text-amber-800">
            {event.description}
          </p>
        </button>
      </div>
    ))}
  </div>
</div>
      </div>
      {selectedEvent && (
  <div
  onClick={() => setSelectedEvent(null)}
  className="
    fixed
    inset-0
    z-[9999]
    flex
    items-center
    justify-center
    bg-black/70
    p-4
    backdrop-blur-sm
  "
>
    
    <div
    onClick={(e) => e.stopPropagation()}
  ref={popupRef}
  className="
    relative
    w-full
    max-w-sm
    rounded-[35px]
    bg-amber-100
    p-8
    shadow-2xl
  "
>
      <button
        onClick={() => setSelectedEvent(null)}
        className="
          absolute
          right-4
          top-4
          rounded-full
          p-2
        "
      >
        <X
          size={24}
          className="text-amber-700"
        />
      </button>

      <h3 className="mb-6 text-center text-3xl font-bold text-amber-900">
        {selectedEvent.title}
      </h3>

      <div className="space-y-4">
        <div className="rounded-2xl bg-amber-900 p-4 text-white">
          <p className="text-sm opacity-70">दिनांक</p>

          <p className="text-lg font-medium">
            {selectedEvent.details.date}
          </p>
        </div>

        <div className="rounded-2xl bg-amber-900 p-4 text-white">
          <p className="text-sm opacity-70">वेळ</p>

          <p className="text-lg font-medium">
            {selectedEvent.details.time}
          </p>
        </div>

        <div className="rounded-2xl bg-amber-900 p-4 text-white">
          <p className="text-sm opacity-70">स्थळ</p>

          <p className="text-lg font-medium">
            {selectedEvent.details.location}
          </p>
        </div>
      </div>

      <p className="mt-6 text-center text-amber-800">
        गणरायाच्या मंगल आगमन आणि पूजा सोहळा.
      </p>
    </div>
  </div>
)}
    </section>
  );
}