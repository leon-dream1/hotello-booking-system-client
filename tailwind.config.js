/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        von: "'Herr Von Muellerhoff', cursive",
        merriweather: '"Merriweather", serif',
        rubik: '"Rubik", sans-serif',
        montserrat: '"Montserrat", sans-serif',
        roboto: '"Roboto", sans-serif',
      },
      backgroundImage: {
        bgImg1: "url('/banner1.jpg')",
        bgImg2: "url('/banner2.jpg')",
        bgImg3: "url('/banner3.jpg')",
        bgImg4: "url('/banner4.jpg')",
      },
    },
  },
  plugins: [require("daisyui")],
};
