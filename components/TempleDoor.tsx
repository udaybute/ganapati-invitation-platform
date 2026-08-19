"use client";

import Image from "next/image";
import { useState } from "react";
import { useMusic } from "@/components/contexts/MusicContext";

export default function TempleDoor() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const openDoor = () => {
    if (open) return;

    setOpen(true);

   const bellAudio = new Audio("/audio/temple-bell.mp3");
const chantAudio = new Audio("/audio/welcome-chant.mp3");

Promise.all([
  bellAudio.play(),
  chantAudio.play(),
]).catch((error) => {
  console.error(error);
});

    setTimeout(() => {
      setHidden(true);
    }, 5000);
  };

  if (hidden) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Left door */}

      <div
        className={`
          absolute
          inset-y-0
          left-0
          w-1/2
          transition-transform
          duration-[5000ms]
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            open
              ? "-translate-x-[105%]"
              : "translate-x-0"
          }
        `}
      >
        <Image
          src="/images/doors/left-door.png"
          alt="Left Door"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Right door */}

      <div
        className={`
          absolute
          inset-y-0
          right-0
          w-1/2
          transition-transform
          duration-[5000ms]
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            open
              ? "translate-x-[105%]"
              : "translate-x-0"
          }
        `}
      >
        <Image
          src="/images/doors/right-door.png"
          alt="Right Door"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Invisible clickable area over the "Tap to Open" symbol */}

      {!open && (
        <button
          aria-label="Open Temple Door"
          onClick={openDoor}
          className="
            absolute
            left-1/2
            top-[42%]
            z-50
            h-36
            w-36
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-transparent
            cursor-pointer
          "
        />
      )}
    </div>
  );
}