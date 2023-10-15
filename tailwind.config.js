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
      animation: {
        rubberBand: "rubberBand 1s",
      },
      keyframes: {
        rubberBand: {
          from: {
            transform: "scale3d(1, 1, 1)",
          },

          "30%": {
            transform: "scale3d(1.25, 0.75, 1)",
          },

          "40%": {
            transform: "scale3d(0.75, 1.25, 1)",
          },

          "50%": {
            transform: "scale3d(1.15, 0.85, 1)",
          },

          "65%": {
            transform: "scale3d(0.95, 1.05, 1)",
          },

          "75%": {
            transform: "scale3d(1.05, 0.95, 1)",
          },

          to: {
            transform: "scale3d(1, 1, 1)",
          },
        },
      },
    },
  },
  plugins: [],
};
