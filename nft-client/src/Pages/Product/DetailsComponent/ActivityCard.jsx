import { useState } from "react";
import { FiChevronUp, FiExternalLink } from "react-icons/fi";
import eth from "../../../assets/nft-image/eth.png";
import blackEth from "../../../assets/nft-image/blackEth.png";
import activity from "../../../assets/nft-image/activity.png";
import { IoIosArrowDown } from "react-icons/io";
import { BiTransfer } from "react-icons/bi";
import { RiCloseCircleLine } from "react-icons/ri";
import { PiStarFour } from "react-icons/pi";
import { GrCart } from "react-icons/gr";

const ActivityCard = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState("Listings");

  const tabs = [
    "Listings",
    "Mints",
    "Transfers",
    "Sales",
    "Cancelled Listings",
  ];

  const activities = [
    {
      type: "Transfer",
      from: "nakiri.eth",
      to: "294693",
      time: "3 hours ago",
      icon: <BiTransfer />,
    },
    {
      type: "Transfer",
      from: "294693",
      to: "nakiri.eth",
      time: "3 hours ago",
      icon: <BiTransfer />,
    },
    {
      type: "Mint",
      from: "000000",
      time: "3 years ago",
      icon: <PiStarFour />,
    },
    {
      type: "List",
      price: "8.65",
      from: "294693",
      note: "ETH below floor",
      icon: <RiCloseCircleLine />,
      time: "25 Minutes Ago",
    },
    {
      type: "Sale",
      price: "8.65",
      from: "294693",
      to: "000000",
      time: "26 Minutes Ago",
      icon: <GrCart />,
    },
    {
      type: "Cancel Listing",
      price: "8.65",
      from: "294693",
      time: "26 Minutes Ago",
      icon: <RiCloseCircleLine />,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg space-y-4 hidden md:block">
      <div className="">
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between bg-[#edecec] px-2 py-3 rounded-t-xl"
        >
        <div className="flex items-center gap-2">
                  <img src={activity} className="text-xl text-gray-600" />
                    <span className="font-bold text-gray-700 text-xl">
                      Activity
                    </span>
                    </div>
          {/* right */}
          <div className="flex items-center space-x-3">
            <p>Last Sale</p>
            <img src={eth} className="h-7" />
            <div className="flex items-center text-gray-700 text-sm">15.04</div>
            <IoIosArrowDown
              className={`text-2xl text-gray-600 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        {isExpanded && (
          <>
            {/* Tabs */}
            <div className="px-4 border-b border-gray-200 py-5">
              <div className="flex gap-1 xl:gap-4 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-md whitespace-nowrap ${
                      activeTab === tab
                        ? "text-green-600 bg-gray-100"
                        : "text-gray-700 border-2 border-gray-200"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Activity List */}
            <div className="">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="p-4 border-b border-gray-200 last:border-b-0 flex items-center justify-between"
                >
                  <div className="flex flex-col  gap-3">
                 
                    <div
                      className={`
                         flex justify-center items-center space-x-3 px-2 py-1 border rounded-3xl text-[17px] w-40
                          ${
                            activity.type === "Transfer"
                              ? "border-blue-600 text-blue-600"
                              : ""
                          }
                          ${
                            activity.type === "Mint"
                              ? "border-[#DFB41D] text-[#DFB41D]"
                              : ""
                          }
                          ${
                            activity.type === "List"
                              ? "border-red-600 text-red-600"
                              : ""
                          }
                          ${
                            activity.type === "Sale"
                              ? "border-purple-600 text-purple-600"
                              : ""
                          }
                          ${
                            activity.type === "Cancel Listing"
                              ? "border-gray-600 text-gray-600"
                              : ""
                          }
                        `}
                    >
                      <span className="mr-2">{activity.icon}</span>
                      {activity.type}
                 
                    </div>
                    <div className="flex items-center gap-3 ">
                      {activity.price && (
                        <span className="font-medium flex items-center gap-2">
                          <img src={blackEth} className="h-4" />
                          {activity.price}
                        </span>
                      )}
                      <div className="text-[15px] lg:text-[16px] 3xl:text-[17px] text-gray-500 space-x-4">
                        {activity.from && (
                          <span className="capitalize">
                            from{" "}
                            <span className="text-gray-700 font-bold">
                              {activity.from}
                            </span>
                          </span>
                        )}
                        {activity.to && (
                          <span className="capitalize">
                            to{" "}
                            <span className="text-gray-700 font-bold">
                              {activity.to}
                            </span>
                          </span>
                        )}
                      </div>
                      {activity.note && (
                        <span className="text-[15px] lg:text-[16px] 3xl:text-[17px] text-gray-500">
                          ({activity.note})
                        </span>
                      )}
                      <span className="text-[15px] lg:text-[16px] 3xl:text-[17px] text-gray-500">
                        {activity.time}
                      </span>
                    </div>
                  </div>

                  <div className="border rounded-md">
                    <FiExternalLink className="text-gray-400 cursor-pointer hover:text-gray-600 text-2xl m-1" />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;
