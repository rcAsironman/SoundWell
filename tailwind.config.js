/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        soundWell: {
          primary: "#94abfe",      // soundWell blue
          secondary: "#bfcfff",    // Soft gray
          textColor: "#000000",
          gray: "#c2c2c2"
        },
      },
    },
  },
  plugins: [],
};