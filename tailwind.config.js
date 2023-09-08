/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
    screen: {
      xs: "320px", // mobile
      sm: "576px", // mobile
      md: "768px", // tablet
      lg: "992px", // tablet
      xl: "1280px", // laptop
      "2xl": "1448px", // laptop
      "3xl": "1600px", // laptop
    },
  },
  plugins: [],
}