import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/UserContext";

const MobileSidebar = ({
  handleCreateProject,
  handleDashboard,
  handleFriendRqst,
  handleFund,
  handleMeeting,
  handleProfile,
  handleProject,
  handleRequest,
  handleSetting,
  openCreateProject,
  openDashboard,
  openFrndRqst,
  openFund,
  openMeet,
  openProfile,
  openProject,
  openRequest,
  openSetting,
  handleMyTools,
  openMyTools,
  handleAllPost,
  openAllPost,
  logout,
}) => {
  const { singleUser } = useContext(AuthContext);
  const userImage = singleUser?.data?.profilePic
    ? singleUser?.data?.profilePic
    : "https://i.ibb.co.com/FKKD4mT/opp.png";

  const [open, setOpen] = useState(false);

  return (
    <div className="hidden md:block xl:hidden flex flex-col  border-2  w-[60px] md:w-[70px]  bg-[#dce2ea] absolute -top-0 -left-0">
      <div className="flex flex-col  rounded-xl py-2 pl-2 w-[50px] md:w-[60px]">
        <ul className=" ">
          <li className="flex justify-center items-center rounded-t-xl  bg-[#e4ecf7] w-full ">
            <div className="block  py-1 px-4 lg:p-1 ">
              <img src="/logo.png" className="w-8 mt-2" />
            </div>
          </li>
          {/* hmbrgr */}
          <li
            className={`hide-content"
              border-b  cursor-pointer  relative `}
          >
            <div
              className={`bg-[#e4ecf7] py-3
                 flex relative lg:space-x-3 xl:space-x-6  items-center justify-center`}
            >
              <img src="/hambrgr1.svg" className="h-4" />
            </div>
          </li>
          {/* dashboard */}
          <li
            onClick={handleDashboard}
            className={`${
              openDashboard === true ? "show-content" : "hide-content"
            } border-b  cursor-pointer`}
          >
            {openDashboard && (
              <div className=" bg-[#e4ecf7] h-4 rounded-br-[60px]"></div>
            )}

            <div
              className={`${
                openDashboard === true
                  ? "bg-[#f3f6f8] rounded-[20px] ml-2 pl-0 py-2"
                  : "bg-[#e4ecf7]  py-3"
              } flex relative  items-center justify-center`}
            >
              <Link to="/dashboard">
                <img src="/dashboard1.svg" className="h-5" />
              </Link>
            </div>

            <div
              className={`${
                openDashboard === true ? "block" : "hidden"
              } bg-[#e4ecf7]  h-4 rounded-tr-[50px]`}
            ></div>
          </li>
          {/* project */}
          <li
            onClick={handleProject}
            className={`${
              openProject === true ? "show-content" : "hide-content"
            } border-b  cursor-pointer`}
          >
            {openProject && (
              <div className=" bg-[#e4ecf7] h-4 rounded-br-[60px]"></div>
            )}

            <div
              className={`${
                openProject === true
                  ? "bg-[#f3f6f8]  rounded-[20px] ml-2 pl-0 py-2"
                  : "bg-[#e4ecf7]  py-3"
              } flex relative items-center justify-center`}
            >
              <Link to="/dashboard/all-projects">
                <img src="/project2.svg" className="h-5" />
              </Link>
            </div>

            <div
              className={`${
                openProject === true ? "block" : "hidden"
              } bg-[#e4ecf7] h-4 rounded-tr-[50px]`}
            ></div>
          </li>
          {/* request */}
          <li
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onClick={handleRequest}
            className={`${
              openRequest === true ? "show-content pl-2" : "hide-content"
            } border-b  cursor-pointer relative`}
          >
            {openRequest && (
              <div className=" bg-[#e4ecf7] h-4 rounded-br-[60px]"></div>
            )}

            <div
              className={`${
                openRequest === true
                  ? "bg-[#f3f6f8] rounded-[20px] py-2"
                  : "bg-[rgb(228,236,247)]  py-3"
              } flex relative  items-center justify-center`}
            >
              {/* <Link to="/dashboard/recieve-request"> */}
              <img src="/rqst.svg" className="h-5" />
              {/* </Link> */}
            </div>
            <div
              className={`${
                openRequest === true ? "block" : "hidden"
              } bg-[#e4ecf7]  h-4 rounded-tr-[50px]`}
            ></div>
            {open && (
              <div className="absolute md:left-14 top-0 z-50 bg-white w-36 space-y-2 rounded-lg shadow-lg px-3 py-3">
                <p className="text-sm">
                  <Link to="/dashboard/sent-request">Sent Request</Link>
                </p>
                <p className="text-sm">
                  <Link to="/dashboard/recieve-request">Recieve Request</Link>
                </p>
              </div>
            )}
          </li>
          {/* create project */}
          <li
            onClick={handleCreateProject}
            className={`${
              openCreateProject === true ? "show-content pl-2" : "hide-content"
            } border-b  cursor-pointer`}
          >
            {openCreateProject && (
              <div className=" bg-[#e4ecf7] h-4 rounded-br-[60px]"></div>
            )}

            <div
              className={`${
                openCreateProject === true
                  ? "bg-[#f3f6f8] rounded-[20px] py-2"
                  : "bg-[#e4ecf7]  py-3"
              } flex relative  items-center justify-center`}
            >
              <Link to="/dashboard/create-projects">
                <img src="/create-project.svg" className="h-6 md:h-7" />
              </Link>
            </div>

            <div
              className={`${
                openCreateProject === true ? "block" : "hidden"
              } bg-[#e4ecf7]  h-4 rounded-tr-[50px]`}
            ></div>
          </li>
          {/* fund */}
          <li
            onClick={handleFund}
            className={`${
              openFund === true ? "show-content pl-2" : "hide-content"
            } border-b  cursor-pointer`}
          >
            {openFund && (
              <div className=" bg-[#e4ecf7]h-4 rounded-br-[60px]"></div>
            )}

            <Link
              to="/dashboard/fund-proposal"
              className={`${
                openFund === true
                  ? "bg-[#f3f6f8] rounded-[20px] py-2"
                  : "bg-[#e4ecf7] py-3"
              } flex relative  items-center justify-center`}
            >
              <img src="/fund2.svg" className="h-6 md:h-5" />
            </Link>

            <div
              className={`${
                openFund === true ? "block" : "hidden"
              } bg-[#e4ecf7] h-4 rounded-tr-[50px]`}
            ></div>
          </li>
          {/* frnd rqst*/}
          <li
            onClick={handleFriendRqst}
            className={`${
              openFrndRqst === true ? "show-content pl-2" : "hide-content"
            } border-b  cursor-pointer`}
          >
            {openFrndRqst && (
              <div className=" bg-[#e4ecf7] h-4 rounded-br-[60px]"></div>
            )}

            <div
              className={`${
                openFrndRqst === true
                  ? "bg-[#f3f6f8] rounded-[20px]  py-2"
                  : "bg-[#e4ecf7]  py-3"
              } flex relative items-center justify-center`}
            >
              <Link to="/dashboard/friend-request">
                <img src="/rqst2.svg" className="h-5" />
              </Link>
            </div>

            <div
              className={`${
                openFrndRqst === true ? "block" : "hidden"
              } bg-[#e4ecf7]  h-4 rounded-tr-[50px]`}
            ></div>
          </li>
          {/* my tools*/}
          <li
            onClick={handleMyTools}
            className={`${
              openMyTools === true ? "show-content pl-2" : "hide-content"
            } border-b  cursor-pointer`}
          >
            {openMyTools && (
              <div className=" bg-[#e4ecf7] h-4 rounded-br-[60px]"></div>
            )}

            <div
              className={`${
                openMyTools === true
                  ? "bg-[#f3f6f8] rounded-[20px]  py-2"
                  : "bg-[#e4ecf7]  py-3"
              } flex relative items-center justify-center`}
            >
              <Link to="/dashboard/my-tools">
                <img src="/myTool.svg" className="h-5 lg:h-6 w-6" />
              </Link>
            </div>

            <div
              className={`${
                openMyTools === true ? "block" : "hidden"
              } bg-[#e4ecf7]  h-4 rounded-tr-[50px]`}
            ></div>
          </li>
          {/* all post*/}
          <li
            onClick={handleAllPost}
            className={`${
              openAllPost === true ? "show-content pl-2" : "hide-content"
            } border-b  cursor-pointer`}
          >
            {openAllPost && (
              <div className=" bg-[#e4ecf7] h-4 rounded-br-[60px]"></div>
            )}

            <div
              className={`${
                openAllPost === true
                  ? "bg-[#f3f6f8] rounded-[20px]  py-2"
                  : "bg-[#e4ecf7]  py-3"
              } flex relative items-center justify-center`}
            >
              <Link to="/dashboard/all-post">
                <img src="/allPost.svg" className="h-5" />
              </Link>
            </div>

            <div
              className={`${
                openAllPost === true ? "block" : "hidden"
              } bg-[#e4ecf7]  h-4 rounded-tr-[50px]`}
            ></div>
          </li>
          {/* meet */}
          <li
            onClick={handleMeeting}
            className={`${
              openMeet === true ? "show-content pl-2" : "hide-content"
            } border-b  cursor-pointer`}
          >
            {openMeet && (
              <div className=" bg-[#e4ecf7]] h-4 rounded-br-[60px]"></div>
            )}

            <Link
              to="/dashboard/meeting-schedule"
              className={`${
                openMeet === true
                  ? "bg-[#f3f6f8] rounded-[20px] py-3"
                  : "bg-[#e4ecf7]  py-3"
              } flex relative  items-center justify-center`}
            >
              <img src="/video.svg" className="h-3" />
            </Link>

            <div
              className={`${
                openMeet === true ? "block" : "hidden"
              } bg-[#e4ecf7]]  h-4 rounded-tr-[50px]`}
            ></div>
          </li>
          {/* profile */}
          <li
            onClick={handleProfile}
            className={`${
              openProfile === true ? "show-content pl-2" : "hide-content"
            } border-b  cursor-pointer`}
          >
            {openProfile && (
              <div className=" bg-[#e4ecf7] h-4 rounded-br-[60px]"></div>
            )}

            <div
              className={`${
                openProfile === true
                  ? "bg-[#f3f6f8] rounded-[20px] py-2"
                  : "bg-[#e4ecf7]  py-3"
              } flex relative  items-center justify-center`}
            >
              <Link to="/user/edit-profile">
                <img src={userImage} className="h-6 w-7 rounded-full" />
              </Link>
            </div>

            <div
              className={`${
                openProfile === true ? "block" : "hidden"
              } bg-[#e4ecf7]  h-4 rounded-tr-[50px]`}
            ></div>
          </li>
          {/* setting */}
          <li
            onClick={handleSetting}
            className={`${
              openSetting === true ? "show-content pl-2" : "hide-content"
            } border-b  cursor-pointer`}
          >
            {openSetting && (
              <div className=" bg-[#e4ecf7] h-4 rounded-br-[60px]"></div>
            )}

            <Link
              to="/dashboard/setting"
              className={`${
                openSetting === true
                  ? "bg-[#f3f6f8] rounded-[20px] py-2"
                  : "bg-[#e4ecf7]  py-3"
              } flex relative  items-center justify-center`}
            >
              <img src="/setting.svg" className="h-5" />
            </Link>

            <div
              className={`${
                openSetting === true ? "block" : "hidden"
              } bg-[#e4ecf7] h-4 rounded-tr-[50px]`}
            ></div>
          </li>
          {/* logout */}
          <li
            className={`hide-content"
              border-b  cursor-pointer  relative `}
          >
            <div
              onClick={logout}
              className={`bg-[#e4ecf7] py-3
                 flex relative lg:space-x-3 xl:space-x-6 rounded-b-xl items-center justify-center`}
            >
              <img src="/logout.svg" className="h-7 " />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileSidebar;
MobileSidebar.propTypes = {
  handleCreateProject: PropTypes.func.isRequired,
  handleDashboard: PropTypes.func.isRequired,
  handleFriendRqst: PropTypes.func.isRequired,
  handleFund: PropTypes.func.isRequired,
  handleMeeting: PropTypes.func.isRequired,
  handleProfile: PropTypes.func.isRequired,
  handleProject: PropTypes.func.isRequired,
  handleRequest: PropTypes.func.isRequired,
  handleSetting: PropTypes.func.isRequired,
  openCreateProject: PropTypes.bool.isRequired,
  openDashboard: PropTypes.bool.isRequired,
  openFrndRqst: PropTypes.bool.isRequired,
  openFund: PropTypes.bool.isRequired,
  openMeet: PropTypes.bool.isRequired,
  openProfile: PropTypes.bool.isRequired,
  openProject: PropTypes.bool.isRequired,
  openRequest: PropTypes.bool.isRequired,
  openSetting: PropTypes.bool.isRequired,
  openRequestOption: PropTypes.bool.isRequired,
  setOpenRequestOption: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};
