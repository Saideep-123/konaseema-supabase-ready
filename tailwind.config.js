/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* 🔥 FIXED: BRIGHT PREMIUM COLORS */
        cream: "#FFF8EE",      // bright warm cream (NOT dull)
        brown: "#2B1A12",      // deep readable brown
        gold: "#C9A45C",       // premium gold
      },
      boxShadow: {
        premium: "0 14px 30px rgba(0,0,0,0.12)",
      },
      borderRadius: {
        xl: "16px",
      },
    },
  },
  plugins: [],
};
