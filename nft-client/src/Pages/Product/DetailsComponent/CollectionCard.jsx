import { useState } from "react";
import { FiExternalLink, FiChevronUp, FiChevronDown } from "react-icons/fi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { BsDiscord, BsTwitterX, BsGlobe, BsInstagram } from "react-icons/bs";
import { CiStar } from "react-icons/ci";
import { BiCheck } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { PiCopySimpleBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const CollectionCard = ({ collection }) => {
  const { collectionName, displayImage, _id } = collection.collectionId;
  const [isCollectionExpanded, setIsCollectionExpanded] = useState(true);

  const toggleCollectionDetails = () =>
    setIsCollectionExpanded(!isCollectionExpanded);
  return (
    <div>
      <div className="bg-white rounded-xl shadow-lg pace-y-4">
        {/* <button 
          onClick={toggleCollectionDetails}
          className="w-full flex justify-between items-center mb-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-medium">Collection Details</span>
          </div>
          {isCollectionExpanded ? (
            <FiChevronUp className="text-gray-500 transition-transform" />
          ) : (
            <FiChevronDown className="text-gray-500 transition-transform" />
          )}
        </button> */}

        <button
          onClick={toggleCollectionDetails}
          className="w-full flex items-center justify-between bg-[#edecec] px-2 py-3 rounded-t-xl"
        >
          <div className="flex items-center gap-2">
            <PiCopySimpleBold className="text-xl text-gray-600" />
            <span className="font-bold text-gray-700 text-xl">
              Collection Details
            </span>
          </div>
          <IoIosArrowDown
            className={`text-2xl text-gray-600 transition-transform duration-300 ${
              isCollectionExpanded ? "rotate-180" : ""
            }`}
          />
        </button>

        {isCollectionExpanded && (
          <>
            <div className="flex justify-between items-center py-2  px-4">
              <img
                //src="https://i.ebayimg.com/images/g/GC8AAOSwHWJbisRS/s-l1200.jpg"
                src={displayImage}
                alt="Mutant Ape"
                className="w-12 h-12 rounded-full"
              />
              {/* for mbl */}
              <div className=" flex-1 p-4 lg:hidden">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700 leading-relaxed text-[15px]">
                    {collectionName}
                  </span>
                  <RiVerifiedBadgeFill className="text-blue-500 bg-blue-100 rounded-full text-2xl" />
                </div>
                <div className=" leading-relaxed  text-[14px] flex items-center gap-1">
                  <span>0x5C4...F13D</span>
                  <FiExternalLink className="cursor-pointer hover:opacity-80" />
                </div>
              </div>
              {/* for dekstop */}

              <div className="hidden lg:flex  items-center gap-4 mt-4">
                <button className="hover:opacity-80">
                  <CiStar className="text-gray-400 text-4xl" />
                </button>
                <button className="hover:opacity-80">
                  <BsGlobe className="text-gray-400 text-3xl" />
                </button>
                <button className="hover:opacity-80">
                  <BsDiscord className="text-gray-400 text-3xl" />
                </button>
                <button className="hover:opacity-80">
                  <BsTwitterX className="text-gray-400 text-3xl" />
                </button>
                <button className="hover:opacity-80">
                  <BsInstagram className="text-gray-400 text-3xl" />
                </button>
              </div>
            </div>

            {/* for mbl */}
            <div className="lg:hidden flex items-center justify-start gap-4 py-3 px-3">
              <button className="hover:opacity-80">
                <CiStar className="text-gray-700 text-3xl" />
              </button>
              <button className="hover:opacity-80">
                <BsGlobe className="text-gray-700 text-2xl" />
              </button>
              <button className="hover:opacity-80">
                <BsDiscord className="text-gray-700 text-2xl" />
              </button>
              <button className="hover:opacity-80">
                <BsTwitterX className="text-gray-700 text-2xl" />
              </button>
              <button className="hover:opacity-80">
                <BsInstagram className="text-gray-700 text-2xl" />
              </button>
            </div>
            {/* for dekstop */}

            <div className="lg:flex flex-col p-4 hidden  ">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700 leading-relaxed text-[20px]">
                  {collectionName}
                </span>
                <RiVerifiedBadgeFill className="text-blue-500 bg-blue-100 rounded-full text-2xl" />
              </div>
              <div className=" leading-relaxed  text-[17px] flex items-center gap-1">
                <span>View Collection</span>
                <Link to={`/collection-details/${_id}`}>
                  <FiExternalLink className="cursor-pointer hover:opacity-80" />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CollectionCard;
