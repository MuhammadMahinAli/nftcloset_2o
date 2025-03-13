

// import { useContext, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import HoveredText from "../../icons/HoveredText";
// import { AuthContext } from "../../Context/UserContext";
// import DashboardIcon from "../../icons/NFTIcon/DashboardIcon";
// import OrderIcon from "../../icons/NFTIcon/OrderIcon";
// import SettingIcon from "../../icons/NFTIcon/SettingIcon";
// import LogoutIcon from "../../icons/NFTIcon/LogoutIcon";
// import AllProductIcon from "../../icons/NFTIcon/AllProductIcon";
// import AllCollectionIcon from "../../icons/NFTIcon/AllCollectionIcon";
// import HomePageControlIcon from "../../icons/NFTIcon/HomePageControlIcon";

// const AdminSideBar = () => {
//   //---- states
//   const [openDashboard, setOpenDashboard] = useState(false);
//   const [openOrder, setOpenOrder] = useState(false);
//   const [openSetting, setOpenSetting] = useState(false);
//   const [openProduct, setOpenProduct] = useState(false);
//   const [openCollection, setOpenCollection] = useState(false);
//   const [openHomeControl, setOpenHomeControl] = useState(false);
//   const [openLogout, setOpenLogout] = useState(false);

//   const location = useLocation();
//   const isPageActive = (path) => {
//     return location.pathname === path;
//   };

//   //--

//   const { singleUser } = useContext(AuthContext);

//   const userEmail = singleUser && singleUser?.data?.email;

