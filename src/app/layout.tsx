import type { Metadata } from "next";
import {
  Archivo,
  Bodoni_Moda,
  Geist,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

/** Geist carries the admin: a UI grotesque with true tabular figures. */
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Demo — Fragrances composed in Grasse",
  description:
    "Six compositions, distilled in Grasse and aged twelve weeks before bottling.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The font variables must land on :root — Tailwind's @theme resolves
    // --font-display/--font-sans there, not on <body>.
    <html
      lang="en"
      className={`${bodoni.variable} ${archivo.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
