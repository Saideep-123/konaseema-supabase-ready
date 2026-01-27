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
        style={{
          backgroundColor: "#FFF8EE",
          color: "#2B1A12",
          opacity: 1,
          filter: "none",
        }}
      >
        <Providers>
          {/* HARD RESET WRAPPER */}
          <div
            style={{
              minHeight: "100vh",
              backgroundColor: "#FFF8EE",
              opacity: 1,
              filter: "none",
            }}
          >
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
