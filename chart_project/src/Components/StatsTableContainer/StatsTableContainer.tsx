import React, { useEffect, useState } from 'react'
import { useData } from '../../data/datacontext';
import { getData, getMonths, summaryRows } from '../../data/statsdata';
import { CellCards } from '../CellCards/CellCards';
import { cn } from '../../utils/cn';
import { TableRow } from '../TableRow/TableRow';
import { getColor, toPersianNumbers } from '../../utils/conversion';

interface dataProp{

  year:string;
  nums:(number|null)[];

}

export const StatsTableContainer = () => {
  const[hoverMonthIndex,setHoverMonthIndex]=useState<number |null>(null);
  const[hoverYearValue,setHoverYearValue]=useState< number |null>(null);
  const [hoverCell, setHoverCell] = useState<{ yearIndex: number | null; monthIndex: number | null }>({
  yearIndex: null,
  monthIndex: null,
  });
  const [months, setMonths] = useState<string[]>([]);
  const {data,loading}=useData();
  const [statsData,setStatsData]=useState<dataProp[]>([]);
  const [summaryData,setSummaryData]=useState<dataProp[]>([]);
 useEffect(() => {
    if (data) {
      setMonths(getMonths(data));
      setStatsData(getData(data));
      setSummaryData(summaryRows(data));
    }
    }, [data]);

    

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
      <div className="font-vazirmatn flex flex-row-reverse font-semibold bg-gray-100 max-w-7xl h-12 mx-auto px-4 mt-10 rounded-t-lg rounded-b-md items-center ">
        <div className="pl-20 text-center cursor-pointer ml-1 mr-4">سال</div>
        <div className="flex flex-row-reverse gap-3.5">
          {months.map((month, index) => {
            const isHovered = hoverMonthIndex === index;
            const isAnyHovered = hoverMonthIndex !== null;
            const isOther = isAnyHovered && hoverMonthIndex !== index;

            const cellClass=cn(
              'bg-gray-100 text-zinc-950 ',
                isHovered && ' bg-blue-600 text-white ',
                !isHovered&&  isOther && ' text-zinc-500'
            )

            return (
              <div
                key={index}
                onMouseEnter={() => onMonthHover(index, true)}
                onMouseLeave={() => onMonthHover(index, false)}
              >
                <CellCards
                  heightClass="h-7.5 rounded-md py-1 font-bold text-base"
                  bgClass={`${cellClass}  `}
                  content={month}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className=" font-vazirmatn flex flex-col border-2 mt-4 py-6 pl-6 max-w-7xl mx-auto rounded-2xl h-5xl gap-4 overflow-y-auto">
        {statsData.map((row,index) => {
          const { year: title, nums } = row;
          const yearIndex = index;
          const titleStr = title;
          const isSummaryRow = ['میانگین', 'انحراف معیار'].includes(titleStr);
          const isStandardDeviation = titleStr === 'انحراف معیار';
          const isYearHighlighted = hoverCell?.yearIndex === yearIndex || hoverYearValue === yearIndex;
          const isYearDimmed = hoverYearValue !== null && hoverYearValue !== yearIndex && !isSummaryRow;
          const isHoveringAnyCell = hoverCell?.yearIndex !== null && hoverCell?.monthIndex !== null;
          const isHoveringSummaryRow = ['میانگین', 'انحراف معیار'].some(label => String(hoverYearValue)?.includes(label));

          return (
            <div key={title} className="flex flex-row-reverse bg-transparent items-center ml-24">
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
                  const isHoveredCell = hoverCell?.yearIndex === yearIndex && hoverCell?.monthIndex === idx;
                  const isHoveredColumn = hoverMonthIndex === idx;
                  const isHoveredRow = String(hoverYearValue) === title;
                  const shouldDim =
                    !isSummaryRow &&
                    !isHoveringSummaryRow &&
                    !isHoveringAnyCell &&
                    (hoverMonthIndex !== null || hoverYearValue !== null) &&
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
        })}

        <div className="col-span-13 border-t border-gray-300 my-1 mx-2 mr-5"></div>

        {Array.isArray(summaryData) && summaryData.map((row, index) => {
          const { year: title, nums } = row;
          const yearIndex = statsData.length + index;
          const titleStr = title;
          const isSummaryRow = ['میانگین', 'انحراف معیار'].includes(titleStr);
          const isStandardDeviation = titleStr === 'انحراف معیار';
          const isYearHighlighted = hoverCell?.yearIndex === yearIndex || hoverYearValue === yearIndex;
          const isYearDimmed = hoverYearValue !== null && hoverYearValue !== yearIndex && !isSummaryRow;
          const isHoveringAnyCell = hoverCell?.yearIndex !== null && hoverCell?.monthIndex !== null;
          const isHoveringSummaryRow = ['میانگین', 'انحراف معیار'].some(label => String(hoverYearValue)?.includes(label));

          return (
            <div key={`summary-${title}`} className="flex flex-row-reverse bg-transparent items-center ml-24">
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
                  const isHoveredCell = hoverCell?.yearIndex === yearIndex && hoverCell?.monthIndex === idx;
                  const isHoveredColumn = hoverMonthIndex === idx;
                  const isHoveredRow = String(hoverYearValue) === title;
                  const shouldDim =
                    !isSummaryRow &&
                    !isHoveringSummaryRow &&
                    !isHoveringAnyCell &&
                    (hoverMonthIndex !== null || hoverYearValue !== null) &&
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
                      key={`summary-${yearIndex}-${idx}`}
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
        })}
      </div>
    </div>
  )
}

