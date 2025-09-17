const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
   theme: {
    extend: {
      fontFamily: {
        vazirmatn: ['vazirmatn'],
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
            customGreen: '#009695',
            
        },
    },
  },
  plugins: [
    require('tailwindcss-rtl'), 
  ],
}

