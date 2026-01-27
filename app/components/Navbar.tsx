"use client";

import { MessageCircle, ShoppingCart } from "lucide-react";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import AuthModal from "./AuthModal";
import { useMemo, useRef, useState, useEffect } from "react";

export default function Navbar() {
  const cart = useCart();
  const auth = useAuth();

  const [authOpen, setAuthOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const displayName = useMemo(() => {
    if (!auth.user) return "";
    const metaName =
      (auth.user as any)?.user_metadata?.name ||
      (auth.user as any)?.user_metadata?.full_name;
    if (metaName) return String(metaName);
    const email = auth.user.email || "";
    return email.includes("@") ? email.split("@")[0] : email || "Account";
  }, [auth.user]);

  const avatarLetter = useMemo(() => {
    const base = displayName || auth.user?.email || "";
    return (base.trim()[0] || "U").toUpperCase();
  }, [displayName, auth.user]);

  // close dropdown when clicking outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-cream/95 border-b border-gold shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <button className="brand-logo text-3xl text-brown" onClick={() => scrollTo("home")}>
          Konaseema Foods
        </button>

        <div className="hidden md:flex gap-8 font-semibold">
          <button className="hover:text-gold" onClick={() => scrollTo("home")}>Home</button>
          <button className="hover:text-gold" onClick={() => scrollTo("categories")}>Categories</button>
          <button className="hover:text-gold" onClick={() => scrollTo("products")}>Products</button>
          <button className="hover:text-gold" onClick={() => scrollTo("about")}>About</button>
          <button className="hover:text-gold" onClick={() => scrollTo("contact")}>Contact</button>
        </div>

        <div className="flex items-center gap-4">
          {/* Auth: Login -> Avatar dropdown */}
          {!auth.user ? (
            <button
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-gold bg-white/60 hover:bg-white/80 transition"
              onClick={() => setAuthOpen(true)}
              aria-label="Login"
              type="button"
            >
              <span className="text-sm font-semibold">Login</span>
            </button>
          ) : (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="w-10 h-10 rounded-full border border-gold bg-white/60 hover:bg-white/80 transition flex items-center justify-center font-bold text-brown"
                aria-label="Open profile menu"
                title={auth.user.email || "Account"}
              >
                {avatarLetter}
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-gold bg-[#fffaf2] shadow-xl p-2">
                  <div className="px-3 py-2">
                    <div className="text-sm font-semibold truncate">{displayName}</div>
                    <div className="text-xs opacity-70 truncate">{auth.user.email}</div>
                  </div>
                  <div className="h-px bg-gold/40 my-2" />
                  <button
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/70 transition text-sm font-semibold"
                    onClick={async () => {
                      setMenuOpen(false);
                      await auth.signOut();
                    }}
                    type="button"
                  >
                    Logout
                  </button>
                </div>
              )}
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
