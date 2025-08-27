import React from 'react'
import TableRow from './TableRow'; 
import statsData from '../data/statsdata';




const StatsTable = ({ hoveredMonthIndex, hoveredYearValue,hoveredCell, onYearHover,onCellHover}) => {

    
  return (
    <div className=" font-vazirmatn flex flex-col border-2 mt-4 py-6 pl-6 max-w-7xl mx-auto rounded-xl h-5xl gap-4 overflow-y-auto">
      {statsData.slice(0, -2).map((row,index) => (
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

  <div className="col-span-13 border-t border-gray-400 my-1 mx-2 mr-5"></div>

  {statsData.slice(-2).map((row,index) => (
    <TableRow
      key={row.year}
      title={row.year}
      nums={row.nums}
            yearIndex={statsData.length - 2 + index}

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

export default StatsTable
