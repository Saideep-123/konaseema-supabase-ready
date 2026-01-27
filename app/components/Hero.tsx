"use client";

import { motion } from "framer-motion";
import { PRODUCTS } from "./data";
import { useCart } from "./CartContext";

export default function Hero() {
  const cart = useCart();
  const special = PRODUCTS[0];

  return (
    <section
      id="home"
      className="relative px-6 pt-10 md:pt-14 pb-12"
    >
      {/* ✅ bright premium backdrop (no image) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-cream" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/30 to-transparent" />
        <div className="absolute -top-24 left-1/2 h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-gold/25 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto min-h-[82vh] md:min-h-[88vh] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold bg-white/70 px-4 py-2 text-sm font-semibold">
            <span className="text-gold">Premium</span>
            <span className="opacity-70">Konaseema Sweets & Snacks</span>
          </div>

          <h1 className="mt-6 text-5xl md:text-6xl leading-[1.05]">
            Authentic taste,
            <br />
            <span className="text-gold">packed fresh</span> for delivery.
          </h1>

          <p className="mt-6 text-lg opacity-80 max-w-xl">
            Traditional recipes from Konaseema — hygienic preparation, careful packing,
            and smooth ordering experience.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn-primary" href="#products">
              Explore Products
            </a>

            {/* WhatsApp = contact only */}
            <a
              className="btn-primary bg-white text-brown border border-gold hover:bg-white/90"
              href="https://wa.me/917989301401"
              target="_blank"
              rel="noreferrer"
            >
              Contact on WhatsApp
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
            <div className="premium-card p-4">
              <div className="text-2xl font-bold">Fresh</div>
              <div className="text-sm opacity-70">Packed daily</div>
            </div>
            <div className="premium-card p-4">
              <div className="text-2xl font-bold">Pan-India</div>
              <div className="text-sm opacity-70">Shipping</div>
            </div>
            <div className="premium-card p-4">
              <div className="text-2xl font-bold">Premium</div>
              <div className="text-sm opacity-70">Gift ready</div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="premium-card p-6 md:p-7">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="text-sm font-semibold text-gold">Today’s Special</div>
                <div className="mt-2 text-3xl font-semibold leading-tight">
                  {special?.name}
                </div>
                <div className="mt-1 opacity-70">{special?.weight}</div>
              </div>
              <div className="text-2xl font-bold whitespace-nowrap">
                ₹{special?.price}
              </div>
            </div>

            <div className="mt-5 rounded-2xl overflow-hidden border border-gold bg-white">
              <img
                src={special?.image}
                alt={special?.name}
                className="w-full h-[240px] md:h-[300px] object-cover"
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button className="btn-primary" onClick={() => cart.add(special)}>
                Add to Cart
              </button>
              <a className="btn-primary bg-white text-brown border border-gold hover:bg-white/90 text-center" href="#products">
                View All
              </a>
            </div>

            <div className="mt-3 text-xs opacity-60">
              Checkout happens from Cart (delivery details + payment step later).
            </div>
          </div>
        </motion.div>
      </div>

      {/* ✅ subtle “scroll hint” so people discover products */}
      <div className="max-w-7xl mx-auto mt-6 flex justify-center">
        <a
          href="#categories"
          className="text-sm font-semibold opacity-70 hover:opacity-100 transition"
        >
          Scroll to browse categories ↓
        </a>
      </div>
    </section>
  );
}
