/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#217346",
        secondary: "#2E8857",
        accent: "#A3D9A5",
        background: "#F5F7F6",
        primary_background: "#F6FBF7",
        text: "#1F2333",
      },
    },
  },
  plugins: [],
};
