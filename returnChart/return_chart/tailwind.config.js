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
            customGreen: '#009695',
            

            
        },
    },
  },
  plugins: [],
}

