import "./globals.css";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import { CartProvider } from "./components/CartContext";
import { AuthProvider } from "./components/AuthContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-greatvibes" });

export const metadata = {
  title: "Konaseema Foods | Authentic Traditional Sweets",
  description: "Traditional Konaseema sweets made with pure ingredients",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} bg-cream text-brown`}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
