/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'violet-primary': '#643EE6',
        'violet-secondary': '#6846C3',
        'violet-tertiary': '#462F9A',
        'gray-button': '#D9D9D9'
      },
      fontFamily: {
        'roboto-light': ['RobotoLight'],
        'roboto-black': ['RobotoBlack'],
        'roboto-bold': ['RobotoBold'],
      }
    },
  },
  plugins: [],
}

