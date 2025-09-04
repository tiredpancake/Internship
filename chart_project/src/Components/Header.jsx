import React, { useEffect, useState } from 'react';
import CellCards from './CellCards'; 
import {getMonths } from '../data/months';

const Header = ({ onMonthHover, hoveredMonthIndex }) => {
  const [months,setMonths]=useState([]);
  
  
  useEffect(()=>{
    const fetchData=async()=>
    {
      const data= await getMonths ();
      setMonths(data);
    }
    fetchData();

  },[]);

  return (
    <div className=" font-vazirmatn flex flex-row-reverse font-semibold bg-gray-100 max-w-7xl h-12 mx-auto px-4 mt-10 rounded-t-md rounded-b-sm items-center text-4 text-w-">
      <div className="pl-20 text-center cursor-pointer  ml-2 mr-3 ">سال</div>
      <div className="flex flex-row-reverse gap-3.5  text-zinc-500">
        {months.map((month, index) => (
          <div
            key={index}
            onMouseEnter={() => onMonthHover(index, true)}
            onMouseLeave={() => onMonthHover(index, false)}
          >
          <CellCards
              key={index}
              heightClass="h-7.5 rounded-md py-1"
              bgClass={hoveredMonthIndex === index ? 'bg-blue-600 text-white' : 'bg-gray-100'}
              content={month}
              hover={null}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;