/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{html,js,jsx,tsx,ts}', './components/**/*.{html,js,jsx,tsx,ts}', './utils/**/*.{html,js,jsx,tsx,ts}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};
