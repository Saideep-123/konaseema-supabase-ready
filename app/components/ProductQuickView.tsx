"use client";

import { useEffect } from "react";

export default function ProductQuickView({
  product,
  onClose,
  onAdd,
}: {
  product: any;
  onClose: () => void;
  onAdd: () => void;
}) {
  // ESC closes modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Overlay (MUST be clickable to close) */}
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-label="Close quick view"
      />

      {/* Modal */}
      <div className="relative mx-auto mt-16 w-[92%] max-w-2xl premium-card overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden bg-cream">
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-gold font-semibold tracking-wide mb-2">
                  {product.category}
                </div>

                {/* This uses your Playfair heading font via globals.css */}
                <h3 className="text-2xl leading-snug">{product.name}</h3>

                <div className="opacity-75 mt-2 text-sm">{product.weight}</div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-2xl leading-none opacity-70 hover:opacity-100"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-lg font-bold">₹{product.price}</div>
            </div>

            {product.desc && (
              <p className="mt-4 opacity-80 text-sm leading-relaxed">{product.desc}</p>
            )}

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="btn-primary py-2 px-4 rounded-xl text-sm" onClick={onAdd} type="button">
                Add to Cart
              </button>

              <a
                className="btn-primary py-2 px-4 rounded-xl text-sm bg-green-700 hover:bg-green-800 text-center"
                target="_blank"
                rel="noreferrer"
                href={`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(
                  `Hi Konaseema Foods, I want to order: ${product.name} (${product.weight}) - ₹${product.price}`
                )}`}
              >
                WhatsApp
              </a>
            </div>

            <div className="mt-3 text-xs opacity-60">
              Tip: press <span className="font-semibold">Esc</span> to close.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
