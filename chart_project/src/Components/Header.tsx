import React, { useEffect, useState } from 'react';
import {CellCards} from './CellCards'; 
import {getMonths } from '../data/statsdata';
import { cn } from '../utils/cn';
import { useData } from '../data/datacontext';
import { Interface } from 'readline';

interface HeaderProps{
  onMonthHover:(idx:number,hovering:boolean)=>void;
  hoveredMonthIndex :number |null;
}
export const Header = ({ onMonthHover, hoveredMonthIndex } :HeaderProps) => {
  const [months, setMonths] = useState<string[]>([]);
  const {data,loading}=useData();
  
  
  useEffect(() => {
  if (data) {
    setMonths(getMonths(data));
  }
  }, [data]);

  return (
    <div className="font-vazirmatn flex flex-row-reverse font-semibold bg-gray-100 max-w-7xl h-12 mx-auto px-4 mt-10 rounded-t-lg rounded-b-md items-center ">
      <div className="pl-20 text-center cursor-pointer ml-1 mr-4">سال</div>
      <div className="flex flex-row-reverse gap-3.5">
        {months.map((month, index) => {
          const isHovered = hoveredMonthIndex === index;
          const isAnyHovered = hoveredMonthIndex !== null;
          const isOther = isAnyHovered && hoveredMonthIndex !== index;

          const cellClass=cn(
            'bg-gray-100 text-zinc-950 ',
              isHovered && ' bg-blue-600 text-white ',
              !isHovered&&  isOther && ' text-zinc-500'
          )

          return (
            <div
              key={index}
              onMouseEnter={() => onMonthHover(index, true)}
              onMouseLeave={() => onMonthHover(index, false)}
            >
              <CellCards
                heightClass="h-7.5 rounded-md py-1 font-bold text-base"
                bgClass={`${cellClass}  `}
                content={month}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};


