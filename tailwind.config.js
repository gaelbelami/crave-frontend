const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.html", "./src/* */*.jsx", "./src/**/*.tsx"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(0px, 0px) scale(1.1)",
          },
          "66%": {
            transform: "translate(0px, 0px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
      colors: {
        lime: colors.lime,
        yellow: colors.yellow,
        orange: colors.orange,
      },
      fontFamily: {
        sans: ["Poppins", "sans"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