//   return (
//     <>
//       {/* big */}
//       <div
//         className={`hidden  px-4 shadow-xl left-0 top-[90px] 3xl:block w-[300px] bg-[#fff] lg:grid grid-cols-1 justify-start py-10  space-y-4 lg:space-y-6 z-50`}
//       >
//         {/* dashboard */}
//         <div className="sidebar-list">
//           <Link to="/manageAccount" className="relative">
//             <p>
//               <div
//                 className={` ${
//                   openDashboard ? "bg-[#dff5eb] rounded-lg " : ""
//                 } flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl`}
//                 onMouseEnter={() => setOpenDashboard(true)}
//                 onMouseLeave={() => setOpenDashboard(false)}
//               >
//                 <div
//                   className={`${
//                     isPageActive("/manageAccount")
//                       ? "bg-[#dff5eb] rounded-lg"
//                       : ""
//                   } w-[250px] flex items-center space-x-3 box2 py-2 px-2 md:px-4  rounded-[5px]`}
//                 >
//                   <DashboardIcon
//                     isPageActive={isPageActive}
//                     openDashboard={openDashboard}
//                   />
//                   <p
//                     className={`${
//                       isPageActive("/manageAccount")
//                         ? "text-[#2cba7a]"
//                         : "text-gray-600"
//                     } hover:text-[#2cba7a] text-xl  font-bold`}
//                   >
//                     Dashboard
//                   </p>
//                 </div>
//               </div>
//             </p>
//           </Link>
//         </div>
//         {/* product */}
//         <div className="sidebar-list">
//           <Link to="/manageAccount/all-products" className="relative">
//             <p>
//               <div
//                 className={` ${
//                   openProduct ? "bg-[#dff5eb] rounded-lg " : ""
//                 } flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl`}
//                 onMouseEnter={() => setOpenProduct(true)}
//                 onMouseLeave={() => setOpenProduct(false)}
//               >
//                 <div
//                   className={`${
//                     isPageActive("/manageAccount/all-products") ? "" : ""
//                   }  w-[250px] flex items-center space-x-3 box2 py-2 px-2 md:px-3   `}
//                 >
//                   <AllProductIcon
//                     isPageActive={isPageActive}
//                     openProduct={openProduct}
//                   />
//                   <p
//                     className={`${
//                       isPageActive("/manageAccount/all-products")
//                         ? "text-[#2cba7a]"
//                         : "text-gray-600"
//                     } hover:text-[#2cba7a] text-xl  font-bold`}
//                   >
//                     All Products
//                   </p>
//                 </div>
//               </div>
//             </p>
//           </Link>
//         </div>
//         {/* collections */}
//         <div className="sidebar-list">
//           <Link to="/manageAccount/all-collections" className="relative">
//             <p>
//               <div
//                 className={` ${
//                   openCollection ? "bg-[#dff5eb] rounded-lg " : ""
//                 } flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl`}
//                 onMouseEnter={() => setOpenCollection(true)}
//                 onMouseLeave={() => setOpenCollection(false)}
//               >
//                 <div
//                   className={`${
//                     isPageActive("/manageAccount/all-collections") ? "" : ""
//                   }  w-[250px] flex items-center space-x-3 box2 py-2 px-2 md:px-3   `}
//                 >
//                   <AllCollectionIcon
//                     isPageActive={isPageActive}
//                     openCollection={openCollection}
//                   />
//                   <p
//                     className={`${
//                       isPageActive("/manageAccount/all-collections")
//                         ? "text-[#2cba7a]"
//                         : "text-gray-600"
//                     } hover:text-[#2cba7a] text-xl  font-bold`}
//                   >
//                     All Collections
//                   </p>
//                 </div>
//               </div>
//             </p>
//           </Link>
//         </div>
//         {/* order */}
//         <div className="sidebar-list">
//           <Link to="/manageAccount/orders" className="relative">
//             <p>
//               <div
//                 className={` ${
//                   openOrder ? "bg-[#dff5eb] rounded-lg " : ""
//                 } flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl`}
//                 onMouseEnter={() => setOpenOrder(true)}
//                 onMouseLeave={() => setOpenOrder(false)}
//               >
//                 <div
//                   className={`${
//                     isPageActive("/manageAccount/orders") ? "" : ""
//                   }  w-[250px] flex items-center space-x-3 box2 py-2 px-2 md:px-3   `}
//                 >
//                   <OrderIcon openOrder={openOrder} />
//                   <p
//                     className={`${
//                       isPageActive("/manageAccount/orders")
//                         ? "text-[#2cba7a]"
//                         : "text-gray-600"
//                     } hover:text-[#2cba7a] text-xl  font-bold`}
//                   >
//                     Orders
//                   </p>
//                 </div>
//               </div>
//             </p>
//           </Link>
//         </div>
//         {/* home control */}
//         <div className="sidebar-list">
//           <Link to="/manageAccount/home-page-control" className="relative">
//             <p>
//               <div
//                 className={` ${
//                   openHomeControl ? "bg-[#dff5eb] rounded-lg" : ""
//                 } flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl`}
//                 onMouseEnter={() => setOpenHomeControl(true)}
//                 onMouseLeave={() => setOpenHomeControl(false)}
//               >
//                 <div
//                   className={`${
//                     isPageActive("/manageAccount/home-page-control") ? "" : ""
//                   } w-[250px] flex items-center space-x-3 box2 py-2 px-2 md:px-3`}
//                 >
//                   <HomePageControlIcon
//                     isPageActive={isPageActive}
//                     openHomeControl={openHomeControl}
//                   />
//                   <p
//                     className={`${
//                       isPageActive("/manageAccount/home-page-control")
//                         ? "text-[#2cba7a]"
//                         : "text-gray-600"
//                     } hover:text-[#2cba7a] text-xl  font-bold`}
//                   >
//                     Home Page Control
//                   </p>
//                 </div>
//               </div>
//             </p>
//           </Link>
//         </div>
//         {/* setting */}
//         <div className="sidebar-list">
//           <Link to="/manageAccount/settings" className="relative">
//             <p>
//               <div
//                 className={` ${
//                   openSetting || isPageActive("/manageAccount/settings")
//                     ? "bg-[#dff5eb] rounded-lg"
//                     : ""
//                 } flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl`}
//                 onMouseEnter={() => setOpenSetting(true)}
//                 onMouseLeave={() => setOpenSetting(false)}
//               >
//                 <div
//                   className={`${
//                     isPageActive("/manageAccount/settings") ? "" : ""
//                   } w-[250px] flex items-center space-x-3 box2 py-2 px-2 md:px-3`}
//                 >
//                   <SettingIcon openSetting={openSetting} />
//                   <p
//                     className={`${
//                       isPageActive("/manageAccount/settings")
//                         ? "text-[#2cba7a]"
//                         : "text-gray-600"
//                     } hover:text-[#2cba7a] text-xl  font-bold`}
//                   >
//                     Settings
//                   </p>
//                 </div>
//               </div>
//             </p>
//           </Link>
//         </div>
//         {/* logout */}
//         <div className="sidebar-list">
//           <div className="relative">
//             <p>
//               <div
//                 className={` ${
//                   openLogout ? "bg-green-200 rounded-lg " : ""
//                 } flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl`}
//                 onMouseEnter={() => setOpenLogout(true)}
//                 onMouseLeave={() => setOpenLogout(false)}
//               >
//                 <div
//                   className={` w-[250px] flex items-center space-x-3 box2 py-2 px-2 md:px-3  `}
//                 >
//                   <LogoutIcon openLogout={openLogout} />
//                   <p
//                     className={`${
//                       openLogout ? "text-[#2cba7a]" : "text-gray-600"
//                     } hover:text-[#2cba7a] text-xl  font-bold`}
//                   >
//                     Log-Out
//                   </p>
//                 </div>
//               </div>
//             </p>
//           </div>
//         </div>
//       </div>
//       {/* mini */}

