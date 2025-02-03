import {useContext, useEffect, useState} from "react";
import {AiOutlineCloseCircle} from "react-icons/ai";
import walletIcon from "../../../assets/navbar/icons8wallet60@2x.png";
import metamask from "../../../assets/wallet/mmask.png";
import cartIcon from "../../../assets/navbar/icons8fastcart60@2x.png";
import {MdKeyboardArrowDown} from "react-icons/md";
import {RiArrowRightSLine} from "react-icons/ri";
import {Link} from "react-router-dom";
import {useAuthCheck} from "../../utils/authCheck";
import userIcon from "../../../assets/navbar/icons8maleuser60@2x.png";
import Swal from "sweetalert2";
import {useUniqueRouteAccess} from "../../utils/useUniqueRouteAccess";
import {pathGenerate} from "../../utils/pathGenerate";
// import {NFTMarketplaceContext} from "../../../../Context/NFTMarketplaceContext";
// import {truncate} from "../../utils/truncate";
const HamburgerDropdown = ({setIsHamburgerDropdownVisible}) => {
  const uniqueRouteAccess = useUniqueRouteAccess();
  const [isMenOptionVisible, seIstMenOptionVisible] = useState(true);
  // const {checkWalletConnected, checkContract} = useContext(NFTMarketplaceContext);
  const [isWomenOptionVisible, setWomenOptionVisible] = useState(false);
  const {role, userEmail} = useAuthCheck();

  const toggleMenOptionStatus = () => {
    seIstMenOptionVisible(!isMenOptionVisible);
  };

  const toggleWomenOptionPrice = () => {
    setWomenOptionVisible(!isWomenOptionVisible);
  };

  const [toPath, setToPath] = useState("/");

  // //setting path
  useEffect(() => {
    const path = pathGenerate(role, uniqueRouteAccess);
    setToPath(path);
  }, [role]);
  // const walletPopup = () => {
  //   Swal.fire("Oops!", `Use Dekstop / Laptop to connect wallet !!`, "error");
  // };
  // const [wallet, setWallet] = useState("");
  // const [walletChange, setWalletChange] = useState(false);
  // useEffect(() => {
  //   const connectWallet = async () => {
  //     const walletData = await checkWalletConnected();
  //     // console.log(walletData);
  //     setWallet(() => walletData);
  //   };
  //   connectWallet();
  // }, [userEmail, checkContract, checkWalletConnected]);
  // const walletConnect = async () => {
  //   await checkContract();
  //   setWalletChange((prev) => !prev);
  // };

  return (
    <>
      {/* list for mbl */}

      {/* list for dekstop */}
      <div data-aos="fade-right" data-aos-duration="1200" className="h-[400px] overflow-y-scroll absolute end-0 z-10 top-16 md:top-20 left-0 md:-left-3   lg:w-[500px] 3xl:w-[450px] px-2 py-5 divide-y divide-gray-100 rounded-md border border-gray-100 bg-[#e8fefe] shadow-lg" role="menu">
        <div className="float-right" onClick={() => setIsHamburgerDropdownVisible(false)}>
          <AiOutlineCloseCircle className="text-2xl 3xl:text-3xl" />
        </div>
        <div className="flex flex-col-reverse lg:flex-row-reverse 3xl:flex-row justify-between items-start ">
          {/* right */}
          <div className="w-full lg:w-4/12 3xl:w-12/12 float-left">
            <Link to="/about-us">
              <h1 className="rounded-md text-xl font-bold p-2  m-2 cursor-pointer">About Us</h1>
            </Link>
            {/* Men toggle */}
            <div className="inline-block w-full">
              <div className="flex justify-between px-3  py-1 text-sm text-gray-800 hover:text-gray-700">
                <p className="text-xl font-bold px-4 py-2  text-gray-800  hover:text-gray-700">Men</p>

                <button onClick={toggleMenOptionStatus} className="h-full p-2 text-gray-600 hover:bg-gray-50 rounded-md hover:text-gray-700">
                  {isMenOptionVisible ? <RiArrowRightSLine className="text-2xl font-bold" /> : <MdKeyboardArrowDown className="text-2xl font-bold" />}
                </button>
              </div>

              {isMenOptionVisible && (
                <div className="z-10 px-5 pb-5 space-y-5 rounded-md  bg-transparent">
                  <ul className="space-y-2 pl-7">
                    <li className="text-lg font-semibold">Tops</li>
                    <li className="text-lg font-semibold">Bottoms</li>
                    <li className="text-lg font-semibold">Shoe</li>
                    <li className="text-lg font-semibold">Others</li>
                  </ul>
                </div>
              )}
            </div>
            {/* Women toggle */}
            <div className="inline-block w-full">
              <div className="flex justify-between px-3  py-1 text-sm text-gray-800 hover:text-gray-700">
                <p className="text-xl font-bold px-4 py-2  text-gray-8ha00  hover:text-gray-700">Women</p>

                <button onClick={toggleWomenOptionPrice} className="h-full p-2 text-gray-600 hover:bg-gray-50 rounded-md hover:text-gray-700">
                  {isWomenOptionVisible ? <RiArrowRightSLine className="text-2xl font-bold" /> : <MdKeyboardArrowDown className="text-2xl font-bold" />}
                </button>
              </div>

              {isWomenOptionVisible && (
                <div className="z-10 px-5 pb-5 space-y-5 rounded-md  bg-transparent">
                  <ul className="space-y-2 pl-7">
                    <li className="text-lg font-semibold">Tops</li>
                    <li className="text-lg font-semibold">Bottoms</li>
                    <li className="text-lg font-semibold">Shoe</li>
                    <li className="text-lg font-semibold">Others</li>
                  </ul>
                </div>
              )}
            </div>
            <Link to="/seller/signup" className="lg:hidden">
              <h1 className="rounded-md text-xl font-bold p-2 m-2 cursor-pointer">Become a Seller</h1>
            </Link>
            {/* connent wallet */}

            <div className="flex lg:hidden justify-between items-center cursor-pointer  p-[6px] rounded-lg">
              {/* {wallet !== "" && wallet ? (
                <>
                  <img className=" h-7 object-cover" alt="" src={metamask} />
                  <label htmlFor="my_modal_7" className="capitalize cursor-pointer text-[16px] font-semibold px-1">
                    {truncate(wallet, 4, 4, 11)}{" "}
                  </label>
                </>
              ) : ( */}
                <>
                  <label htmlFor="my_modal_7" 
                  // onClick={walletConnect} 
                  className="lg:block hidden text-xl font-bold  cursor-pointer">
                    Connect wallet
                  </label>
                  <img className=" h-6 object-cover" alt="" src={walletIcon} />
                </>
              {/* )} */}
            </div>
            {uniqueRouteAccess ? (
              <Link to={toPath} className="lg:hidden">
                <div className=" pt-4 flex justify-between items-center cursor-pointer  p-[6px] rounded-lg">
                  <label className=" text-xl font-bold  cursor-pointer">My Profile</label>
                  <img className=" h-6 object-cover" alt="" src={userIcon} />
                </div>
              </Link>
            ) : (
              <>
                <Link to="/user/signin" className="lg:hidden">
                  <button className="mt-5 block w-full md:w-5/12 rounded-lg bg-gray shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] hover:shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)] filter:blur(2px) px-5 py-3 text-xl font-medium text-gray-700">Sign in</button>
                </Link>
              </>
            )}
          </div>
          {/* left */}
          <div className="w-full lg:w-4/12 3xl:hidden">
            <a href="/">
              <h1 className="rounded-md text-xl font-bold p-2  m-2 cursor-pointer"> Home</h1>
            </a>
            <Link to="/market">
              <h1 className="rounded-md text-xl font-bold p-2 m-2 cursor-pointer">Market</h1>
            </Link>
            <Link to="/collections">
              <h1 className="rounded-md text-xl font-bold p-2 m-2 cursor-pointer">Collections</h1>
            </Link>
            <Link to="/recycles">
              <h1 className="rounded-md text-xl font-bold p-2 m-2 cursor-pointer">Recycles</h1>
            </Link>
            <Link to="/supply-chain">
              <h1 className="rounded-md text-xl font-bold p-2 m-2 cursor-pointer">Supply Chain</h1>
            </Link>
            <Link to="/lucky-draw">
              <h1 className="rounded-md text-xl font-bold p-2 m-2 cursor-pointer">Lucky draw</h1>
            </Link>
            <Link to="/market-x">
              <h1 className="rounded-md text-xl font-bold p-2 m-2 cursor-pointer">Market-X</h1>
            </Link>
          </div>
          {/* center */}
          {/* <div className="hidden w-full lg:w-4/12 3xl:w-11/12 ">
            <a href="/">
              <h1 className="hidden lg:block 3xl:hidden rounded-md text-xl font-bold p-2  m-2 cursor-pointer">
                {" "}
                Home
              </h1>
            </a>

            <Link to="/market">
              <h1 className="3xl:hidden rounded-md text-xl font-bold p-2 m-2 cursor-pointer">
                Market
              </h1>
            </Link>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default HamburgerDropdown;
