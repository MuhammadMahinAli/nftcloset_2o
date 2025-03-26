/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import logo from "../../../assets/market/nft-clogetlogo-2@2x.png";
import searchIcon from "../../../assets/navbar/-icon-search.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HamburgerDropdown from "./HamburgerDropdown";
import { useAuthCheck } from "../../utils/authCheck";
import { handleRedirect } from "../../utils/handleRedirect";
import { apiFetch } from "../../utils/apiFetch";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export const Nav = () => {
  const [userr, setUserr] = useState({});
  const localhost = "https://test-two-22w0.onrender.com/api/v1";
  // const {   logout } = useContext(AuthContext);
  const [isSearchbarVisible, setSearchbarVisible] = useState(false);

  //set user email & role
  const { user } = useSelector((state) => state.auth);
  const { logout: originalLogout } = useAuthCheck();
  const userId = user?._id;
  const userEmail = user?.email;

  useEffect(() => {
    apiFetch(`${localhost}/member/getUserById/${userId}`, "GET")
      .then((data) => {
        console.log(data.data);
        setUserr(data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [localhost, userEmail]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [toPath, setToPath] = useState("/");
  const [isHamburgerDropdownVisible, setIsHamburgerDropdownVisible] =
    useState(false);
  const navigate = useNavigate();

  //detect location
  const location = useLocation();
  const isPageActive = (path) => {
    return location.pathname === path;
  };

  const logout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    });

    if (result.isConfirmed) {
      originalLogout();
      Swal.fire({
        icon: "success",
        text: "Logged out successfully!",
      });
      navigate("/login");
    }
  };

  // options div's toggled function

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const toggleHamburgerDropdown = () => {
    setIsHamburgerDropdownVisible(!isHamburgerDropdownVisible);
  };

  const toggleSearchDropdown = () => {
    setSearchbarVisible(!isSearchbarVisible);
  };

  return (
    <div className="px-4 md:pt-5 mx-auto  bg-[#fff] border-b md:pb-4 border-gray-400 sticky top-0 z-50">
      <div className="relative flex  items-center justify-between">
        {/* left side*/}
        <div className="flex  items-center md:space-x-3">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="flex lg:hidden transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsHamburgerDropdownVisible(true)}
          >
            <svg className="w-5 text-gray-600 " viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>
          <Link to="/">
            <img className="hidden md:block" src="/nft-logo.png" alt="" />
          </Link>

          <>
            {isHamburgerDropdownVisible && (
              <HamburgerDropdown
                setIsHamburgerDropdownVisible={setIsHamburgerDropdownVisible}
              />
            )}
          </>
        </div>

        {/* right side */}
        <div className="flex items-center space-x-3">
          {/* nav links */}
          <ul className="md:flex items-center hidden space-x-2 xl:space-x-4 [border:none] px-3 bg-gray rounded-xl filter:blur(2px) backdrop-filter:blur(20px) h-[45px]">
            <li
              className={`hidden lg:block cursor-pointer text-[16px] xl:text-[18px] hover:bg-white px-3 py-2 text-gray-950 rounded-xl font-semibold ${
                isPageActive("/") ? "bg-[#EDECEC] rounded-xl" : "bg-transparent"
              }`}
            >
              <p onClick={() => handleRedirect("/", navigate)}>Home</p>
            </li>

            <li
              className={`hidden lg:block cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${
                isPageActive("/market")
                  ? "bg-[#EDECEC] rounded-xl"
                  : "bg-transparent"
              }`}
            >
              <p onClick={() => handleRedirect("/market", navigate)}>Market</p>
            </li>
            <li
              className={`hidden lg:block cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${
                isPageActive("/collections")
                  ? "bg-[#EDECEC] rounded-xl"
                  : "bg-transparent"
              }`}
            >
              <p onClick={() => handleRedirect("/collections", navigate)}>
                Collections
              </p>
            </li>
          </ul>
          {/* connect wallet and user icon */}
          <div className="md:flex hidden items-center  bg-gray-900  text-white hover:bg-white hover:text-gray-900 border border-gray-900 px-2 bg-gray rounded-xl filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
            <div className="flex items-center cursor-pointer  p-[6px] rounded-lg">
              <>
                <label
                  htmlFor="my_modal_7"
                  className="capitalize cursor-pointer text-[16px] font-semibold px-1"
                >
                  connect wallet
                </label>
              </>
            </div>
          </div>
          <div className="hidden md:block">
            {userId ? (
              <Link to="/manageAccount">
                <svg
                  className="h-8"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.325 11.8027C22.325 5.70215 17.3538 0.730957 11.2533 0.730957C5.15283 0.730957 0.181641 5.70215 0.181641 11.8027C0.181641 15.0134 1.5656 17.9032 3.7578 19.9293C3.7578 19.9404 3.7578 19.9404 3.74673 19.9514C3.85744 20.0621 3.9903 20.1507 4.10102 20.2504C4.16745 20.3057 4.22281 20.3611 4.28924 20.4054C4.48853 20.5714 4.70997 20.7264 4.92033 20.8814C4.99783 20.9368 5.06426 20.9811 5.14176 21.0364C5.35212 21.1804 5.57356 21.3132 5.80606 21.435C5.88356 21.4793 5.97214 21.5347 6.04964 21.579C6.27107 21.7008 6.50358 21.8115 6.74716 21.9111C6.83573 21.9554 6.9243 21.9997 7.01288 22.0329C7.25646 22.1325 7.50003 22.2211 7.74361 22.2986C7.83218 22.3318 7.92076 22.3651 8.00933 22.3872C8.27505 22.4647 8.54077 22.5311 8.80649 22.5976C8.884 22.6197 8.9615 22.6418 9.05007 22.6529C9.36008 22.7193 9.67008 22.7636 9.99116 22.7969C10.0355 22.7969 10.0797 22.8079 10.124 22.819C10.5005 22.8522 10.8769 22.8744 11.2533 22.8744C11.6298 22.8744 12.0062 22.8522 12.3716 22.819C12.4159 22.819 12.4602 22.8079 12.5044 22.7969C12.8255 22.7636 13.1355 22.7193 13.4455 22.6529C13.523 22.6418 13.6005 22.6086 13.6891 22.5976C13.9548 22.5311 14.2316 22.4758 14.4863 22.3872C14.5748 22.354 14.6634 22.3208 14.752 22.2986C14.9956 22.21 15.2502 22.1325 15.4827 22.0329C15.5713 21.9997 15.6599 21.9554 15.7484 21.9111C15.981 21.8115 16.2135 21.7008 16.446 21.579C16.5345 21.5347 16.612 21.4793 16.6895 21.435C16.911 21.3022 17.1324 21.1804 17.3538 21.0364C17.4313 20.9922 17.4978 20.9368 17.5753 20.8814C17.7967 20.7264 18.0071 20.5714 18.2064 20.4054C18.2728 20.35 18.3282 20.2946 18.3946 20.2504C18.5164 20.1507 18.6382 20.0511 18.7489 19.9514C18.7489 19.9404 18.7489 19.9404 18.7378 19.9293C20.9411 17.9032 22.325 15.0134 22.325 11.8027ZM16.7228 17.3053C13.7223 15.2902 8.80649 15.2902 5.78392 17.3053C5.29676 17.6264 4.89818 18.0028 4.56603 18.4125C2.88313 16.7074 1.8424 14.3713 1.8424 11.8027C1.8424 6.61003 6.06071 2.39171 11.2533 2.39171C16.446 2.39171 20.6643 6.61003 20.6643 11.8027C20.6643 14.3713 19.6235 16.7074 17.9406 18.4125C17.6196 18.0028 17.2099 17.6264 16.7228 17.3053Z"
                    fill="#272727"
                  />
                  <path
                    d="M11.2535 6.18896C8.96167 6.18896 7.10162 8.04901 7.10162 10.3409C7.10162 12.5884 8.86202 14.4152 11.1982 14.4817C11.2314 14.4817 11.2757 14.4817 11.2978 14.4817C11.3199 14.4817 11.3532 14.4817 11.3753 14.4817C11.3864 14.4817 11.3974 14.4817 11.3974 14.4817C13.6339 14.4042 15.3943 12.5884 15.4054 10.3409C15.4054 8.04901 13.5454 6.18896 11.2535 6.18896Z"
                    fill="#272727"
                  />
                </svg>
              </Link>
            ) : (
              <>
                <svg
                  onClick={toggleDropdown}
                  className="h-6"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.325 11.8027C22.325 5.70215 17.3538 0.730957 11.2533 0.730957C5.15283 0.730957 0.181641 5.70215 0.181641 11.8027C0.181641 15.0134 1.5656 17.9032 3.7578 19.9293C3.7578 19.9404 3.7578 19.9404 3.74673 19.9514C3.85744 20.0621 3.9903 20.1507 4.10102 20.2504C4.16745 20.3057 4.22281 20.3611 4.28924 20.4054C4.48853 20.5714 4.70997 20.7264 4.92033 20.8814C4.99783 20.9368 5.06426 20.9811 5.14176 21.0364C5.35212 21.1804 5.57356 21.3132 5.80606 21.435C5.88356 21.4793 5.97214 21.5347 6.04964 21.579C6.27107 21.7008 6.50358 21.8115 6.74716 21.9111C6.83573 21.9554 6.9243 21.9997 7.01288 22.0329C7.25646 22.1325 7.50003 22.2211 7.74361 22.2986C7.83218 22.3318 7.92076 22.3651 8.00933 22.3872C8.27505 22.4647 8.54077 22.5311 8.80649 22.5976C8.884 22.6197 8.9615 22.6418 9.05007 22.6529C9.36008 22.7193 9.67008 22.7636 9.99116 22.7969C10.0355 22.7969 10.0797 22.8079 10.124 22.819C10.5005 22.8522 10.8769 22.8744 11.2533 22.8744C11.6298 22.8744 12.0062 22.8522 12.3716 22.819C12.4159 22.819 12.4602 22.8079 12.5044 22.7969C12.8255 22.7636 13.1355 22.7193 13.4455 22.6529C13.523 22.6418 13.6005 22.6086 13.6891 22.5976C13.9548 22.5311 14.2316 22.4758 14.4863 22.3872C14.5748 22.354 14.6634 22.3208 14.752 22.2986C14.9956 22.21 15.2502 22.1325 15.4827 22.0329C15.5713 21.9997 15.6599 21.9554 15.7484 21.9111C15.981 21.8115 16.2135 21.7008 16.446 21.579C16.5345 21.5347 16.612 21.4793 16.6895 21.435C16.911 21.3022 17.1324 21.1804 17.3538 21.0364C17.4313 20.9922 17.4978 20.9368 17.5753 20.8814C17.7967 20.7264 18.0071 20.5714 18.2064 20.4054C18.2728 20.35 18.3282 20.2946 18.3946 20.2504C18.5164 20.1507 18.6382 20.0511 18.7489 19.9514C18.7489 19.9404 18.7489 19.9404 18.7378 19.9293C20.9411 17.9032 22.325 15.0134 22.325 11.8027ZM16.7228 17.3053C13.7223 15.2902 8.80649 15.2902 5.78392 17.3053C5.29676 17.6264 4.89818 18.0028 4.56603 18.4125C2.88313 16.7074 1.8424 14.3713 1.8424 11.8027C1.8424 6.61003 6.06071 2.39171 11.2533 2.39171C16.446 2.39171 20.6643 6.61003 20.6643 11.8027C20.6643 14.3713 19.6235 16.7074 17.9406 18.4125C17.6196 18.0028 17.2099 17.6264 16.7228 17.3053Z"
                    fill="#272727"
                  />
                  <path
                    d="M11.2535 6.18896C8.96167 6.18896 7.10162 8.04901 7.10162 10.3409C7.10162 12.5884 8.86202 14.4152 11.1982 14.4817C11.2314 14.4817 11.2757 14.4817 11.2978 14.4817C11.3199 14.4817 11.3532 14.4817 11.3753 14.4817C11.3864 14.4817 11.3974 14.4817 11.3974 14.4817C13.6339 14.4042 15.3943 12.5884 15.4054 10.3409C15.4054 8.04901 13.5454 6.18896 11.2535 6.18896Z"
                    fill="#272727"
                  />
                </svg>
                {isDropdownVisible && (
                  <div
                    className="absolute end-0 z-10 top-20 w-36 divide-y divide-gray-100 rounded-md border border-gray-100 bg-[#fff] shadow-lg"
                    role="menu"
                  >
                    <p onClick={() => handleRedirect("/sign-up", navigate)}>
                      <h1 className="rounded-md text-lg font-semibold p-2 hover:bg-gray-100 m-2 cursor-pointer">
                        {" "}
                        Sign up
                      </h1>
                    </p>
                    <p onClick={() => handleRedirect("/login", navigate)}>
                      <h1 className="rounded-md text-lg font-semibold p-2 hover:bg-gray-100 m-2 cursor-pointer">
                        {" "}
                        Sign in{" "}
                      </h1>
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* search and cart for mbl */}
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className=" hidden transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsHamburgerDropdownVisible(true)}
          >
            <svg className="w-5 text-gray-600 " viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>
        </div>

        <img className="md:hidden" src="/nft-logo.png" alt="" />

        {/* logo for mbl */}
        {/* <div className="flex lg:hidden items-start ">
          <a
            href="/"
            className="flex items-center text-xl text-plum font-goldman"
          >
            <img className="w-10 h-10 object-cover" alt="" src={logo} />
            <div className="capitalize inline-block pl-1">
              <span className="font-monstaar tracking-wider text-[16px] font-semibold text-[#ecabee]">
                NFT
              </span>
              <span className="font-monstaar tracking-wider text-[16px] font-semibold text-[#7ee3d9]">
                CLOSET
              </span>
            </div>
          </a>
        </div> */}

        {isHamburgerDropdownVisible && (
          <HamburgerDropdown
            setIsHamburgerDropdownVisible={setIsHamburgerDropdownVisible}
          />
        )}
      </div>
    </div>
  );
};

{
  /* <div className="lg:hidden">
     
        
   
   </div> */
}
// /* eslint-disable no-unused-vars */
// import {useContext, useEffect, useState} from "react";
// import logo from "../../../assets/market/nft-clogetlogo-2@2x.png";
// import searchIcon from "../../../assets/navbar/-icon-search.svg";
// import cartIcon from "../../../assets/navbar/icons8fastcart60@2x.png";
// import walletIcon from "../../../assets/navbar/icons8wallet60@2x.png";
// import userIcon from "../../../assets/navbar/icons8maleuser60@2x.png";
// import metamask from "../../../assets/wallet/mmask.png";
// import {RxHamburgerMenu} from "react-icons/rx";
// import {Link, useLocation, useNavigate} from "react-router-dom";
// import HamburgerDropdown from "./HamburgerDropdown";
// import CartSidebar from "../../CartPage/CartSidebar/CartSidebar";

// import {AuthContext} from "../../../Context/UserContext";
// import {useAuthCheck} from "../../utils/authCheck";
// import {useUniqueRouteAccess} from "../../utils/useUniqueRouteAccess";
// import {pathGenerate} from "../../utils/pathGenerate";
// import {handleRedirect} from "../../utils/handleRedirect";
// import {NFTMarketplaceContext} from "../../../../Context/NFTMarketplaceContext";
// import {truncate} from "../../utils/truncate";

// export const Nav = () => {
//   const {checkWalletConnected, checkContract} = useContext(NFTMarketplaceContext);

//   const [user, setUser] = useState({});
//   const {fetchApi, localhost, vercelApi} = useContext(AuthContext);
//   const [isSearchbarVisible, setSearchbarVisible] = useState(false);

//   //set user email & role
//   const {userEmail, role, userId} = useAuthCheck();
//   //
//   const [uniqueRouteAccess, setUniqueRouteAccess] = useState("");
//   useEffect(() => {
//     fetchApi(`${vercelApi}/user/getsingle/${user}`, "GET");

//     if (userId) {
//       setUniqueRouteAccess(`${userId?.slice(0, 3)}...${userId?.slice(-3)}`);
//     }
//   }, [userId]);
//   //
//   useEffect(() => {
//     fetchApi(`${vercelApi}/user/getsingle/${userEmail}`, "GET")
//       .then((data) => {
//         console.log(data.data);
//         setUser(data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//       });
//   }, [localhost, userEmail]);

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [isWalletOpen, setIsWalletOpen] = useState(false);
//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const [toPath, setToPath] = useState("/");
//   const [isHamburgerDropdownVisible, setIsHamburgerDropdownVisible] = useState(false);
//   const navigate = useNavigate();
//   const [walletChange, setWalletChange] = useState(false);
//   //setting path
//   useEffect(() => {
//     const path = pathGenerate(role, uniqueRouteAccess);
//     setToPath(path);
//   }, [role]);
//   const [wallet, setWallet] = useState("");
//   useEffect(() => {
//     const connectWallet = async () => {
//       const walletData = await checkWalletConnected();
//       setWallet((prev) => walletData);
//     };
//     connectWallet();
//   }, [userEmail, checkWalletConnected, checkContract, walletChange]);

//   const walletConnect = async () => {
//     await checkContract();
//     setWalletChange((prev) => !prev);
//   };
//   //detect location
//   const location = useLocation();
//   const isPageActive = (path) => {
//     return location.pathname === path;
//   };

//   // options div's toggled function

//   const toggleDropdown = () => {
//     setDropdownVisible(!isDropdownVisible);
//   };

//   const toggleHamburgerDropdown = () => {
//     setIsHamburgerDropdownVisible(!isHamburgerDropdownVisible);
//   };

//   const toggleCartDropdown = () => {
//     setIsCartOpen(!isCartOpen);
//   };

//   const toggleWalletDropdown = () => {
//     setIsWalletOpen(!isWalletOpen);
//   };

//   const toggleSearchDropdown = () => {
//     setSearchbarVisible(!isSearchbarVisible);
//   };

//   return (
//     <div className="px-4 py-5 mx-auto  bg-[#e8fefe] sticky top-0 z-50">
//       <div className="relative flex  items-center justify-between">
//         {/* left side [#e8fefe]*/}
//         <div className="lg:flex hidden items-center space-x-3">
//           {/* hamburger menu */}
//           <button onClick={toggleHamburgerDropdown} className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-gray rounded-r-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
//             <RxHamburgerMenu className="text-2xl" />
//           </button>
//           <>{isHamburgerDropdownVisible && <HamburgerDropdown setIsHamburgerDropdownVisible={setIsHamburgerDropdownVisible} />}</>
//           {/* search inputfield */}
//           <div className="relative ">
//             <input className="[border:none] text-[15px] bg-white rounded-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px)] backdrop-filter:blur(20px); outline-none pl-9 w-[230px] h-[47px]" placeholder="Search" type="text" />
//             <img className="absolute top-4 left-3 w-[16.3px] h-[16.3px]" alt="" src={searchIcon} />
//           </div>
//         </div>

//         {/* right side */}
//         <div className="flex items-center space-x-3">
//           {/* nav links */}
//           <ul className="3xl:flex items-center hidden space-x-1 [border:none] px-3 bg-gray rounded-xl shadow-[3px_3px_10px_3px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) h-[45px]">
//             <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
//               <p onClick={() => handleRedirect("/", navigate)}>Home</p>
//             </li>

//             <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/market") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
//               <p onClick={() => handleRedirect("/market", navigate)}>Market</p>
//             </li>

//             <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/collections") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
//               <p onClick={() => handleRedirect("/collections", navigate)}>Collections</p>
//             </li>

//             <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/recycles") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
//               <p onClick={() => handleRedirect("/recycles", navigate)}>Recycles</p>
//             </li>

//             <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/supply-chain") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
//               <p onClick={() => handleRedirect("/supply-chain", navigate)}>Supply Chain</p>
//             </li>

//             <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/lucky-draw") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
//               <p onClick={() => handleRedirect("/lucky-draw", navigate)}>Lucky Draw</p>
//             </li>

//             <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/market-x") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
//               <p onClick={() => handleRedirect("/market-x", navigate)}>Market-X</p>
//             </li>
//           </ul>

//           {/* become seller button */}
//           <div className="lg:flex hidden items-center  [border:none] px-2 bg-gray rounded-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
//             <p onClick={() => handleRedirect("/seller/signup", navigate)} className="cursor-pointer capitalize text-[16px] hover:bg-white p-[6px] rounded-lg font-semibold hover:shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]">
//               <h1>become a seller</h1>
//             </p>
//           </div>

//           {/* connect wallet and user icon */}
//           <div className="lg:flex hidden items-center  [border:none] px-2 bg-gray rounded-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
//             <div className="flex items-center cursor-pointer hover:bg-white p-[6px] rounded-lg">
//               {wallet !== "" && wallet ? (
//                 <>
//                   <img className=" h-7 object-cover" alt="" src={metamask} />
//                   <label htmlFor="my_modal_7" className="capitalize cursor-pointer text-[16px] font-semibold px-1">
//                     {truncate(wallet, 4, 4, 11)}
//                   </label>
//                 </>
//               ) : (
//                 <>
//                   <img className=" h-6 object-cover" alt="" src={walletIcon} />
//                   <label htmlFor="my_modal_7" onClick={walletConnect} className="capitalize cursor-pointer text-[16px] font-semibold px-1">
//                     connect wallet
//                   </label>
//                 </>
//               )}
//             </div>

//             {userId ? (
//               <Link to={toPath}>
//                 <img className=" h-6 object-cover pl-3 border-l" alt="" src={userIcon} onClick={toggleDropdown} />
//               </Link>
//             ) : (
//               <>
//                 <img className=" h-6 object-cover pl-3 border-l" alt="" src={userIcon} onClick={toggleDropdown} />
//                 {isDropdownVisible && (
//                   <div className="absolute end-0 z-10 top-20 w-36 divide-y divide-gray-100 rounded-md border border-gray-100 bg-[#e8fefe] shadow-lg" role="menu">
//                     <p onClick={() => handleRedirect("/user/signup", navigate)}>
//                       <h1 className="rounded-md text-lg font-semibold p-2 hover:bg-gray-100 m-2 cursor-pointer"> Sign up</h1>
//                     </p>
//                     <p onClick={() => handleRedirect("/user/signin", navigate)}>
//                       <h1 className="rounded-md text-lg font-semibold p-2 hover:bg-gray-100 m-2 cursor-pointer"> Sign in </h1>
//                     </p>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//           {userEmail ? (
//             <>
//               <div onClick={toggleCartDropdown} className="lg:flex hidden items-center  [border:none] px-2 bg-gray rounded-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
//                 <img className="rounded-3xs h-6 m-1" alt="" src={cartIcon} />
//               </div>

//               {isCartOpen && <CartSidebar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />}
//             </>
//           ) : (
//             <p onClick={() => handleRedirect("/user/signup", navigate)}>
//               <div className="lg:flex hidden items-center  [border:none] px-2 bg-gray rounded-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
//                 <img className="rounded-3xs h-6 m-1" alt="" src={cartIcon} />
//               </div>
//             </p>
//           )}
//           {/* search and cart for mbl */}
//           <button aria-label="Open Menu" title="Open Menu" className=" lg:hidden transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50" onClick={() => setIsHamburgerDropdownVisible(true)}>
//             <svg className="w-5 text-gray-600 " viewBox="0 0 24 24">
//               <path fill="currentColor" d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z" />
//               <path fill="currentColor" d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z" />
//               <path fill="currentColor" d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z" />
//             </svg>
//           </button>
//         </div>
//         {/* logo for mbl */}
//         <div className="flex lg:hidden items-start ">
//           <a href="/" className="flex items-center text-xl text-plum font-goldman">
//             <img className="w-10 h-10 object-cover" alt="" src={logo} />
//             <div className="capitalize inline-block pl-1">
//               <span className="font-monstaar tracking-wider text-[16px] font-semibold text-[#ecabee]">NFT</span>
//               <span className="font-monstaar tracking-wider text-[16px] font-semibold text-[#7ee3d9]">CLOSET</span>
//             </div>
//           </a>
//         </div>
//         <div className="lg:hidden">
//           <div className="flex items-start space-x-2 md:space-x-3">
//             <img onClick={toggleSearchDropdown} className=" w-5 h-5 md:w-6 md:h-6" alt="" src={searchIcon} />

//             {user ? (
//               <>
//                 <img onClick={toggleCartDropdown} className=" w-6 h-6 md:w-6 md:h-6" alt="" src={cartIcon} />
//                 {isCartOpen && <CartSidebar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />}
//               </>
//             ) : (
//               <p onClick={() => handleRedirect("/user/signup", navigate)}>
//                 <img className=" w-6 h-6 md:w-6 md:h-6" alt="" src={cartIcon} />
//               </p>
//             )}
//           </div>
//           {isSearchbarVisible && <input data-aos="fade-left" className="absolute top-14 right-2 [border:none] text-[14px] bg-white rounded-lg shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px)] backdrop-filter:blur(20px); outline-none pl-3 w-[250px] h-[40px]" placeholder="Search" type="text" />}
//           {isHamburgerDropdownVisible && <HamburgerDropdown setIsHamburgerDropdownVisible={setIsHamburgerDropdownVisible} />}
//         </div>
//       </div>
//     </div>
//   );
// };
// /* eslint-disable no-unused-vars */
// import { useContext, useEffect, useState } from "react";
// import logo from "../../../assets/market/nft-clogetlogo-2@2x.png";
// import searchIcon from "../../../assets/navbar/-icon-search.svg";
// import walletIcon from "../../../assets/navbar/icons8wallet60@2x.png";
// import metamask from "../../../assets/wallet/mmask.png";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import HamburgerDropdown from "./HamburgerDropdown";
// //import CartSidebar from "../../CartPage/CartSidebar/CartSidebar";

// import { AuthContext } from "../../../Context/UserContext";
// import { useAuthCheck } from "../../utils/authCheck";
// import { useUniqueRouteAccess } from "../../utils/useUniqueRouteAccess";
// import { pathGenerate } from "../../utils/pathGenerate";
// import { handleRedirect } from "../../utils/handleRedirect";
// // import { NFTMarketplaceContext } from "../../../../Context/NFTMarketplaceContext";
// import { truncate } from "../../utils/truncate";
// import { apiFetch } from "../../utils/apiFetch";
// import { useSelector } from "react-redux";
// import Swal from "sweetalert2";

// export const Nav = () => {
//   // const { checkWalletConnected, checkContract } = useContext(
//   //   NFTMarketplaceContext
//   // );

//   const [userr, setUserr] = useState({});
//   const localhost = "https://test-two-22w0.onrender.com/api/v1";
//  // const {   logout } = useContext(AuthContext);
//   const [isSearchbarVisible, setSearchbarVisible] = useState(false);

//   //set user email & role
//   const { user } = useSelector((state) => state.auth);
//   const { logout: originalLogout } = useAuthCheck();
//   // const { userEmail, role, userId } = useAuthCheck();
//   const userId = user?._id;
//   const userEmail = user?.email;

//   console.log("opop", user);
//   //
//   // const [uniqueRouteAccess, setUniqueRouteAccess] = useState("");
//   // useEffect(() => {
//   //   apiFetch(`${localhost}/member/getsingle/${user}`, "GET");

//   //   if (userId) {
//   //     setUniqueRouteAccess(`${userId?.slice(0, 3)}...${userId?.slice(-3)}`);
//   //   }
//   // }, [userId]);
//   //
//   useEffect(() => {
//     apiFetch(`${localhost}/member/getUserById/${userId}`, "GET")
//       .then((data) => {
//         console.log(data.data);
//         setUserr(data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//       });
//   }, [localhost, userEmail]);

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [isWalletOpen, setIsWalletOpen] = useState(false);
//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const [toPath, setToPath] = useState("/");
//   const [isHamburgerDropdownVisible, setIsHamburgerDropdownVisible] =
//     useState(false);
//   const navigate = useNavigate();
//   const [walletChange, setWalletChange] = useState(false);
//   //setting path
//   // useEffect(() => {
//   //   const path = pathGenerate(role, uniqueRouteAccess);
//   //   setToPath(path);
//   // }, [role]);
//   // const [wallet, setWallet] = useState("");
//   // useEffect(() => {
//   //   const connectWallet = async () => {
//   //     const walletData = await checkWalletConnected();
//   //     setWallet((prev) => walletData);
//   //   };
//   //   connectWallet();
//   // }, [userEmail, checkWalletConnected, checkContract, walletChange]);

//   // const walletConnect = async () => {
//   //   await checkContract();
//   //   setWalletChange((prev) => !prev);
//   // };
//   //detect location
//   const location = useLocation();
//   const isPageActive = (path) => {
//     return location.pathname === path;
//   };

//   const logout = async () => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, log me out!",
//     });

//     if (result.isConfirmed) {
//       originalLogout();
//       Swal.fire({
//         icon: "success",
//         text: "Logged out successfully!",
//       });
//       navigate("/login");
//     }
//   };

//   // options div's toggled function

//   const toggleDropdown = () => {
//     setDropdownVisible(!isDropdownVisible);
//   };

//   const toggleHamburgerDropdown = () => {
//     setIsHamburgerDropdownVisible(!isHamburgerDropdownVisible);
//   };

//   const toggleCartDropdown = () => {
//     setIsCartOpen(!isCartOpen);
//   };

//   const toggleWalletDropdown = () => {
//     setIsWalletOpen(!isWalletOpen);
//   };

//   const toggleSearchDropdown = () => {
//     setSearchbarVisible(!isSearchbarVisible);
//   };

//   return (
//     <div className="px-4 pt-5 mx-auto  bg-[#fff] border-b pb-4 border-gray-400 sticky top-0 z-50">
//       <div className="relative flex  items-center justify-between">
//         {/* left side [#e8fefe]*/}
//         <div className="lg:flex hidden items-center space-x-3">
//           {/* hamburger menu */}
//           {/* <button onClick={toggleHamburgerDropdown} className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-gray rounded-r-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
//             <RxHamburgerMenu className="text-2xl" />
//           </button> */}
//           <img className="" src="/nft-logo.png" alt="" />
//           <>
//             {isHamburgerDropdownVisible && (
//               <HamburgerDropdown
//                 setIsHamburgerDropdownVisible={setIsHamburgerDropdownVisible}
//               />
//             )}
//           </>
//           {/* search inputfield */}
//           {/* <div className="relative ">
//             <input className="[border:none] text-[15px] bg-white rounded-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px)] backdrop-filter:blur(20px); outline-none pl-9 w-[230px] h-[47px]" placeholder="Search" type="text" />
//             <img className="absolute top-4 left-3 w-[16.3px] h-[16.3px]" alt="" src={searchIcon} />
//           </div> */}
//         </div>

//         {/* right side */}
//         <div className="flex items-center space-x-3">
//           {/* nav links */}
//           <ul className="lg:flex items-center hidden space-x-2 xl:space-x-4 [border:none] px-3 bg-gray rounded-xl filter:blur(2px) backdrop-filter:blur(20px) h-[45px]">
//             <li
//               className={`cursor-pointer text-[16px] xl:text-[18px] hover:bg-white px-3 py-2 text-gray-950 rounded-xl font-semibold ${
//                 isPageActive("/") ? "bg-[#EDECEC] rounded-xl" : "bg-transparent"
//               }`}
//             >
//               <p onClick={() => handleRedirect("/", navigate)}>Home</p>
//             </li>

//             <li
//               className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${
//                 isPageActive("/market")
//                   ? "bg-[#EDECEC] rounded-xl"
//                   : "bg-transparent"
//               }`}
//             >
//               <p onClick={() => handleRedirect("/market", navigate)}>Market</p>
//             </li>
//             <li
//               className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${
//                 isPageActive("/collections")
//                   ? "bg-[#EDECEC] rounded-xl"
//                   : "bg-transparent"
//               }`}
//             >
//               <p onClick={() => handleRedirect("/collections", navigate)}>Collections</p>
//             </li>

//             {/* <li
//               className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${
//                 isPageActive("/profile")
//                   ? "bg-[#EDECEC] rounded-xl"
//                   : "bg-transparent"
//               }`}
//             >
//               <p onClick={() => handleRedirect("/profile", navigate)}>
//               Profile
//               </p>
//             </li>

//             <li
//               className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${
//                 isPageActive("/order")
//                   ? "bg-[#EDECEC] rounded-xl"
//                   : "bg-transparent"
//               }`}
//             >
//               <p onClick={() => handleRedirect("/order", navigate)}>
//               Order
//               </p>
//             </li>

//             {
//               userEmail &&

//               <li
//               className={`hide-content"
//                  cursor-pointer  relative `}
//             >
//              <Link
//             to='/manageAccount'
//               className={` py-3
//                  flex relative lg:space-x-3 xl:space-x-6 rounded-b-xl items-center justify-center font-semibold`}
//             >
//           Dash
//             </Link>
//             </li>
// }
//             {
//               userEmail ?

//               <li
//               className={`hide-content"
//                 border-b  cursor-pointer  relative `}
//             >
//               <div
//                 onClick={logout}
//                 className={` py-3
//                    flex relative lg:space-x-3 xl:space-x-6 rounded-b-xl items-center justify-center`}
//               >
//            Logout
//               </div>
//             </li>
//             :
//             <li
//             className={`hide-content"
//               border-b  cursor-pointer  relative `}
//           >
//             <Link
//             to='/login'
//               className={` py-3
//                  flex relative lg:space-x-3 xl:space-x-6 rounded-b-xl items-center justify-center`}
//             >
//             Login
//             </Link>
//           </li>
//             } */}
//             {/* <li
//               className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${
//                 isPageActive("/addProduct")
//                   ? "bg-[#EDECEC] rounded-xl"
//                   : "bg-transparent"
//               }`}
//             >
//               <p onClick={() => handleRedirect("/addProduct", navigate)}>Api</p>
//             </li>
//             <li
//               className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${
//                 isPageActive("/api")
//                   ? "bg-[#EDECEC] rounded-xl"
//                   : "bg-transparent"
//               }`}
//             >
//               <p onClick={() => handleRedirect("/api", navigate)}>Api</p>
//             </li> */}
//           </ul>
//           {/* <ul className="lg:flex items-center hidden space-x-2 xl:space-x-4 [border:none] px-3 bg-gray rounded-xl filter:blur(2px) backdrop-filter:blur(20px) h-[45px]">
//             <li
//               className={`cursor-pointer text-[16px] xl:text-[18px] hover:bg-white px-3 py-2 text-gray-950 rounded-xl font-semibold ${
//                 isPageActive("/") ? "bg-[#EDECEC] rounded-xl" : "bg-transparent"
//               }`}
//             >
//               <p onClick={() => handleRedirect("/", navigate)}>Home</p>
//             </li>

//             <li
//               className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${
//                 isPageActive("/market")
//                   ? "bg-[#EDECEC] rounded-xl"
//                   : "bg-transparent"
//               }`}
//             >
//               <p onClick={() => handleRedirect("/market", navigate)}>Market</p>
//             </li>

//             <li
//               className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${
//                 isPageActive("/collections")
//                   ? "bg-[#EDECEC] rounded-xl"
//                   : "bg-transparent"
//               }`}
//             >
//               <p onClick={() => handleRedirect("/collections", navigate)}>
//                 Collections
//               </p>
//             </li>

//             <li
//               className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${
//                 isPageActive("/profile")
//                   ? "bg-[#EDECEC] rounded-xl"
//                   : "bg-transparent"
//               }`}
//             >
//               <p onClick={() => handleRedirect("/profile", navigate)}>
//                 Market X
//               </p>
//             </li>
//             <li
//               className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${
//                 isPageActive("/addProduct")
//                   ? "bg-[#EDECEC] rounded-xl"
//                   : "bg-transparent"
//               }`}
//             >
//               <p onClick={() => handleRedirect("/addProduct", navigate)}>Api</p>
//             </li>
//             <li
//               className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${
//                 isPageActive("/api")
//                   ? "bg-[#EDECEC] rounded-xl"
//                   : "bg-transparent"
//               }`}
//             >
//               <p onClick={() => handleRedirect("/api", navigate)}>Api</p>
//             </li>
//           </ul> */}
//           {/* connect wallet and user icon */}
//           <div className="lg:flex hidden items-center  bg-gray-900  text-white hover:bg-white hover:text-gray-900 border border-gray-900 px-2 bg-gray rounded-xl filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
//             <div className="flex items-center cursor-pointer  p-[6px] rounded-lg">
//               {/* {wallet !== "" && wallet ? (
//                 <>
//                   <img className=" h-7 object-cover" alt="" src={metamask} />
//                   <label
//                     htmlFor="my_modal_7"
//                     className="capitalize cursor-pointer text-[16px] font-semibold px-1"
//                   >
//                     {truncate(wallet, 4, 4, 11)}
//                   </label>
//                 </>
//               ) : ( */}
//               <>
//                 <label
//                   htmlFor="my_modal_7"
//                   // onClick={walletConnect}
//                   className="capitalize cursor-pointer text-[16px] font-semibold px-1"
//                 >
//                   connect wallet
//                 </label>
//               </>
//               {/* )} */}
//             </div>
//           </div>
//           {/* become seller button */}
//           {/* <div className="lg:flex hidden items-center px-2 py-1 rounded-xl text-gray-900 hover:text-white hover:bg-gray-900 border-2 border-gray-900 ">
//             <p
//               onClick={() => handleRedirect("/seller/signup", navigate)}
//               className="cursor-pointer capitalize text-[16px]  p-[6px] rounded-lg font-semibold "
//             >
//               <h1>become A seller</h1>
//             </p>
//           </div> */}
//           {userId ? (
//             <Link to={toPath}>
//               <svg
//                 className="h-6"
//                 viewBox="0 0 23 23"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M22.325 11.8027C22.325 5.70215 17.3538 0.730957 11.2533 0.730957C5.15283 0.730957 0.181641 5.70215 0.181641 11.8027C0.181641 15.0134 1.5656 17.9032 3.7578 19.9293C3.7578 19.9404 3.7578 19.9404 3.74673 19.9514C3.85744 20.0621 3.9903 20.1507 4.10102 20.2504C4.16745 20.3057 4.22281 20.3611 4.28924 20.4054C4.48853 20.5714 4.70997 20.7264 4.92033 20.8814C4.99783 20.9368 5.06426 20.9811 5.14176 21.0364C5.35212 21.1804 5.57356 21.3132 5.80606 21.435C5.88356 21.4793 5.97214 21.5347 6.04964 21.579C6.27107 21.7008 6.50358 21.8115 6.74716 21.9111C6.83573 21.9554 6.9243 21.9997 7.01288 22.0329C7.25646 22.1325 7.50003 22.2211 7.74361 22.2986C7.83218 22.3318 7.92076 22.3651 8.00933 22.3872C8.27505 22.4647 8.54077 22.5311 8.80649 22.5976C8.884 22.6197 8.9615 22.6418 9.05007 22.6529C9.36008 22.7193 9.67008 22.7636 9.99116 22.7969C10.0355 22.7969 10.0797 22.8079 10.124 22.819C10.5005 22.8522 10.8769 22.8744 11.2533 22.8744C11.6298 22.8744 12.0062 22.8522 12.3716 22.819C12.4159 22.819 12.4602 22.8079 12.5044 22.7969C12.8255 22.7636 13.1355 22.7193 13.4455 22.6529C13.523 22.6418 13.6005 22.6086 13.6891 22.5976C13.9548 22.5311 14.2316 22.4758 14.4863 22.3872C14.5748 22.354 14.6634 22.3208 14.752 22.2986C14.9956 22.21 15.2502 22.1325 15.4827 22.0329C15.5713 21.9997 15.6599 21.9554 15.7484 21.9111C15.981 21.8115 16.2135 21.7008 16.446 21.579C16.5345 21.5347 16.612 21.4793 16.6895 21.435C16.911 21.3022 17.1324 21.1804 17.3538 21.0364C17.4313 20.9922 17.4978 20.9368 17.5753 20.8814C17.7967 20.7264 18.0071 20.5714 18.2064 20.4054C18.2728 20.35 18.3282 20.2946 18.3946 20.2504C18.5164 20.1507 18.6382 20.0511 18.7489 19.9514C18.7489 19.9404 18.7489 19.9404 18.7378 19.9293C20.9411 17.9032 22.325 15.0134 22.325 11.8027ZM16.7228 17.3053C13.7223 15.2902 8.80649 15.2902 5.78392 17.3053C5.29676 17.6264 4.89818 18.0028 4.56603 18.4125C2.88313 16.7074 1.8424 14.3713 1.8424 11.8027C1.8424 6.61003 6.06071 2.39171 11.2533 2.39171C16.446 2.39171 20.6643 6.61003 20.6643 11.8027C20.6643 14.3713 19.6235 16.7074 17.9406 18.4125C17.6196 18.0028 17.2099 17.6264 16.7228 17.3053Z"
//                   fill="#272727"
//                 />
//                 <path
//                   d="M11.2535 6.18896C8.96167 6.18896 7.10162 8.04901 7.10162 10.3409C7.10162 12.5884 8.86202 14.4152 11.1982 14.4817C11.2314 14.4817 11.2757 14.4817 11.2978 14.4817C11.3199 14.4817 11.3532 14.4817 11.3753 14.4817C11.3864 14.4817 11.3974 14.4817 11.3974 14.4817C13.6339 14.4042 15.3943 12.5884 15.4054 10.3409C15.4054 8.04901 13.5454 6.18896 11.2535 6.18896Z"
//                   fill="#272727"
//                 />
//               </svg>
//             </Link>
//           ) : (
//             <>
//               <svg
//                 onClick={toggleDropdown}
//                 className="h-6"
//                 viewBox="0 0 23 23"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M22.325 11.8027C22.325 5.70215 17.3538 0.730957 11.2533 0.730957C5.15283 0.730957 0.181641 5.70215 0.181641 11.8027C0.181641 15.0134 1.5656 17.9032 3.7578 19.9293C3.7578 19.9404 3.7578 19.9404 3.74673 19.9514C3.85744 20.0621 3.9903 20.1507 4.10102 20.2504C4.16745 20.3057 4.22281 20.3611 4.28924 20.4054C4.48853 20.5714 4.70997 20.7264 4.92033 20.8814C4.99783 20.9368 5.06426 20.9811 5.14176 21.0364C5.35212 21.1804 5.57356 21.3132 5.80606 21.435C5.88356 21.4793 5.97214 21.5347 6.04964 21.579C6.27107 21.7008 6.50358 21.8115 6.74716 21.9111C6.83573 21.9554 6.9243 21.9997 7.01288 22.0329C7.25646 22.1325 7.50003 22.2211 7.74361 22.2986C7.83218 22.3318 7.92076 22.3651 8.00933 22.3872C8.27505 22.4647 8.54077 22.5311 8.80649 22.5976C8.884 22.6197 8.9615 22.6418 9.05007 22.6529C9.36008 22.7193 9.67008 22.7636 9.99116 22.7969C10.0355 22.7969 10.0797 22.8079 10.124 22.819C10.5005 22.8522 10.8769 22.8744 11.2533 22.8744C11.6298 22.8744 12.0062 22.8522 12.3716 22.819C12.4159 22.819 12.4602 22.8079 12.5044 22.7969C12.8255 22.7636 13.1355 22.7193 13.4455 22.6529C13.523 22.6418 13.6005 22.6086 13.6891 22.5976C13.9548 22.5311 14.2316 22.4758 14.4863 22.3872C14.5748 22.354 14.6634 22.3208 14.752 22.2986C14.9956 22.21 15.2502 22.1325 15.4827 22.0329C15.5713 21.9997 15.6599 21.9554 15.7484 21.9111C15.981 21.8115 16.2135 21.7008 16.446 21.579C16.5345 21.5347 16.612 21.4793 16.6895 21.435C16.911 21.3022 17.1324 21.1804 17.3538 21.0364C17.4313 20.9922 17.4978 20.9368 17.5753 20.8814C17.7967 20.7264 18.0071 20.5714 18.2064 20.4054C18.2728 20.35 18.3282 20.2946 18.3946 20.2504C18.5164 20.1507 18.6382 20.0511 18.7489 19.9514C18.7489 19.9404 18.7489 19.9404 18.7378 19.9293C20.9411 17.9032 22.325 15.0134 22.325 11.8027ZM16.7228 17.3053C13.7223 15.2902 8.80649 15.2902 5.78392 17.3053C5.29676 17.6264 4.89818 18.0028 4.56603 18.4125C2.88313 16.7074 1.8424 14.3713 1.8424 11.8027C1.8424 6.61003 6.06071 2.39171 11.2533 2.39171C16.446 2.39171 20.6643 6.61003 20.6643 11.8027C20.6643 14.3713 19.6235 16.7074 17.9406 18.4125C17.6196 18.0028 17.2099 17.6264 16.7228 17.3053Z"
//                   fill="#272727"
//                 />
//                 <path
//                   d="M11.2535 6.18896C8.96167 6.18896 7.10162 8.04901 7.10162 10.3409C7.10162 12.5884 8.86202 14.4152 11.1982 14.4817C11.2314 14.4817 11.2757 14.4817 11.2978 14.4817C11.3199 14.4817 11.3532 14.4817 11.3753 14.4817C11.3864 14.4817 11.3974 14.4817 11.3974 14.4817C13.6339 14.4042 15.3943 12.5884 15.4054 10.3409C15.4054 8.04901 13.5454 6.18896 11.2535 6.18896Z"
//                   fill="#272727"
//                 />
//               </svg>
//               {isDropdownVisible && (
//                 <div
//                   className="absolute end-0 z-10 top-20 w-36 divide-y divide-gray-100 rounded-md border border-gray-100 bg-[#e8fefe] shadow-lg"
//                   role="menu"
//                 >
//                   <p onClick={() => handleRedirect("/sign-up", navigate)}>
//                     <h1 className="rounded-md text-lg font-semibold p-2 hover:bg-gray-100 m-2 cursor-pointer">
//                       {" "}
//                       Sign up
//                     </h1>
//                   </p>
//                   <p onClick={() => handleRedirect("/login", navigate)}>
//                     <h1 className="rounded-md text-lg font-semibold p-2 hover:bg-gray-100 m-2 cursor-pointer">
//                       {" "}
//                       Sign in{" "}
//                     </h1>
//                   </p>
//                 </div>
//               )}
//             </>
//           )}

//           {/* search and cart for mbl */}
//           <button
//             aria-label="Open Menu"
//             title="Open Menu"
//             className=" lg:hidden transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
//             onClick={() => setIsHamburgerDropdownVisible(true)}
//           >
//             <svg className="w-5 text-gray-600 " viewBox="0 0 24 24">
//               <path
//                 fill="currentColor"
//                 d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
//               />
//             </svg>
//           </button>
//         </div>
//         {/* logo for mbl */}
//         <div className="flex lg:hidden items-start ">
//           <a
//             href="/"
//             className="flex items-center text-xl text-plum font-goldman"
//           >
//             <img className="w-10 h-10 object-cover" alt="" src={logo} />
//             <div className="capitalize inline-block pl-1">
//               <span className="font-monstaar tracking-wider text-[16px] font-semibold text-[#ecabee]">
//                 NFT
//               </span>
//               <span className="font-monstaar tracking-wider text-[16px] font-semibold text-[#7ee3d9]">
//                 CLOSET
//               </span>
//             </div>
//           </a>
//         </div>
//         <div className="lg:hidden">
//           <div className="flex items-start space-x-2 md:space-x-3">
//             <img
//               onClick={toggleSearchDropdown}
//               className=" w-5 h-5 md:w-6 md:h-6"
//               alt=""
//               src={searchIcon}
//             />

//             {user ? (
//               <>
//                 <svg
//                   className="h-6"
//                   viewBox="0 0 21 21"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M3.78365 0.669922H1.05944C0.557924 0.669922 0.151367 1.07648 0.151367 1.57799V2.03203C0.151367 2.53354 0.557924 2.9401 1.05944 2.9401H2.88638L5.36029 13.3658C5.76567 15.0742 7.27123 16.2895 9.01841 16.333V16.3341H16.122C17.8916 16.3341 19.4037 15.0588 19.7022 13.3145L20.8424 6.65169C21.0322 5.54236 20.1777 4.52922 19.0522 4.52922H5.59667L4.88807 1.54294C4.76664 1.03122 4.30958 0.669922 3.78365 0.669922Z"
//                     fill="#272727"
//                   />
//                   <path
//                     d="M9.23213 19.0583C9.23213 20.0614 8.41902 20.8745 7.41599 20.8745C6.41297 20.8745 5.59985 20.0614 5.59985 19.0583C5.59985 18.0553 6.41297 17.2422 7.41599 17.2422C8.41902 17.2422 9.23213 18.0553 9.23213 19.0583Z"
//                     fill="#272727"
//                   />
//                   <path
//                     d="M19.2207 19.0583C19.2207 20.0614 18.4076 20.8745 17.4046 20.8745C16.4015 20.8745 15.5884 20.0614 15.5884 19.0583C15.5884 18.0553 16.4015 17.2422 17.4046 17.2422C18.4076 17.2422 19.2207 18.0553 19.2207 19.0583Z"
//                     fill="#272727"
//                   />
//                 </svg>
//                 {/* {isCartOpen && (
//                   <CartSidebar
//                     isCartOpen={isCartOpen}
//                     setIsCartOpen={setIsCartOpen}
//                   />
//                 )} */}
//               </>
//             ) : (
//               <p onClick={() => handleRedirect("/user/signup", navigate)}>
//                 <svg
//                   className="h-6"
//                   viewBox="0 0 21 21"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M3.78365 0.669922H1.05944C0.557924 0.669922 0.151367 1.07648 0.151367 1.57799V2.03203C0.151367 2.53354 0.557924 2.9401 1.05944 2.9401H2.88638L5.36029 13.3658C5.76567 15.0742 7.27123 16.2895 9.01841 16.333V16.3341H16.122C17.8916 16.3341 19.4037 15.0588 19.7022 13.3145L20.8424 6.65169C21.0322 5.54236 20.1777 4.52922 19.0522 4.52922H5.59667L4.88807 1.54294C4.76664 1.03122 4.30958 0.669922 3.78365 0.669922Z"
//                     fill="#272727"
//                   />
//                   <path
//                     d="M9.23213 19.0583C9.23213 20.0614 8.41902 20.8745 7.41599 20.8745C6.41297 20.8745 5.59985 20.0614 5.59985 19.0583C5.59985 18.0553 6.41297 17.2422 7.41599 17.2422C8.41902 17.2422 9.23213 18.0553 9.23213 19.0583Z"
//                     fill="#272727"
//                   />
//                   <path
//                     d="M19.2207 19.0583C19.2207 20.0614 18.4076 20.8745 17.4046 20.8745C16.4015 20.8745 15.5884 20.0614 15.5884 19.0583C15.5884 18.0553 16.4015 17.2422 17.4046 17.2422C18.4076 17.2422 19.2207 18.0553 19.2207 19.0583Z"
//                     fill="#272727"
//                   />
//                 </svg>
//               </p>
//             )}
//           </div>
//           {isSearchbarVisible && (
//             <input
//               data-aos="fade-left"
//               className="absolute top-14 right-2 [border:none] text-[14px] bg-white rounded-lg shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px)] backdrop-filter:blur(20px); outline-none pl-3 w-[250px] h-[40px]"
//               placeholder="Search"
//               type="text"
//             />
//           )}
//           {isHamburgerDropdownVisible && (
//             <HamburgerDropdown
//               setIsHamburgerDropdownVisible={setIsHamburgerDropdownVisible}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// // /* eslint-disable no-unused-vars */
// // import {useContext, useEffect, useState} from "react";
// // import logo from "../../../assets/market/nft-clogetlogo-2@2x.png";
// // import searchIcon from "../../../assets/navbar/-icon-search.svg";
// // import cartIcon from "../../../assets/navbar/icons8fastcart60@2x.png";
// // import walletIcon from "../../../assets/navbar/icons8wallet60@2x.png";
// // import userIcon from "../../../assets/navbar/icons8maleuser60@2x.png";
// // import metamask from "../../../assets/wallet/mmask.png";
// // import {RxHamburgerMenu} from "react-icons/rx";
// // import {Link, useLocation, useNavigate} from "react-router-dom";
// // import HamburgerDropdown from "./HamburgerDropdown";
// // import CartSidebar from "../../CartPage/CartSidebar/CartSidebar";

// // import {AuthContext} from "../../../Context/UserContext";
// // import {useAuthCheck} from "../../utils/authCheck";
// // import {useUniqueRouteAccess} from "../../utils/useUniqueRouteAccess";
// // import {pathGenerate} from "../../utils/pathGenerate";
// // import {handleRedirect} from "../../utils/handleRedirect";
// // import {NFTMarketplaceContext} from "../../../../Context/NFTMarketplaceContext";
// // import {truncate} from "../../utils/truncate";

// // export const Nav = () => {
// //   const {checkWalletConnected, checkContract} = useContext(NFTMarketplaceContext);

// //   const [user, setUser] = useState({});
// //   const {fetchApi, localhost, vercelApi} = useContext(AuthContext);
// //   const [isSearchbarVisible, setSearchbarVisible] = useState(false);

// //   //set user email & role
// //   const {userEmail, role, userId} = useAuthCheck();
// //   //
// //   const [uniqueRouteAccess, setUniqueRouteAccess] = useState("");
// //   useEffect(() => {
// //     fetchApi(`${vercelApi}/user/getsingle/${user}`, "GET");

// //     if (userId) {
// //       setUniqueRouteAccess(`${userId?.slice(0, 3)}...${userId?.slice(-3)}`);
// //     }
// //   }, [userId]);
// //   //
// //   useEffect(() => {
// //     fetchApi(`${vercelApi}/user/getsingle/${userEmail}`, "GET")
// //       .then((data) => {
// //         console.log(data.data);
// //         setUser(data.data);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching products:", error);
// //       });
// //   }, [localhost, userEmail]);

// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const [isCartOpen, setIsCartOpen] = useState(false);
// //   const [isWalletOpen, setIsWalletOpen] = useState(false);
// //   const [isDropdownVisible, setDropdownVisible] = useState(false);
// //   const [toPath, setToPath] = useState("/");
// //   const [isHamburgerDropdownVisible, setIsHamburgerDropdownVisible] = useState(false);
// //   const navigate = useNavigate();
// //   const [walletChange, setWalletChange] = useState(false);
// //   //setting path
// //   useEffect(() => {
// //     const path = pathGenerate(role, uniqueRouteAccess);
// //     setToPath(path);
// //   }, [role]);
// //   const [wallet, setWallet] = useState("");
// //   useEffect(() => {
// //     const connectWallet = async () => {
// //       const walletData = await checkWalletConnected();
// //       setWallet((prev) => walletData);
// //     };
// //     connectWallet();
// //   }, [userEmail, checkWalletConnected, checkContract, walletChange]);

// //   const walletConnect = async () => {
// //     await checkContract();
// //     setWalletChange((prev) => !prev);
// //   };
// //   //detect location
// //   const location = useLocation();
// //   const isPageActive = (path) => {
// //     return location.pathname === path;
// //   };

// //   // options div's toggled function

// //   const toggleDropdown = () => {
// //     setDropdownVisible(!isDropdownVisible);
// //   };

// //   const toggleHamburgerDropdown = () => {
// //     setIsHamburgerDropdownVisible(!isHamburgerDropdownVisible);
// //   };

// //   const toggleCartDropdown = () => {
// //     setIsCartOpen(!isCartOpen);
// //   };

// //   const toggleWalletDropdown = () => {
// //     setIsWalletOpen(!isWalletOpen);
// //   };

// //   const toggleSearchDropdown = () => {
// //     setSearchbarVisible(!isSearchbarVisible);
// //   };

// //   return (
// //     <div className="px-4 py-5 mx-auto  bg-[#e8fefe] sticky top-0 z-50">
// //       <div className="relative flex  items-center justify-between">
// //         {/* left side [#e8fefe]*/}
// //         <div className="lg:flex hidden items-center space-x-3">
// //           {/* hamburger menu */}
// //           <button onClick={toggleHamburgerDropdown} className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-gray rounded-r-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) w-11 h-[47px]">
// //             <RxHamburgerMenu className="text-2xl" />
// //           </button>
// //           <>{isHamburgerDropdownVisible && <HamburgerDropdown setIsHamburgerDropdownVisible={setIsHamburgerDropdownVisible} />}</>
// //           {/* search inputfield */}
// //           <div className="relative ">
// //             <input className="[border:none] text-[15px] bg-white rounded-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px)] backdrop-filter:blur(20px); outline-none pl-9 w-[230px] h-[47px]" placeholder="Search" type="text" />
// //             <img className="absolute top-4 left-3 w-[16.3px] h-[16.3px]" alt="" src={searchIcon} />
// //           </div>
// //         </div>

// //         {/* right side */}
// //         <div className="flex items-center space-x-3">
// //           {/* nav links */}
// //           <ul className="3xl:flex items-center hidden space-x-1 [border:none] px-3 bg-gray rounded-xl shadow-[3px_3px_10px_3px_rgba(155,_155,_155,_0.3)] filter:blur(2px) backdrop-filter:blur(20px) h-[45px]">
// //             <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
// //               <p onClick={() => handleRedirect("/", navigate)}>Home</p>
// //             </li>

// //             <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/market") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
// //               <p onClick={() => handleRedirect("/market", navigate)}>Market</p>
// //             </li>

// //             <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/collections") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
// //               <p onClick={() => handleRedirect("/collections", navigate)}>Collections</p>
// //             </li>

// //             <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/recycles") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
// //               <p onClick={() => handleRedirect("/recycles", navigate)}>Recycles</p>
// //             </li>

// //             <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/supply-chain") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
// //               <p onClick={() => handleRedirect("/supply-chain", navigate)}>Supply Chain</p>
// //             </li>

// //             <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/lucky-draw") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
// //               <p onClick={() => handleRedirect("/lucky-draw", navigate)}>Lucky Draw</p>
// //             </li>

// //             <li className={`cursor-pointer text-[16px] hover:bg-white p-2 rounded-xl font-semibold ${isPageActive("/market-x") ? "bg-white shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]" : "bg-transparent"}`}>
// //               <p onClick={() => handleRedirect("/market-x", navigate)}>Market-X</p>
// //             </li>
// //           </ul>

// //           {/* become seller button */}
// //           <div className="lg:flex hidden items-center  [border:none] px-2 bg-gray rounded-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
// //             <p onClick={() => handleRedirect("/seller/signup", navigate)} className="cursor-pointer capitalize text-[16px] hover:bg-white p-[6px] rounded-lg font-semibold hover:shadow-[2px_2px_3px_2px_rgba(155,_155,_155,_0.3)]">
// //               <h1>become a seller</h1>
// //             </p>
// //           </div>

// //           {/* connect wallet and user icon */}
// //           <div className="lg:flex hidden items-center  [border:none] px-2 bg-gray rounded-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
// //             <div className="flex items-center cursor-pointer hover:bg-white p-[6px] rounded-lg">
// //               {wallet !== "" && wallet ? (
// //                 <>
// //                   <img className=" h-7 object-cover" alt="" src={metamask} />
// //                   <label htmlFor="my_modal_7" className="capitalize cursor-pointer text-[16px] font-semibold px-1">
// //                     {truncate(wallet, 4, 4, 11)}
// //                   </label>
// //                 </>
// //               ) : (
// //                 <>
// //                   <img className=" h-6 object-cover" alt="" src={walletIcon} />
// //                   <label htmlFor="my_modal_7" onClick={walletConnect} className="capitalize cursor-pointer text-[16px] font-semibold px-1">
// //                     connect wallet
// //                   </label>
// //                 </>
// //               )}
// //             </div>

// //             {userId ? (
// //               <Link to={toPath}>
// //                 <img className=" h-6 object-cover pl-3 border-l" alt="" src={userIcon} onClick={toggleDropdown} />
// //               </Link>
// //             ) : (
// //               <>
// //                 <img className=" h-6 object-cover pl-3 border-l" alt="" src={userIcon} onClick={toggleDropdown} />
// //                 {isDropdownVisible && (
// //                   <div className="absolute end-0 z-10 top-20 w-36 divide-y divide-gray-100 rounded-md border border-gray-100 bg-[#e8fefe] shadow-lg" role="menu">
// //                     <p onClick={() => handleRedirect("/user/signup", navigate)}>
// //                       <h1 className="rounded-md text-lg font-semibold p-2 hover:bg-gray-100 m-2 cursor-pointer"> Sign up</h1>
// //                     </p>
// //                     <p onClick={() => handleRedirect("/user/signin", navigate)}>
// //                       <h1 className="rounded-md text-lg font-semibold p-2 hover:bg-gray-100 m-2 cursor-pointer"> Sign in </h1>
// //                     </p>
// //                   </div>
// //                 )}
// //               </>
// //             )}
// //           </div>
// //           {userEmail ? (
// //             <>
// //               <div onClick={toggleCartDropdown} className="lg:flex hidden items-center  [border:none] px-2 bg-gray rounded-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
// //                 <img className="rounded-3xs h-6 m-1" alt="" src={cartIcon} />
// //               </div>

// //               {isCartOpen && <CartSidebar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />}
// //             </>
// //           ) : (
// //             <p onClick={() => handleRedirect("/user/signup", navigate)}>
// //               <div className="lg:flex hidden items-center  [border:none] px-2 bg-gray rounded-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
// //                 <img className="rounded-3xs h-6 m-1" alt="" src={cartIcon} />
// //               </div>
// //             </p>
// //           )}
// //           {/* search and cart for mbl */}
// //           <button aria-label="Open Menu" title="Open Menu" className=" lg:hidden transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50" onClick={() => setIsHamburgerDropdownVisible(true)}>
// //             <svg className="w-5 text-gray-600 " viewBox="0 0 24 24">
// //               <path fill="currentColor" d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z" />
// //               <path fill="currentColor" d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z" />
// //               <path fill="currentColor" d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z" />
// //             </svg>
// //           </button>
// //         </div>
// //         {/* logo for mbl */}
// //         <div className="flex lg:hidden items-start ">
// //           <a href="/" className="flex items-center text-xl text-plum font-goldman">
// //             <img className="w-10 h-10 object-cover" alt="" src={logo} />
// //             <div className="capitalize inline-block pl-1">
// //               <span className="font-monstaar tracking-wider text-[16px] font-semibold text-[#ecabee]">NFT</span>
// //               <span className="font-monstaar tracking-wider text-[16px] font-semibold text-[#7ee3d9]">CLOSET</span>
// //             </div>
// //           </a>
// //         </div>
// //         <div className="lg:hidden">
// //           <div className="flex items-start space-x-2 md:space-x-3">
// //             <img onClick={toggleSearchDropdown} className=" w-5 h-5 md:w-6 md:h-6" alt="" src={searchIcon} />

// //             {user ? (
// //               <>
// //                 <img onClick={toggleCartDropdown} className=" w-6 h-6 md:w-6 md:h-6" alt="" src={cartIcon} />
// //                 {isCartOpen && <CartSidebar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />}
// //               </>
// //             ) : (
// //               <p onClick={() => handleRedirect("/user/signup", navigate)}>
// //                 <img className=" w-6 h-6 md:w-6 md:h-6" alt="" src={cartIcon} />
// //               </p>
// //             )}
// //           </div>
// //           {isSearchbarVisible && <input data-aos="fade-left" className="absolute top-14 right-2 [border:none] text-[14px] bg-white rounded-lg shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px)] backdrop-filter:blur(20px); outline-none pl-3 w-[250px] h-[40px]" placeholder="Search" type="text" />}
// //           {isHamburgerDropdownVisible && <HamburgerDropdown setIsHamburgerDropdownVisible={setIsHamburgerDropdownVisible} />}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
