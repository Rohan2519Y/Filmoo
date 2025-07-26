/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',         // Extra small devices
        '3xl': '1600px',       // Ultra wide screens
        'mid':  '1300px' // Custom height-based media query
      }
    },
  },
  plugins: [],
}
