import { cn } from "./cn";

export const toPersianNumbers = (input :string|number) => {
  if (input === null || input === undefined || input === '0' || input === 0 || input === '0%') return '-';
  
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  
  return input.toString().replace(/\d/g, (digit) => {
    return persianDigits[parseInt(digit)];
  });
};


