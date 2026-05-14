/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Libertinus Serif Display"', 'serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
        titillium: ['"Titillium Web"', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
  daisyui:{
    themes:["light", "dark"],
    darkTheme: "dark"
  }
}