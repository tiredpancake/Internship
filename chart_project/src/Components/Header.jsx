import React from 'react';
import CellCards from './CellCards'; 

const months = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر',
  'مرداد', 'شهریور', 'مهر', 'آبان',
  'آذر', 'دی', 'بهمن', 'اسفند'
];

const Header = () => {
  return (
    <div className=" font-vazirmatn flex flex-row-reverse font-semibold bg-gray-100 max-w-7xl h-12 mx-auto px-4 mt-10 rounded-t-md rounded-b-sm items-center text-4 text-w-">
      <div className="pl-20 text-center   ml-3">سال</div>
      <div className="flex flex-row-reverse gap-3.5  text-zinc-500">
        {months.map((month, index) => (
          <CellCards
            key={index}
            heightClass="h-7.5 rounded-md py-1"
            bgClass="bg-gray-100" 
            content={month}
            hover={'hover:bg-blue-600 hover:text-white'}
            
          />
        ))}
      </div>
    </div>
  );
};

export default Header;