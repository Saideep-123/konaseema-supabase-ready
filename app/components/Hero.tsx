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
      style={{
        background: "#FFFFFF",          // HARD bright
        color: "#0B0B0B",               // HARD dark
        minHeight: "92vh",
        padding: "48px 24px 40px 24px",
        opacity: 1,
        filter: "none",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 28,
          }}
        >
          <div style={{ maxWidth: 720 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                borderRadius: 999,
                border: "1px solid #B08D57",
                padding: "10px 14px",
                background: "#FFF7E8",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              <span style={{ color: "#B08D57" }}>Premium</span>
              <span style={{ opacity: 0.75 }}>Konaseema Foods</span>
            </div>

            <h1
              style={{
                marginTop: 18,
                fontSize: 56,
                lineHeight: 1.05,
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              This section must look
              <br />
              <span style={{ color: "#B08D57" }}>bright</span> on any screen.
            </h1>

            <p style={{ marginTop: 14, fontSize: 18, opacity: 0.85 }}>
              If this area still feels dull, it’s not your website CSS anymore — it’s your
              browser/display settings affecting color output.
            </p>

            <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="#products"
                style={{
                  background: "#0B0B0B",
                  color: "#FFFFFF",
                  padding: "12px 18px",
                  borderRadius: 14,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Explore Products
              </a>

              <a
                href="https://wa.me/917989301401"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "#FFFFFF",
                  color: "#0B0B0B",
                  padding: "12px 18px",
                  borderRadius: 14,
                  fontWeight: 700,
                  border: "1px solid #B08D57",
                  textDecoration: "none",
                }}
              >
                Contact on WhatsApp
              </a>
            </div>
          </div>

          {/* feature card */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid #B08D57",
              borderRadius: 18,
              boxShadow: "0 18px 50px rgba(0,0,0,0.12)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: 18, display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#B08D57" }}>
                  Today’s Special
                </div>
                <div style={{ marginTop: 8, fontSize: 24, fontWeight: 800 }}>
                  {special?.name}
                </div>
                <div style={{ marginTop: 4, opacity: 0.75 }}>{special?.weight}</div>
              </div>
              <div style={{ fontSize: 22, fontWeight: 900 }}>₹{special?.price}</div>
            </div>

            <div style={{ borderTop: "1px solid #F0E3CD" }}>
              <img
                src={special?.image}
                alt={special?.name}
                style={{ width: "100%", height: 320, objectFit: "cover", display: "block" }}
              />
            </div>

            <div style={{ padding: 18 }}>
              <button
                onClick={() => cart.add(special)}
                style={{
                  width: "100%",
                  background: "#0B0B0B",
                  color: "#FFFFFF",
                  padding: "12px 16px",
                  borderRadius: 14,
                  fontWeight: 800,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
              <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
                (Checkout happens from Cart)
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 6, fontWeight: 700, opacity: 0.75 }}>
            Scroll down ↓
          </div>
        </motion.div>
      </div>
    </section>
  );
}
