import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-greatvibes",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Konaseema Foods",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${greatVibes.variable}`}
    >
      <body
        className="bg-[#fffaf2] text-[#2b1a12]"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
