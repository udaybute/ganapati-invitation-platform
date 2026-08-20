"use client";

import Image from "next/image";
import { MapPin, Phone } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden py-16 md:py-24">
      {/* Background */}

      <Image
        src="/images/backgrounds/footer-background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-amber-950/30" />

      {/* Outer Border */}

      <div className="absolute inset-3 rounded-[28px] border border-amber-500/60 md:inset-5 md:rounded-[40px]" />

      {/* Left Mandala */}

      <div className="absolute left-[-20px] top-1/3 h-72 w-72 opacity-30 md:left-[-80px] md:h-96 md:w-96">
        <Image
          src="/images/decorations/mandala.png"
          alt=""
          fill
          sizes="384px"
          className="object-contain"
        />
      </div>

      {/* Right Mandala */}

      <div className="absolute right-[-20px] top-1/3 h-72 w-72 opacity-30 md:right-[-80px] md:h-96 md:w-96">
        <Image
          src="/images/decorations/mandala-v2.png"
          alt=""
          fill
          sizes="384px"
          className="object-contain"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5">
       

        {/* Ganapati */}

        <div className="mb-6 flex justify-center">
          <div className="relative h-20 w-20 md:h-24 md:w-24">
            <Image
              src="/images/ganapati/ganapati-murti.png"
              alt="Ganapati"
              fill
              sizes="96px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Title */}

        <div className="text-center">
          <h2 className="text-4xl font-bold text-amber-200 md:text-7xl">
            श्री गणेश उत्सव मंडळ
          </h2>

          <div className="mx-auto my-6 h-px w-48 bg-amber-500/50" />

          <p className="text-2xl text-amber-100 md:text-4xl">
            गणपती बाप्पा मोरया!
          </p>

          <p className="mt-3 text-3xl font-semibold text-amber-400 md:text-5xl">
            पुढच्या वर्षी लवकर या!
          </p>
        </div>

        {/* Contact Title */}

        <div className="mt-14 flex justify-center">
          <div className="rounded-full border border-amber-500 bg-amber-950/50 px-10 py-3 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-amber-200 md:text-3xl">
              संपर्क
            </h3>
          </div>
        </div>

        {/* Contact Card */}

        <div
          className="
            mx-auto
            mt-8
            max-w-4xl
            rounded-[32px]
            border
            border-amber-500/50
            bg-amber-950/20
            p-8
            backdrop-blur-md
          "
        >
          <div className="grid gap-10 md:grid-cols-2">
            {/* Phone */}

            <a
              href="tel:+918668296156"
              className="group text-center"
            >
              <div
                className="
                  mx-auto
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-amber-500
                  bg-amber-900/30
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                <Phone
                  size={34}
                  className="text-amber-300"
                />
              </div>

              <p className="mt-5 text-xl text-amber-100 md:text-3xl">
                +91 866 829 6156 
              </p>
            </a>

            {/* Location */}

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-center"
            >
              <div
                className="
                  mx-auto
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-amber-500
                  bg-amber-900/30
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                <MapPin
                  size={34}
                  className="text-amber-300"
                />
              </div>

              <p className="mt-5 text-xl text-amber-100 md:text-3xl">
                शिवाजीनगर, पुणे
              </p>
            </a>
          </div>
        </div>

        {/* Divider */}

        <div className="my-12 h-px bg-amber-500/40" />

        {/* Copyright */}

        <div className="pb-6 text-center">
          <p className="text-lg text-amber-400 md:text-2xl">
            © 2026 श्री गणेश उत्सव मंडळ. सर्व हक्क राखीव.
          </p>

          <p className="mt-4 text-base text-amber-100 md:text-xl">
            आमची उपक्रमे व आमच्यासंबंधी पाहण्यासाठी
            <br />
            आमच्याशी जोडलेले रहा.
          </p>
        </div>
      </div>
    </footer>
  );
}