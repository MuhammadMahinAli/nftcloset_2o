import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const DescriptionCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg">
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
          ${isExpanded ? 'h-auto' : 'h-[219px]'}`}
      >
        <div className={`space-y-4 px-6 py-5 ${!isExpanded && 'line-clamp-[6]'}`}>
          <p className="text-gray-600 leading-relaxed text-lg">
            Lorem ipsum dolor sit amet consectetur, in ante velit molestie id
            suspendisse eu orci neque. Vitae dictum tempus porttitor fermentum turpis lorem, 
            id amet sed aliquam feugiat. efficitur nunc nulla commodo nulla felis, 
            eros hac urna utrique nisi porttitor enim.
          </p>

          <p className="text-gray-600 leading-relaxed text-lg">
            Lorem ipsum dolor sit amet consectetur, in ante velit molestie id
            suspendisse eu orci neque. Vitae dictum tempus porttitor fermentum turpis lorem, 
            id amet sed aliquam feugiat. efficitur nunc nulla commodo nulla felis, 
            eros hac urna utrique nisi porttitor enim.
          </p>

          <p className="text-gray-600 leading-relaxed text-lg">
            tempus porttitor fermentum turpis lorem, id amet sed aliquam
            feugiat. efficitur nunc nulla commodo nulla felis, eros hac urna
            utrique nisi porttitor enim.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionCard;