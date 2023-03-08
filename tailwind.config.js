/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        facebook: "#3b5998",
        // instagram: "#e1306c",
        twitter: "#55acee",
        youtube: "#cd201f",
        pinterest: "#bd081c"
      }
    }
  },
  plugins: []
}
