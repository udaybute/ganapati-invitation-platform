import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[var(--color-maroon)] to-[var(--color-maroon-dark)] text-[var(--color-ivory)] flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-[var(--color-gold)] text-sm tracking-widest">॥ श्री गणेशाय नमः ॥</p>

      <Image
        src="/images/ganapati/ganapati-murti.png"
        alt="Ganapati"
        width={220}
        height={260}
        priority
        className="mt-6 drop-shadow-2xl"
      />

      <h1 className="font-display text-4xl md:text-6xl mt-6 text-[var(--color-gold-light)]">
        आपल्या मंडळाचे निमंत्रण
        <br /> मोफत तयार करा
      </h1>
      <p className="mt-4 max-w-md text-[var(--color-ivory)]/80">
        एक सुंदर, animated, share करण्यायोग्य Ganpati invitation website —
        कोणत्याही खर्चाशिवाय, फक्त काही मिनिटांत.
      </p>

      <Link
        href="/submit"
        className="mt-8 px-9 py-4 rounded-full bg-[var(--color-gold)] text-[var(--color-maroon-dark)] font-semibold text-lg"
      >
        निमंत्रण तयार करा →
      </Link>

      <div className="grid grid-cols-3 gap-6 mt-14 max-w-md text-sm text-[var(--color-ivory)]/70">
        <div>
          <p className="text-2xl">🎬</p>
          <p className="mt-1">Animated dwar</p>
        </div>
        <div>
          <p className="text-2xl">📸</p>
          <p className="mt-1">Photo gallery</p>
        </div>
        <div>
          <p className="text-2xl">📲</p>
          <p className="mt-1">WhatsApp ready</p>
        </div>
      </div>

      <p className="mt-16 text-xs text-[var(--color-ivory)]/40">Powered by Elvatrixa</p>
    </main>
  );
}
