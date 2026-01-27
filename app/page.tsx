"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Products from "./components/Products";
import About from "./components/About";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <>
      <Navbar />

      {/* ✅ THIS IS WHAT MAKES THE SITE FEEL BRIGHT/PREMIUM */}
      <Hero />

      <main>
        <Categories active={activeCategory} setActive={setActiveCategory} />
        <Products activeCategory={activeCategory} />
        <About />
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
}
