import React from 'react';
import CellCards from './CellCards';
import { toPersianNumbers, getColor } from '../utils/conversion';

const TableRow = ({
  title,
  nums,
  yearIndex,
  hoveredMonthIndex,
  hoveredCell,
  onCellHover,
  hoveredYearValue,
  onYearHover
}) => {
  const isSummaryRow = ['میانگین', 'انحراف معیار'].includes(title?.toString());
  const isStandardDeviation = title?.toString() === 'انحراف معیار';
  const isYearHighlighted = hoveredCell?.yearIndex === yearIndex;

  return (
    <div className="flex flex-row-reverse bg-transparent items-center ml-24">
      <div className="flex-shrink-0 w-32 mr-2">
        <div
          className="text-right font-semibold h-8 px-3 py-1 rounded-md whitespace-nowrap overflow-hidden text-ellipsis"
          onMouseEnter={() => onYearHover(title, true)}
          onMouseLeave={() => onYearHover(title, false)}
        >
          <span
            className={`px-2 py-1 rounded-md transition-colors cursor-pointer hover:bg-blue-600 ${
              isYearHighlighted ? 'bg-blue-600 text-white' : ''
            }`}
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
          const isHoveringAnyCell = hoveredCell?.yearIndex !== null && hoveredCell?.monthIndex !== null;

          const shouldDim =
            !isSummaryRow &&
            !isHoveringAnyCell &&
            (hoveredMonthIndex !== null || hoveredYearValue !== null) &&
            !isHoveredColumn &&
            !isHoveredRow;

          let bgClass;

          if (isSummaryRow && isStandardDeviation) {
            bgClass = 'bg-gray-100';
          } else if (isSummaryRow) {
            bgClass = getColor(num);
          } else if (isHoveredCell || isHoveredColumn || isHoveredRow) {
            bgClass = getColor(num);
          } else if (shouldDim) {
            bgClass = 'bg-white border border-gray-300';
          } else {
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
                content={`%${num}`}
                hover={null}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableRow;