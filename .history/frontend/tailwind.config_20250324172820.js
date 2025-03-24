/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/src/**/*.{js,jsx,ts,tsx}", // Adjust this path to match your structure
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
