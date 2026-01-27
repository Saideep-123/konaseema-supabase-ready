import "./globals.css";
import Providers from "./providers";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-greatvibes" });

export const metadata = {
  title: "Konaseema Foods",
  description: "Traditional Konaseema sweets & snacks",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${greatVibes.variable}`}>
      <body className="bg-cream text-brown">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
