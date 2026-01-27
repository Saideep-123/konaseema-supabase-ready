"use client";

import { useState } from "react";
import { PRODUCTS } from "./data";
import { useCart } from "./CartContext";
import QuickView from "./QuickView";

export default function Products({
  activeCategory,
  searchQuery,
}: {
  activeCategory: string;
  searchQuery: string;
}) {
  const cart = useCart();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const filtered = PRODUCTS.filter((p) => {
    const byCategory = activeCategory === "All" || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const bySearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    return byCategory && bySearch;
  });

  return (
    <>
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="product-grid">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="product-card premium-card cursor-pointer"
                onClick={() => setSelectedProduct(p)}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="product-image"
                />

                <div className="p-4">
                  <h3 className="product-title">{p.name}</h3>
                  <p className="product-meta">{p.weight}</p>

                  <div className="product-footer">
                    <span className="product-price">₹{p.price}</span>

                    {/* Prevent card click when adding */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        cart.add(p);
                      }}
                      className="product-add"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      {selectedProduct && (
        <QuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAdd={() => cart.add(selectedProduct)}
        />
      )}
    </>
  );
}
