import { Mukta } from "next/font/google";
import "./globals.css";

const mukta = Mukta({
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr">
      <body className={mukta.className}>{children}</body>
    </html>
  );
}