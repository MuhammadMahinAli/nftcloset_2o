import {useEffect, useState} from "react";
import dashboard from "../../../assets/add-product/shop.png";
import profile from "../../../assets/sellerdashboard/seller-pro.png";
import nft from "../../../assets/sellerdashboard/nft.png";
import product from "../../../assets/add-product/icons8products64-1-1@2x.png";
import AOS from "aos";
import "aos/dist/aos.css";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import {Link} from "react-router-dom";
import {useUniqueRouteAccess} from "../../utils/useUniqueRouteAccess";
import {useAuthCheck} from "../../utils/authCheck";

const UserSidebar = ({openSidebar, setOpenSidebar, toggleSmellerDropdown}) => {
  // states
  const [isOrderVisible, setIsOrderVisible] = useState(false);

  const {userId} = useAuthCheck();
  // function for changing state
  const toggleOrder = () => {
    setIsOrderVisible(!isOrderVisible);
  };

  // aos initializing
  useEffect(() => {
    AOS.init();
  }, []);

  const useUniqueRouteAccess = () => {
    let routeAccessId = null;
    if (userId) {
      routeAccessId = `${userId?.slice(0, 3)}...${userId?.slice(-3)}`;
    }

    return routeAccessId;
  };
  const uroute = `${userId?.slice(0, 3)}...${userId?.slice(-3)}`;
  const uniqueRouteAccess = useUniqueRouteAccess();
  // bg-[#e6f3f3]
  return (
    <div className=" text-gray-500 lg:-mt-7 lg:mr-12">
      <div className="">
        {openSidebar === true ? (
          <ul className="hidden 3xl:block w-[350px] space-y-5 rounded-r-xl lg:rounded-br-xl bg-[#e6f3f3] p-5" data-aos="fade-right" data-aos-duration="1200">
            <li>
              <Link to={`/Buyer-Dashboard/`} className="flex space-x-4 items-center cursor-pointer px-5 py-3 border-2 bg-[#e6f3f3] rounded-xl shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)">
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
              <Link to={`/Buyer-Dashboard/Id=${uniqueRouteAccess}/profiles`} className="flex space-x-4 items-center cursor-pointer px-5 py-3 border-2 bg-[#e6f3f3] rounded-xl shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)">
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                  <img className=" h-7 object-cover" alt="" src={profile} />
                </div>

                <div className="flex justify-between  bg-transparent px-4 py-2 text-sm text-gray-600 hover:text-gray-700">
                  <p className="text-xl font-semibold">My Profile</p>
                </div>
              </Link>
            </li>

            {/* product start */}
            <li className={`border-2 bg-[#e6f3f3]  shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) rounded-xl`}>
              <div className={`flex space-x-7 items-center cursor-pointer px-5 ${isOrderVisible === true ? "pt-4 pb-2" : "py-4"}`}>
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-14 h-[42px]">
                  <img className=" h-8 object-cover" alt="" src={product} />
                </div>

                <div className="flex justify-between items-center w-full bg-transparent px-0 py-2 text-sm text-gray-600 hover:text-gray-700">
                  <p className="text-xl font-semibold">My Orders</p>

                  <button onClick={toggleOrder} className="h-full p-2 ml-0 text-gray-600 rounded-md hover:text-gray-700">
                    {isOrderVisible ? <MdKeyboardArrowUp className="text-2xl font-bold" /> : <MdKeyboardArrowDown className="text-2xl font-bold" />}
                  </button>
                </div>
              </div>
              {isOrderVisible && (
                <ul className="pl-[90px] space-y-2 border-t border-white pt-2 pb-5">
                  <li className="font-medium text-[17px] capitalize ">
                    <Link to={`/Buyer-Dashboard/Id=${uniqueRouteAccess}/history`}>History</Link>
                  </li>
                  <li className="font-medium text-[17px] capitalize ">
                    <Link to={`/Buyer-Dashboard/Id=${uniqueRouteAccess}/recycle`}>Recycle</Link>
                  </li>
                  <li className="font-medium text-[17px] capitalize ">
                    <Link to={`/Buyer-Dashboard/Id=${uniqueRouteAccess}/wish-list`}>Wishlist</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        ) : (
          <div className=" w-[80px] lg:w-[100px] pr-5 -mt-5 lg:mt-3 xl:mt-1 3xl:-mt-4">
            <ul className="flex flex-col items-center justify-center rounded-r-xl lg:rounded-br-2xl bg-[#e6f3f3] py-5 space-y-8">
              <li>
                <Link to={`/Buyer-Dashboard`}>
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#96bde1] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-9 lg:w-11 h-[35px] lg:h-[47px]">
                    <img className="h-5 lg:h-7 object-cover" alt="" src={dashboard} />
                  </div>
                </Link>
              </li>
              <li>
                <Link to={`/Buyer-Dashboard/Id=${uniqueRouteAccess}/profiles`}>
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-9 lg:w-11 h-[35px] lg:h-[47px]">
                    <img className="h-5 lg:h-7 object-cover" alt="" src={profile} />
                  </div>
                </Link>
              </li>
              <li>
                <div className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-9 lg:w-11 h-[35px] lg:h-[47px] overflow-hidden">
                    <img className="h-5 lg:h-7 object-cover" alt="" src={product} />
                  </div>
                  <Link to={`/Buyer-Dashboard/Id=${uniqueRouteAccess}/history`} className="absolute w-[80px] start-full top-4 text-center ms-4 -translate-y-1/2 rounded text-gray-800 px-2 py-2 text-xs font-medium bg-white opacity-0 group-hover:opacity-100 z-50">
                    History
                  </Link>
                  <Link to={`/Buyer-Dashboard/Id=${uniqueRouteAccess}/recycle`} className="absolute w-[80px] start-full top-10 text-center ms-4 -translate-y-1/2 rounded text-gray-700 px-2 py-2 text-xs font-medium bg-white opacity-0 group-hover:opacity-100 z-50">
                    Recycle
                  </Link>
                  <Link to={`/Buyer-Dashboard/Id=${uniqueRouteAccess}/wish-list`} className="absolute w-[80px] start-full top-16 text-center ms-4 -translate-y-1/2 rounded text-gray-700 px-2 py-2 text-xs font-medium bg-white opacity-0 group-hover:opacity-100 z-50">
                    Wishlist
                  </Link>
                </div>
              </li>
              <li>
                <Link to={`/Buyer-Dashboard/Id=${uniqueRouteAccess}/my-nfts`}>
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-9 lg:w-11 h-[35px] lg:h-[47px]">
                    <img className="h-5 lg:h-7 object-cover" alt="" src={nft} />
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

export default UserSidebar;
