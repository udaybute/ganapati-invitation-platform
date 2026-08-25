import type { Metadata } from "next";
import { Mukta } from "next/font/google";
import "./globals.css";

const mukta = Mukta({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "devanagari"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "गणपती निमंत्रण | Ganpati Invitation Platform",
  description:
    "आपल्या गणेश मंडळाचे सुंदर animated निमंत्रण तयार करा आणि WhatsApp वर सहज शेअर करा.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      "https://ganapati-mandal.vercel.app"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mr">
      <body
        className={`${mukta.variable} antialiased`}
        style={{
          fontFamily: "var(--font-body), sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}