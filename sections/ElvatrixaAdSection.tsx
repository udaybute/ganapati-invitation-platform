"use client";

import Image from "next/image";
import {
  CheckCircle2,
  ChevronRight,
  Code2,
  Headphones,
  MessageCircle,
  Palette,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Zap,
} from "lucide-react";

const WHATSAPP_NUMBER = "918668296156";

const whatsappMessage = encodeURIComponent(
  `नमस्कार Elvatrixa टीम,

मला माझ्या गणेश मंडळासाठी Digital Invitation तयार करून घ्यायचे आहे.

मला तुमच्या ₹499 Basic / ₹999 Custom Digital Invitation बद्दल माहिती हवी आहे.

तसेच मला गणपती मंडळासाठी Website बनवून घ्यायची आहे.

कृपया मला अधिक माहिती द्या.

धन्यवाद 🙏`
);

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

export default function ElvatrixaAdSection() {
  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        bg-[#090016]
        py-16
        sm:py-20
        md:py-24
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/advertisement/ad-background.png"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Dark overlay */}

      <div
        className="
          absolute
          inset-0
          -z-10
          bg-[#090016]/55
        "
      />

      {/* Purple / blue glow */}

      <div
        className="
          pointer-events-none
          absolute
          left-[-120px]
          top-[20%]
          -z-10
          h-[280px]
          w-[280px]
          rounded-full
          bg-fuchsia-600/20
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[10%]
          right-[-100px]
          -z-10
          h-[300px]
          w-[300px]
          rounded-full
          bg-cyan-500/20
          blur-[100px]
        "
      />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-6xl
          px-4
          sm:px-6
        "
      >
        {/* ===================================================
            TOP BRAND
        ==================================================== */}

        <div className="flex flex-col items-center text-center">
          <div
            className="
              relative
              h-[65px]
              w-[210px]
              sm:h-[75px]
              sm:w-[240px]
            "
          >
            <Image
              src="/images/elvatrixa/elvatrixa-logo.png"
              alt="Elvatrixa"
              fill
              sizes="240px"
              className="object-contain"
            />
          </div>

          <div
            className="
              mt-5
              flex
              items-center
              gap-2
              text-sm
              font-medium
              tracking-wide
              text-white/80
              sm:text-base
            "
          >
            <Sparkles
              size={16}
              className="text-fuchsia-400"
            />

            <span>
              तुमचा उत्सव, तुमची ओळख
            </span>

            <Sparkles
              size={16}
              className="text-cyan-400"
            />
          </div>

          <h2
            className="
              mt-4
              max-w-3xl
              text-3xl
              font-extrabold
              leading-tight
              text-white
              sm:text-4xl
              md:text-5xl
            "
          >
            तुमच्या मंडळासाठी
            <span
              className="
                block
                bg-gradient-to-r
                from-fuchsia-400
                via-purple-400
                to-cyan-400
                bg-clip-text
                text-transparent
              "
            >
              डिजिटल आमंत्रण तयार करा!
            </span>
          </h2>

          <p
            className="
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-white/75
              sm:text-base
              sm:leading-8
            "
          >
            तुमच्या गणेश मंडळासाठी आकर्षक,
            आधुनिक आणि मोबाइल-फ्रेंडली Digital
            Invitation तयार करून मिळवा.
          </p>
        </div>

 {/* ===================================================
    PRICING SECTION
=================================================== */}

<div
  className="
    mx-auto
    mt-10
    grid
    w-full
    max-w-4xl
    grid-cols-1
    gap-5
    sm:gap-6
    md:grid-cols-2
  "
>
  {/* =================================================
      BASIC PLAN
  ================================================== */}

  <div
    className="
  pricing-custom-card
  group
  relative
  overflow-hidden
  rounded-[26px]
  border
  border-cyan-400/50
  bg-gradient-to-br
  from-[#06151c]/95
  via-[#080b17]/95
  to-[#080914]/95
  p-5
  shadow-[0_15px_45px_rgba(0,0,0,0.35)]
  backdrop-blur-xl
  transition-all
  duration-500
  hover:-translate-y-2
  hover:scale-[1.02]
  sm:p-6
  md:p-7
"
  >
    {/* Glow */}

    <div
      className="
      pricing-shimmer
        pointer-events-none
        absolute
        -right-16
        -top-16
        h-36
        w-36
        rounded-full
        bg-fuchsia-600/20
        blur-[60px]
      "
    />

    {/* Content */}

    <div className="relative">
      {/* Badge */}

      <div className="flex justify-center">
        <div
  className="
    pricing-badge
    rounded-full
    bg-gradient-to-r
    from-fuchsia-600
    to-purple-600
    px-5
    py-2
    text-xs
    font-bold
    text-white
    sm:text-sm
  "
>
  BASIC आमंत्रण
</div>
      </div>

      {/* Price */}

      <div className="mt-5 text-center">
        <div
          className="
            flex
            items-baseline
            justify-center
            gap-2
          "
        >
         <span
  className="
    pricing-price
    inline-block
    text-5xl
    font-black
    tracking-tight
    text-white
    sm:text-6xl
  "
>
  ₹499
</span>

          <span
            className="
              text-xs
              font-medium
              text-white/50
              sm:text-sm
            "
          >
            फक्त
          </span>
        </div>
      </div>

      {/* Divider */}

      <div
        className="
          my-5
          h-px
          bg-gradient-to-r
          from-transparent
          via-fuchsia-400/30
          to-transparent
        "
      />

      {/* Features */}

      <div className="space-y-3.5">
        <Feature text="सुंदर प्रीमियम डिझाईन" />
        <Feature text="मोबाइल फ्रेंडली" />
        <Feature text="मंडळाची मूलभूत माहिती" />
        <Feature text="जलद डिलिव्हरी" />
      </div>

      {/* Bottom Label */}

      <div
        className="
          mt-6
          rounded-xl
          bg-fuchsia-500/5
          px-3
          py-2
          text-center
          text-xs
          text-fuchsia-200/70
        "
      >
        सुरुवातीसाठी योग्य
      </div>
    </div>
  </div>

  {/* =================================================
      CUSTOM PLAN
  ================================================== */}

  <div
    className="
    pricing-custom-card
      group
      relative
      overflow-hidden
      rounded-[26px]
      border
      border-cyan-400/50
      bg-gradient-to-br
      from-[#06151c]/95
      via-[#080b17]/95
      to-[#080914]/95
      p-5
      shadow-[0_15px_45px_rgba(0,0,0,0.35)]
      backdrop-blur-xl
      transition-all
      duration-500
      hover:-translate-y-1
      hover:border-cyan-400/80
      hover:shadow-[0_20px_55px_rgba(34,211,238,0.15)]
      sm:p-6
      md:p-7
    "
  >
    {/* Glow */}

    <div
      className="
      pricing-shimmer
        pointer-events-none
        absolute
        -bottom-16
        -right-16
        h-36
        w-36
        rounded-full
        bg-cyan-500/20
        blur-[60px]
      "
    />

    <div className="relative">
      {/* Badge */}

      <div className="flex justify-center">
  <div
  className="
    pricing-badge
    rounded-full
    bg-gradient-to-r
    from-blue-600
    to-cyan-500
    px-5
    py-2
    text-xs
    font-bold
    text-white
    sm:text-sm
  "
>
  CUSTOM आमंत्रण
</div>
      </div>

      {/* Price */}

      <div className="mt-5 text-center">
        <div
          className="
            flex
            items-baseline
            justify-center
            gap-2
          "
        >
         <span
  className="
    pricing-price
    inline-block
    text-5xl
    font-black
    tracking-tight
    text-white
    sm:text-6xl
  "
>
  ₹999
</span>

          <span
            className="
              text-xs
              font-medium
              text-white/50
              sm:text-sm
            "
          >
            फक्त
          </span>
        </div>
      </div>

      {/* Divider */}

      <div
        className="
          my-5
          h-px
          bg-gradient-to-r
          from-transparent
          via-cyan-400/30
          to-transparent
        "
      />

      {/* Features */}

      <div className="space-y-3.5">
        <Feature text="पूर्ण Custom Design" />
        <Feature text="तुमच्या पसंतीनुसार Theme" />
        <Feature text="Animation Effects" />
        <Feature text="विशेष Features" />
      </div>

      {/* Bottom Label */}

      <div
        className="
          mt-6
          rounded-xl
          bg-cyan-500/5
          px-3
          py-2
          text-center
          text-xs
          text-cyan-200/70
        "
      >
        पूर्णपणे तुमच्या शैलीनुसार
      </div>
    </div>
  </div>
</div>

        {/* ===================================================
            WEBSITE OFFER
        ==================================================== */}

        <div
          className="
            relative
            mx-auto
            mt-8
            max-w-4xl
            overflow-hidden
            rounded-[32px]
            border
            border-white/15
            bg-black/30
            p-6
            shadow-2xl
            backdrop-blur-xl
            sm:p-8
          "
        >
          {/* Glow */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              h-40
              w-72
              -translate-x-1/2
              rounded-full
              bg-purple-600/20
              blur-[80px]
            "
          />

          <div
            className="
              relative
              grid
              items-center
              gap-8
              md:grid-cols-[0.9fr_1.1fr]
            "
          >
            {/* Icon */}

            <div className="flex justify-center">
              <div
                className="
                  flex
                  h-28
                  w-28
                  items-center
                  justify-center
                  rounded-[30px]
                  border
                  border-cyan-400/30
                  bg-gradient-to-br
                  from-fuchsia-600/20
                  to-cyan-500/20
                  shadow-[0_0_50px_rgba(59,130,246,0.15)]
                "
              >
                <Code2
                  size={58}
                  strokeWidth={1.5}
                  className="
                    text-cyan-300
                  "
                />
              </div>
            </div>

            {/* Content */}

            <div>
              <p
                className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-cyan-300
                "
              >
                Ganapati Mandal Website
              </p>

              <h3
                className="
                  mt-2
                  text-2xl
                  font-bold
                  text-white
                  sm:text-3xl
                "
              >
                तुमच्या मंडळासाठी
                <span
                  className="
                    block
                    bg-gradient-to-r
                    from-fuchsia-400
                    to-cyan-400
                    bg-clip-text
                    text-transparent
                  "
                >
                  Premium Website
                </span>
              </h3>

              <p
                className="
                  mt-4
                  text-sm
                  leading-7
                  text-white/70
                  sm:text-base
                "
              >
                मंडळाचा पूर्ण खर्च, देणगी,
                हिशोब आणि कार्यक्रमांची माहिती
                व्यवस्थित manage करा आणि
                सर्व सदस्यांसाठी पारदर्शकता
                ठेवा.
              </p>

              <div
                className="
                  mt-5
                  grid
                  grid-cols-1
                  gap-3
                  sm:grid-cols-2
                "
              >
                <WebsiteFeature
                  icon={<ShieldCheck size={17} />}
                  text="पारदर्शक हिशोब"
                />

                <WebsiteFeature
                  icon={<Smartphone size={17} />}
                  text="Mobile Friendly"
                />

                <WebsiteFeature
                  icon={<Zap size={17} />}
                  text="Fast & Modern"
                />

                <WebsiteFeature
                  icon={<Code2 size={17} />}
                  text="Custom Features"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            TRUST STRIP
        ==================================================== */}

        <div
          className="
            mx-auto
            mt-8
            grid
            max-w-4xl
            grid-cols-2
            gap-3
            sm:grid-cols-4
          "
        >
          <TrustItem
            icon={<Palette size={20} />}
            text="Professional Design"
          />

          <TrustItem
            icon={<Zap size={20} />}
            text="Fast Delivery"
          />

          <TrustItem
            icon={<Headphones size={20} />}
            text="Full Support"
          />

          <TrustItem
            icon={<ShieldCheck size={20} />}
            text="Secure & Reliable"
          />
        </div>

        {/* ===================================================
            CTA
        ==================================================== */}

        <div
          className="
            relative
            mx-auto
            mt-10
            max-w-4xl
            overflow-hidden
            rounded-[32px]
            border
            border-cyan-400/30
            bg-gradient-to-r
            from-fuchsia-600/20
            via-purple-600/20
            to-cyan-500/20
            p-7
            text-center
            shadow-[0_20px_80px_rgba(0,0,0,0.4)]
            backdrop-blur-xl
            sm:p-10
          "
        >
          {/* Animated glow */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              h-24
              w-72
              -translate-x-1/2
              rounded-full
              bg-cyan-400/20
              blur-[70px]
            "
          />

          <div className="relative">
            <p
              className="
                text-sm
                font-medium
                text-white/70
              "
            >
              तुमचा उत्सव डिजिटल बनवा
            </p>

            <h3
              className="
                mt-2
                text-3xl
                font-extrabold
                text-white
                sm:text-4xl
              "
            >
              आजच संपर्क करा!
            </h3>

            <a
              href={`tel:${WHATSAPP_NUMBER}`}
              className="
                mt-4
                block
                text-4xl
                font-black
                tracking-wide
                text-transparent
                bg-gradient-to-r
                from-fuchsia-400
                via-purple-300
                to-cyan-400
                bg-clip-text
                sm:text-5xl
              "
            >
              8668296156
            </a>

            <p
              className="
                mt-3
                text-sm
                text-white/70
              "
            >
              तुमचा उत्सव डिजिटल बनवा,
              अधिक सुंदर बनवा!
            </p>

            {/* WhatsApp CTA */}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                mx-auto
                mt-7
                flex
                w-full
                max-w-sm
                items-center
                justify-center
                gap-3
                rounded-full
                bg-gradient-to-r
                from-[#25D366]
                to-[#128C7E]
                px-7
                py-4
                text-base
                font-bold
                text-white
                shadow-[0_12px_35px_rgba(37,211,102,0.25)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_18px_45px_rgba(37,211,102,0.35)]
                active:scale-[0.98]
              "
            >
              <MessageCircle
                size={24}
                fill="currentColor"
              />

              <span>
                WhatsApp वर मेसेज करा
              </span>

              <ChevronRight
                size={20}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </a>

            <p
              className="
                mt-4
                text-xs
                text-white/50
              "
            >
              क्लिक करा आणि आम्हाला थेट
              WhatsApp वर मेसेज पाठवा
            </p>
          </div>
        </div>

        {/* ===================================================
            BOTTOM BRAND
        ==================================================== */}

        <div
          className="
            mt-12
            text-center
            text-xs
            text-white/40
          "
        >
          <p>
            © {new Date().getFullYear()} Elvatrixa
          </p>

          <p className="mt-1">
            Digital Experiences • Websites •
            Digital Invitations
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FEATURE COMPONENT
============================================================ */

function Feature({
  text,
}: {
  text: string;
}) {
  return (
    <div
      className="
        flex
        min-h-[28px]
        items-center
        gap-3
      "
    >
      <CheckCircle2
        size={17}
        strokeWidth={2}
        className="
          shrink-0
          text-fuchsia-400
        "
      />

      <span
        className="
          text-[13px]
          leading-5
          text-white/75
          sm:text-sm
        "
      >
        {text}
      </span>
    </div>
  );
}

/* ============================================================
   WEBSITE FEATURE
============================================================ */

function WebsiteFeature({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        rounded-xl
        bg-white/[0.04]
        px-3
        py-2.5
        text-sm
        text-white/75
      "
    >
      <span className="text-cyan-300">
        {icon}
      </span>

      <span>{text}</span>
    </div>
  );
}

/* ============================================================
   TRUST ITEM
============================================================ */

function TrustItem({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        gap-2
        rounded-2xl
        border
        border-white/10
        bg-black/20
        px-3
        py-4
        text-center
        backdrop-blur-md
      "
    >
      <span className="text-cyan-300">
        {icon}
      </span>

      <span
        className="
          text-[11px]
          leading-4
          text-white/60
          sm:text-xs
        "
      >
        {text}
      </span>
    </div>
  );
}