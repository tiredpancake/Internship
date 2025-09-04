import { toPersianNumbers } from '../utils/conversion';

const CellCards = ({ heightClass, bgClass, content, hover }) => {
  let displayContent;

  if (content === '0' || content === 'null' ) {
    displayContent = '-';
  } else {
    const formatted = content < 0 
      ? `- %‌${Math.abs(content)}`
      : (isNaN(content) ?content:`%‌${content}`);
    displayContent = toPersianNumbers(formatted);
  }

  const finalBgClass = displayContent === '-' ? 'bg-transparent' : bgClass;

  return (
    <div
      className={`flex justify-center font-medium  text-sm cursor-pointer items-center w-20 rounded-md ${heightClass} ${finalBgClass} ${hover || ''}`}
    >
      {displayContent}
    </div>
  );
};

export default CellCards;