"use client";

import { motion } from "framer-motion";
import { CATEGORIES } from "./data";

export default function Categories({
  active,
  setActive,
}: {
  active: string;
  setActive: (v: string) => void;
}) {
  return (
    <section id="categories" className="px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-4xl mb-2">Shop by Category</h2>
          <p className="opacity-75">Choose sweets, snacks, pickles, or gift boxes.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((c) => {
            const isActive = active === c;
            return (
              <motion.button
                key={c}
                whileHover={{ y: -2 }}
                className={[
                  "px-5 py-2 rounded-full border border-gold font-semibold transition",
                  isActive
                    ? "bg-[#1f130c] text-[#fffaf2]"
                    : "bg-white text-brown hover:bg-white/80",
                ].join(" ")}
                onClick={() => setActive(c)}
              >
                {c}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
