/* eslint-disable no-unused-vars */

import {useContext, useEffect, useState} from "react";
import logo from "../../../assets/market/nft-clogetlogo-2@2x.png";
import cartIcon from "../../../assets/navbar/icons8fastcart60@2x.png";
import walletIcon from "../../../assets/navbar/icons8wallet60@2x.png";
import userIcon from "../../../assets/navbar/icons8maleuser60@2x.png";
import metamask from "../../../assets/wallet/mmask.png";
import {RxHamburgerMenu} from "react-icons/rx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import HamburgerDropdown from "./HamburgerDropdown";
//import CartSidebar from "../../CartPage/CartSidebar/CartSidebar";

import {useAuthCheck} from "../../utils/authCheck";
import {useUniqueRouteAccess} from "../../utils/useUniqueRouteAccess";
import PageLoading from "../../Loading/PageLoading";
import {AuthContext} from "../../../Context/UserContext";
import {handleRedirect} from "../../utils/handleRedirect";
import {pathGenerate} from "../../utils/pathGenerate";
// import {NFTMarketplaceContext} from "../../../../Context/NFTMarketplaceContext";
import {truncate} from "../../utils/truncate";

export const NavBar = () => {
  const {pageloading, setPageLoading} = useContext(AuthContext);
//  const {checkContract, checkWalletConnected} = useContext(NFTMarketplaceContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const uniqueRouteAccess = useUniqueRouteAccess();
  const [isUserProfileDropdownVisible, seIstUserProfileDropdownVisible] = useState(false);
  const [isHamburgerDropdownVisible, setIsHamburgerDropdownVisible] = useState(false);
  const {userEmail, role} = useAuthCheck();
  const navigate = useNavigate();
  const [walletChange, setWalletChange] = useState(false);
  const toggleDropdowns = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const [wallet, setWallet] = useState("");
  // useEffect(() => {
  //   const connectWallet = async () => {
  //     const walletData = await checkWalletConnected();
  //     setWallet(() => walletData);
  //   };
  //   connectWallet();
  // }, [userEmail, checkContract, checkWalletConnected, walletChange]);
  // const walletConnect = async () => {
  //   await checkContract();
  //   setWalletChange((prev) => !prev);
  // };
  const location = useLocation();

  // options div's toggled function

  const toggleDropdown = () => {
    seIstUserProfileDropdownVisible(!isUserProfileDropdownVisible);
  };

  const toggleHamburgerDropdown = () => {
    setIsHamburgerDropdownVisible(!isHamburgerDropdownVisible);
  };

  const toggleCartDropdown = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleWalletDropdown = () => {
    setIsWalletOpen(!isWalletOpen);
  };

  // detecting location
  const isPageActive = (path) => {
    return location.pathname === path;
  };
  // dashboard access

  const [toPath, setToPath] = useState("/");

  // //setting path
  useEffect(() => {
    const path = pathGenerate(role, uniqueRouteAccess);
    setToPath(path);
  }, [role]);
  return (
    <div className="px-4 py-5 mx-auto  bg-[#e8fefe] sticky top-0 z-50">
      <div className="relative flex  items-center justify-between">
        {/* left side [#e8fefe]*/}
        <div className="lg:flex hidden items-center space-x-3">
          {/* hamburger menu */}
          <button onClick={toggleHamburgerDropdown} className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-gray rounded-r-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
            <RxHamburgerMenu className="text-2xl" />
          </button>
          <>{isHamburgerDropdownVisible && <HamburgerDropdown setIsHamburgerDropdownVisible={setIsHamburgerDropdownVisible} />}</>

          <a href="/" className="flex items-center text-xl text-plum font-goldman">
            <img className="w-[49px] h-[47px] object-cover" alt="" src={logo} />
            <div className="capitalize inline-block pl-2">
              <span className="font-monstaar tracking-wider text-[22px] font-semibold text-[#ecabee]">NFT</span>
              <span className="font-monstaar tracking-wider text-[22px] font-semibold text-[#7ee3d9]">CLOSET</span>
            </div>
          </a>
        </div>

        {/* right side */}
        <div className="flex items-center space-x-3">
          {/* nav links */}
          <ul className="3xl:flex items-center hidden space-x-1 [border:none] px-3 bg-gray rounded-xl shadow-[3px_3px_10px_3px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) h-[45px]">
            <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
              <p onClick={() => handleRedirect("/", navigate)}>Home</p>
            </li>

            <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/market") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
              <p onClick={() => handleRedirect("/market", navigate)}>Market</p>
            </li>

            <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/collections") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
              <p onClick={() => handleRedirect("/collections", navigate)}>Collections</p>
            </li>

            <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/recycles") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
              <p onClick={() => handleRedirect("/recycles", navigate)}>Recycles</p>
            </li>

            <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/supply-chain") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
              <p onClick={() => handleRedirect("/supply-chain", navigate)}>Supply Chain</p>
            </li>

            <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/lucky-draw") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
              <p onClick={() => handleRedirect("/lucky-draw", navigate)}>Lucky Draw</p>
            </li>

            <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/market-x") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
              <p onClick={() => handleRedirect("/market-x", navigate)}>Market-X</p>
            </li>
          </ul>

          {/* become seller button */}
          <div className="lg:flex hidden items-center  [border:none] px-2 bg-gray rounded-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
            <p onClick={() => handleRedirect("/seller/signup", navigate)} className="cursor-pointer capitalize text-[16px] hover:bg-white p-[6px] rounded-lg font-semibold hover:shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]">
              <p>become a seller</p>
            </p>
          </div>

          {/* connect wallet and user icon */}
          <div className="lg:flex hidden items-center  [border:none] px-2 bg-gray rounded-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
            <div className="flex items-center cursor-pointer hover:bg-white p-[6px] rounded-lg">
              {wallet !== "" && wallet ? (
                <>
                  <img className=" h-7 object-cover" alt="" src={metamask} />
                  <label htmlFor="my_modal_7" className="capitalize cursor-pointer text-[16px] font-semibold px-1">
                    {truncate(wallet, 4, 4, 11)}
                  </label>
                </>
              ) : (
                <>
                  <img className=" h-6 object-cover" alt="" src={walletIcon} />
                  <label htmlFor="my_modal_7" 
                  // onClick={walletConnect} 
                  className="capitalize cursor-pointer text-[16px] font-semibold px-1">
                    connect wallet
                  </label>
                </>
              )}
            </div>

            {uniqueRouteAccess ? (
              <Link to={toPath}>
                <img className=" h-6 object-cover pl-3 border-l" alt="" src={userIcon} onClick={toggleDropdown} />
              </Link>
            ) : (
              <>
                <img className=" h-6 object-cover pl-3 border-l" alt="" src={userIcon} onClick={toggleDropdowns} />
                {isDropdownVisible && (
                  <div className="absolute end-0 z-10 top-20 w-36 divide-y divide-gray-100 rounded-md border border-gray-100 bg-[#e8fefe] shadow-lg" role="menu">
                    <p onClick={() => handleRedirect("/user/signup", navigate)}>
                      <p className="rounded-md text-lg font-semibold p-2 hover:bg-gray-100 m-2 cursor-pointer"> Sign up</p>
                    </p>
                    <p onClick={() => handleRedirect("/user/signin", navigate)}>
                      <p className="rounded-md text-lg font-semibold p-2 hover:bg-gray-100 m-2 cursor-pointer"> Sign in </p>
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          <div onClick={toggleCartDropdown} className="lg:flex hidden items-center  [border:none] px-2 bg-gray rounded-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
            <img className="rounded-3xs h-6 m-1" alt="" src={cartIcon} />
          </div>

          {/* {isCartOpen && <CartSidebar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />} */}
          {/* search and cart for mbl */}
          <button aria-label="Open Menu" title="Open Menu" className=" lg:hidden transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50" onClick={() => setIsHamburgerDropdownVisible(true)}>
            <svg className="w-5 text-gray-600 " viewBox="0 0 24 24">
              <path fill="currentColor" d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z" />
              <path fill="currentColor" d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z" />
              <path fill="currentColor" d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z" />
            </svg>
          </button>
        </div>
        {/* logo for mbl */}
        <div className="flex lg:hidden items-start ">
          <a href="/" className="flex items-center text-xl text-plum font-goldman">
            <img className="w-10 h-10 object-cover" alt="" src={logo} />
            <div className="capitalize inline-block pl-1">
              <span className="font-monstaar tracking-wider text-[16px] font-semibold text-[#ecabee]">NFT</span>
              <span className="font-monstaar tracking-wider text-[16px] font-semibold text-[#7ee3d9]">CLOSET</span>
            </div>
          </a>
        </div>
        <div className="lg:hidden">
          <div className="flex items-start space-x-2 md:space-x-3">
            <img onClick={toggleCartDropdown} className=" w-6 h-6 md:w-6 md:h-6" alt="" src={cartIcon} />
            {/* {isCartOpen && <CartSidebar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />} */}
          </div>

          {isHamburgerDropdownVisible && <HamburgerDropdown setIsHamburgerDropdownVisible={setIsHamburgerDropdownVisible} />}
        </div>
      </div>
    </div>
  );
};
