import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const DescriptionCard = ({productDescription}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)]">
      {/* Header */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between bg-[#edecec] px-2 py-3 rounded-t-xl"
      >
        <div className="flex items-center gap-2">
          <RxHamburgerMenu className="text-xl text-gray-600" />
          <span className="font-bold text-gray-700 text-xl">Description</span>
        </div>
        <IoIosArrowDown 
          className={`text-2xl text-gray-600 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Content */}
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden
          ${isExpanded ? 'h-auto' : 'h-[219px] md:h-[210px]'}`}
      >
        <div className={`space-y-4 px-4 py-4 md:px-6 md:py-5 ${!isExpanded && 'line-clamp-[6]'}`}>
          <p className="text-gray-600 leading-relaxed text-[16px] md:text-lg">
           {productDescription}
           </p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionCard;