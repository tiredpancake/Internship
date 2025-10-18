import { cn } from "./cn";

export const toPersianNumbers = (input :string|number) => {
  if (input === null || input === undefined || input === '0' || input === '0%') return '-';
  
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  
  return input.toString().replace(/\d/g, (digit) => {
    return persianDigits[parseInt(digit)];
  });
};


export const getColor = (value:number ) => {
  return cn({
    'bg-transparent': value === null || value === undefined,
    'bg-green500': value >= 8.1,
    'bg-green400': value === 8,
    'bg-green300': value < 8 && value > 5,
    'bg-green200': value <= 5 && value >= 3,
    'bg-green100': value < 3 && value > 0,
    'bg-red100': value >= -1 && value < 0,
    'bg-red200': value < -1.1 && value > -3,
    'bg-red300': value <= -3 && value >= -5,
    'bg-red400': value < -5 && value >= -8,
    'bg-red500': value <= -9,
  });
};