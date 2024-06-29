/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'flower': "url('./src/assets/flowerPot.jpeg')",
        'todo':"url('./src/assets/todoPic.jpg')",
        
      },
    },
  },
  plugins: [],
}