//       <ul
//         className={`hidden absolute shadow-xl left-0 top-[90px] 3xl:block w-[80px] bg-[#fff] lg:flex flex-col items-center justify-center py-5 space-y-4 lg:space-y-9 z-50`}
//       >
//         <li className="sidebar-list">
//           <Link to="/manageAccount" className="relative">
//             <p>
//               <div
//                 className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
//                 onMouseEnter={() => setOpenDashboard(true)}
//                 onMouseLeave={() => setOpenDashboard(false)}
//               >
//                 <div
//                   className={`${
//                     isPageActive("/manageAccount") ? "" : ""
//                   } box2 py-2 px-2 md:px-3  rounded-[5px]`}
//                 >
//                   <DashboardIcon openDashboard={openDashboard}        isPageActive={isPageActive} />
//                 </div>
//               </div>
//             </p>
//             {openDashboard && (
//               <div className="absolute left-16 top-2 ">
//                 <HoveredText text={"Dashboard"} />
//               </div>
//             )}
//           </Link>
//         </li>

//         {/* product */}

//         <li className="sidebar-list">
//           <Link to="/manageAccount/all-products" className="relative">
//             <p>
//               <div
//                 className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
//                 onMouseEnter={() => setOpenProduct(true)}
//                 onMouseLeave={() => setOpenProduct(false)}
//               >
//                 <div
//                   className={`${
//                     isPageActive("/manageAccount/all-products") ? "" : ""
//                   } box2 py-2 px-2 md:px-3  rounded-[5px]`}
//                 >
//                   <AllProductIcon
//                     isPageActive={isPageActive}
//                     openProduct={openProduct}
//                   />
//                 </div>
//               </div>
//             </p>
//             {openProduct && (
//               <div className="absolute left-16 top-2 ">
//                 <HoveredText text={"Product"} />
//               </div>
//             )}
//           </Link>
//         </li>

//         {/* collection */}

//         <li className="sidebar-list">
//           <Link to="/manageAccount/all-collections" className="relative">
//             <p>
//               <div
//                 className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
//                 onMouseEnter={() => setOpenCollection(true)}
//                 onMouseLeave={() => setOpenCollection(false)}
//               >
//                 <div
//                   className={`${
//                     isPageActive("/manageAccount/all-collections") ? "" : ""
//                   } box2 py-2 px-2 md:px-3  rounded-[5px]`}
//                 >
//                   <AllCollectionIcon
//                     isPageActive={isPageActive}
//                     openCollection={openCollection}
//                   />
//                 </div>
//               </div>
//             </p>
//             {openCollection && (
//               <div className="absolute left-16 top-2 ">
//                 <HoveredText text={"Collection"} />
//               </div>
//             )}
//           </Link>
//         </li>

//         {/* order */}

//         <li className="sidebar-list">
//           <Link to="/manageAccount" className="relative">
//             <p>
//               <div
//                 className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
//                 onMouseEnter={() => setOpenOrder(true)}
//                 onMouseLeave={() => setOpenOrder(false)}
//               >
//                 <div
//                   className={`${
//                     isPageActive("/manageAccount") ? "" : ""
//                   } box2 py-2 px-2 md:px-3  rounded-[5px]`}
//                 >
//                   <OrderIcon openOrder={openOrder} />
//                 </div>
//               </div>
//             </p>
//             {openOrder && (
//               <div className="absolute left-16 top-2 ">
//                 <HoveredText text={"Order"} />
//               </div>
//             )}
//           </Link>
//         </li>
//         {/* home page control */}

