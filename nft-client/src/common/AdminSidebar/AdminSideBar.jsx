// import { useContext, useEffect, useState } from "react";

// import Swal from "sweetalert2";
// import { useAuthCheck } from "../../utils/useAuthCheck";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../Context/UserContext";
// import AdminDekstopSidebar from "./AdminDekstopSidebar";
// import AdminMobileSidebar from "./AdminMobileSidebar";

// const AdminSideBar = () => {
//   const [openDashboard, setOpenDashboard] = useState(false);
//   const [openAllUser, setOpenAllUser] = useState(false);
//   const [openAllProject, setOpenAllProject] = useState(false);
//   const [openAllFund, setOpenAllFund] = useState(false);
//   const [openCreateTools, setOpenCreateTools] = useState(false);
//   const [openAllTool, setOpenAllTool] = useState(false);
// const [openConference, setOpenConference] = useState(false);
//   const [openSetting, setOpenSetting] = useState(false);
//   const [openTutorials, setOpenTutorials] = useState(false);
//   // const [openRequestOption, setOpenRequestOption] = useState(false);
//   const [userData, setUserData] = useState({});
//   const{singleUser} = useContext(AuthContext);

//   const toggleState = (stateToSet, stateToReset) => {
//     setTimeout(() => {
//       stateToSet(true);
//       stateToReset.forEach((state) => state(false));
//     }, 100);
//   };

// //  ******************** single user

// useEffect(() => {
// setUserData(singleUser);
// }, [singleUser]);

//   const handleDashboard = () =>
//     toggleState(setOpenDashboard, [
//       setOpenAllFund,
//       setOpenAllProject,
//       setOpenAllUser,
//       setOpenSetting,
//       setOpenCreateTools,
//       setOpenAllTool,
//       setOpenConference,
//       setOpenTutorials
//     ]);
//   const handleAllFund = () =>
//     toggleState(setOpenAllFund, [
//       setOpenDashboard,
//       setOpenAllUser,
//       setOpenAllProject,
//       setOpenSetting,
//       setOpenCreateTools,
//       setOpenAllTool,
//       setOpenConference,
//       setOpenTutorials
//     ]);
//   const handleAllProject = () =>
//     toggleState(setOpenAllProject, [
//       setOpenDashboard,
//       setOpenAllUser,
//       setOpenAllFund,
//       setOpenSetting,
//       setOpenCreateTools,
//       setOpenAllTool,
//       setOpenConference,
//       setOpenTutorials
//     ]);
//   const handleAllUser = () =>
//     toggleState(setOpenAllUser, [
//       setOpenDashboard,
//       setOpenAllFund,
//       setOpenAllProject,
//       setOpenSetting,
//       setOpenCreateTools,
//       setOpenAllTool,
//       setOpenConference,
//       setOpenTutorials
//     ]);
//   const handleSetting = () =>
//     toggleState(setOpenSetting , [
//       setOpenAllUser,
//       setOpenDashboard,
//       setOpenAllFund,
//       setOpenAllProject,
//       setOpenCreateTools,
//       setOpenAllTool,
//       setOpenConference,
//       setOpenTutorials
//     ]);
//   const handleCreateTools = () =>
//     toggleState( setOpenCreateTools, [
//       setOpenAllUser,
//       setOpenDashboard,
//       setOpenAllFund,
//       setOpenAllProject,
//       setOpenSetting ,
//       setOpenAllTool,
//       setOpenConference,
//       setOpenTutorials
//     ]);
//   const handleAllTools = () =>
//     toggleState(setOpenAllTool, [
//       setOpenAllUser,
//       setOpenDashboard,
//       setOpenAllFund,
//       setOpenAllProject,
//       setOpenSetting ,
//       setOpenCreateTools,
//       setOpenConference,
//       setOpenTutorials
//     ]);

//   const handleAllConference = () =>
//     toggleState(setOpenConference, [
//       setOpenAllUser,
//       setOpenDashboard,
//       setOpenAllFund,
//       setOpenAllProject,
//       setOpenSetting ,
//       setOpenCreateTools,
//       setOpenAllTool,
//       setOpenTutorials
//     ]);
//   const handleTutorials = () =>
//     toggleState(setOpenTutorials, [
//       setOpenAllUser,
//       setOpenDashboard,
//       setOpenAllFund,
//       setOpenAllProject,
//       setOpenSetting ,
//       setOpenCreateTools,
//       setOpenAllTool,
//       setOpenConference
//     ]);

