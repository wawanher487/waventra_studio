import type { Metadata } from "next";
import { Manrope, Noto_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Waventra — Jasa Foto & Video Profesional",
  description:
    "Jasa fotografi dan videografi profesional untuk wedding, wisuda, event, dan konten produk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${notoSerif.variable} fonst-sans bg-brand-neutral antialiased`}
    >
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
