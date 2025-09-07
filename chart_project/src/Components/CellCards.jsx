import { toPersianNumbers } from '../utils/conversion';
import { cn } from '../utils/cn'; 

export const CellCards = ({ heightClass, bgClass, content, hover }) => {
  let displayContent;

  if (content === '0' || content === 'null' ) {
    displayContent = '-';
  } else {
    const formatted = content < 0 
      ? `- %‌${Math.abs(content)}`
      : (isNaN(content) ?content:`%‌${content}`);
    displayContent = toPersianNumbers(formatted);
  }


  return (
    <div
      className={cn('flex justify-center font-medium  text-sm cursor-pointer items-center w-20 rounded-md ',
        heightClass, 
        displayContent ==='-' ? 'bg-transparent':bgClass,
         hover )}
    >
      {displayContent}
    </div>
  );
};

