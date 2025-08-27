import React from 'react';

export const toPersianNumbers = (input) => {
  if (input === null || input === undefined || input === '0' || input === 0 || input === '0%') return '-';
  
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  
  return input.toString().replace(/\d/g, (digit) => {
    return persianDigits[parseInt(digit)];
  });
};

const CellCards = ({ heightClass, bgClass = 'bg-red-100', content, hover }) => {
  console.log('Height class:', heightClass);
  console.log('BG class:', bgClass);
  
  const displayContent = (content === 0 || content === '' || content === '%0') ? 
    '-' : toPersianNumbers(content);
  
  const finalBgClass = displayContent === '-' ? 'bg-transparent' : bgClass;
  
  return (
    <div className={`flex justify-center items-center w-20 rounded-md ${heightClass} ${finalBgClass} ${hover || ''}`}>
      {displayContent}
    </div>
  );
};

export default CellCards;