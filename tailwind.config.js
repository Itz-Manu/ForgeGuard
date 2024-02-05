/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Montserrat': ['Montserrat Alternates', 'sans-serif'],
        'Overpass': ['Overpass Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

