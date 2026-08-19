import { Mukta } from "next/font/google";

import "./globals.css";

import { MusicProvider } from "@/components/contexts/MusicContext";

const mukta = Mukta({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mr">
      <body className={mukta.className}>
        <MusicProvider>
          {children}
        </MusicProvider>
      </body>
    </html>
  );
}