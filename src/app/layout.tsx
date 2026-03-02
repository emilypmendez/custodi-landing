import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Instrument_Sans, DM_Mono } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Custodi — Your finances, guarded.",
  description:
    "Custodi protects people from the moment before they send money. Safety gates privacy at the code level.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${instrument.variable} ${dmMono.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}