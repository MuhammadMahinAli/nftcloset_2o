import { useState } from "react";
import { FiExternalLink, FiChevronUp, FiChevronDown } from "react-icons/fi";
import { GrStatusInfo } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

const TokenCard = ({ tokenDetails }) => {
  const { blockchain, tokenstandard, contractaddress, contractlink } =
    tokenDetails;
  const [isTokenExpanded, setIsTokenExpanded] = useState(true);
  const toggleTokenDetails = () => setIsTokenExpanded(!isTokenExpanded);
  return (
    <div>
      <div className="bg-white rounded-xl shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] space-y-4">
        <button
          onClick={toggleTokenDetails}
          className="w-full flex items-center justify-between bg-[#edecec] px-2 py-3 rounded-t-xl"
        >
          <div className="flex items-center gap-2">
            <GrStatusInfo className="text-xl text-gray-600" />
            <span className="font-bold text-gray-700 text-xl">
              Token Details
            </span>
          </div>
          <IoIosArrowDown
            className={`text-2xl text-gray-600 transition-transform duration-300 ${
              isTokenExpanded ? "rotate-180" : ""
            }`}
          />
        </button>

        {isTokenExpanded && (
          <div className="space-y-3 px-4 py-4 md:px-6 md:py-5">
            {/* <div className="flex justify-between">
              <span className="text-gray-500 leading-relaxed text-[16px] md:text-lg">
                Token ID
              </span>
              <span className="text-gray-700 leading-relaxed text-[16px] md:text-lg">
                #247
              </span>
            </div> */}

            <div className="flex justify-between">
              <span className="text-gray-500 leading-relaxed text-[16px] md:text-lg">
                Blockchain
              </span>
              <span className="text-gray-700 leading-relaxed text-[16px] md:text-lg">
                {blockchain}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 leading-relaxed text-[16px] md:text-lg">
                Token Standard
              </span>
              <span className="text-gray-700 leading-relaxed text-[16px] md:text-lg">
                {tokenstandard}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 leading-relaxed text-[16px] md:text-lg">
                Contract
              </span>
              <div className="flex items-center gap-2">
                <span className="text-green-500 leading-relaxed text-[16px] md:text-lg">
                  {contractaddress}
                </span>
                <a href={contractaddress}>
                  <FiExternalLink className="text-green-500 cursor-pointer hover:opacity-80" />
                </a>
              </div>
            </div>

            {/* <div className="flex justify-between">
              <span className="text-gray-500 leading-relaxed text-[16px] md:text-lg">
                Royalty
              </span>
              <span className="text-gray-700 leading-relaxed text-[16px] md:text-lg">
                0%
              </span>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenCard;
