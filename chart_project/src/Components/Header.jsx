import React, { useEffect, useState } from 'react';
import {CellCards} from './CellCards'; 
import {getMonths } from '../data/months';

export const Header = ({ onMonthHover, hoveredMonthIndex }) => {
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMonths();
      setMonths(data);
    };
    fetchData();
  }, []);

  return (
    <div className="font-vazirmatn flex flex-row-reverse font-semibold bg-gray-100 max-w-7xl h-12 mx-auto px-4 mt-10 rounded-t-lg rounded-b-md items-center text-4 text-w-">
      <div className="pl-20 text-center cursor-pointer ml-1 mr-4">سال</div>
      <div className="flex flex-row-reverse gap-3.5">
        {months.map((month, index) => {
          const isHovered = hoveredMonthIndex === index;
          const isAnyHovered = hoveredMonthIndex !== null;
          const isOther = isAnyHovered && hoveredMonthIndex !== index;

          let bgClass = 'bg-gray-100';
          let textClass = 'text-zinc-950';

          if (isHovered) {
            bgClass = 'bg-blue-600';
            textClass = 'text-white';
          } else if (isOther) {
            textClass = 'text-zinc-500';
          }

          return (
            <div
              key={index}
              onMouseEnter={() => onMonthHover(index, true)}
              onMouseLeave={() => onMonthHover(index, false)}
            >
              <CellCards
                heightClass="h-7.5 rounded-md py-1 font-bold text-base"
                bgClass={`${bgClass} ${textClass} `}
                content={month}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};