//     // logout
//     const { logout: originalLogout } = useAuthCheck();
//     const navigate = useNavigate()
//     const logout = async () => {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, log me out!",
//       });

//       if (result.isConfirmed) {
//         originalLogout();
//         Swal.fire({
//           icon: "success",
//           text: "Logged out successfully!",
//         });
//         // navigate("/login");
//       }
//     };
//   return (
//     <>
//       <AdminMobileSidebar
//         handleAllUser={handleAllUser}
//         handleAllProject={handleAllProject}
//         handleAllFund={handleAllFund}
//         handleDashboard={handleDashboard}
//         handleSetting={handleSetting}
//         handleCreateTools={handleCreateTools}
//         handleAllTools={handleAllTools}
//         handleAllConference={handleAllConference}
//         handleTutorials={handleTutorials}
//         openTutorials={openTutorials}
//         openConference={openConference}
//         openAllTool={openAllTool}
//         openCreateTools={openCreateTools}
//         openSetting={openSetting}
//         openDashboard={openDashboard}
//         openAllUser={openAllUser}
//         openAllProject={openAllProject}
//         openAllFund={openAllFund}
//         logout={logout}
//         userData={userData}
//       />
//       {/* from dekstop */}
//       <AdminDekstopSidebar
//           handleAllUser={handleAllUser}
//           handleAllProject={handleAllProject}
//           handleAllFund={handleAllFund}
//           handleDashboard={handleDashboard}
//           handleSetting={handleSetting}
//           handleCreateTool={handleCreateTools}
//           handleAllTools={handleAllTools}
//           handleAllConference={handleAllConference}
//           handleTutorials={handleTutorials}
//         openTutorials={openTutorials}
//           openConference={openConference}
//           openAllTool={openAllTool}
//           openCreateTools={openCreateTools}
//           openSetting={openSetting}
//           openDashboard={openDashboard}
//           openAllUser={openAllUser}
//           openAllProject={openAllProject}
//           openAllFund={openAllFund}
//           logout={logout}
//           userData={userData}
//       />
//     </>
//   );
// };

// export default AdminSideBar;

import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HoveredText from "../../icons/HoveredText";
import { AuthContext } from "../../Context/UserContext";
import DashboardIcon from "../../icons/NFTIcon/DashboardIcon";
import OrderIcon from "../../icons/NFTIcon/OrderIcon";
import SettingIcon from "../../icons/NFTIcon/SettingIcon";
import LogoutIcon from "../../icons/NFTIcon/LogoutIcon";

