"use client";

import { useMemo, useState } from "react";
import { useCart } from "../components/CartContext";
import { useAuth } from "../components/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const cart = useCart();
  const auth = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const message = () => {
    const lines = cart.items.map(
      (i) => `• ${i.name} (${i.weight}) x${i.qty} = ₹${i.qty * i.price}`
    );

    return `Hi Konaseema Foods,\n\n${lines.join("\n")}\n\nTotal: ₹${cart.total}\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}`;
  };

  const waLink = useMemo(
    () => `https://wa.me/917989301401?text=${encodeURIComponent(message())}`,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart.items, cart.total, name, phone, address]
  );

  const placeOrder = async () => {
    if (!name || !phone || !address) {
      setStatus("Please fill all delivery details.");
      return;
    }

    setSaving(true);
    setStatus(null);

    if (auth.user) {
      const payload = {
        user_id: auth.user.id,
        customer_name: name,
        customer_phone: phone,
        customer_address: address,
        total: cart.total,
        items: cart.items,
        channel: "whatsapp",
      };

      const { error } = await supabase.from("orders").insert([payload]);
      if (error) {
        setStatus(error.message);
        setSaving(false);
        return;
      }
    }

    window.open(waLink, "_blank");
    cart.clear();
    router.push("/");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-2">Order details</h1>
      <p className="opacity-70 mb-6">
        Enter delivery details to continue.
      </p>

      <div className="premium-card p-5 space-y-3">
        <input
          required
          className="w-full px-3 py-2 border rounded-xl"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          className="w-full px-3 py-2 border rounded-xl"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          required
          className="w-full px-3 py-2 border rounded-xl min-h-[80px]"
          placeholder="Full Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {status && <div className="text-sm text-red-600">{status}</div>}

        <div className="flex justify-between items-center pt-4">
          <span className="font-semibold">₹{cart.total}</span>
          <button className="btn-primary" onClick={placeOrder} disabled={saving}>
            {saving ? "Saving…" : "Proceed to WhatsApp"}
          </button>
        </div>
      </div>
    </div>
  );
}
