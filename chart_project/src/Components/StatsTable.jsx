import React from 'react'
import TableRow from './TableRow'; 


const statsData = [
  { year: 1403, nums: [4, 11, 7, 6, 0, 0, 0, 0, 0, 0,0, 0] },
  { year: 1402, nums: [11,6, -3, 8, 5, -3,-2, 8, 6, 3, -2, 2] },
  { year: 1401, nums: [12, 8, -3, -3, -2, 44, 44, 44, 44, 44, 44, 44] },
  { year: 1400, nums: [5, 2, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42] },
  { year: 1399, nums: [9, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40] },
  { year: 1398, nums: [8, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38] },
  { year: 1397, nums: [6, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36] },
  { year: 1396, nums: [9, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34] },
  { year: 'میانگین', nums: [8, 2.6, 2.8, 2.6, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8] },
  { year: 'انحراف معیار', nums: [2.7, 2.6, 2.6, 2.6, 2.6, 2.6, 2.6, 2.6, 2.6, 2.6, 2.6, 2.6] },

];


const StatsTable = () => {

    
  return (
    <div className=" font-vazirmatn flex flex-col border-2 mt-4 py-6 pl-6 max-w-7xl mx-auto rounded-xl h-5xl gap-4 overflow-y-auto">
      {statsData.slice(0, -2).map((row) => (
    <TableRow
      key={row.year}
      title={row.year}
      nums={row.nums}
     
    />
  ))}

  <div className="col-span-13 border-t border-gray-400 my-1 mx-2 mr-5"></div>

  {statsData.slice(-2).map((row) => (
    <TableRow
      key={row.year}
      title={row.year}
      nums={row.nums}
     
    />
  ))}

      
    </div>

  )
}

export default StatsTable
