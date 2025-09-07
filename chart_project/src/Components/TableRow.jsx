import React from 'react';
import {CellCards} from './CellCards';
import { toPersianNumbers, getColor } from '../utils/conversion';

export const TableRow = ({
  title,
  nums,
  yearIndex,
  hoveredMonthIndex,
  hoveredCell,
  onCellHover,
  hoveredYearValue,
  onYearHover
}) => {
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
          onMouseEnter={() => onYearHover(title, true)}
          onMouseLeave={() => onYearHover(title, false)}
        >
          <span
            className={`px-2 py-1 rounded-md transition-colors cursor-pointer   hover:bg-blue-600  ${
              isYearHighlighted ? 'bg-blue-600 text-white' : '' } 
              ${!isYearHighlighted && isSummaryRow? "text-zinc-950 hover:text-white ":''} 
              ${ !isYearHighlighted && isYearDimmed? 'text-zinc-500 ':''}` }
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

          let bgClass = 'bg-white border border-gray-300 text-zinc-500 font-semibold'; 
          if (isSummaryRow && isStandardDeviation) {
            bgClass = 'bg-gray-100';
          } else if (isSummaryRow || isHoveredCell || isHoveredColumn || isHoveredRow) {
            bgClass = getColor(num);
          } else if (!shouldDim) {
            bgClass = getColor(num);
          }

          return (
            <div
              key={`${yearIndex}-${idx}`}
              onMouseEnter={() => onCellHover?.(yearIndex, idx, true)}
              onMouseLeave={() => onCellHover?.(yearIndex, idx, false)}
            >
              <CellCards
                heightClass="h-10"
                bgClass={bgClass}
                content={`${num}`}
                hover={null}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

