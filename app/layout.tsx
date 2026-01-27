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
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} bg-cream text-brown`}
      >
        <div className="site-bg">
          <div className="site-overlay">
            <Providers>{children}</Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
