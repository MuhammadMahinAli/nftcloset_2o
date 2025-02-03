import {useEffect, useState} from "react";
import dashboard from "../../../assets/add-product/shop.png";
import profile from "../../../assets/sellerdashboard/seller-pro.png";
import chat from "../../../assets/sellerdashboard/chat.png";
import product from "../../../assets/add-product/icons8products64-1-1@2x.png";
import AOS from "aos";
import "aos/dist/aos.css";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import {Link} from "react-router-dom";
import {useUniqueRouteAccess} from "../../utils/useUniqueRouteAccess";
import {useAuthCheck} from "../../utils/authCheck";

const DesignerSidebar = ({openSidebar, setOpenSidebar, toggleSellerDropdown}) => {
  const uniqueRouteAccess = useUniqueRouteAccess();

  const {userId} = useAuthCheck();
  console.log(userId);
  // aos initializing
  useEffect(() => {
    AOS.init();
  }, []);
  const [isAnalyticsVisible, setIsAnalyticsVisible] = useState(false);
  // function for changing state
  const toggleAnalytics = () => {
    setIsAnalyticsVisible(!isAnalyticsVisible);
  };

  return (
    <div className=" text-gray-500 lg:-mt-5 lg:mr-12">
      <div className="">
        {openSidebar === true ? (
          <ul className="w-[350px] space-y-5 rounded-br-xl bg-[#e6f3f3] p-5" data-aos="fade-right">
            <li>
              <Link to={`/Designer-Dashboard/`} className="flex space-x-4 items-center cursor-pointer px-5 py-3 border-2 bg-[#e6f3f3] rounded-xl shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)">
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#96bde1] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                  <img className=" h-7 object-cover" alt="" src={dashboard} />
                </div>

                <div className="flex justify-between  bg-transparent px-4 py-2 text-sm text-gray-600 hover:text-gray-700">
                  <p className="text-xl font-semibold">Dashboard</p>
                </div>
              </Link>
            </li>
            {/* profile */}
            <li>
              <Link to={`/Designer-Dashboard/Id=${uniqueRouteAccess}/profiles`} className="flex space-x-4 items-center cursor-pointer px-5 py-3 border-2 bg-[#e6f3f3] rounded-xl shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)">
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                  <img className=" h-7 object-cover" alt="" src={profile} />
                </div>

                <div className="flex justify-between  bg-transparent px-4 py-2 text-sm text-gray-600 hover:text-gray-700">
                  <p className="text-xl font-semibold">My Profile</p>
                </div>
              </Link>
            </li>
            {/* profile */}
            <li>
              <Link to={`/Designer-Dashboard/Id=${uniqueRouteAccess}/gigs`} className="flex space-x-4 items-center cursor-pointer px-5 py-3 border-2 bg-[#e6f3f3] rounded-xl shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)">
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                  <img className=" h-7 object-cover" alt="" src={profile} />
                </div>

                <div className="flex justify-between  bg-transparent px-4 py-2 text-sm text-gray-600 hover:text-gray-700">
                  <p className="text-xl font-semibold">My Gigs</p>
                </div>
              </Link>
            </li>
            <li>
              <Link to={`/Designer-Dashboard/Id=${uniqueRouteAccess}/portfolio`} className="flex space-x-4 items-center cursor-pointer px-5 py-3 border-2 bg-[#e6f3f3] rounded-xl shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)">
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                  <img className=" h-7 object-cover" alt="" src={profile} />
                </div>

                <div className="flex justify-between  bg-transparent px-4 py-2 text-sm text-gray-600 hover:text-gray-700">
                  <p className="text-xl font-semibold">My Portfolio</p>
                </div>
              </Link>
            </li>
            {/* order */}
            <li>
              <Link to={`/Designer-Dashboard/Id=${uniqueRouteAccess}/order`} className="flex space-x-4 items-center cursor-pointer px-5 py-3 border-2 bg-[#e6f3f3] rounded-xl shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)">
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                  <img className=" h-7 object-cover" alt="" src={profile} />
                </div>

                <div className="flex justify-between  bg-transparent px-4 py-2 text-sm text-gray-600 hover:text-gray-700">
                  <p className="text-xl font-semibold">My Order</p>
                </div>
              </Link>
            </li>

            {/*analytics start */}
            <li className={`border-2 bg-[#e6f3f3]  shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) rounded-xl`}>
              <div className={`flex space-x-7 items-center cursor-pointer px-5 ${isAnalyticsVisible === true ? "pt-4 pb-2" : "py-4"}`}>
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-14 h-[42px]">
                  <img className=" h-8 object-cover" alt="" src={product} />
                </div>

                <div className="flex justify-between items-center w-full bg-transparent px-0 py-2 text-sm text-gray-600 hover:text-gray-700">
                  <p className="text-xl font-semibold">Analytics</p>

                  <button onClick={toggleAnalytics} className="h-full p-2 ml-0 text-gray-600 rounded-md hover:text-gray-700">
                    {isAnalyticsVisible ? <MdKeyboardArrowUp className="text-2xl font-bold" /> : <MdKeyboardArrowDown className="text-2xl font-bold" />}
                  </button>
                </div>
              </div>
              {isAnalyticsVisible && (
                <ul className="pl-[90px] space-y-2 border-t border-white pt-2 pb-5">
                  <li className="font-medium text-[17px] capitalize ">
                    <Link to={`/Designer-Dashboard/Id=${uniqueRouteAccess}/analytics`}>Earning</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to={`/Designer-Dashboard/Id=${uniqueRouteAccess}/conversations`} className="flex space-x-4 items-center cursor-pointer px-5 py-3 border-2 bg-[#e6f3f3] rounded-xl shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)">
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                  <img className=" h-7 object-cover" alt="" src={chat} />
                </div>

                <div className="flex justify-between  bg-transparent px-4 py-2 text-sm text-gray-600 hover:text-gray-700">
                  <p className="text-xl font-semibold">Conversations</p>
                </div>
              </Link>
            </li>
          </ul>
        ) : (
          <div className="w-[80px] lg:w-[100px] pr-5 -mt-5 lg:mt-1 3xl:-mt-4">
            <ul className="flex flex-col items-center justify-center rounded-br-2xl bg-[#e6f3f3] py-5 space-y-8">
              <li>
                <Link to={`/Designer-Dashboard/`}>
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#96bde1] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                    <img className=" h-7 object-cover" alt="" src={dashboard} />
                  </div>
                </Link>
              </li>
              <li>
                <Link to={`/Designer-Dashboard/Id=${uniqueRouteAccess}/profiles`}>
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                    <img className=" h-7 object-cover" alt="" src={profile} />
                  </div>
                </Link>
              </li>
              <li>
                <Link to={`/Designer-Dashboard/Id=${uniqueRouteAccess}/gigs`}>
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                    <img className=" h-7 object-cover" alt="" src={profile} />
                  </div>
                </Link>
              </li>
              <li>
                <Link to={`/Designer-Dashboard/Id=${uniqueRouteAccess}/portfolio`}>
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                    <img className=" h-7 object-cover" alt="" src={profile} />
                  </div>
                </Link>
              </li>
              <li>
                <Link to={`/Designer-Dashboard/Id=${uniqueRouteAccess}/order`}>
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                    <img className=" h-7 object-cover" alt="" src={profile} />
                  </div>
                </Link>
              </li>
              <li>
                <Link to={`/Designer-Dashboard/Id=${uniqueRouteAccess}/analytics`}>
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                    <img className=" h-7 object-cover" alt="" src={profile} />
                  </div>
                </Link>
              </li>
              <li>
                <Link to={`/Designer-Dashboard/Id=${uniqueRouteAccess}/conversations`}>
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                    <img className=" h-7 object-cover" alt="" src={chat} />
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignerSidebar;
