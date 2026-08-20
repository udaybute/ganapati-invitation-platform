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

       {/* Festival Journey Header */}

<div className="timeline-title relative mb-12 text-center md:mb-20">

  {/* Ambient glow */}

  <div
    className="
      pointer-events-none
      absolute
      left-1/2
      top-1/2
      h-56
      w-56
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      bg-amber-300/20
      blur-3xl
    "
  />

  {/* Small devotional heading */}

  <div className="relative z-10 flex items-center justify-center gap-3">

    <span
      className="
        h-px
        w-10
        bg-gradient-to-r
        from-transparent
        to-amber-500
        md:w-20
      "
    />

    <p
      className="
        text-sm
        font-bold
        tracking-[0.18em]
        text-amber-700
        md:text-base
      "
    >
      ॥ श्री गणेशाय नमः ॥
    </p>

    <span
      className="
        h-px
        w-10
        bg-gradient-to-l
        from-transparent
        to-amber-500
        md:w-20
      "
    />

  </div>


  {/* Decorative ornament */}

  <div className="relative z-10 mx-auto mt-5 flex justify-center">

    <div
      className="
        relative
        h-9
        w-40
        animate-pulse
        md:h-11
        md:w-52
      "
    >
      <Image
        src="/images/decorations/divider.png"
        alt=""
        fill
        sizes="208px"
        className="object-contain"
      />
    </div>

  </div>


  {/* Main title */}

  <h2
    className="
      relative
      z-10
      mt-4
      text-4xl
      font-extrabold
      leading-tight
      text-amber-950
      drop-shadow-[0_3px_8px_rgba(120,70,10,0.15)]
      sm:text-5xl
      md:text-6xl
      lg:text-7xl
    "
  >
    उत्सवाचा
    <span className="block text-amber-700">
      मंगल प्रवास
    </span>
  </h2>


  {/* Subtitle */}

  <p
    className="
      relative
      z-10
      mx-auto
      mt-5
      max-w-2xl
      px-3
      text-base
      leading-relaxed
      text-amber-800
      sm:text-lg
      md:text-xl
    "
  >
    गणरायाच्या आगमनापासून विसर्जनापर्यंत
    <br className="hidden sm:block" />
    प्रत्येक मंगल क्षणाची माहिती
  </p>


  {/* Bottom decorative line */}

  <div className="relative z-10 mx-auto mt-7 flex items-center justify-center gap-3">

    <span
      className="
        h-1
        w-1
        rounded-full
        bg-amber-500
      "
    />

    <span
      className="
        h-px
        w-20
        bg-gradient-to-r
        from-transparent
        via-amber-400
        to-transparent
        sm:w-32
      "
    />

    <span
      className="
        h-2
        w-2
        rotate-45
        border
        border-amber-500
        bg-amber-200
      "
    />

    <span
      className="
        h-px
        w-20
        bg-gradient-to-r
        from-transparent
        via-amber-400
        to-transparent
        sm:w-32
      "
    />

    <span
      className="
        h-1
        w-1
        rounded-full
        bg-amber-500
      "
    />

  </div>


  {/* Floating golden particles */}

  <span
    className="
      absolute
      left-[12%]
      top-[25%]
      h-2
      w-2
      animate-ping
      rounded-full
      bg-amber-400
    "
  />

  <span
    className="
      absolute
      right-[15%]
      top-[35%]
      h-1.5
      w-1.5
      animate-pulse
      rounded-full
      bg-orange-400
    "
  />

  <span
    className="
      absolute
      left-[20%]
      bottom-[10%]
      h-1.5
      w-1.5
      animate-pulse
      rounded-full
      bg-amber-500
    "
  />

  <span
    className="
      absolute
      right-[22%]
      bottom-[15%]
      h-2
      w-2
      animate-ping
      rounded-full
      bg-yellow-400
    "
  />

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

