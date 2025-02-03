import {useEffect, useState} from "react";
import dashboard from "../../../assets/add-product/shop.png";
import profile from "../../../assets/sellerdashboard/seller-pro.png";
import product from "../../../assets/add-product/icons8products64-1-1@2x.png";
import order from "../../../assets/add-product/icons8deliverybox64-1@2x.png";
import collection from "../../../assets/add-product/icons8clothes100-1@2x.png";
import supply from "../../../assets/add-product/icons8clothes96-1@2x.png";
import nft from "../../../assets/sellerdashboard/nft.png";
import nftImg from "../../../assets/sellerdashboard/6298900.png";
import AOS from "aos";
import "aos/dist/aos.css";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import {Link} from "react-router-dom";
import {useUniqueRouteAccess} from "../../utils/useUniqueRouteAccess";

const SellerSidebar = ({openSidebar, setOpenSidebar, toggleSellerDropdown}) => {
  // states
  const [isProductVisible, setIsProductVisible] = useState(false);
  const [isOrderVisible, setIsOrderVisible] = useState(false);
  const [isCollectionVisible, setIsCollectionVisible] = useState(false);
  const uniqueRouteAccess = useUniqueRouteAccess();

  // function for changing state
  const toggleProduct = () => {
    setIsProductVisible(!isProductVisible);
  };
  const toggleOrder = () => {
    setIsOrderVisible(!isOrderVisible);
  };
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
          <ul className="hidden 3xl:block w-[350px] space-y-5 rounded-xl lg:rounded-br-xl bg-[#e6f3f3] p-5" data-aos="fade-right" data-aos-duration="1200">
            <li>
              <Link to={`/Seller-Dashboard/`} className="flex space-x-4 items-center cursor-pointer px-5 py-3 border-2 bg-[#e6f3f3] rounded-xl shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)">
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#96bde1] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-8 h-[32px] md:w-11 md:h-[47px]">
                  <img className=" h-7 object-cover" alt="" src={dashboard} />
                </div>

                <div className="flex justify-between  bg-transparent px-4 py-2 text-sm text-gray-600 hover:text-gray-700">
                  <p className="text-xl font-semibold">Dashboard</p>
                </div>
              </Link>
            </li>
            {/* profile */}
            <li>
              <Link to={`/Seller-Dashboard/Id=${uniqueRouteAccess}/profiles`} className="flex space-x-4 items-center cursor-pointer px-5 py-3 border-2 bg-[#e6f3f3] rounded-xl shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)">
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-8 h-[32px] md:w-11 md:h-[47px]">
                  <img className=" h-7 object-cover" alt="" src={profile} />
                </div>

                <div className="flex justify-between  bg-transparent px-4 py-2 text-sm text-gray-600 hover:text-gray-700">
                  <p className="text-xl font-semibold">My Profile</p>
                </div>
              </Link>
            </li>

            {/* product start */}
            <li className={`border-2 bg-[#e6f3f3]  shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) rounded-xl`}>
              <div className={`flex space-x-7 items-center cursor-pointer px-5 ${isProductVisible === true ? "pt-4 pb-2" : "py-4"}`}>
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-14 h-[42px]">
                  <img className=" h-8 object-cover" alt="" src={product} />
                </div>

                <div className="flex justify-between items-center w-full bg-transparent px-0 py-2 text-sm text-gray-600 hover:text-gray-700">
                  <p className="text-xl font-semibold">Products</p>

                  <button onClick={toggleProduct} className="h-full p-2 ml-0 text-gray-600 rounded-md hover:text-gray-700">
                    {isProductVisible ? <MdKeyboardArrowUp className="text-2xl font-bold" /> : <MdKeyboardArrowDown className="text-2xl font-bold" />}
                  </button>
                </div>
              </div>
              {isProductVisible && (
                <ul className="pl-[90px] space-y-2 border-t border-white pt-2 pb-5">
                  <li className="font-medium text-[17px] capitalize ">
                    <Link to={`/Seller-Dashboard/Id=${uniqueRouteAccess}/product-list`}>product list</Link>
                  </li>
                  <li className="font-medium text-[17px] capitalize ">
                    <Link to={`/Seller-Dashboard/Id=${uniqueRouteAccess}/add-product`}>list product fo sale</Link>
                  </li>
                </ul>
              )}
            </li>
            {/* product end */}
            {/* mint nft start */}
            <li>
              <Link to={`/Seller-Dashboard/Id=${uniqueRouteAccess}/mint-nft`} className="flex space-x-4 items-center cursor-pointer px-5 py-3 border-2 bg-[#e6f3f3] rounded-xl shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)">
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-8 h-[32px] md:w-11 md:h-[47px]">
                  <img className=" h-7 object-cover" alt="" src={nft} />
                </div>

                <p className="text-xl font-semibold">Mint NFT</p>
              </Link>
            </li>
            {/* mint nft end */}
            {/* order start */}
            <li className={`border-2 bg-[#e6f3f3]  shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) rounded-xl`}>
              <div className={`flex space-x-7 items-center cursor-pointer px-5 ${isOrderVisible === true ? "pt-4 pb-2" : "py-4"}`}>
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-14 h-[42px]">
                  <img className=" h-8 object-cover" alt="" src={order} />
                </div>

                <div className="flex justify-between items-center w-full bg-transparent px-0 py-2 text-sm text-gray-600 hover:text-gray-700">
                  <p className="text-xl font-semibold">Orders</p>

                  <button onClick={toggleOrder} className="h-full p-2 ml-0 text-gray-600 rounded-md hover:text-gray-700">
                    {isOrderVisible ? <MdKeyboardArrowUp className="text-2xl font-bold" /> : <MdKeyboardArrowDown className="text-2xl font-bold" />}
                  </button>
                </div>
              </div>
              {isOrderVisible && (
                <ul className="pl-[90px] space-y-2 border-t border-white pt-2 pb-5">
                  <li className="font-medium text-[17px] capitalize ">
                    <Link to={`/Seller-Dashboard/Id=${uniqueRouteAccess}/order`}>order list</Link>
                  </li>
                </ul>
              )}
            </li>
            {/* order end */}
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
                    <Link to={`/Seller-Dashboard/Id=${uniqueRouteAccess}/create-collection`}>create collection</Link>
                  </li>
                  <li className="font-medium text-[17px] capitalize ">
                    <Link to={`/Seller-Dashboard/Id=${uniqueRouteAccess}/all-collection`}>collection list</Link>
                  </li>
                </ul>
              )}
            </li>
            {/* collection end */}

            <li>
              <Link to={`/Seller-Dashboard/Id=${uniqueRouteAccess}/supply-chain`} className="flex space-x-4 items-center cursor-pointer px-5 py-3 border-2 bg-[#e6f3f3] rounded-xl shadow-[-2px_-1px_5px_#fff,_1px_1px_5px_rgba(80,_80,_80,_0.3)] filter:blur(2px) backdrop-filter:blur(20px)">
                <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-8 h-[32px] md:w-11 md:h-[47px]">
                  <img className=" h-7 object-cover" alt="" src={supply} />
                </div>

                <p className="text-xl font-semibold">Supply Chain Management</p>
              </Link>
            </li>
          </ul>
        ) : (
          <div className=" w-[80px] lg:w-[100px] pr-5 -mt-5 3xl:-mt-4 lg:mt-0">
            <ul className="flex flex-col items-center justify-center rounded-r-xl lg:rounded-br-2xl bg-[#e6f3f3] py-5 space-y-8">
              <li>
                <Link to={`/Seller-Dashboard/`}>
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#96bde1] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-9 lg:w-11 h-[35px] lg:h-[47px]">
                    <img className="h-5 lg:h-7 object-cover" alt="" src={dashboard} />
                  </div>
                </Link>
              </li>
              <li>
                <Link to={`/Seller-Dashboard/Id=${uniqueRouteAccess}/profiles`}>
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-9 lg:w-11 h-[35px] lg:h-[47px]">
                    <img className="h-5 lg:h-7 object-cover" alt="" src={profile} />
                  </div>
                </Link>
              </li>
              <li className="">
                <div className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:text-gray-700">
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-9 lg:w-11 h-[35px] lg:h-[47px]">
                    <img className="h-5 lg:h-7 object-cover" alt="" src={product} />
                  </div>
                  <Link to={`/Seller-Dashboard/Id=${uniqueRouteAccess}/product-list`} className="z-50 absolute w-[180px] start-full top-5 text-start ms-4 -translate-y-1/2 rounded text-gray-800 px-2 py-3 text-xs font-medium bg-white opacity-0 group-hover:opacity-100">
                    Product List
                  </Link>
                  <Link to={`/Seller-Dashboard/Id=${uniqueRouteAccess}/add-product`} className="z-50 absolute w-[180px] start-full top-14 text-start  ms-4 -translate-y-1/2 rounded text-gray-700 px-2 py-3 text-xs font-medium bg-white opacity-0 group-hover:opacity-100">
                    List product for sale
                  </Link>
                </div>
              </li>
              <li>
                <Link to={`/Seller-Dashboard/Id=${uniqueRouteAccess}/mint-nft`}>
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-9 lg:w-11 h-[35px] lg:h-[47px]">
                    <img className="h-5 lg:h-7 object-cover" alt="" src={nft} />
                  </div>
                </Link>
              </li>
              <li>
                <Link to={`/Seller-Dashboard/Id=${uniqueRouteAccess}/order`}>
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-9 lg:w-11 h-[35px] lg:h-[47px]">
                    <img className="h-5 lg:h-7 object-cover" alt="" src={order} />
                  </div>
                </Link>
              </li>
              <li className="">
                <div className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:text-gray-700">
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 z-50 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-9 lg:w-11 h-[35px] lg:h-[47px]">
                    <img className="h-5 lg:h-7 object-cover" alt="" src={collection} />
                  </div>
                  <Link to={`/Seller-Dashboard/Id=${uniqueRouteAccess}/create-collection-form`} className=" z-50 absolute w-[180px] start-full top-5 text-start ms-4 -translate-y-1/2 rounded text-gray-800 px-2 py-3 text-xs font-medium bg-white opacity-0 group-hover:opacity-100">
                    Create Collection
                  </Link>
                  <Link to={`/Seller-Dashboard/Id=${uniqueRouteAccess}/all-collection`} className="z-50 absolute w-[180px] start-full top-14 text-start  ms-4 -translate-y-1/2 rounded text-gray-700 px-2 py-3 text-xs font-medium bg-white opacity-0 group-hover:opacity-100">
                    Collection List
                  </Link>
                </div>
              </li>
              <li>
                <Link to={`/Seller-Dashboard/Id=${uniqueRouteAccess}/supply-chain`}>
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-9 lg:w-11 h-[35px] lg:h-[47px]">
                    <img className="h-5 lg:h-7 object-cover" alt="" src={supply} />
                  </div>
                </Link>
              </li>
              <li>
                <Link to={`/Seller-Dashboard/Id=${uniqueRouteAccess}/my-nfts`}>
                  <div className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-[#d3e7e9] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-9 lg:w-11 h-[35px] lg:h-[47px]">
                    <img className="h-5 lg:h-7 object-cover" alt="" src={nftImg} />
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

export default SellerSidebar;
