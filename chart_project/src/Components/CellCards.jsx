import {toPersianNumbers} from '../utils/conversion';

const CellCards = ({ heightClass, bgClass = 'bg-red-100', content, hover }) => {
  
  const displayContent = (content === 0 || content === '' || content === '%0') ? 
    '-' : toPersianNumbers(content);
  
  const finalBgClass = displayContent === '-' ? 'bg-transparent' : bgClass;
  
  return (
    <div className={`flex justify-center cursor-pointer items-center w-20 rounded-md ${heightClass} ${finalBgClass} ${hover || ''}`}>
      {displayContent}
    </div>
  );
};

export default CellCards;