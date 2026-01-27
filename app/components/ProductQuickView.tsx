"use client";

import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Product = {
  id: number | string;
  name: string;
  price: number;
  weight?: string;
  desc?: string;
  image?: string;
  category?: string;
};

export default function ProductQuickView({
  open,
  product,
  onClose,
  onAdd,
}: {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onAdd: (qty: number) => void;
}) {
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (open) setQty(1);
  }, [open, product?.id]);

  // ESC close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const title = useMemo(() => product?.name ?? "", [product]);

  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* modal */}
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2">
        <div className="premium-card bg-[#fffaf2] p-5 sm:p-6 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-2xl font-semibold">{title}</div>
              <div className="text-sm opacity-70">{product.weight || ""}</div>
            </div>
            <button onClick={onClose} aria-label="Close">
              <X />
            </button>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="rounded-2xl overflow-hidden border border-gold bg-white">
              <img
                src={product.image || "https://via.placeholder.com/800x500?text=Konaseema+Foods"}
                alt={product.name}
                className="w-full h-[220px] sm:h-[280px] object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="text-3xl font-bold">₹{product.price}</div>

              {product.desc && (
                <p className="opacity-80">{product.desc}</p>
              )}

              <div className="flex items-center gap-3">
                <button
                  className="px-3 py-2 rounded-full border border-gold"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <div className="min-w-[44px] text-center font-semibold">{qty}</div>
                <button
                  className="px-3 py-2 rounded-full border border-gold"
                  onClick={() => setQty((q) => q + 1)}
                >
                  +
                </button>
              </div>

              <button
                className="btn-primary w-full"
                onClick={() => {
                  onAdd(qty);
                  onClose();
                }}
              >
                Add to Cart
              </button>

              <div className="text-xs opacity-60">
                (WhatsApp checkout happens only from Cart)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
