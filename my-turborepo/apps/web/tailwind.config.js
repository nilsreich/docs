/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/*.tsx"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
