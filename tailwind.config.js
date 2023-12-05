/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand1: '#46151E',
        brand2: '#EC4D6B',
        brand3: '#FEEABA',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
