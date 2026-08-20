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
import PopupPortal from "@/components/ui/PopupPortal";

const galleryImages = [
  "/images/gallery/gallery-1.webp",
  "/images/gallery/gallery-2.webp",
  "/images/gallery/gallery-3.webp",
  "/images/gallery/gallery-4.webp",
  "/images/gallery/gallery-5.webp",
  "/images/gallery/gallery-6.webp",
  "/images/gallery/gallery-7.webp",
  "/images/gallery/gallery-8.webp",
];

export default function PhotoGallerySection() {
  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  const modalRef =
    useRef<HTMLDivElement>(null);

  const previousImage = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === 0
        ? galleryImages.length - 1
        : selectedIndex - 1
    );
  };

  const nextImage = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      (selectedIndex + 1) %
        galleryImages.length
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: previousImage,
    trackMouse: true,
  });

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const timer = setInterval(() => {
      setSelectedIndex((prev) => {
        if (prev === null) {
          return null;
        }

        return (
          (prev + 1) %
          galleryImages.length
        );
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [selectedIndex]);

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
        scale: 0.9,
        y: 40,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      }
    );
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "auto";
    }

    return () => {
      document.body.style.overflow =
        "auto";
    };
  }, [selectedIndex]);

  return (
    <>
      <section className="relative overflow-hidden py-20">
        {/* Background */}

        <Image
          src="/images/backgrounds/gallery-background.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-amber-950/70" />

        <div className="relative z-10 mx-auto max-w-6xl px-4">
          {/* Header */}

          <div className="mb-12 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-white/10 p-4 backdrop-blur-md">
                <Images className="h-7 w-7 text-amber-200" />
              </div>
            </div>

            <h2 className="text-4xl font-bold text-amber-100 md:text-6xl">
              छायाचित्र गॅलरी
            </h2>

            <p className="mt-4 text-amber-200">
              गणरायाच्या मंगल क्षणांची
              सुंदर आठवण
            </p>
          </div>

          {/* Gallery */}

          <div className="grid grid-cols-2 gap-4">
            {galleryImages.map(
              (image, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setSelectedIndex(index)
                  }
                  className="
                    group
                    overflow-hidden
                    rounded-[32px]
                    border-[4px]
                    border-amber-300
                    bg-gradient-to-b
                    from-amber-100
                    to-amber-50
                    p-1
                    shadow-2xl
                    transition-all
                    duration-500
                    hover:-translate-y-2
                  "
                >
                  <div
                    className="
                      relative
                      aspect-[3/4]
                      overflow-hidden
                      rounded-[28px]
                    "
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="50vw"
                      className="
                        object-cover
                        transition-all
                        duration-700
                        group-hover:scale-110
                      "
                    />

               
                  </div>
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Fullscreen Viewer */}

      {selectedIndex !== null && (
        <div
          className="
            fixed
            inset-0
            z-[99999]
            flex
            items-center
            justify-center
            bg-black/90
            p-4
            backdrop-blur-md
          "
        >
          <div
            {...swipeHandlers}
            ref={modalRef}
            className="
              relative
              w-full
              max-w-md
            "
          >
            {/* Close */}

            <button
              onClick={() =>
                setSelectedIndex(null)
              }
              className="
                absolute
                right-3
                top-3
                z-50
                rounded-full
                bg-black/50
                p-3
              "
            >
              <X className="text-white" />
            </button>

            {/* Counter */}

            <div
              className="
                absolute
                left-3
                top-3
                z-50
                rounded-full
                bg-black/50
                px-4
                py-2
                text-sm
                text-white
              "
            >
              {selectedIndex + 1}/
              {galleryImages.length}
            </div>

            {/* Previous */}

            <button
              onClick={previousImage}
              className="
                absolute
                left-3
                top-1/2
                z-50
                -translate-y-1/2
                rounded-full
                bg-black/50
                p-3
              "
            >
              <ChevronLeft className="text-white" />
            </button>

            {/* Next */}

            <button
              onClick={nextImage}
              className="
                absolute
                right-3
                top-1/2
                z-50
                -translate-y-1/2
                rounded-full
                bg-black/50
                p-3
              "
            >
              <ChevronRight className="text-white" />
            </button>

            {/* Image */}

            <div
              className="
                overflow-hidden
                rounded-[40px]
                border-[8px]
                border-amber-300
                bg-gradient-to-b
                from-amber-100
                to-amber-50
                p-2
                shadow-2xl
              "
            >
              <div
                className="
                  relative
                  aspect-[3/4]
                  overflow-hidden
                  rounded-[32px]
                "
              >
                <Image
                  src={
                    galleryImages[
                      selectedIndex
                    ]
                  }
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <p className="mt-4 text-center text-amber-200">
              👈 Swipe left or right 👉
            </p>
          </div>
        </div>
      )}
    </>
  );
}