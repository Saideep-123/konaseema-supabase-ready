import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-greatvibes",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Konaseema Foods",
  description: "Authentic Konaseema sweets & snacks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${greatVibes.variable}`}
    >
      <body
        // ✅ HARD FORCE: background will change even if Tailwind cache is stuck
        style={{
          backgroundColor: "#FFF6E8", // bright premium cream
          color: "#1C1C1C",           // charcoal text
          opacity: 1,
          filter: "none",
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
