import React from 'react';
import {CellCards} from '../CellCards/CellCards';
import { toPersianNumbers, getColor } from '../../utils/conversion';
import { cn } from '../../utils/cn';


interface hoveredCellProp
{
  yearIndex:number |null;
  monthIndex:number |null;
  
}

interface tableRowProps
{
  title:number| string;
  nums:(number|null)[]
  yearIndex:number |null;
  hoveredMonthIndex:number|null
  hoveredCell :hoveredCellProp;
  onCellHover:(yearIdx:number, monthIdx :number, hovering:boolean)=>void;
  hoveredYearValue:number|null;
  onYearHover:(yearIdx:number,onYearHover:boolean)=>void;


}



export const TableRow = ({
  title,
  nums,
  yearIndex,
  hoveredMonthIndex,
  hoveredCell,
  onCellHover,
  hoveredYearValue,
  onYearHover
}:tableRowProps) => {

  const titleStr = title?.toString();
  const isSummaryRow = ['میانگین', 'انحراف معیار'].includes(titleStr);
  const isStandardDeviation = titleStr === 'انحراف معیار';
  const isYearHighlighted = hoveredCell?.yearIndex === yearIndex || hoveredYearValue==title ;
  const isYearDimmed=hoveredYearValue!=null && hoveredYearValue!=title && !
  isSummaryRow 
  const isHoveringAnyCell = hoveredCell?.yearIndex !== null && hoveredCell?.monthIndex !== null;
  const isHoveringSummaryRow = ['میانگین', 'انحراف معیار'].some(label =>
    String(hoveredYearValue)?.includes(label)
  );

  return (
    <div className="flex flex-row-reverse bg-transparent items-center ml-24">
      <div className="flex-shrink-0 w-32 mr-2">
        <div
          className="text-right font-semibold h-8 px-3 py-1 rounded-md whitespace-nowrap overflow-hidden text-ellipsis"
          onMouseEnter={() => onYearHover(Number(title), true)}
          onMouseLeave={() => onYearHover(Number(title), false)}
        >
          <span
            className={cn('px-2 py-1 rounded-md transition-colors cursor-pointer   hover:bg-blue-600',
              isYearHighlighted  &&'bg-blue-600 text-white' , 
              !isYearHighlighted && isSummaryRow && "text-zinc-950 hover:text-white ", 
             !isYearHighlighted && isYearDimmed && 'text-zinc-500 ') }
          >
            {toPersianNumbers(title)}
          </span>
        </div>
      </div>

      <div className="flex flex-row-reverse gap-3.5">
        {nums.map((num, idx) => {
          const isHoveredCell = hoveredCell?.yearIndex === yearIndex && hoveredCell?.monthIndex === idx;
          const isHoveredColumn = hoveredMonthIndex === idx;
          const isHoveredRow = hoveredYearValue === title;
          const shouldDim =
            !isSummaryRow &&
            !isHoveringSummaryRow &&
            !isHoveringAnyCell &&
            (hoveredMonthIndex !== null || hoveredYearValue !== null) &&
            !isHoveredColumn &&
            !isHoveredRow;

          const bgClass = cn(
            isSummaryRow && isStandardDeviation
              ? 'bg-gray-100'
              : ((isSummaryRow && !isStandardDeviation) || isHoveredCell || isHoveredColumn || isHoveredRow || !shouldDim) && num !== null
                ? getColor(num)
                : (!isSummaryRow && shouldDim) && 'bg-white border border-gray-300 text-zinc-500 font-semibold'
          );

          return (
            <div
              key={`${yearIndex}-${idx}`}
              onMouseEnter={() => onCellHover?.(Number(yearIndex), idx, true)}
              onMouseLeave={() => onCellHover?.(Number(yearIndex), idx, false)}
            >
              <CellCards
                heightClass="h-10"
                bgClass={bgClass}
                content={`${num}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

