"use client";

import { PRODUCTS } from "./data";
import { useCart } from "./CartContext";
import { useState } from "react";
import ProductQuickView from "./ProductQuickView";

type Props = {
  activeCategory: string;
};

export default function Products({ activeCategory }: Props) {
  const cart = useCart();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const list =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const openQuick = (p: any) => {
    setSelected(p);
    setOpen(true);
  };

  return (
    <section id="products" className="px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-4xl mb-2">Featured Products</h2>
            <p className="opacity-75">
              Freshly prepared sweets & snacks — authentic Konaseema taste.
            </p>
          </div>

          <div className="hidden md:block opacity-70 text-sm">
            Showing: <span className="font-semibold">{activeCategory}</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {list.map((p) => (
            <div
              key={p.id}
              className="premium-card overflow-hidden flex flex-col cursor-pointer"
              onClick={() => openQuick(p)}
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-cream">
                <img
                  src={p.image}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-xs text-gold font-semibold tracking-wide mb-2">
                  {p.category}
                </div>

                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl leading-snug line-clamp-2">
                    {p.name}
                  </h3>
                  <div className="font-bold text-lg whitespace-nowrap">
                    ₹{p.price}
                  </div>
                </div>

                <div className="opacity-75 mt-1 text-sm">{p.weight}</div>

                {/* Button */}
                <div className="mt-4">
                  <button
                    className="btn-primary py-2 px-4 rounded-xl text-sm w-full"
                    onClick={(e) => {
                      e.stopPropagation(); // IMPORTANT
                      cart.add(p);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {list.length === 0 && (
          <div className="mt-10 opacity-70">
            No products in this category yet.
          </div>
        )}
      </div>

      {/* Quick View */}
      <ProductQuickView
        open={open}
        product={selected}
        onClose={() => setOpen(false)}
        onAdd={(qty) => {
          for (let i = 0; i < qty; i++) cart.add(selected);
        }}
      />
    </section>
  );
}
