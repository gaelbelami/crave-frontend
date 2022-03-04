const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
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
