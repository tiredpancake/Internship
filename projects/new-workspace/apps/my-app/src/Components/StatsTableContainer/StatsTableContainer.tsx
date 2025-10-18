import  { useEffect, useState } from 'react';
import { useData } from '../../data/datacontext';
import { getData, getMonths, summaryRows } from '../../utils/statsdata';
import { CellCards } from '../CellCards/CellCards';
import { cn } from '../../utils/cn';
import { getColor, toPersianNumbers } from '../../utils/conversion';
import { SUMMARY_LABELS } from './StatsTableContainer.constants';


interface DataProp {
  year: string;
  nums: (number | null)[];
}


export const StatsTableContainer = () => {
  const [hoverMonthIndex, setHoverMonthIndex] = useState<number | null>(null);
  const [hoverYearValue, setHoverYearValue] = useState<number | null>(null);
  const [hoverCell, setHoverCell] = useState<{ yearIndex: number | null; monthIndex: number | null }>({
    yearIndex: null,
    monthIndex: null,
  });
  const [months, setMonths] = useState<string[]>([]);
  const [statsData, setStatsData] = useState<DataProp[]>([]);
  const [summaryData, setSummaryData] = useState<DataProp[]>([]);
  
  const { data, loading } = useData();

  useEffect(() => {
    if (data) {
      setMonths(getMonths(data));
      setStatsData(getData(data));
      setSummaryData(summaryRows(data));
    }
  }, [data]);

  const handleMonthHover = (index: number, hovering: boolean) => {
    setHoverMonthIndex(hovering ? index : null);
  };
  
  const handleYearHover = (yearIndex: number, hovering: boolean) => {
    setHoverYearValue(hovering ? yearIndex : null);
  };

  const handleCellHover = (yearIndex: number, monthIndex: number, hovering: boolean) => {
    if (hovering) {
      setHoverCell({ yearIndex, monthIndex });
      setHoverMonthIndex(monthIndex);
      setHoverYearValue(yearIndex);
    } else {
      setHoverCell({ yearIndex: null, monthIndex: null });
      setHoverMonthIndex(null);
      setHoverYearValue(null);
    }
  };

  const renderMonthHeaders = () => (
    <div className="flex flex-row-reverse gap-3.5 ">
     
         {months.map((month, index) => {
        const isHovered = hoverMonthIndex === index;
        const isAnyHovered = hoverMonthIndex !== null;
        const isOther = isAnyHovered && hoverMonthIndex !== index;

        const cellClass = cn(
          'bg-gray-100 text-zinc-950',
          isHovered && 'bg-blue-600 text-white',
          !isHovered && isOther && 'text-zinc-500'
        );

        return (
          <div
            key={index}
            onMouseOver={() => handleMonthHover(index, true)}
            onMouseLeave={() => handleMonthHover(index, false)}
          >
            <CellCards
              heightClass="h-7.5 rounded-md py-2 px-8 font-bold text-base "
              bgClass={cellClass}
              content={month}
            />
          </div>
          
        );
      })}
      </div>
  
  );

  const renderDataRow = (row: DataProp, index: number, isSummary: boolean = false) => {
    const { year: title, nums } = row;
    const yearIndex = index;
    const isStandardDeviation = title === 'انحراف معیار';
    const isYearHighlighted = hoverCell.yearIndex === yearIndex || hoverYearValue === yearIndex;
    const isYearDimmed = hoverYearValue !== null && hoverYearValue !== yearIndex && !isSummary;
    const isHoveringAnyCell = hoverCell.yearIndex !== null && hoverCell.monthIndex !== null;
    const isHoveringSummaryRow = SUMMARY_LABELS.some(label => String(hoverYearValue)?.includes(label));

    return (
      <div key={isSummary ? `summary-${title}` : title} className="flex flex-row-reverse bg-transparent items-center ml-24">
        <div className="flex-shrink-0 w-32 mr-2">
          <div
            className="text-right font-semibold h-8 px-3 py-1 rounded-md whitespace-nowrap overflow-hidden text-ellipsis"
            onMouseOver={() => handleYearHover(Number(title), true)}
            onMouseLeave={() => handleYearHover(Number(title), false)}
          >
            <span
              className={cn(
                'px-2 py-1 rounded-md transition-colors cursor-pointer hover:bg-blue-600',
                isYearHighlighted && 'bg-blue-600 text-white',
                !isYearHighlighted && isSummary && "text-zinc-950 hover:text-white",
                !isYearHighlighted && isYearDimmed && 'text-zinc-500'
              )}
            >
              {toPersianNumbers(title)}
            </span>
          </div>
        </div>

        <div className="flex flex-row-reverse gap-3.5">
          {nums.map((num, idx) => {
            const isHoveredCell = hoverCell.yearIndex === yearIndex && hoverCell.monthIndex === idx;
            const isHoveredColumn = hoverMonthIndex === idx;
            const isHoveredRow = String(hoverYearValue) === title;
            const shouldDim = !isSummary &&
              !isHoveringSummaryRow &&
              !isHoveringAnyCell &&
              (hoverMonthIndex !== null || hoverYearValue !== null) &&
              !isHoveredColumn &&
              !isHoveredRow;

            const bgClass = cn(
              isSummary && isStandardDeviation
                ? 'bg-gray-100'
                : ((isSummary && !isStandardDeviation) || isHoveredCell || isHoveredColumn || isHoveredRow || !shouldDim) && num !== null
                  ? getColor(num)
                  : (!isSummary && shouldDim) && 'bg-white border border-gray-300 text-zinc-500 font-semibold'
            );

            return (
              <div
                key={`${yearIndex}-${idx}`}
                onMouseOver={() => handleCellHover(Number(yearIndex), idx, true)}
                onMouseLeave={() => handleCellHover(Number(yearIndex), idx, false)}
              >
                <CellCards
                  heightClass={cn('h-10 py-4',
                  isSummary && "h-10" )}
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

  return (
    <div>
      <div className="font-vazirmatn flex flex-row-reverse font-semibold bg-gray-100 max-w-7xl h-12 mx-auto px-4 mt-10 rounded-t-lg rounded-b-md items-center">
        <div className="pl-20 text-center cursor-pointer ml-1 mr-3">سال</div>
        {renderMonthHeaders()}
      </div>

      <div className="font-vazirmatn flex flex-col border-2 mt-4 py-6 pl-6 max-w-7xl mx-auto rounded-2xl h-5xl gap-4 overflow-y-auto">
        {statsData.map((row, index) => renderDataRow(row, index))}
        
        <div className="col-span-13 border-t border-gray-300 my-1 mx-2 mr-5" />

        {Array.isArray(summaryData) && summaryData.map((row, index) => 
          renderDataRow(row, statsData.length + index, true)
        )}
      </div>
    </div>
  );
};