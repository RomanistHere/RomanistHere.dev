/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "dark": "rgb(32, 35, 41)",
        "light": "rgb(244, 237, 224)",
        "bright": "rgb(161, 113, 50)",
        "gray": "rgb(68, 72, 82)",
        "gray2": "rgb(61, 65, 75)",
      }
    },
  },
  plugins: [],
}
