import React, { useEffect, useState } from 'react'
import {TableRow} from './TableRow'; 
import {getData} from '../data/statsdata';
import {summaryRows} from '../data/statsdata';
import { useData } from '../data/datacontext';
import { Interface } from 'readline';

interface hoveredCellProp
{
  yearIndex:Number;
  monthIndex:Number;
  
}

interface StatsTableProp
{
  hoveredMonthIndex :Number;
  hoveredYearValue :Number;
  hoveredCell :hoveredCellProp;
  onYearHover:(yearIdx:Number,onYearHover:boolean)=>void;
  onCellHover:(yearIdx:Number, monthIdx :Number, hovering:boolean)=>void
}

interface dataProp{

  year:number;
  nums:number[];

}

export const StatsTable = ({ hoveredMonthIndex, hoveredYearValue,hoveredCell, onYearHover,onCellHover}:StatsTableProp) => {
  
  const {data,loading}=useData();
  const [statsData,setStatsData]=useState<dataProp[]>([]);
  const [summaryData,setSummaryData]=useState<dataProp[]>([]);
  
  useEffect(() => {
  if (data) {
    setStatsData(getData(data));
    setSummaryData(summaryRows(data));
  }
  }, [data]);
  
    
  return (
    <div className=" font-vazirmatn flex flex-col border-2 mt-4 py-6 pl-6 max-w-7xl mx-auto rounded-2xl h-5xl gap-4 overflow-y-auto">
      {statsData.map((row,index) => (
    <TableRow
      key={row.year}
      title={row.year}
      nums={row.nums}
      yearIndex={index}
      hoveredMonthIndex={hoveredMonthIndex}
      hoveredCell={hoveredCell}         
      onCellHover={onCellHover}  
      hoveredYearValue={hoveredYearValue}
      onYearHover={onYearHover}
     
    />
  ))}

  <div className="col-span-13 border-t border-gray-300 my-1 mx-2 mr-5"></div>

  {Array.isArray(summaryData) &&
  summaryData.map((row, index) => (

    <TableRow
      key={row.year}
      title={row.year}
      nums={row.nums}
      yearIndex={statsData.length  + index}
      hoveredMonthIndex={hoveredMonthIndex}
      hoveredCell={hoveredCell}        
      onCellHover={onCellHover}  
      hoveredYearValue={hoveredYearValue}
      onYearHover={onYearHover}
     
    />
  ))}

      
    </div>

  )
}