const AdminSideBar = () => {
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  // states

  const location = useLocation();
  const isPageActive = (path) => {
    return location.pathname === path;
  };

  //--

  const { singleUser } = useContext(AuthContext);

  const userEmail = singleUser && singleUser?.data?.email;

  return (
    <>
{/* big */}
    <div
      className={`  shadow-xl left-0 top-[90px] 3xl:block w-[230px] bg-[#fff] grid grid-cols-1 justify-start py-10  space-y-4 lg:space-y-9 z-50`}
    >
      <div className="sidebar-list">
        <Link to="/manageAccount" className="relative">
          <p>
            <div
              className=" flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
              onMouseEnter={() => setOpenDashboard(true)}
              onMouseLeave={() => setOpenDashboard(false)}
            >
              <div
                className={`${
                  isPageActive("/manageAccount") ? "bg-green-200 rounded-lg" : ""
                } w-[180px] flex items-center space-x-3 box2 py-2 px-2 md:px-4  rounded-[5px]`}
              >
          
                <DashboardIcon isPageActive={isPageActive} openDashboard={openDashboard} />
                <p className={`${isPageActive("/manageAccount")  ? "text-[#2cba7a]": "text-gray-600"} hover:text-[#2cba7a] text-xl  font-bold`}>Dashboard</p>
              </div>
            </div>
          </p>
        
        </Link>
      </div>
      <div className="sidebar-list">
        <Link to="/manageAccount" className="relative">
          <p>
            <div
              className="w-[200px] flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
              onMouseEnter={() => setOpenOrder(true)}
              onMouseLeave={() => setOpenOrder(false)}
            >
              <div
                className={`${
                  isPageActive("/manageAccount") ? "" : ""
                }  w-[180px] flex items-center space-x-3 box2 py-2 px-2 md:px-3 bg-green-200 rounded-lg  `}
              >
                <OrderIcon openOrder={openOrder} />
                <p className="text-xl text-gray-600 font-bold">Orders</p>
              </div>
            </div>
          </p>
       
        </Link>
      </div>
      <div className="sidebar-list">
        <Link to="/manageAccount" className="relative">
          <p>
            <div
              className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
              onMouseEnter={() => setOpenSetting(true)}
              onMouseLeave={() => setOpenSetting(false)}
            >
              <div
                className={`${
                  isPageActive("/manageAccount") ? "" : ""
                } w-[180px] flex items-center space-x-3 box2 py-2 px-2 md:px-3 bg-green-200 rounded-lg `}
              >
                <SettingIcon openSetting={openSetting} />
                <p className="text-xl text-gray-600 font-bold">Settings</p>
              </div>
            </div>
          </p>
       
        </Link>
      </div>
      <div className="sidebar-list">
        <Link to="/manageAccount" className="relative">
          <p>
            <div
              className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
              onMouseEnter={() => setOpenLogout(true)}
              onMouseLeave={() => setOpenLogout(false)}
            >
              <div
                className={`${
                  isPageActive("/manageAccount") ? "" : ""
              } w-[180px] flex items-center space-x-3 box2 py-2 px-2 md:px-3 bg-green-200 rounded-lg `}
              >
                <LogoutIcon openLogout={openLogout} />
                <p className="text-xl text-gray-600 font-bold">Log-Out</p>
              </div>
            </div>
          </p>
         
        </Link>
      </div>
    </div>
{/* mini */}

    {/* <ul
      className={`hidden absolute shadow-xl left-0 top-[90px] 3xl:block w-[80px] bg-[#fff] lg:flex flex-col items-center justify-center py-5 space-y-4 lg:space-y-9 z-50`}
    >
      <li className="sidebar-list">
        <Link to="/manageAccount" className="relative">
          <p>
            <div
              className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
              onMouseEnter={() => setOpenDashboard(true)}
              onMouseLeave={() => setOpenDashboard(false)}
            >
              <div
                className={`${
                  isPageActive("/manageAccount") ? "" : ""
                } box2 py-2 px-2 md:px-3  rounded-[5px]`}
              >
                <DashboardIcon openDashboard={openDashboard} />
              </div>
            </div>
          </p>
          {openDashboard && (
            <div className="absolute left-16 top-2 ">
              <HoveredText text={"Dashboard"} />
            </div>
          )}
        </Link>
      </li>
      <li className="sidebar-list">
        <Link to="/manageAccount" className="relative">
          <p>
            <div
              className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
              onMouseEnter={() => setOpenOrder(true)}
              onMouseLeave={() => setOpenOrder(false)}
            >
              <div
                className={`${
                  isPageActive("/manageAccount") ? "" : ""
                } box2 py-2 px-2 md:px-3  rounded-[5px]`}
              >
                <OrderIcon openOrder={openOrder} />
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
      <li className="sidebar-list">
        <Link to="/manageAccount" className="relative">
          <p>
            <div
              className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
              onMouseEnter={() => setOpenSetting(true)}
              onMouseLeave={() => setOpenSetting(false)}
            >
              <div
                className={`${
                  isPageActive("/manageAccount") ? "" : ""
                } box2 py-2 px-2 md:px-3  rounded-[5px]`}
              >
                <SettingIcon openSetting={openSetting} />
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
      <li className="sidebar-list">
        <Link to="/manageAccount" className="relative">
          <p>
            <div
              className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
              onMouseEnter={() => setOpenLogout(true)}
              onMouseLeave={() => setOpenLogout(false)}
            >
              <div
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
        </Link>
      </li>
    </ul> */}
    </>
  );
};

export default AdminSideBar;
