"use client";

import { X } from "lucide-react";
import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const cart = useCart();
  const router = useRouter();

  if (!cart.isOpen) return null; // ✅ IMPORTANT

  const proceed = () => {
    cart.close();
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/30" onClick={cart.close} />

      {/* drawer */}
      <div className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl">
        <div className="flex justify-between p-5 border-b border-gold">
          <h3 className="text-xl font-semibold">Your Cart</h3>
          <button onClick={cart.close}><X /></button>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto h-[calc(100%-160px)]">
          {cart.items.map((i) => (
            <div key={i.id} className="premium-card p-4">
              <div className="font-semibold">{i.name}</div>
              <div className="text-sm opacity-70">{i.weight}</div>
              <div className="mt-2 flex justify-between">
                <span>₹{i.price}</span>
                <span>x{i.qty}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-5 border-t border-gold">
          <div className="flex justify-between mb-4">
            <span>Total</span>
            <span className="font-bold">₹{cart.total}</span>
          </div>
          <button className="btn-primary w-full" onClick={proceed}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
