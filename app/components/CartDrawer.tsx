"use client";

import { X } from "lucide-react";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import { supabase } from "../lib/supabaseClient";
import { useMemo, useState } from "react";

export default function CartDrawer() {
  const cart = useCart();
  const auth = useAuth();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const message = () => {
    const lines = cart.items.map(
      (i) => `• ${i.name} (${i.weight}) x${i.qty} = ₹${i.qty * i.price}`
    );
    const customer = [
      customerName ? `Name: ${customerName}` : null,
      customerPhone ? `Phone: ${customerPhone}` : null,
      customerAddress ? `Address: ${customerAddress}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    return `Hi Konaseema Foods, I want to order:\n\n${lines.join(
      "\n"
    )}\n\nTotal: ₹${cart.total}${customer ? "\n\n" + customer : ""}`;
  };

  const waLink = useMemo(
    () => `https://wa.me/917989301401?text=${encodeURIComponent(message())}`,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart.items, cart.total, customerName, customerPhone, customerAddress]
  );

  const checkout = async () => {
    if (cart.items.length === 0) return;

    setSaveStatus(null);
    setSaving(true);

    // Save order only for logged-in users (guest checkout still works via WhatsApp)
    if (auth.user) {
      try {
        const payload = {
          user_id: auth.user.id,
          customer_name: customerName || null,
          customer_phone: customerPhone || null,
          customer_address: customerAddress || null,
          total: cart.total,
          items: cart.items.map((i) => ({
            id: i.id,
            name: i.name,
            weight: i.weight,
            price: i.price,
            qty: i.qty,
            category: i.category,
          })),
          channel: "whatsapp",
        };

        // IMPORTANT: supabase insert expects an array of rows
        const { error } = await supabase.from("orders").insert([payload]);
        if (error) setSaveStatus(`Could not save order to DB: ${error.message}`);
      } catch {
        setSaveStatus("Could not save order to DB.");
      }
    }

    setSaving(false);
    window.open(waLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${cart.isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!cart.isOpen}
    >
      {/* overlay */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          cart.isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={cart.close}
      />

      {/* panel */}
      <div
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-[#fffaf2] border-l border-gold shadow-2xl transition-transform flex flex-col ${
          cart.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gold shrink-0">
          <div>
            <h3 className="text-2xl">Your Cart</h3>
            <p className="opacity-75 text-sm">{cart.count} item(s)</p>
          </div>
          <button onClick={cart.close} aria-label="Close cart">
            <X />
          </button>
        </div>

        {/* scrollable content */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 min-h-0">
          {cart.items.length === 0 ? (
            <div className="opacity-70">Your cart is empty.</div>
          ) : (
            cart.items.map((i) => (
              <div key={i.id} className="premium-card p-4">
                <div className="flex gap-4">
                  <img
                    src={i.image}
                    className="w-16 h-16 rounded-lg object-cover"
                    alt={i.name}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between gap-4">
                      <div>
                        <div className="font-semibold">{i.name}</div>
                        <div className="opacity-70 text-sm">{i.weight}</div>
                      </div>
                      <div className="font-bold">₹{i.price}</div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          className="px-3 py-1 border border-gold rounded-full"
                          onClick={() => cart.dec(i.id)}
                        >
                          -
                        </button>
                        <span className="min-w-[24px] text-center font-semibold">
                          {i.qty}
                        </span>
                        <button
                          className="px-3 py-1 border border-gold rounded-full"
                          onClick={() => cart.inc(i.id)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="text-sm underline opacity-80 hover:opacity-100"
                        onClick={() => cart.remove(i.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* customer details moved inside scroll area so it never gets cut */}
          <div className="premium-card p-4">
            <div className="text-sm font-semibold mb-2">
              Customer details (optional)
            </div>

            <div className="space-y-2">
              <input
                className="w-full px-3 py-2 rounded-xl border border-gold bg-white/70 outline-none"
                placeholder="Your name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <input
                className="w-full px-3 py-2 rounded-xl border border-gold bg-white/70 outline-none"
                placeholder="Phone (for delivery updates)"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
              <textarea
                className="w-full px-3 py-2 rounded-xl border border-gold bg-white/70 outline-none min-h-[70px]"
                placeholder="Delivery address"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
              />
            </div>

            {!auth.user && (
              <div className="text-xs opacity-70 mt-2">
                Login to save your order in the database (guest checkout still works).
              </div>
            )}
            {saveStatus && <div className="text-xs opacity-80 mt-2">{saveStatus}</div>}
          </div>
        </div>

        {/* sticky footer */}
        <div className="px-6 py-5 border-t border-gold shrink-0 bg-[#fffaf2]">
          <div className="flex justify-between text-lg mb-4">
            <span className="opacity-80">Total</span>
            <span className="font-bold">₹{cart.total}</span>
          </div>

          <div className="flex gap-3">
            <button
              className="btn-primary w-full"
              onClick={checkout}
              disabled={saving || cart.items.length === 0}
            >
              {saving ? "Saving…" : "Checkout on WhatsApp"}
            </button>

            <button
              className="btn-primary w-full bg-[#3b2417] hover:bg-[#2d1a10]"
              onClick={cart.clear}
              disabled={saving || cart.items.length === 0}
            >
              Clear
            </button>
          </div>

          <p className="text-xs opacity-60 mt-3">
            Payment handled via WhatsApp order confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}
