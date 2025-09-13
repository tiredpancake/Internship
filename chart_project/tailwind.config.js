/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
   theme: {
    extend: {
      fontFamily: {
        vazirmatn: ['Vazirmatn', 'sans-serif'],
      },
      colors:{
            green500: '#33A159',
            green400: '#66B882',
            green300: '#99D0AC',
            green200: '#CCE7D5',
            green100: '#E5F3EA',
            red500: '#EF5F5F',
            red400: '#F17676',
            red300: '#F6A4A4',
            red200: '#FAD1D1',
            red100: '#FDE8E8',

            
        },
    },
  },
  plugins: [
    require('tailwindcss-rtl'), 
  ],
}

