/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        "custom": "1180px"
      },
      minHeigth: {
        "homeCard": "656px"
      },
      backgroundColor: {
        "customBlack": "rgba(0, 0, 0, 0.6)",
        "green300": '#00b37e',
        "green500": '#00875f',

      },
      backgroundImage: {
        'gradient-radial': 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
      },
      textColor: {
      "white": '#fff',
      "gray900": '#121214',
      "gray800": '#202024',
      "gray300": '#c4c4cc',
      "gray100": '#e1e1e6',
      "green500": '#00875f',
      "green300": '#00b37e'
      }
    },
  },
  plugins: [],
}