//         <li className="sidebar-list">
//           <Link to="/manageAccount/home-page-control" className="relative">
//             <p>
//               <div
//                 className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
//                 onMouseEnter={() => setOpenHomeControl(true)}
//                 onMouseLeave={() => setOpenHomeControl(false)}
//               >
//                 <div
//                   className={`${
//                     isPageActive("/manageAccount/home-page-control") ? "" : ""
//                   } box2 py-2 px-2 md:px-3  rounded-[5px]`}
//                 >
//                   <HomePageControlIcon
//                     isPageActive={isPageActive}
//                     openHomeControl={openHomeControl}
//                   />
//                 </div>
//               </div>
//             </p>
//             {openHomeControl && (
//               <div className="absolute left-16 top-2 ">
//                 <HoveredText text={"openHomeControl"} />
//               </div>
//             )}
//           </Link>
//         </li>

//         {/* setting */}

//         <li className="sidebar-list">
//           <Link to="/manageAccount" className="relative">
//             <p>
//               <div
//                 className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
//                 onMouseEnter={() => setOpenSetting(true)}
//                 onMouseLeave={() => setOpenSetting(false)}
//               >
//                 <div
//                   className={`${
//                     isPageActive("/manageAccount") ? "" : ""
//                   } box2 py-2 px-2 md:px-3  rounded-[5px]`}
//                 >
//                   <SettingIcon openSetting={openSetting} />
//                 </div>
//               </div>
//             </p>
//             {openSetting && (
//               <div className="absolute left-16 top-2 ">
//                 <HoveredText text={"Setting"} />
//               </div>
//             )}
//           </Link>
//         </li>

//         {/* logout */}

//         <li className="sidebar-list">
//           <Link to="/manageAccount" className="relative">
//             <p>
//               <div
//                 className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
//                 onMouseEnter={() => setOpenLogout(true)}
//                 onMouseLeave={() => setOpenLogout(false)}
//               >
//                 <div
//                   className={`${
//                     isPageActive("/manageAccount") ? "" : ""
//                   } box2 py-2 px-2 md:px-3  rounded-[5px]`}
//                 >
//                   <LogoutIcon openLogout={openLogout} />
//                 </div>
//               </div>
//             </p>
//             {openLogout && (
//               <div className="absolute left-16 top-2 ">
//                 <HoveredText text={"Logout"} />
//               </div>
//             )}
//           </Link>
//         </li>
//       </ul>
//     </>
//   );
// };

// export default AdminSideBar;


import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HoveredText from "../../icons/HoveredText";
import { AuthContext } from "../../Context/UserContext";
import DashboardIcon from "../../icons/NFTIcon/DashboardIcon";
import OrderIcon from "../../icons/NFTIcon/OrderIcon";
import SettingIcon from "../../icons/NFTIcon/SettingIcon";
import LogoutIcon from "../../icons/NFTIcon/LogoutIcon";
import AllProductIcon from "../../icons/NFTIcon/AllProductIcon";
import AllCollectionIcon from "../../icons/NFTIcon/AllCollectionIcon";
import HomePageControlIcon from "../../icons/NFTIcon/HomePageControlIcon";
import { useAuthCheck } from "../../utils/useAuthCheck";
import Swal from "sweetalert2";

