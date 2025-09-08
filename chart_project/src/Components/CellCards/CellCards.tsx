import { toPersianNumbers } from '../../utils/conversion';
import { cn } from '../../utils/cn'; 


interface CellCardsProps{
    heightClass :string;
    bgClass :string;
    content:string | number;
    hover?:string;
}
export const CellCards = ({ heightClass , bgClass , content, hover}:CellCardsProps) => {
  let displayContent :string |number;

  if (content === '0' || content === 'null' ) {
    displayContent = '-';
  } else {
    const numericContent=typeof(content)==='string'?parseFloat(content) :content;
    const formatted =numericContent < 0 
      ? `- %‌${Math.abs(numericContent)}`
      : (isNaN(numericContent) ?content:`%‌${numericContent}`);
    displayContent = toPersianNumbers(formatted);
  }


  return (
    <div
      className={cn('flex justify-center font-medium  text-sm cursor-pointer   items-center w-20 rounded-md ',
        heightClass, 
        displayContent ==='-' ? 'bg-transparent':bgClass,
         hover )}
    >
      {displayContent}
    </div>
  );
};

