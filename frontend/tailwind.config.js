/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-20deg)' },
          '50%': { transform: 'rotate(20deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle .5s ease-in-out infinite',
      }
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"]
    }
  },
  plugins: [],
}
