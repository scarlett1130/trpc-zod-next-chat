/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgba(0, 191, 255, 1)",
        secondary: "rgba(0, 128, 255, 1)",
        backdrop: "rgba(15, 15, 15, 0.9)",
      },
      width: {
        140: "140%",
        160: "160%",
        220: "220%",
        250: "250%",
        45: "45%",
      },
      height: {
        70: "70vh",
      },
    },
  },
  plugins: [],
};
