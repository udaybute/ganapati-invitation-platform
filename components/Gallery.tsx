"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export type GalleryPhoto = {
  url: string;
  caption?: string;
};

type GalleryProps = {
  photos: GalleryPhoto[];
};

const FRAME = {
  mobile: {
    top: "32.5%",
    bottom: "11.5%",
    left: "13.5%",
    right: "14%",
  },

  desktop: {
    top: "38%",
    bottom: "10%",
    left: "12.5%",
    right: "12.5%",
  },
};

/* ============================================================
   MARQUEE STRIP

   IMPORTANT:
   - Does NOT use scrollLeft
   - Does NOT depend on screen refresh rate
   - Supabase images use unoptimized
   - Continuous smooth movement
============================================================ */

function MarqueeStrip({
  photos,
  onSelect,
}: {
  photos: GalleryPhoto[];
  onSelect: (i: number) => void;
}) {
  if (photos.length === 0) return null;

  /*
   * For one image, no marquee is required.
   */

  if (photos.length === 1) {
    return (
      <div className="flex w-full justify-center pb-1">
        <button
          type="button"
          onClick={() => onSelect(0)}
          className="
            relative
            h-9
            w-9
            shrink-0
            overflow-hidden
            rounded-md
            border-2
            border-amber-400
            sm:h-11
            sm:w-11
          "
        >
          <Image
            src={photos[0].url}
            alt=""
            fill
            unoptimized
            sizes="44px"
            className="object-cover"
          />
        </button>
      </div>
    );
  }

  /*
   * Duplicate photos for seamless marquee.
   */
  const duplicatedPhotos = [...photos, ...photos];

  return (
    <div
      className="
        relative
        w-full
        max-w-full
        overflow-hidden
        pb-1
      "
    >
      <motion.div
        className="
          flex
          w-max
          gap-1.5
        "
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            duration: Math.max(photos.length * 3, 18),
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {duplicatedPhotos.map((photo, index) => (
          <button
            key={`${photo.url}-${index}`}
            type="button"
            onClick={() => onSelect(index % photos.length)}
            className="
              relative
              h-9
              w-9
              shrink-0
              overflow-hidden
              rounded-md
              border-2
              border-amber-400/40
              transition-all
              duration-300

              hover:border-amber-400
              active:scale-95

              sm:h-11
              sm:w-11
            "
          >
            <Image
              src={photo.url}
              alt=""
              fill
              unoptimized
              sizes="44px"
              className="object-cover"
            />
          </button>
        ))}
      </motion.div>
    </div>
  );
}

/* ============================================================
   MOBILE SHOWCASE

   Main image changes every 3.5 seconds.
============================================================ */

function MobileShowcase({
  photos,
}: {
  photos: GalleryPhoto[];
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;

    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % photos.length);
    }, 3500);

    return () => {
      window.clearInterval(id);
    };
  }, [photos.length]);

  return (
    <div
      className="
        flex
        h-full
        w-full
        flex-col
        items-center
        justify-center
        gap-2
        px-1
      "
    >
      {/* ==================================================
          MAIN MOBILE PHOTO
      ================================================== */}

      <div
        className="
          relative
          min-h-0
          w-full
          max-w-[420px]
          flex-1
          overflow-hidden
          rounded-xl
        "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{
              opacity: 0,
              scale: 1.02,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.995,
            }}
            transition={{
              duration: 0.65,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          >
            <Image
              src={photos[active].url}
              alt={photos[active].caption ?? ""}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover"
              priority={active === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* PHOTO COUNTER */}

        <div
          className="
            absolute
            left-2
            top-2
            z-10

            rounded-full
            bg-black/50

            px-2
            py-0.5

            text-[10px]
            text-amber-100

            backdrop-blur-sm
          "
        >
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(photos.length).padStart(2, "0")}
        </div>

        {/* CAPTION */}

        {photos[active].caption && (
          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              z-10

              bg-gradient-to-t
              from-black/70
              via-black/20
              to-transparent

              p-2
              text-left
            "
          >
            <p className="text-xs font-medium text-amber-100">
              {photos[active].caption}
            </p>
          </div>
        )}
      </div>

      {/* MOBILE THUMBNAILS */}

      <MarqueeStrip
        photos={photos}
        onSelect={setActive}
      />
    </div>
  );
}

/* ============================================================
   DESKTOP SHOWCASE

   3 x 3 grid.
============================================================ */

function DesktopShowcase({
  photos,
}: {
  photos: GalleryPhoto[];
}) {
  const cells = 9;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (photos.length <= cells) return;

    const id = window.setInterval(() => {
      setOffset(
        (current) => (current + 1) % photos.length
      );
    }, 4000);

    return () => {
      window.clearInterval(id);
    };
  }, [photos.length]);

  const shown = Array.from({
    length: Math.min(cells, photos.length),
  }).map(
    (_, index) =>
      photos[(offset + index) % photos.length]
  );

  return (
    <div
      className="
        flex
        h-full
        w-full
        flex-col
        gap-3
        px-2
        py-1
      "
    >
      {/* ==================================================
          3 × 3 GRID
      ================================================== */}

      <div
        className="
          grid
          min-h-0
          flex-1

          grid-cols-3
          grid-rows-3

          gap-2
        "
      >
        <AnimatePresence mode="popLayout">
          {shown.map((photo, index) => (
            <motion.div
              key={`${photo.url}-${offset}-${index}`}
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.98,
              }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
              }}
              className="
                relative
                overflow-hidden
                rounded-lg
              "
            >
              <Image
                src={photo.url}
                alt={photo.caption ?? ""}
                fill
                unoptimized
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* DESKTOP THUMBNAILS */}

      <MarqueeStrip
        photos={photos}
        onSelect={setOffset}
      />
    </div>
  );
}

/* ============================================================
   MAIN GALLERY
============================================================ */

export default function Gallery({
  photos,
}: GalleryProps) {
  if (photos.length === 0) {
    return null;
  }

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
      "
    >
      {/* ACCESSIBILITY */}

      <h2 className="sr-only">
        छायाचित्र गॅलरी
      </h2>

      {/* =====================================================
          MOBILE view
      ====================================================== */}

      <div
        className="
          relative
          w-full
          md:hidden
        "
        style={{
          aspectRatio: "1023 / 1537",
        }}
      >
        <Image
          src="/images/backgrounds/gallery-mobile-bg.png"
          alt=""
          fill
          sizes="100vw"
          priority
          className="
            -z-10
            object-cover
          "
        />

        <div
          className="absolute"
          style={{
            top: FRAME.mobile.top,
            bottom: FRAME.mobile.bottom,
            left: FRAME.mobile.left,
            right: FRAME.mobile.right,
          }}
        >
          <MobileShowcase
            photos={photos}
          />
        </div>
      </div>

      {/* =====================================================
          DESKTOP
      ====================================================== */}

      <div
        className="
          relative
          hidden
          w-full
          md:block
        "
        style={{
          aspectRatio: "1536 / 1024",
        }}
      >
        <Image
          src="/images/backgrounds/gallery-desktop-bg.png"
          alt=""
          fill
          sizes="100vw"
          priority
          className="
            -z-10
            object-cover
          "
        />

        <div
          className="absolute"
          style={{
            top: FRAME.desktop.top,
            bottom: FRAME.desktop.bottom,
            left: FRAME.desktop.left,
            right: FRAME.desktop.right,
          }}
        >
          <DesktopShowcase
            photos={photos}
          />
        </div>
      </div>
    </section>
  );
}