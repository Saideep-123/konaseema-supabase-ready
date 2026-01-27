/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* OPTION 3 – PREMIUM */
        cream: "#F8F5F0",       // page background
        brown: "#1C1C1C",       // main text / headings
        muted: "#2B2B2B",       // secondary text
        gold: "#B08D57",        // accent / borders
        card: "#FFFFFF",        // card background
      },
    },
  },
  plugins: [],
};
