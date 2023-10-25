/** @type {import('tailwindcss').Config}*/
const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}"
    ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {

      }
    }
  },

  plugins: [
    require('@tailwindcss/forms')
  ]
};

module.exports = config;