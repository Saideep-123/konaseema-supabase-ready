"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <>
      <Navbar />

      <main id="home">
        <Categories
          active={activeCategory}
          setActive={setActiveCategory}
        />

        <Products activeCategory={activeCategory} />
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
}
