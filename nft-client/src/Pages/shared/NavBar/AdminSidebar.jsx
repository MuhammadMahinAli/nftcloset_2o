import {useEffect, useState} from "react";
import mintRqst from "../../../assets/sellerdashboard/nft-rqst.png";
import dashboard from "../../../assets/add-product/shop.png";
import recycle from "../../../assets/sellerdashboard/recycle.png";
import sellerProfile from "../../../assets/sellerdashboard/seller-pro.png";
import collection from "../../../assets/add-product/icons8clothes100-1@2x.png";
import luckyDraw from "../../../assets/spinner/lucky-draw.png";
import nft from "../../../assets/sellerdashboard/nft.png";
import AOS from "aos";
import "aos/dist/aos.css";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import {Link} from "react-router-dom";

const AdminSidebar = ({openSidebar, setOpenSidebar, toggleSellerDropdown}) => {
  // states
  const [isCollectionVisible, setIsCollectionVisible] = useState(false);

  const toggleCollection = () => {
    setIsCollectionVisible(!isCollectionVisible);
  };
  // aos initializing
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className=" text-gray-500 3xl:-mt-6 lg:mr-12">
      <div className="">
        {openSidebar === true ? (
          <ul className="hidden 3xl:block w-[350px] space-y-5 rounded-xl lg:rounded-br-xl bg-[#e6f3f3] p-5" data-aos="fade-right">
            <li>
              <Link to="/admin" className="flex space-x-4 items-center cursor-pointer px-5 py-3 border-2 bg-[#e6f3f3] rounded-xl shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)">
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#96bde1] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                  <img className=" h-7 object-cover" alt="" src={dashboard} />
                </div>

                <div className="flex justify-between  bg-transparent px-4 py-2 text-sm text-gray-600 hover:text-gray-700">
                  <p className="text-xl font-semibold">Dashboard</p>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/" className="flex space-x-4 items-center cursor-pointer px-5 py-3 border-2 bg-[#e6f3f3] rounded-xl shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)">
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#e6f3f3] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                  <img className=" h-7 object-cover" alt="" src={mintRqst} />
                </div>

                <div className="flex justify-between  bg-transparent px-4 py-2 text-sm text-gray-600 hover:text-gray-700">
                  <p className="text-xl font-semibold">Mint Request</p>
                </div>
              </Link>
            </li>

            <li>
              <Link to="/admin/seller-profiles" className="flex space-x-4 items-center cursor-pointer px-5 py-3 border-2 bg-[#e6f3f3] rounded-xl shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)">
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#e6f3f3] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                  <img className=" h-7 object-cover" alt="" src={sellerProfile} />
                </div>

                <div className="flex justify-between  bg-transparent px-4 py-2 text-sm text-gray-600 hover:text-gray-700">
                  <p className="text-xl font-semibold">Seller Profiles</p>
                </div>
              </Link>
            </li>

            <li>
              <Link to="/admin/certificate-request" className="flex space-x-4 items-center cursor-pointer px-5 py-3 border-2 bg-[#e6f3f3] rounded-xl shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)">
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#e6f3f3] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                  <img className=" h-7 object-cover" alt="" src={mintRqst} />
                </div>

                <div className="flex justify-between  bg-transparent px-4 py-2 text-sm text-gray-600 hover:text-gray-700">
                  <p className="text-xl font-semibold">Certification Request</p>
                </div>
              </Link>
            </li>

            {/* collection start */}
            <li className={`border-2 bg-[#e6f3f3]  shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) rounded-xl`}>
              <div className={`flex space-x-7 items-center cursor-pointer px-5 ${isCollectionVisible === true ? "pt-4 pb-2" : "py-4"}`}>
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-14 h-[42px]">
                  <img className=" h-8 object-cover" alt="" src={collection} />
                </div>

                <div className="flex justify-between items-center w-full bg-transparent px-0 py-2 text-sm text-gray-600 hover:text-gray-700">
                  <p className="text-xl font-semibold">Collections</p>

                  <button onClick={toggleCollection} className="h-full p-2 ml-0 text-gray-600 rounded-md hover:text-gray-700">
                    {isCollectionVisible ? <MdKeyboardArrowUp className="text-2xl font-bold" /> : <MdKeyboardArrowDown className="text-2xl font-bold" />}
                  </button>
                </div>
              </div>
              {isCollectionVisible && (
                <ul className="pl-[90px] space-y-2 border-t border-white pt-2 pb-5">
                  <li className="font-medium text-[17px] capitalize ">
                    <Link to="/admin/create-collection">create collection</Link>
                  </li>

                  <li className="font-medium text-[17px] capitalize ">
                    <Link to="/admin/all-collection">collection list</Link>
                  </li>
                </ul>
              )}
            </li>
            {/* collection end */}

            <li>
              <Link to="" className="flex space-x-4 items-center cursor-pointer px-5 py-3 border-2 bg-[#e6f3f3] rounded-xl shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)">
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                  <img className=" h-7 object-cover" alt="" src={recycle} />
                </div>

                <p className="text-xl font-semibold">Recycle</p>
              </Link>
            </li>
            <li>
              <Link to="/admin/lucky-draw" className="flex space-x-4 items-center cursor-pointer px-5 py-3 border-2 bg-[#e6f3f3] rounded-xl shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)">
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                  <img className=" h-7 object-cover" alt="" src={luckyDraw} />
                </div>

                <p className="text-xl font-semibold">Lucky Draw</p>
              </Link>
            </li>
          </ul>
        ) : (
          <div className=" w-[80px] lg:w-[100px] pr-5 -mt-5 3xl:-mt-2 lg:mt-0">
            <ul className="flex flex-col items-center justify-center rounded-r-xl lg:rounded-br-2xl bg-[#e6f3f3] py-5 space-y-8">
              <li>
                <Link to="/admin">
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#96bde1] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                    <img className=" h-7 object-cover" alt="" src={dashboard} />
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/admin/seller-profiles">
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                    <img className=" h-7 object-cover" alt="" src={sellerProfile} />
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/admin/certificate-request">
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                    <img className=" h-7 object-cover" alt="" src={mintRqst} />
                  </div>
                </Link>
              </li>
              <li>
                <li>
                  <div className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                    <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-9 lg:w-11 h-[35px] lg:h-[47px]">
                      <img className="h-5 lg:h-7 object-cover" alt="" src={collection} />
                    </div>
                    <Link to="/admin/create-collection" className="absolute w-[120px] start-full top-5 text-start ms-4 -translate-y-1/2 rounded text-gray-800 px-2 py-3 text-xs font-medium bg-white opacity-0 group-hover:opacity-100">
                      Create collection
                    </Link>
                    <Link to="/admin/all-collection" className="absolute w-[120px] start-full top-14 text-start  ms-4 -translate-y-1/2 rounded text-gray-700 px-2 py-3 text-xs font-medium bg-white opacity-0 group-hover:opacity-100">
                      Collection list
                    </Link>
                  </div>
                </li>
              </li>
              <li>
                <Link to="/admin/recycle">
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                    <img className=" h-7 object-cover" alt="" src={recycle} />
                  </div>
                </Link>
              </li>{" "}
              {/* 
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                  <img className=" h-7 object-cover" alt="" src={recycle} />
                </div>
              </li> */}
              <li>
                <Link to="/admin/lucky-draw">
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                    <img className=" h-7 object-cover" alt="" src={luckyDraw} />
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/admin/my-nfts">
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                    <img className=" h-7 object-cover" alt="" src={nft} />
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

export default AdminSidebar;

//<div className=" text-gray-500 -mt-5 mr-12">
//      <div className="">
//        {openSidebar === true ? (
//          <ul
//            className="w-[350px] space-y-5 rounded-br-xl bg-[#e6f3f3] p-5"
//            data-aos="fade-right"
//          >
//  <li>
//    <Link
//      to="/admin"
//      className="flex space-x-4 items-center cursor-pointer px-5 py-3 border-2 bg-[#e6f3f3] rounded-xl shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)"
//    >
//      <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#96bde1] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
//        <img className=" h-7 object-cover" alt="" src={dashboard} />
//      </div>

//      <div className="flex justify-between  bg-transparent px-4 py-2 text-sm text-gray-600 hover:text-gray-700">
//        <p className="text-xl font-semibold">Dashboard</p>
//      </div>
//    </Link>
//  </li>
//  <li>
//    <Link
//      to="/"
//      className="flex space-x-4 items-center cursor-pointer px-5 py-3 border-2 bg-[#e6f3f3] rounded-xl shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)"
//    >
//      <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#e6f3f3] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
//        <img className=" h-7 object-cover" alt="" src={mintRqst} />
//      </div>

//      <div className="flex justify-between  bg-transparent px-4 py-2 text-sm text-gray-600 hover:text-gray-700">
//        <p className="text-xl font-semibold">Mint Request</p>
//      </div>
//    </Link>
//  </li>
//  <li>
//    <Link
//      to="/admin/seller-profiles"
//      className="flex space-x-4 items-center cursor-pointer px-5 py-3 border-2 bg-[#e6f3f3] rounded-xl shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)"
//    >
//      <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#e6f3f3] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
//        <img
//          className=" h-7 object-cover"
//          alt=""
//          src={sellerProfile}
//        />
//      </div>

//      <div className="flex justify-between  bg-transparent px-4 py-2 text-sm text-gray-600 hover:text-gray-700">
//        <p className="text-xl font-semibold">Seller Profiles</p>
//      </div>
//    </Link>
//  </li>

//  {/* collection start */}
//  <li
//    className={`border-2 bg-[#e6f3f3]  shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) rounded-xl`}
//  >
//    <div
//      className={`flex space-x-7 items-center cursor-pointer px-5 ${
//        isCollectionVisible === true ? "pt-4 pb-2" : "py-4"
//      }`}
//    >
//      <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-14 h-[42px]">
//        <img className=" h-8 object-cover" alt="" src={collection} />
//      </div>

//      <div className="flex justify-between items-center w-full bg-transparent px-0 py-2 text-sm text-gray-600 hover:text-gray-700">
//        <p className="text-xl font-semibold">Collections</p>

//        <button
//          onClick={toggleCollection}
//          className="h-full p-2 ml-0 text-gray-600 rounded-md hover:text-gray-700"
//        >
//          {isCollectionVisible ? (
//            <MdKeyboardArrowUp className="text-2xl font-bold" />
//          ) : (
//            <MdKeyboardArrowDown className="text-2xl font-bold" />
//          )}
//        </button>
//      </div>
//    </div>
//    {isCollectionVisible && (
//      <ul className="pl-[90px] space-y-2 border-t border-white pt-2 pb-5">
//        <li className="font-medium text-[17px] capitalize ">
//          <Link to="/admin/create-collection">create collection</Link>
//        </li>
//        <li className="font-medium text-[17px] capitalize ">
//          collection list
//        </li>
//      </ul>
//    )}
//  </li>
//  {/* collection end */}

//  <li>
//    <Link
//      to=""
//      className="flex space-x-4 items-center cursor-pointer px-5 py-3 border-2 bg-[#e6f3f3] rounded-xl shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)"
//    >
//      <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
//        <img className=" h-7 object-cover" alt="" src={recycle} />
//      </div>

//      <p className="text-xl font-semibold">Recycle</p>
//    </Link>
//  </li>
//          </ul>
//        ) : (
//          <div className="w-[100px] pr-5 -mt-5 ">
//            <ul className="flex flex-col items-center justify-center rounded-br-2xl bg-[#e6f3f3] py-5 space-y-8">
//              <li>
//              <Link
//                to="/admin">
//                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#96bde1] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
//                  <img className=" h-7 object-cover" alt="" src={dashboard} />
//                </div>
//                </Link>
//              </li>
//              <li>
//                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
//                  <img className=" h-7 object-cover" alt="" src={mintRqst} />
//                </div>
//              </li>
//              <li>
//              <Link
//                to="/admin/seller-profiles">
//                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
//                  <img
//                    className=" h-7 object-cover"
//                    alt=""
//                    src={sellerProfile}
//                  />
//                </div>
//                </Link>
//              </li>
//              <li>
//                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
//                  <img className=" h-7 object-cover" alt="" src={collection} />
//                </div>
//              </li>
//              <li>
//                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
//                  <img className=" h-7 object-cover" alt="" src={recycle} />
//                </div>
//              </li>
//            </ul>
//          </div>
//        )}
//      </div>
//    </div>
