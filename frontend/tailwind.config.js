/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        nav: "repeat(auto-fit, minmax(250px, 1fr))",
        statementmd: "repeat(auto-fit, minmax(500px, 1fr))",
        statementsm: "repeat(auto-fit, minmax(300px, 1fr))"
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-20deg)" },
          "50%": { transform: "rotate(20deg)" },
        },
      },
      animation: {
        wiggle: "wiggle .5s ease-in-out infinite",
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
      Kanit: ["Kanit, sans-serif"],
      Rajdhani: ["Rajdhani, sans-serif"],
    },
  },
  plugins: [],
};
