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
      },
      keyframes: {
        appear: {
          '0%, 30%': {
            transform: 'translateX(50px)',
            opacity: "0"
          },
          '50%, 90%': {
            transform: 'none',
            opacity: "1"
          },
          "100%": {
            opacity: "0"
          }
        }
      },
      animation: {
        'appearing': 'appear 10s ease-in-out',
        'appearing-delayed': 'appear 10s ease-in-out 3s',
        'appearing-delayed-twice': 'appear 10s ease-in-out 10s'
      }
    },
  },
  plugins: [],
}
