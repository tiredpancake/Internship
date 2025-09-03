export const toPersianNumbers = (input) => {
  if (input === null || input === undefined || input === '0' || input === 0 || input === '0%') return '-';
  
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  
  return input.toString().replace(/\d/g, (digit) => {
    return persianDigits[parseInt(digit)];
  });
};

export const getColor = (value) => {
  if (value === null || value === undefined) return 'bg-transparent';
  if (value >= 8.1) return 'bg-green-600';
  else if (value === 8) return 'bg-green-500';
  else if (value < 8 && value > 5) return 'bg-green-200';
  else if (value <= 5 && value >= 3) return 'bg-green-100';
  else if (value < 3 && value > 0) return 'bg-green-50';
  else if (value >= -1 && value <0) return 'bg-red-100';
  else if (value < -1.1 && value > -3) return 'bg-red-200';
  else if (value <= -3 && value >= -5) return 'bg-red-300';
  else if (value < -5 && value >= -8) return 'bg-green-400';
  else if (value <= -9) return 'bg-red-500';
  return 'bg-transparent';
};