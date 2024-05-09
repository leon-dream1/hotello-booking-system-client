/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        von : "'Herr Von Muellerhoff', cursive",
        merriweather : '"Merriweather", serif',
        rubik : '"Rubik", sans-serif',
        montserrat: '"Montserrat", sans-serif',
        roboto: '"Roboto", sans-serif'
      }
    },
  },
  plugins: [require('daisyui'),],
}

