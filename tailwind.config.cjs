/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

// reference: https://stackoverflow.com/a/67458852/11698825
const hoverPlugin = plugin(function({ addVariant, e, postcss }) {
  addVariant('hover', ({ container, separator }) => {
    const hoverRule = postcss.atRule({ name: 'media', params: '(hover: hover) and (pointer: fine)' });
    hoverRule.append(container.nodes);
    container.append(hoverRule);
    hoverRule.walkRules(rule => {
      rule.selector = `.${e(`hover${separator}${rule.selector.slice(1)}`)}:hover`
    });
  });
});

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
  plugins: [ hoverPlugin ],
}
