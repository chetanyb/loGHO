/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gho-dark-primary': '#A795D0',
        'gho-dark-bg': '#201F2D',
        'gho-light-primary': '#595678',
        'gho-light-bg': '#DBD2EF',
      },
      fontFamily: {
        custom: ['Geospeed', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
}


