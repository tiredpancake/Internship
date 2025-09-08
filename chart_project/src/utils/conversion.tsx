import { cn } from "./cn";

export const toPersianNumbers = (input :string|number) => {
  if (input === null || input === undefined || input === '0' || input === 0 || input === '0%') return '-';
  
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  
  return input.toString().replace(/\d/g, (digit) => {
    return persianDigits[parseInt(digit)];
  });
};


export const getColor = (value:number ) => {
  return cn({
    'bg-transparent': value === null || value === undefined,
    'bg-green-600': value >= 8.1,
    'bg-green-500': value === 8,
    'bg-green-200': value < 8 && value > 5,
    'bg-green-100': value <= 5 && value >= 3,
    'bg-green-50': value < 3 && value > 0,
    'bg-red-100': value >= -1 && value < 0,
    'bg-red-200': value < -1.1 && value > -3,
    'bg-red-300': value <= -3 && value >= -5,
    'bg-green-400': value < -5 && value >= -8,
    'bg-red-500': value <= -9,
  });
};