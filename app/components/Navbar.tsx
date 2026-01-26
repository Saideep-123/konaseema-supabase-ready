"use client";

import { MessageCircle, ShoppingCart, User } from "lucide-react";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import AuthModal from "./AuthModal";
import { useMemo, useState } from "react";

export default function Navbar() {
  const cart = useCart();
  const auth = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Display name: metadata name -> email prefix -> full email -> "Account"
  const displayName = useMemo(() => {
    const user = auth.user;
    if (!user) return "";
    const metaName =
      (user as any)?.user_metadata?.name ||
      (user as any)?.user_metadata?.full_name ||
      (user as any)?.user_metadata?.username;

    if (metaName && typeof metaName === "string") return metaName;

    const email = user?.email || "";
    if (!email) return "Account";
    return email.includes("@") ? email.split("@")[0] : email;
  }, [auth.user]);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-cream/90 border-b border-gold">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <button
          className="brand-logo text-3xl text-brown"
          onClick={() => scrollTo("home")}
        >
          Konaseema Foods
        </button>

        <div className="hidden md:flex gap-8 font-semibold">
          <button className="hover:text-gold" onClick={() => scrollTo("home")}>
            Home
          </button>
          <button
            className="hover:text-gold"
            onClick={() => scrollTo("categories")}
          >
            Categories
          </button>
          <button
            className="hover:text-gold"
            onClick={() => scrollTo("products")}
          >
            Products
          </button>
          <button className="hover:text-gold" onClick={() => scrollTo("about")}>
            About
          </button>
          <button
            className="hover:text-gold"
            onClick={() => scrollTo("contact")}
          >
            Contact
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Auth button: Login -> Profile + Logout */}
          {!auth.user ? (
            <button
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full border border-gold bg-white/50 hover:bg-white/70 transition"
              onClick={() => setAuthOpen(true)}
              aria-label="Login"
              type="button"
            >
              <span className="text-sm font-semibold">Login</span>
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-gold bg-white/50 hover:bg-white/70 transition"
                onClick={() => setAuthOpen(true)}
                aria-label="Profile"
                title={auth.user.email || "Account"}
              >
                <User size={16} />
                <span className="text-sm font-semibold max-w-[140px] truncate">
                  {displayName}
                </span>
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-gold bg-white/50 hover:bg-white/70 transition"
                onClick={() => auth.signOut()}
                aria-label="Logout"
              >
                <span className="text-sm font-semibold">Logout</span>
              </button>
            </div>
          )}

          <button className="relative" onClick={cart.toggle} aria-label="Open cart">
            <ShoppingCart />
            {cart.count > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-brown text-xs font-bold rounded-full px-2 py-0.5">
                {cart.count}
              </span>
            )}
          </button>

          <a
            aria-label="WhatsApp"
            className="text-green-700"
            href="https://wa.me/917989301401"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle />
          </a>
        </div>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </nav>
  );
}
