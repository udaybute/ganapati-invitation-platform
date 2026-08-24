import Image from "next/image";

type FooterProps = {
  mandalName: string;
  contact: string;
  address: string;
  instagramUrl?: string;
};

export default function Footer({
  mandalName,
  contact,
  address,
  instagramUrl,
}: FooterProps) {
  return (
    <footer className="relative overflow-hidden px-6 py-12 text-center">
      {/* Footer Background */}
      <Image
        src="/images/backgrounds/footer-background.png"
        alt=""
        fill
        priority={false}
        className="absolute inset-0 -z-12 h-full w-full object-cover object-center"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 " />

      {/* Premium subtle gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/20 via-black/35 to-black/75" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-md">
        {/* Ganapati */}
        <Image
          src="/images/ganapati/ganapati-murti.png"
          alt=""
          width={70}
          height={70}
          className="
            mx-auto
            opacity-95
            drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]
          "
        />

        {/* Mantra */}
        <p className="mt-3 text-xs tracking-widest text-amber-300">
          श्री गणेशाय नमः
        </p>

        {/* Mandal Name */}
        <h2 className="mt-1 text-2xl font-bold text-amber-50">
          {mandalName}
        </h2>

        {/* Tagline */}
        <p className="mt-1 text-sm font-medium text-amber-200">
          गणपती बाप्पा मोरया!
        </p>

        <p className="mt-1 text-xs text-amber-300/80">
          भक्ती, श्रद्धा आणि एकतेचा उत्सव
        </p>

        {/* Contact / Address */}
        <div className="mx-auto mt-6 flex max-w-xs flex-col gap-3">
          {/* Contact */}
          <div
            className="
              rounded-xl
              border
              border-amber-300/15
              bg-black/35
              px-4
              py-3
              text-left
              backdrop-blur-sm
            "
          >
            <p className="text-xs text-amber-300">
              संपर्क क्रमांक
            </p>

            <p className="mt-1 text-sm text-amber-50">
              {contact}
            </p>
          </div>

          {/* Address */}
          <div
            className="
              rounded-xl
              border
              border-amber-300/15
              bg-black/35
              px-4
              py-3
              text-left
              backdrop-blur-sm
            "
          >
            <p className="text-xs text-amber-300">
              आपला पत्ता
            </p>

            <p className="mt-1 text-sm leading-relaxed text-amber-50">
              {address}
            </p>
          </div>

          {/* Instagram */}
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-xl
                border
                border-amber-300/15
                bg-black/35
                px-4
                py-3
                text-left
                backdrop-blur-sm
                transition-all
                duration-300
                hover:border-amber-300/40
                hover:bg-black/50
              "
            >
              <p className="text-xs text-amber-300">
                Instagram
              </p>

              <p className="mt-1 text-sm text-amber-50">
                आमचे Instagram पेज →
              </p>
            </a>
          )}
        </div>

        {/* Bottom Divider */}
        <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

        {/* Copyright */}
        <p className="mt-5 text-[10px] leading-relaxed text-amber-200/55">
          © 2026 {mandalName}. सर्व हक्क राखीव.
          <br />
          Powered by Elvatrixa
        </p>
      </div>
    </footer>
  );
}