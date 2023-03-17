/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

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
      },
      fontFamily: {
        'lars': ['Larsseit-Bold', ...defaultTheme.fontFamily.sans],
        'graph': ['Graphic', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}
