/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F8F5F0",     // Soft premium cream
        brown: "#111111",     // Near-black text (high contrast)
        primary: "#1C1C1C",   // Charcoal (modern premium)
        gold: "#B08D57",      // Warm luxury gold
      },
    },
  },
  plugins: [],
};
