import React from 'react'
import CellCards from './CellCards'

const getColor = (value) => {
  if (value >= 45) return 'bg-red-700'; // green
  if (value <= 38) return 'bg-green-100'; // red
  return "bg-lime-100"; // white
};
export const toPersianNumbers = (input) => {
  if (input === null || input === undefined || input === '') return '';
  
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  
  return input.toString().replace(/\d/g, (digit) => {
    return persianDigits[parseInt(digit)];
  });
};
const TableRow = ({title , nums}) => {
  return (
    <div className='flex flex-row-reverse bg-transparent items-center ml-24 '>
      <div className='flex-shrink-0 w-32 mr-2'>
        <div className='text-right font-semibold h-8 px-3 py-1 rounded-md whitespace-nowrap overflow-hidden text-ellipsis'>
          <span className='hover:bg-blue-600 hover:text-white px-2 py-1 rounded-md transition-colors'>
            {toPersianNumbers(title)}

          </span>
        </div>
      </div>
      <div className="flex flex-row-reverse gap-3.5 ">
        {nums.map((num, index) => (
          <CellCards
            key={`${title}-${index}`}
            heightClass="h-10"
            bgClass={getColor(num)} 
            content={`%${num}`}
            hover={null}
          />
        ))}
      </div>
    </div>
  )
}

export default TableRow