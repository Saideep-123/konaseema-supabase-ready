/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* PREMIUM – BRIGHTER (fix dull look) */
        cream: "#FFFDF6",   // ✅ brighter, more “premium bright”
        brown: "#1C1C1C",
        muted: "#2B2B2B",
        gold: "#B08D57",
        card: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
