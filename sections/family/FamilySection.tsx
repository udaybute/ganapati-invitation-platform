"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { familyMembers } from "@/sections/family/familyData";

export default function FamilySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);

  const currentMember = familyMembers[activeIndex];

  /*
   * =========================================================
   * CHANGE FAMILY MEMBER
   * =========================================================
   *
   * Smooth transition:
   *
   * 1. Current card starts fading/moving.
   * 2. Photo changes.
   * 3. New card smoothly settles into position.
   */

  const changeMember = useCallback(
    (direction: "next" | "previous") => {
      if (familyMembers.length <= 1 || isShuffling) {
        return;
      }

      setIsShuffling(true);

      /*
       * Small delay allows the current card
       * to begin its exit animation.
       */
      window.setTimeout(() => {
        setActiveIndex((prev) => {
          if (direction === "next") {
            return prev === familyMembers.length - 1
              ? 0
              : prev + 1;
          }

          return prev === 0
            ? familyMembers.length - 1
            : prev - 1;
        });

        /*
         * Allow the new card animation to complete.
         */
        window.setTimeout(() => {
          setIsShuffling(false);
        }, 650);
      }, 180);
    },
    [isShuffling]
  );

  /*
   * =========================================================
   * NEXT
   * =========================================================
   */

  const goNext = useCallback(() => {
    changeMember("next");
  }, [changeMember]);

  /*
   * =========================================================
   * PREVIOUS
   * =========================================================
   */

  const goPrevious = useCallback(() => {
    changeMember("previous");
  }, [changeMember]);

  /*
   * =========================================================
   * AUTOMATIC SLIDESHOW
   * =========================================================
   *
   * Changes family member every 3 seconds.
   */

  useEffect(() => {
    if (familyMembers.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      changeMember("next");
    }, 3000);

    return () => {
      window.clearInterval(interval);
    };
  }, [changeMember]);

  /*
   * =========================================================
   * EMPTY STATE
   * =========================================================
   */

  if (familyMembers.length === 0 || !currentMember) {
    return null;
  }

  return (
    <section
      id="family"
      className="
        relative
        min-h-[720px]
        overflow-hidden
        py-14
        sm:py-16
        lg:min-h-[850px]
        lg:py-20
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 z-0">
        <Image
          src="/images/backgrounds/FamilySection.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* =====================================================
          BACKGROUND OVERLAY
      ====================================================== */}

      <div
        className="
          absolute
          inset-0
          z-[1]
          bg-black/10
        "
      />

      {/* =====================================================
          LEFT FLOWER GARLAND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-0
          top-[110px]
          z-20
          w-[115px]
          sm:w-[165px]
          md:w-[210px]
          lg:top-[125px]
          lg:w-[250px]
          xl:w-[290px]
        "
      >
        <div className="garland-swing-left">
          <Image
            src="/images/decorations/flower-garland-left.webp"
            alt=""
            width={600}
            height={900}
            sizes="
              (max-width: 640px) 115px,
              (max-width: 1024px) 210px,
              290px
            "
            className="
              h-auto
              w-full
              object-contain
            "
          />
        </div>
      </div>

      {/* =====================================================
          RIGHT FLOWER GARLAND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-[110px]
          z-20
          w-[115px]
          sm:w-[165px]
          md:w-[210px]
          lg:top-[125px]
          lg:w-[250px]
          xl:w-[290px]
        "
      >
        <div className="garland-swing-right">
          <Image
            src="/images/decorations/flower-garland-right.webp"
            alt=""
            width={600}
            height={900}
            sizes="
              (max-width: 640px) 115px,
              (max-width: 1024px) 210px,
              290px
            "
            className="
              h-auto
              w-full
              object-contain
            "
          />
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-30
          mx-auto
          flex
          max-w-6xl
          flex-col
          items-center
          px-5
        "
      >
        {/* =====================================================
            TOP MANTRA
        ====================================================== */}

        <p
          className="
            text-[9px]
            font-semibold
            tracking-[0.18em]
            text-[#f8e6a7]
            sm:text-[11px]
          "
        >
          ॥ श्री गणेशाय नमः ॥
        </p>

        {/* =====================================================
            TITLE
        ====================================================== */}

        <h2
          className="
            mt-1
            text-center
            text-[25px]
            font-bold
            leading-tight
            text-[#fff8df]
            drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]
            sm:text-3xl
            md:text-4xl
          "
        >
          श्री गणेश युवा शक्ती मंडळ
        </h2>

        {/* =====================================================
            SUBTITLE
        ====================================================== */}

        <p
          className="
            mt-2
            text-center
            text-[9px]
            font-medium
            leading-relaxed
            text-[#f9dc77]
            sm:text-xs
          "
        >
          गणेशोत्सवाच्या मंगलमय सोहळ्यात
          <br />
          आपले हार्दिक स्वागत
        </p>

        {/* =====================================================
            PHOTO STACK
        ====================================================== */}
{/* =====================================================
    PREMIUM FAMILY CAROUSEL
===================================================== */}

<div className="relative mt-8 w-full sm:mt-10">

  {/* FIXED CAROUSEL STAGE */}
  <div
    className="
      relative
      mx-auto
      h-[430px]
      w-full
      overflow-hidden
      sm:h-[515px]
      md:h-[560px]
    "
  >

    {familyMembers.map((member, index) => {
      const total = familyMembers.length;

      let offset = index - activeIndex;

      /*
       * Make the carousel circular.
       *
       * Example:
       * active = 0
       * previous = last item
       * next = 1
       */

      if (offset > total / 2) {
        offset -= total;
      }

      if (offset < -total / 2) {
        offset += total;
      }

      /*
       * Only show the active card
       * and immediate neighbours.
       */
      const isVisible = Math.abs(offset) <= 1;

      const isActive = offset === 0;

      /*
       * Position cards independently.
       *
       * -1 = left
       *  0 = center
       * +1 = right
       */

      const mobileDistance = 165;
      const desktopDistance = 245;

      return (
        <div
          key={member.id}
          className="
            absolute
            left-1/2
            top-0
            flex
            justify-center
            will-change-transform
            transition-all
            duration-[800ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
          "
          style={{
            zIndex: isActive ? 20 : 10,

            opacity: isVisible
              ? isActive
                ? 1
                : 0.58
              : 0,

            transform: `
              translateX(
                calc(
                  -50% +
                  ${
                    offset * mobileDistance
                  }px
                )
              )
              scale(${isActive ? 1 : 0.82})
              rotateY(${offset * -4}deg)
            `,

            pointerEvents: isActive ? "auto" : "none",
          }}
        >

          {/* CARD */}
<div
  className="
    relative
    w-[300px]
    h-[400px]
    aspect-[4/3]
    overflow-hidden
    rounded-[28px]
    bg-[#fffaf0]
    shadow-[0_18px_45px_rgba(30,10,0,0.38)]

    sm:w-[420px]
    md:w-[520px]
    lg:w-[560px]
  "
>
  {/* PHOTO */}
  <div className="relative h-full w-full overflow-hidden">
    <Image
      src={member.image}
      alt={member.name}
      fill
      priority={index === 0}
      sizes="
        (max-width: 640px) 300px,
        (max-width: 768px) 420px,
        (max-width: 1024px) 520px,
        560px
      "
      className="
        object-cover
        object-center
      "
    />

    {/* subtle cinematic overlay */}
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        bg-gradient-to-t
        from-black/25
        via-transparent
        to-transparent
      "
    />
  </div>

  {/* NAME */}
  <div
    className="
      absolute
      bottom-0
      left-0
      right-0
      bg-gradient-to-t
      from-black/75
      via-black/35
      to-transparent
      px-5
      pb-5
      pt-14
      sm:px-6
      sm:pb-6
    "
  >
    <p
      className="
        text-center
        text-sm
        font-bold
        text-white
        sm:text-base
      "
    >
      {member.name}
    </p>
  </div>
</div>

        </div>
      );
    })}

  </div>


  {/* =====================================================
      CONTROLS
  ===================================================== */}

  <div
    className="
      relative
      z-40
      mt-5
      flex
      items-center
      justify-center
      gap-3
      sm:mt-6
    "
  >

    {/* PREVIOUS */}
    <button
      type="button"
      onClick={goPrevious}
      aria-label="Previous family member"
      className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-full
        bg-[#fff7dc]
        text-[#71300d]
        shadow-[0_5px_15px_rgba(0,0,0,0.25)]
        transition-all
        duration-300
        hover:scale-110
        hover:bg-white
        active:scale-95
        sm:h-10
        sm:w-10
      "
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>


    {/* NEXT */}
    <button
      type="button"
      onClick={goNext}
      aria-label="Next family member"
      className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-full
        bg-[#fff7dc]
        text-[#71300d]
        shadow-[0_5px_15px_rgba(0,0,0,0.25)]
        transition-all
        duration-300
        hover:scale-110
        hover:bg-white
        active:scale-95
        sm:h-10
        sm:w-10
      "
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>

  </div>

</div>

        {/* =====================================================
            BOTTOM MESSAGE
        ====================================================== */}

        <div
          className="
            mt-8
            max-w-[285px]
            text-center
            sm:mt-10
            sm:max-w-md
          "
        >
          <p
            className="
              text-[8px]
              font-medium
              leading-[1.8]
              text-[#fff4d1]
              sm:text-[11px]
            "
          >
            गणरायाच्या आगमनाने मंगलमय आणि आनंदी होवो
            <br />
            आपल्या सर्वांच्या आयुष्यात सुख-समृद्धी नांदो.
          </p>
        </div>
      </div>

      {/* =====================================================
          BOTTOM CURVE
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          z-10
          h-[65px]
          w-full
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            -bottom-[48px]
            left-1/2
            h-[95px]
            w-[120%]
            -translate-x-1/2
            rounded-[50%_50%_0_0]
            bg-[#fff9e8]
          "
        />
      </div>

      {/* =====================================================
          DIYA
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-1
          left-4
          z-30
          text-xl
          sm:left-8
          sm:text-2xl
        "
        aria-hidden="true"
      >
        🪔
      </div>
    </section>
  );
}