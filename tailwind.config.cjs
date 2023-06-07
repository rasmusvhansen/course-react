/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {}
  },
  // eslint-disable-next-line global-require
  plugins: [require('daisyui')]
};
