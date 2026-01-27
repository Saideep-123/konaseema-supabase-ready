"use client";

import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import { useState } from "react";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <>
      <Navbar />

      <main id="home">
        <Categories
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        <Products activeCategory={activeCategory} />
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
}
