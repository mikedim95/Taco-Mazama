/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#83E645",
          regular: "#ABCF48",
          dark: "#47DB42",
        },
        secondary: {
          light: "#E6C013",
          dark: "#EF9D16",
        },
        background: {
          light: "#E7EBC0",
          dark: "#3C3D42",
          ellipse: "#E7EBC0",
        },
        textFont: {
          light: "#C6C6C6",
          dark: "#67717F",
        },
        price: {
          light: "#DF6732",
        },
      },
      fontFamily: {
        pop: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
