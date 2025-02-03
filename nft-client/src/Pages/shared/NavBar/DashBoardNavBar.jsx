/* eslint-disable react/prop-types */
import {useContext, useEffect, useState} from "react";
import logo from "../../../assets/market/nft-clogetlogo-2@2x.png";
import cartIcon from "../../../assets/add-product/icons8wallet601@2x.png";
import walletIcon from "../../../assets/add-product/icons8wallet60@2x.png";
import userIcon from "../../../assets/add-product/icons8customer100-1@2x.png";
import metamask from "../../../assets/wallet/mmask.png";
import {Link, useLocation} from "react-router-dom";
import CartSidebar from "../../CartPage/CartSidebar/CartSidebar";
import hamburger from "../../../assets/add-product/icons8hamburgermenu64-1@2x.png";
import xmark from "../../../assets/add-product/icons8cross64-2@2x.png";
import {useAuthCheck} from "../../utils/authCheck";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {useUniqueRouteAccess} from "../../utils/useUniqueRouteAccess";
import {pathGenerate} from "../../utils/pathGenerate";
// import {NFTMarketplaceContext} from "../../../../Context/NFTMarketplaceContext";
import {truncate} from "../../utils/truncate";

const DashBoardNavbar = ({openSidebar, setOpenSidebar, toggleSellerDropdown}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // const [connectedAccount] = useGlobalState("connectedAccount");
  // const {checkContract, checkWalletConnected} = useContext(NFTMarketplaceContext);
  const {userEmail, role} = useAuthCheck();
  const location = useLocation();
  const uniqueRouteAccess = useUniqueRouteAccess();
  const [toPath, setToPath] = useState("/");
  const [wallet, setWallet] = useState("");
  const [walletChange, setWalletChange] = useState(false);
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
  //setting path
  useEffect(() => {
    const path = pathGenerate(role, uniqueRouteAccess);
    setToPath(path);
  }, [role]);

  const toggleCartDropdown = () => {
    setIsCartOpen(!isCartOpen);
  };
  const toggleCartDropdownMbl = () => {
    setIsCartOpen(!isCartOpen);
  };

  // detecting location
  const isPageActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className=" relative text-gray-800">
      <div className=" -ml-0 pr-5 py-5  mx-auto filter:blur(11px) backdrop-filter:blur(40px)">
        <div className=" relative flex items-center justify-between">
          {/* left side [#e8fefe]*/}
          <div className={`pl-4 flex items-center space-x-5 w-[350px] py-2 rounded-t-xl ${openSidebar === true ? "bg-[#e6f3f3]" : "bg-transparent"}`}>
            {/* hamburger menu             bg-[#e6f3f3]      <div className="absolute top-[0px] left-[0px] [background:linear-gradient(90deg,_rgba(255,_255,_255,_0.5),_rgba(255,_255,_255,_0.5))] [filter:blur(11px)] [backdrop-filter:blur(40px)] w-[1080px] h-[72px] mix-blend-overlay*/}
            <div className="hidden 3xl:block bg-[#e6f3f3] w-[85px] py-3 rounded-tr-2xl -ml-5">
              <button onClick={toggleSellerDropdown} className="flex items-center justify-center cursor-pointer  [border:none] ml-5 bg-[#d4f0ef] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
                <img className=" h-8 object-cover" alt="" src={openSidebar === true ? xmark : hamburger} />
              </button>
            </div>
            {/* logo */}
            <a href="/" className="flex items-center text-xl text-plum font-goldman">
              <img className="-ml-9 lg:-ml-8 3xl:-ml-2 w-[49px] h-[56px] lg:h-[70px] lg:w-[60px]  object-cover" alt="" src={logo} />
              <div className="capitalize inline-block pl-2">
                <span className="font-monstaar tracking-wider text-[22px] lg:text-[24px] font-semibold text-[#ecabee]">NFT</span>
                <span className="font-monstaar tracking-wider text-[22px] lg:text-[24px] font-semibold text-[#7ee3d9]">CLOSET</span>
              </div>
            </a>
          </div>

          {/* right side */}
          <div className="3xl:flex hidden items-center space-x-3">
            {/* nav links */}
            <ul className="flex items-center space-x-1 [border:none] px-3 bg-[#d4f0ef] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
              <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
                <Link to="/">Home</Link>
              </li>

              <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/market") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
                <Link to="/market">Market</Link>
              </li>

              <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/collections") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
                <Link to="/collections">Collections</Link>
              </li>

              <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/recycles") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
                <Link to="/recycles">Recycles</Link>
              </li>

              <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/supply-chain") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
                <Link to="/supply-chain">Supply Chain</Link>
              </li>

              <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/lucky-draw") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
                <Link to="/lucky-draw">Lucky Draw</Link>
              </li>

              <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
                <Link to="/market-x">Market-X</Link>
              </li>
            </ul>

            {/* become seller button */}
            <div className={`${role === "Seller" ? "hidden" : "block"} flex items-center  [border:none] px-2 bg-[#d4f0ef] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) h-[47px]`}>
              <Link to="/seller/signup">
                <h1 className={`capitalize text-[16px] font-semibold hover:bg-white p-[6px] rounded-lg hover:shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)] ${isPageActive("/seller/signup") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"} `}>become a seller</h1>
              </Link>
            </div>

            {/* connect wallet and user*/}
            <div className=" [border:none] px-2 bg-[#d4f0ef] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
              {/* connect wallet */}
              <div className="flex items-center cursor-pointer hover:bg-white p-[5px] mt-[5px] rounded-lg">
                {wallet !== "" && wallet ? (
                  <>
                    <img className=" h-7 object-cover" alt="" src={metamask} />
                    <label htmlFor="my_modal_7" className="capitalize cursor-pointer text-[16px] font-semibold px-1">
                      {truncate(wallet, 4, 4, 11)}
                    </label>
                  </>
                ) : (
                  <>
                    <label htmlFor="my_modal_7" className="lg:block hidden text-xl pl-2 font-semibold  cursor-pointer" 
                    // onClick={walletConnect}
                    >
                      <img className=" h-6 object-cover" alt="" src={walletIcon} />
                    </label>
                  </>
                )}
              </div>
              {/* <>{isWalletOpen && <Wallet setIsWalletOpen={setIsWalletOpen} />}</> */}
            </div>
            {/*User profile  */}
            {uniqueRouteAccess && (
              <Link to={toPath} className="flex justify-center items-center  [border:none] px-2 bg-[#d4f0ef] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
                <img className=" h-6 object-cover border-l" alt="" src={userIcon} />
              </Link>
            )}

            {/***  cart button ***/}
            <div onClick={toggleCartDropdown} className="flex items-center  [border:none] px-2 bg-[#d4f0ef] rounded-xl shadow-[2px_2px_5px_2px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
              <img className="rounded-3xs h-6 m-1" alt="" src={cartIcon} />
            </div>
            {isCartOpen && <CartSidebar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />}
          </div>
          <div className="3xl:hidden">
            <button aria-label="Open Menu" title="Open Menu" className="p-2 -mr-1 md:mr-8 lg:mr-12 xl:mr-16 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50" onClick={() => setIsMenuOpen(true)}>
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path fill="currentColor" d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z" />
                <path fill="currentColor" d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z" />
                <path fill="currentColor" d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z" />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 z-50 w-full">
                <div className="p-5 bg-[#e8fefe] border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="float-right" onClick={() => setIsMenuOpen(false)}>
                      <AiOutlineCloseCircle className="text-2xl 3xl:text-3xl" />
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <a href="/">
                        <h1 className=" rounded-md text-lg font-bold p-2  m-2 cursor-pointer"> Home</h1>
                      </a>
                      <Link to="/collections">
                        <h1 className="rounded-md text-lg font-bold p-2 m-2 cursor-pointer">Collections</h1>
                      </Link>
                      <Link to="/recycles">
                        <h1 className="rounded-md text-lg font-bold p-2 m-2 cursor-pointer">Recycles</h1>
                      </Link>
                      <Link to="/supply-chain">
                        <h1 className="rounded-md text-lg font-bold p-2 m-2 cursor-pointer">Supply Chain</h1>
                      </Link>
                      <Link to="/lucky-draw">
                        <h1 className="rounded-md text-lg font-bold p-2 m-2 cursor-pointer">Lucky draw</h1>
                      </Link>
                      <Link to="/market-x">
                        <h1 className="rounded-md text-lg font-bold p-2 m-2 cursor-pointer">Market-X</h1>
                      </Link>
                      <Link to="/seller/signup" className="">
                        <h1 className="rounded-md text-xl font-bold p-2 m-2 cursor-pointer">Become a Seller</h1>
                      </Link>
                      <div className="flex justify-between items-center cursor-pointer  p-[6px] rounded-lg">
                        {wallet !== "" && wallet ? (
                          <>
                            <img className=" h-7 object-cover" alt="" src={metamask} />
                            <label htmlFor="my_modal_7" className="capitalize cursor-pointer text-[16px] font-semibold px-1">
                              {truncate(wallet, 4, 4, 11)}
                            </label>
                          </>
                        ) : (
                          <>
                            <label htmlFor="my_modal_7" className="text-xl pl-2 font-bold  cursor-pointer">
                              Connect wallet
                            </label>
                            <img className=" h-6 object-cover" alt="" src={walletIcon} 
                            // onClick={walletConnect}
                             />
                          </>
                        )}
                      </div>
                      <div onClick={toggleCartDropdownMbl} className="flex justify-between items-center cursor-pointer  rounded-lg p-4">
                        <label className=" text-xl font-bold  cursor-pointer">My Cart</label>
                        <img className=" h-6 object-cover" alt="" src={cartIcon} />
                        {isCartOpen && <CartSidebar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />}
                      </div>
                      {userEmail ? (
                        <Link to={toPath} className="">
                          <div className=" pt-4 flex justify-between items-center cursor-pointer  p-[6px] rounded-lg">
                            <label className=" text-xl font-bold  cursor-pointer">My Profile</label>
                            <img className=" h-6 object-cover" alt="" src={userIcon} />
                          </div>
                        </Link>
                      ) : (
                        <>
                          <Link to="/user/signin" className="">
                            <button className="mt-5 block w-full md:w-5/12 rounded-lg bg-gray shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] hover:shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)] filter:blur(2px) px-5 py-3 text-xl font-medium text-gray-700">Sign in</button>
                          </Link>
                        </>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardNavbar;