<div className="relative flex flex-col gap-5 md:gap-16">
  {events.map((event, index) => (
    <div
      key={event.id}
      className={`flex ${
        event.side === "left"
          ? "justify-start md:justify-start"
          : "justify-start md:justify-end"
      }`}
    >
      <button
        type="button"
        onClick={() => setSelectedEvent(event)}
        className="
          timeline-card
          group
          relative
          w-full
          max-w-md
          overflow-hidden
          rounded-[28px]
          border
          border-amber-300/70
          bg-gradient-to-br
          from-white
          via-amber-50
          to-orange-50
          p-5
          text-left
          shadow-[0_12px_35px_rgba(120,70,10,0.18)]
          transition-all
          duration-500
          active:scale-[0.98]
          md:rounded-[32px]
          md:p-7
          md:hover:-translate-y-3
          md:hover:scale-[1.02]
          md:hover:shadow-[0_25px_60px_rgba(120,70,10,0.28)]
        "
      >
        {/* Soft decorative glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-10
            -top-10
            h-28
            w-28
            rounded-full
            bg-amber-300/25
            blur-2xl
            transition-transform
            duration-700
            group-hover:scale-150
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-12
            -left-12
            h-28
            w-28
            rounded-full
            bg-orange-200/20
            blur-2xl
          "
        />

        {/* Card content */}

        <div className="relative z-10 flex items-center gap-4">
          {/* Event number */}

          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              border-amber-400/70
              bg-gradient-to-br
              from-amber-600
              via-orange-600
              to-amber-800
              text-xl
              font-bold
              text-white
              shadow-lg
              transition-transform
              duration-500
              group-hover:rotate-3
              group-hover:scale-110
              md:h-16
              md:w-16
            "
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Text */}

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <h3
                className="
                  text-2xl
                  font-extrabold
                  leading-tight
                  text-amber-950
                  md:text-3xl
                "
              >
                {event.title}
              </h3>

              {/* Arrow */}

              <span
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-amber-900/10
                  text-lg
                  text-amber-800
                  transition-all
                  duration-500
                  group-hover:translate-x-1
                  group-hover:bg-amber-900
                  group-hover:text-white
                "
              >
                →
              </span>
            </div>

            <p
              className="
                mt-2
                line-clamp-2
                text-sm
                leading-relaxed
                text-amber-800
                md:text-base
              "
            >
              {event.description}
            </p>
          </div>
        </div>

        {/* Bottom indicator */}

        <div
          className="
            relative
            z-10
            mt-5
            flex
            items-center
            justify-between
            border-t
            border-amber-200/80
            pt-3
          "
        >
          <span
            className="
              text-xs
              font-semibold
              tracking-wide
              text-amber-600
              md:text-sm
            "
          >
            मंगल सोहळा
          </span>

          <span
            className="
              text-xs
              font-semibold
              text-amber-700
              md:text-sm
            "
          >
            अधिक माहिती
          </span>
        </div>

        {/* Decorative corner */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-2
            right-2
            h-8
            w-8
            opacity-40
          "
        >
          <Image
            src="/images/ornaments/corner.png"
            alt=""
            fill
            sizes="32px"
            className="object-contain"
          />
        </div>
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
      z-[99999]
      flex
      items-center
      justify-center
      bg-black/75
      p-4
      backdrop-blur-md
    "
  >
    <div
      ref={popupRef}
      onClick={(e) => e.stopPropagation()}
      className="
        relative
        w-full
        max-w-md
        overflow-hidden
        rounded-[36px]
        border
        border-amber-300/70
        bg-gradient-to-b
        from-[#fff9e8]
        via-[#fff3cc]
        to-[#f8df9b]
        p-6
        shadow-[0_25px_80px_rgba(0,0,0,0.45)]
      "
    >
      {/* Decorative glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-48
          w-48
          rounded-full
          bg-amber-300/30
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          -left-20
          h-48
          w-48
          rounded-full
          bg-orange-300/20
          blur-3xl
        "
      />

      {/* Decorative corners */}
      <div className="pointer-events-none absolute left-4 top-4 h-12 w-12">
        <Image
          src="/images/ornaments/corner.png"
          alt=""
          fill
          sizes="48px"
          className="object-contain"
        />
      </div>

      <div className="pointer-events-none absolute right-4 top-4 h-12 w-12 rotate-90">
        <Image
          src="/images/ornaments/corner.png"
          alt=""
          fill
          sizes="48px"
          className="object-contain"
        />
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 h-12 w-12 -rotate-90">
        <Image
          src="/images/ornaments/corner.png"
          alt=""
          fill
          sizes="48px"
          className="object-contain"
        />
      </div>

      <div className="pointer-events-none absolute bottom-4 right-4 h-12 w-12 rotate-180">
        <Image
          src="/images/ornaments/corner.png"
          alt=""
          fill
          sizes="48px"
          className="object-contain"
        />
      </div>

      {/* Close button */}
      <button
        onClick={() => setSelectedEvent(null)}
        aria-label="Close"
        className="
          absolute
          right-4
          top-4
          z-20
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-amber-300
          bg-white/70
          text-amber-800
          shadow-md
          backdrop-blur-sm
          transition-all
          duration-300
          hover:rotate-90
          hover:scale-110
          hover:bg-amber-100
        "
      >
        <X size={22} />
      </button>

      {/* Content */}
      <div className="relative z-10 px-2 pt-5">
        {/* Small heading */}
        <p className="text-center text-sm font-semibold tracking-[0.2em] text-amber-700">
          ॥ श्री गणेशाय नमः ॥
        </p>

        {/* Ornament */}
        <div className="my-4 flex justify-center">
          <div className="relative h-8 w-36">
            <Image
              src="/images/decorations/divider.png"
              alt=""
              fill
              sizes="144px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Event title */}
        <h3
          className="
            text-center
            text-4xl
            font-extrabold
            text-amber-950
            drop-shadow-sm
          "
        >
          {selectedEvent.title}
        </h3>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-xs text-center text-base leading-relaxed text-amber-800">
          {selectedEvent.description}
        </p>

        {/* Information cards */}
        <div className="mt-7 space-y-3">
          {/* Date */}
          <div
            className="
              flex
              items-center
              gap-4
              rounded-2xl
              border
              border-amber-300/60
              bg-white/65
              p-4
              shadow-sm
              backdrop-blur-sm
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-amber-600
                to-orange-700
                text-xl
                shadow-md
              "
            >
              📅
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                दिनांक
              </p>

              <p className="mt-1 text-lg font-bold text-amber-950">
                {selectedEvent.details.date}
              </p>
            </div>
          </div>

          {/* Time */}
          <div
            className="
              flex
              items-center
              gap-4
              rounded-2xl
              border
              border-amber-300/60
              bg-white/65
              p-4
              shadow-sm
              backdrop-blur-sm
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-amber-600
                to-orange-700
                text-xl
                shadow-md
              "
            >
              🕐
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                वेळ
              </p>

              <p className="mt-1 text-lg font-bold text-amber-950">
                {selectedEvent.details.time}
              </p>
            </div>
          </div>

          {/* Location */}
          <div
            className="
              flex
              items-center
              gap-4
              rounded-2xl
              border
              border-amber-300/60
              bg-white/65
              p-4
              shadow-sm
              backdrop-blur-sm
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-amber-600
                to-orange-700
                text-xl
                shadow-md
              "
            >
              📍
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                स्थळ
              </p>

              <p className="mt-1 text-lg font-bold text-amber-950">
                {selectedEvent.details.location}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <div className="mt-6 rounded-2xl bg-amber-900 px-5 py-4 text-center shadow-lg">
          <p className="text-sm leading-relaxed text-amber-100">
            🙏 गणरायाच्या मंगल सोहळ्यास
            <br />
            आपली उपस्थिती लाभावी हीच मनःपूर्वक इच्छा.
          </p>
        </div>

        {/* Bottom ornament */}
        <div className="mt-5 flex justify-center">
          <div className="relative h-7 w-32 opacity-80">
            <Image
              src="/images/decorations/divider.png"
              alt=""
              fill
              sizes="128px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </section>
  );
}