import React, { useState } from 'react'
import Header from '../Components/Header';
import StatsTable from '../Components/StatsTable';
import statsData from '../data/statsdata';
const StatsTableContainer = () => {
  const[hoverMonthIndex,setHoverMonthIndex]=useState(null);
  const[hoverYearValue,setHoverYearValue]=useState(null);
  const[hoverCell,setHoverCell]=useState({yearIndex:null,monthIndex:null});

  const onMonthHover = (idx, hovering) => {
    setHoverMonthIndex(hovering ? idx : null);
  };
  const onYearHover = (yearVal, hovering) => {
    setHoverYearValue(hovering ? yearVal : null);
  };
const onCellHover = (yearIdx, monthIdx, hovering) => {
  console.log("Hovering cell:", yearIdx, monthIdx, statsData[yearIdx]?.year);
  if (hovering) {
    setHoverCell({ yearIndex: yearIdx, monthIndex: monthIdx });
    setHoverMonthIndex(monthIdx); 
    // console.log("here",statsData[yearIdx]?.year,monthIdx);
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

export default StatsTableContainer
