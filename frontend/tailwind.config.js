/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gho-dark-primary": "#A795D0",
        "gho-dark-bg": "#201F2D",
        "gho-light-primary": "#595678",
        "gho-light-bg": "#DBD2EF",
      },
      fontFamily: {
        custom: ["Geospeed", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        primary: {
          primary: "#595678",
          secondary: "#DBD2EF",
          accent: "#A795D0",
          neutral: "#201F2D",
          "base-100": "#201F2D",
        },
      },
    ],
    base: true,
    darkTheme: "primary",
  },
};
