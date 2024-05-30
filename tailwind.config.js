/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        darkPrimary: "#1B1D1F",
        darkSecondary: "#282B30",
        blueSecondary: "#4E80EE",
        grayPrimary: "#6C727F",
        graySecondary: "#D2D5DA",
      },
      backgroundImage: {
        "hero-pattern": "url('./src/assets/hero-image-wr.jpg')",
      },
    },
  },
  plugins: [],
};
