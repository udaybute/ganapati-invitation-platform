"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Images,
  X,
} from "lucide-react";
import { useSwipeable } from "react-swipeable";
import gsap from "gsap";

const galleryImages = [
  "/images/gallery/gallery-1.webp",
  "/images/gallery/gallery-2.webp",
  "/images/gallery/gallery-3.webp",
  "/images/gallery/gallery-4.webp",
  "/images/gallery/gallery-5.webp",
  "/images/gallery/gallery-6.webp",
];

export default function PhotoGallerySection() {
  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  const modalRef =
    useRef<HTMLDivElement>(null);

  /*
   * =========================================================
   * PREVIOUS IMAGE
   * =========================================================
   */

  const previousImage = () => {
    setSelectedIndex((current) => {
      if (current === null) {
        return null;
      }

      return current === 0
        ? galleryImages.length - 1
        : current - 1;
    });
  };

  /*
   * =========================================================
   * NEXT IMAGE
   * =========================================================
   */

  const nextImage = () => {
    setSelectedIndex((current) => {
      if (current === null) {
        return null;
      }

      return (
        (current + 1) %
        galleryImages.length
      );
    });
  };

  /*
   * =========================================================
   * SWIPE
   * =========================================================
   */

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: previousImage,
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  /*
   * =========================================================
   * AUTO SLIDESHOW
   * =========================================================
   */

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const timer = window.setInterval(() => {
      nextImage();
    }, 4000);

    return () => {
      window.clearInterval(timer);
    };
  }, [selectedIndex]);

  /*
   * =========================================================
   * MODAL ANIMATION
   * =========================================================
   */

  useEffect(() => {
    if (
      selectedIndex === null ||
      !modalRef.current
    ) {
      return;
    }

    gsap.fromTo(
      modalRef.current,
      {
        opacity: 0,
        scale: 0.94,
        y: 25,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
      }
    );
  }, [selectedIndex]);

  /*
   * =========================================================
   * LOCK PAGE SCROLL WHEN VIEWER IS OPEN
   * =========================================================
   */

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  /*
   * =========================================================
   * KEYBOARD CONTROLS
   * =========================================================
   */

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [selectedIndex]);

  return (
    <>
      {/* =====================================================
          GALLERY SECTION
      ====================================================== */}

      <section
        className="
          relative
          isolate
          min-h-screen
          overflow-hidden
          py-20
        "
      >
        {/* ===================================================
            BACKGROUND IMAGE
        ==================================================== */}

        <div
          className="
            absolute
            inset-0
            -z-20
          "
        >
          <Image
            src="/images/gallery/gallery-background.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="
              object-cover
              object-center
            "
          />
        </div>

        {/* ===================================================
            BACKGROUND OVERLAY
        ==================================================== */}

        <div
          className="
            absolute
            inset-0
            -z-10
            bg-black/45
          "
        />

        {/* ===================================================
            EXTRA WARM OVERLAY
        ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            -z-10
            bg-gradient-to-b
            from-amber-950/30
            via-transparent
            to-amber-950/60
          "
        />

        {/* ===================================================
            CONTENT
        ==================================================== */}

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-6xl
            px-4
          "
        >
          {/* =================================================
              HEADER
          ================================================== */}

          <div className="mb-12 text-center">
            <div className="mb-5 flex justify-center">
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-black/20
                  backdrop-blur-md
                  shadow-lg
                "
              >
                <Images
                  className="
                    h-8
                    w-8
                    text-amber-200
                  "
                />
              </div>
            </div>

            <h2
              className="
                text-4xl
                font-bold
                text-amber-100
                drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]
                md:text-6xl
              "
            >
              छायाचित्र गॅलरी
            </h2>

            <p
              className="
                mt-4
                text-base
                text-amber-100/90
                md:text-lg
              "
            >
              गणरायाच्या मंगल क्षणांची
              सुंदर आठवण
            </p>
          </div>

          {/* =================================================
              SIX IMAGE GALLERY
          ================================================== */}

          <div
            className="
              grid
              grid-cols-2
              gap-4
              md:grid-cols-3
              md:gap-6
            "
          >
            {galleryImages.map(
              (image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() =>
                    setSelectedIndex(index)
                  }
                  aria-label={`छायाचित्र ${
                    index + 1
                  } पहा`}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[28px]
                    bg-black/20
                    p-0
                    shadow-[0_15px_40px_rgba(0,0,0,0.3)]
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:shadow-[0_25px_55px_rgba(0,0,0,0.4)]
                    active:scale-[0.98]
                  "
                >
                  <div
                    className="
                      relative
                      aspect-[3/4]
                      overflow-hidden
                    "
                  >
                    <Image
                      src={image}
                      alt={`गणेश उत्सव
                      छायाचित्र ${index + 1}`}
                      fill
                      sizes="
                        (max-width: 768px) 50vw,
                        33vw
                      "
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-110
                      "
                    />

                    {/* Image overlay */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/35
                        via-transparent
                        to-transparent
                        opacity-70
                        transition-opacity
                        duration-500
                        group-hover:opacity-40
                      "
                    />

                    {/* Small view indicator */}

                    <div
                      className="
                        absolute
                        bottom-3
                        right-3
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-black/40
                        opacity-0
                        backdrop-blur-sm
                        transition-all
                        duration-500
                        group-hover:opacity-100
                      "
                    >
                      <Images
                        size={17}
                        className="text-white"
                      />
                    </div>
                  </div>
                </button>
              )
            )}
          </div>

          {/* =================================================
              GALLERY COUNT
          ================================================== */}

          <p
            className="
              mt-8
              text-center
              text-sm
              text-amber-100/80
            "
          >
            ६ मंगल क्षण • छायाचित्रे
          </p>
        </div>
      </section>

      {/* =====================================================
          FULLSCREEN IMAGE VIEWER
      ====================================================== */}

      {selectedIndex !== null && (
        <div
          className="
            fixed
            inset-0
            z-[99999]
            flex
            h-[100dvh]
            w-full
            items-center
            justify-center
            bg-black/90
            p-3
            backdrop-blur-md
            sm:p-6
          "
          onClick={() =>
            setSelectedIndex(null)
          }
        >
          {/* =================================================
              MODAL
          ================================================== */}

          <div
            {...swipeHandlers}
            ref={modalRef}
            onClick={(event) =>
              event.stopPropagation()
            }
            className="
              relative
              flex
              max-h-[94dvh]
              w-full
              max-w-md
              items-center
              justify-center
            "
          >
            {/* =================================================
                CLOSE BUTTON
            ================================================== */}

            <button
              type="button"
              onClick={() =>
                setSelectedIndex(null)
              }
              aria-label="बंद करा"
              className="
                absolute
                right-2
                top-2
                z-50
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-black/60
                text-white
                shadow-lg
                backdrop-blur-md
                transition-all
                hover:scale-110
                hover:bg-black/80
              "
            >
              <X size={22} />
            </button>

            {/* =================================================
                COUNTER
            ================================================== */}

            <div
              className="
                absolute
                left-2
                top-2
                z-50
                rounded-full
                bg-black/60
                px-4
                py-2
                text-sm
                font-medium
                text-white
                backdrop-blur-md
              "
            >
              {selectedIndex + 1} /{" "}
              {galleryImages.length}
            </div>

            {/* =================================================
                PREVIOUS BUTTON
            ================================================== */}

            <button
              type="button"
              onClick={previousImage}
              aria-label="मागील छायाचित्र"
              className="
                absolute
                left-2
                top-1/2
                z-50
                flex
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-black/60
                text-white
                backdrop-blur-md
                transition-all
                hover:scale-110
                hover:bg-black/80
              "
            >
              <ChevronLeft size={25} />
            </button>

            {/* =================================================
                NEXT BUTTON
            ================================================== */}

            <button
              type="button"
              onClick={nextImage}
              aria-label="पुढील छायाचित्र"
              className="
                absolute
                right-2
                top-1/2
                z-50
                flex
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-black/60
                text-white
                backdrop-blur-md
                transition-all
                hover:scale-110
                hover:bg-black/80
              "
            >
              <ChevronRight size={25} />
            </button>

            {/* =================================================
                IMAGE
            ================================================== */}

            <div
              className="
                relative
                flex
                max-h-[88dvh]
                w-full
                items-center
                justify-center
                overflow-hidden
                rounded-[28px]
                bg-black/20
                shadow-[0_30px_80px_rgba(0,0,0,0.6)]
              "
            >
              <div
                className="
                  relative
                  h-[78dvh]
                  max-h-[720px]
                  w-full
                "
              >
                <Image
                  src={
                    galleryImages[
                      selectedIndex
                    ]
                  }
                  alt={`गणेश उत्सव
                  छायाचित्र ${selectedIndex + 1}`}
                  fill
                  sizes="100vw"
                  priority
                  className="
                    object-contain
                  "
                />
              </div>
            </div>

            {/* =================================================
                SWIPE HINT
            ================================================== */}

            <p
              className="
                absolute
                -bottom-9
                left-1/2
                -translate-x-1/2
                whitespace-nowrap
                text-xs
                text-amber-100/80
              "
            >
              👈 Swipe left / right 👉
            </p>
          </div>
        </div>
      )}
    </>
  );
}