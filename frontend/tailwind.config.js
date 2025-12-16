/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        excel: {
          50: '#EAF6F1',
          100: '#D6F0E1',
          200: '#A8E3C4',
          300: '#7BD6A6',
          400: '#43A047',
          500: '#217346',
          600: '#1A5938',
          700: '#124029',
          800: '#0B281B',
          900: '#04100C'
        }
      }
    }
  },
  plugins: [],
}
