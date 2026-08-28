import type { Metadata } from "next";
import { Yatra_One, Mukta } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const yatraOne = Yatra_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const mukta = Mukta({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "devanagari"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "गणपती निमंत्रण | Ganpati Invitation Platform",
  description: "आपल्या गणेश मंडळाचे सुंदर animated निमंत्रण मोफत तयार करा — WhatsApp वर सहज शेअर करा.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ganapati-mandal.vercel.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mr">
      <body className={`${yatraOne.variable} ${mukta.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}