const AdminSideBar = () => {
  //---- states
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openCollection, setOpenCollection] = useState(false);
  const [openHomeControl, setOpenHomeControl] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If the user has scrolled down at all, set isScrolled to true
      setIsScrolled(window.scrollY > 0);
    };

    // Listen for scroll events
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const location = useLocation();
  const isPageActive = (path) => {
    return location.pathname === path;
  };
  const { logout: originalLogout } = useAuthCheck();
  const { singleUser } = useContext(AuthContext);
  const userEmail = singleUser && singleUser?.data?.email;

  console.log("userEmail",userEmail);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
     // navigate("/login");
    }
  };

  // Shared sidebar content component to avoid duplication
  const SidebarContent = () => (
    <>
      {/* dashboard */}
      <img className="hidden md:block mb-10" src="/nft-logo.png" alt="" />
      <div className="sidebar-list">
        <Link to="/manageAccount" className="relative">
          <div
            className={`${
              openDashboard || isPageActive("/manageAccount")? "bg-[#dff5eb] rounded-lg " : ""
            } flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl`}
           
          >
            <div
             onMouseEnter={() => setOpenDashboard(true)}
             onMouseLeave={() => setOpenDashboard(false)}
             onClick={()=>setIsOpen(false)}
              className={`${
                isPageActive("/manageAccount") ? "bg-[#dff5eb] rounded-lg" : ""
              } w-[250px] flex items-center space-x-3 box2 py-2 px-2 md:px-4 rounded-[5px]`}
            >
              <DashboardIcon
                isPageActive={isPageActive}
                openDashboard={openDashboard}
              />
              <p
                className={`${
                  isPageActive("/manageAccount")
                    ? "text-[#2cba7a]"
                    : "text-gray-600"
                } hover:text-[#2cba7a] text-xl font-bold`}
              >
                Dashboard
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* product */}
      { userEmail === "nftclosetx@gmail.com" &&
      <div className="sidebar-list">
        <Link 
        to="/manageAccount/all-products" 
        className="relative">
          <div
            className={`${
              openProduct || isPageActive("/manageAccount/all-products") ? "bg-[#dff5eb] rounded-lg " : ""
            } flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl`}
          
          >
            <div
              onMouseEnter={() => setOpenProduct(true)}
              onMouseLeave={() => setOpenProduct(false)}
              onClick={()=>setIsOpen(false)}
              className={`${
                isPageActive("/manageAccount/all-products") ? "" : ""
              } w-[250px] flex items-center space-x-3 box2 py-2 px-2 md:px-3`}
            >
              <AllProductIcon
                isPageActive={isPageActive}
                openProduct={openProduct}
              />
              <p
                className={`${
                  isPageActive("/manageAccount/all-products")
                    ? "text-[#2cba7a]"
                    : "text-gray-600"
                } hover:text-[#2cba7a] text-xl font-bold`}
              >
                All Products
              </p>
            </div>
          </div>
        </Link>
      </div>
}
      {/* collections */}
      { userEmail === "nftclosetx@gmail.com" &&
      <div className="sidebar-list">
        <Link 
        to="/manageAccount/all-collections" 
        className="relative">
          <div
            className={`${
           isPageActive("/manageAccount/all-collections")  ? "bg-[#dff5eb] rounded-lg " : ""
            } hover:bg-[#dff5eb] flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl`}
           
          >
            <div
             onMouseEnter={() => setOpenCollection(true)}
             onMouseLeave={() => setOpenCollection(false)}
             onClick={()=>setIsOpen(false)}
              className={`${
                isPageActive("/manageAccount/all-collections") ? "" : ""
              } w-[250px] flex items-center space-x-3 box2 py-2 px-2 md:px-3`}
            >
              <AllCollectionIcon
                isPageActive={isPageActive}
                openCollection={openCollection}
              />
              <p
                className={`${
                  isPageActive("/manageAccount/all-collections")
                    ? "text-[#2cba7a]"
                    : "text-gray-600"
                } hover:text-[#2cba7a] text-xl font-bold`}
              >
                All Collections
              </p>
            </div>
          </div>
        </Link>
      </div>
      }

      {/* order */}
      <div className="sidebar-list">
        <Link to="/manageAccount/orders" className="relative">
          <div
            className={`${
               isPageActive("/manageAccount/orders") ? "bg-[#dff5eb] rounded-lg " : ""
            } hover:bg-[#dff5eb] flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl`}
        
          >
            <div
                onMouseEnter={() => setOpenOrder(true)}
                onMouseLeave={() => setOpenOrder(false)}
                onClick={()=>setIsOpen(false)}
              className={`${
                isPageActive("/manageAccount/orders") ? "" : ""
              } w-[250px] flex items-center space-x-3 box2 py-2 px-2 md:px-3`}
            >
              <OrderIcon openOrder={openOrder}   isPageActive={isPageActive} />
              <p
                className={`${
                  isPageActive("/manageAccount/orders")
                    ? "text-[#2cba7a]"
                    : "text-gray-600"
                } hover:text-[#2cba7a] text-xl font-bold`}
              >
                Orders
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* home control */}
      { userEmail === "nftclosetx@gmail.com" &&
      <div className="sidebar-list">
        <Link 
         to="/manageAccount/home-page-controls" 
        className="relative">
          <div
            className={`${
              openHomeControl  ? "bg-[#dff5eb] rounded-lg" : ""
            } hover:bg-[#dff5eb] flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl`}
     
          >
            <div
                   onMouseEnter={() => setOpenHomeControl(true)}
                   onMouseLeave={() => setOpenHomeControl(false)}
                   onClick={()=>setIsOpen(false)}
              className={`${
                isPageActive("/manageAccount/home-page-controls") ? "" : ""
              } w-[250px] flex items-center space-x-3 box2 py-2 px-2 md:px-3`}
            >
              <HomePageControlIcon
                isPageActive={isPageActive}
                openHomeControl={openHomeControl}
              />
              <p
                className={`${
                  isPageActive("/manageAccount/home-page-controls")
                    ? "text-[#2cba7a]"
                    : "text-gray-600"
                } hover:text-[#2cba7a] text-xl font-bold`}
              >
                Home Page Control
              </p>
            </div>
          </div>
        </Link>
      </div>
      }

      {/* setting */}
      <div className="sidebar-list">
        <Link to="/manageAccount/settings" className="relative">
          <div
            className={`${
             isPageActive("/manageAccount/settings")
                ? "bg-[#dff5eb] rounded-lg"
                : ""
            } hover:bg-[#dff5eb] flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl`}
       
          >
            <div
                 onMouseEnter={() => setOpenSetting(true)}
                 onMouseLeave={() => setOpenSetting(false)}
                 onClick={()=>setIsOpen(false)}
              className={`${
                isPageActive("/manageAccount/settings") ? "" : ""
              } w-[250px] flex items-center space-x-3 box2 py-2 px-2 md:px-3`}
            >
              <SettingIcon  isPageActive={isPageActive} openSetting={openSetting} />
              <p
                className={`${
                  isPageActive("/manageAccount/settings")
                    ? "text-[#2cba7a]"
                    : "text-gray-600"
                } hover:text-[#2cba7a] text-xl font-bold`}
              >
                Settings
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* logout */}
      <div className="sidebar-list">
        <div className="relative">
          <div
            className={`${
              openLogout ? "bg-[#dff5eb] rounded-lg" : ""
            } hover:bg-[#dff5eb] flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl`}
            onMouseEnter={() => setOpenLogout(true)}
            onMouseLeave={() => setOpenLogout(false)}
            onClick={logout}
          >
            <div className="w-[250px] flex items-center space-x-3 box2 py-2 px-2 md:px-3">
              <LogoutIcon openLogout={openLogout} />
              <p
                className={`${
                  openLogout ? "text-[#2cba7a]" : "text-gray-600"
                } hover:text-[#2cba7a] text-xl font-bold`}
              >
                Log-Out
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-15 z-[999]"
          onClick={toggleSidebar}
        />
      )}

      {/* Sliding Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-[1000] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Sidebar content */}
        <div className="pt-16 px-4 space-y-4">
          <SidebarContent />
        </div>
      </div>

      {/* Mini Sidebar */}
      <ul className={`hidden absolute shadow-xl left-0 top-[90px] 3xl:block w-[80px] bg-[#fff] lg:flex flex-col items-center justify-start py-5 space-y-4 lg:space-y-5  ${isScrolled ? "z-0" : "z-50"} `}>
        {/* Hamburger Menu Button */}
        <li className="w-full flex justify-center mb-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </li>

        {/* Dashboard */}
        <li className="sidebar-list">
          <Link to="/manageAccount" className="relative">
            <div
              className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
            
            >
              <div
                onMouseEnter={() => setOpenDashboard(true)}
                onMouseLeave={() => setOpenDashboard(false)}
                className={`${
                  isPageActive("/manageAccount") ? "" : ""
                } box2 py-2 px-2 md:px-3 rounded-[5px]`}
              >
                <DashboardIcon
                  openDashboard={openDashboard}
                  isPageActive={isPageActive}
                />
              </div>
            </div>
            {openDashboard && (
              <div className="absolute left-16 top-2">
                <HoveredText text={"Dashboard"} />
              </div>
            )}
          </Link>
        </li>



         {/* product */}
         { userEmail === "nftclosetx@gmail.com" &&
         <li className="sidebar-list">
           <Link to="/manageAccount/all-products" className="relative">
             <p>
               <div
                 className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
            
               >
                 <div
                      onMouseEnter={() => setOpenProduct(true)}
                      onMouseLeave={() => setOpenProduct(false)}
                   className={`${
                     isPageActive("/manageAccount/all-products") ? "" : ""
                   } box2 py-2 px-2 md:px-3  rounded-[5px]`}
                 >
                   <AllProductIcon
                     isPageActive={isPageActive}
                     openProduct={openProduct}
                   />
                 </div>
               </div>
             </p>
             {openProduct && (
               <div className="absolute left-16 top-2 ">
                 <HoveredText text={"Product"} />
               </div>
             )}
           </Link>
         </li>
}
         {/* collection */}
         { userEmail === "nftclosetx@gmail.com" &&
         <li className="sidebar-list">
           <Link to="/manageAccount/all-collections" className="relative">
             <p>
               <div
                 className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
              
               >
                 <div
                    onMouseEnter={() => setOpenCollection(true)}
                    onMouseLeave={() => setOpenCollection(false)}
                   className={`${
                     isPageActive("/manageAccount/all-collections") ? "" : ""
                   } box2 py-2 px-2 md:px-3  rounded-[5px]`}
                 >
                   <AllCollectionIcon
                     isPageActive={isPageActive}
                     openCollection={openCollection}
                   />
                 </div>
               </div>
             </p>
             {openCollection && (
               <div className="absolute left-16 top-2 ">
                 <HoveredText text={"Collection"} />
               </div>
             )}
           </Link>
         </li>
}
         {/* order */}

         <li className="sidebar-list">
           <Link to="/manageAccount/orders" className="relative">
             <p>
               <div
                 className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
             
               >
                 <div
                     onMouseEnter={() => setOpenOrder(true)}
                     onMouseLeave={() => setOpenOrder(false)}
                   className={`${
                     isPageActive("/manageAccount/orders") ? "" : ""
                   } box2 py-2 px-2 md:px-3  rounded-[5px]`}
                 >
                   <OrderIcon openOrder={openOrder} isPageActive={isPageActive} />
                 </div>
               </div>
             </p>
             {openOrder && (
               <div className="absolute left-16 top-2 ">
                 <HoveredText text={"Order"} />
               </div>
             )}
           </Link>
         </li>
         {/* home page control */}
         { userEmail === "nftclosetx@gmail.com" &&
         <li className="sidebar-list">
           <Link to="/manageAccount/home-page-controls" className="relative">
             <p>
               <div
                 className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
                
               >
                 <div
                  onMouseEnter={() => setOpenHomeControl(true)}
                  onMouseLeave={() => setOpenHomeControl(false)}
                   className={`${
                     isPageActive("/manageAccount/home-page-controls") ? "" : ""
                   } box2 py-2 px-2 md:px-3  rounded-[5px]`}
                 >
                   <HomePageControlIcon
                     isPageActive={isPageActive}
                     openHomeControl={openHomeControl}
                   />
                 </div>
               </div>
             </p>
             {openHomeControl && (
               <div className="absolute left-16 top-2 ">
                 <HoveredText text={"Homepage Control"} />
               </div>
             )}
           </Link>
         </li>
         }
         {/* setting */}
         <li className="sidebar-list">
           <Link to="/manageAccount/settings" className="relative">
             <p>
               <div
                 className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
               
               >
                 <div
                   onMouseEnter={() => setOpenSetting(true)}
                   onMouseLeave={() => setOpenSetting(false)}
                   className={`${
                     isPageActive("/manageAccount/settings") ? "" : ""
                   } box2 py-2 px-2 md:px-3  rounded-[5px]`}
                 >
                   <SettingIcon  isPageActive={isPageActive} openSetting={openSetting} />
                 </div>
               </div>
             </p>
             {openSetting && (
               <div className="absolute left-16 top-2 ">
                 <HoveredText text={"Setting"} />
               </div>
             )}
           </Link>
         </li>

         {/* logout */}

         <li className="sidebar-list">
           <div className="relative">
             <p>
               <div
                 className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
              
               >
                 <div
                 onClick={logout}
                    onMouseEnter={() => setOpenLogout(true)}
                    onMouseLeave={() => setOpenLogout(false)}
                   className={`${
                     isPageActive("/manageAccount") ? "" : ""
                   } box2 py-2 px-2 md:px-3  rounded-[5px]`}
                 >
                   <LogoutIcon openLogout={openLogout} />
                 </div>
               </div>
             </p>
             {openLogout && (
               <div className="absolute left-16 top-2 ">
                 <HoveredText text={"Logout"} />
               </div>
             )}
           </div>
         </li>
      </ul>
    </>
  );
};

export default AdminSideBar;