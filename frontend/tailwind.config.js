/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      colors:{
        primaryText: "#333333",
        secondaryText: "#828282",
        primaryBg:"white",
        secondaryBg:"#2F80ED",
        borderColor:"#BDBDBD"
      }
    },
  },
  plugins: [],
}

