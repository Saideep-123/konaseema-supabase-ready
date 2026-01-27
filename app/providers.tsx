"use client";

import { CartProvider } from "./components/CartContext";
import { AuthProvider } from "./components/AuthContext"; // adjust path/name if yours differs

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}
