/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false,
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}" 
  ],
  theme: {
    extend: {
      colors: {
        'custom-pink': '#b9109e',
      }
    },
  },
  plugins: [],
}