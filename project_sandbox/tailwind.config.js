/** @type {import('tailwindcss').Config} */
export default {
  content: [  "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        DarkBlue: {
          500: "hsl(209, 23%, 22%)",
          700: "hsl(207, 26%, 17%)",
          900: "hsl(200, 15%, 8%)"
          } ,
          LightGray: {
            200: "hsl(0, 0%, 52%)",
            100: "hsl(0, 0%, 98%)"
          }
        
        }
    },
  },
  plugins: [],
}

