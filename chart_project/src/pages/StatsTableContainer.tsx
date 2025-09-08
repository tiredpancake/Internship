import React, { useEffect, useState } from 'react'
import {Header} from '../Components/Header';
import {StatsTable} from '../Components/StatsTable';

export const StatsTableContainer = () => {
  const[hoverMonthIndex,setHoverMonthIndex]=useState<number |null>(null);
  const[hoverYearValue,setHoverYearValue]=useState< number |null>(null);
const [hoverCell, setHoverCell] = useState<{ yearIndex: number | null; monthIndex: number | null }>({
  yearIndex: null,
  monthIndex: null,
});



  const onMonthHover = (idx :number, hovering :boolean) => {
    setHoverMonthIndex(hovering ? idx : null);
  };
  const onYearHover = (yearIdx :number, hovering :boolean) => {
    setHoverYearValue(hovering ? yearIdx : null);
    console.log("here",yearIdx)
  };
const onCellHover = (yearIdx :number, monthIdx :number, hovering:boolean) => {
  console.log("Hovering cell:", yearIdx, monthIdx);
  if (hovering) {
    setHoverCell({ yearIndex: yearIdx , monthIndex: monthIdx });
    setHoverMonthIndex(monthIdx); 
    setHoverYearValue(yearIdx); 
  } else {
    setHoverCell({ yearIndex: null, monthIndex: null });
    setHoverMonthIndex(null);
    setHoverYearValue(null);
  }
};

  return (
    <div>
       <div>
        <Header onMonthHover={onMonthHover} hoveredMonthIndex={hoverMonthIndex} />
        <StatsTable
          hoveredMonthIndex={hoverMonthIndex}
          hoveredYearValue={hoverYearValue}
          hoveredCell={hoverCell}
          onYearHover={onYearHover}
          onCellHover={onCellHover}
        />
      </div>
    </div>
  )
}

