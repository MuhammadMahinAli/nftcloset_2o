import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FeedIcon from "../../icons/FeedIcon";
import HoveredText from "../../icons/HoveredText";
import ResearcherIcon from "../../icons/ResearcherIcon";
import DashboardIcon from "../../icons/DashboardIcon";
import ProjectIcon from "../../icons/ProjectIcon";
import PeoplesIcon from "../../icons/PeoplesIcon";
import VideoIcon from "../../icons/VideoIcon";
import PropTypes from "prop-types";
import { AuthContext } from "../../Context/UserContext";

const MiniSidebar = ({ user, theme }) => {
  const [openFeed, setOpenFeed] = useState(false);
  const [openResearcher, setOpenResearcher] = useState(false);
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const [openPeoples, setOpenPeoples] = useState(false);
  const [openMeeting, setOpenMeeting] = useState(false);
  // states

  const location = useLocation();
  const isPageActive = (path) => {
    return location.pathname === path;
  };

  //--

  const{singleUser} = useContext(AuthContext);

  const userEmail = singleUser
    && singleUser?.data?.email;


  return (
    <ul
      className={`absolute hidden 3xl:block w-[80px]  ${
        theme === "light"
          ? "bg-[#fff]"
          : "shadow-[-2px_-2px_100px_rgba(255,_255,_255,_0.1)_inset,_2px_2px_100px_rgba(66,_66,_66,_0.1)_inset] [backdrop-filter:blur(50px)] rounded-br-xl"
      }  flex flex-col items-center justify-center py-5 space-y-4 lg:space-y-9 z-50`}
    >
      
      <li className="sidebar-list">
        <Link to="/home" className="relative">
          <p>
            <div
              className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
              onMouseEnter={() => setOpenFeed(true)}
              onMouseLeave={() => setOpenFeed(false)}
            >
              <div
                className={`${
                  isPageActive("/home") || theme === "light"
                    ? "shadow-[1px_3px_24px_#fff_inset]"
                    : "shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"
                } box2 py-2 px-2 md:px-3 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}
              >
                <FeedIcon theme={theme} openFeed={openFeed} />
              </div>
            </div>
          </p>
          {openFeed && (
            <div className="absolute left-16 top-1 ">
              <HoveredText text={"Home"} theme={theme} />
            </div>
          )}
        </Link>
      </li>
      <li className="relative sidebar-list">
        <Link to="/find/researcher">
          <div
            className="flex items-center justify-center cursor-pointer [border:none] box1 p-0 rounded-xl"
            onMouseEnter={() => setOpenResearcher(true)}
            onMouseLeave={() => setOpenResearcher(false)}
          >
            <div
              className={`${
                isPageActive("/find/researcher") || theme === "light"
                  ? "shadow-[1px_3px_24px_#fff_inset]"
                  : "shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"
              } box2 py-2 px-2 md:px-3 rounded-[5px]`}
            >
              <ResearcherIcon theme={theme} openResearcher={openResearcher} />
            </div>
          </div>
        </Link>
        {openResearcher && (
          <div className="absolute left-16 top-1 z-50">
            <HoveredText text={"Researchers"} theme={theme} />
          </div>
        )}
      </li>
      <li className="relative sidebar-list">
        <Link to={userEmail ===  "nftclosetx@gmail.com" ? `/admin/${user?._id}` : "/dashboard"}>
          <div
            className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
            onMouseEnter={() => setOpenDashboard(true)}
            onMouseLeave={() => setOpenDashboard(false)}
          >
            <div
              className={`${
                isPageActive("/dashboard") || theme === "light"
                  ? "shadow-[1px_3px_24px_#fff_inset]"
                  : "shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"
              } box2 py-2 px-2 md:px-3 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}
            >
              <DashboardIcon theme={theme} openDashboard={openDashboard} />
            </div>
          </div>
        </Link>
        {openDashboard && (
          <div className="absolute left-16 top-1 z-50">
            <HoveredText text={"Dashboard"} theme={theme} />
          </div>
        )}
      </li>
      <li className="relative sidebar-list">
        <Link to="/find/project">
          <p>
            <div
              className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
              onMouseEnter={() => setOpenProject(true)}
              onMouseLeave={() => setOpenProject(false)}
            >
              <div
                className={`${
                  isPageActive("/find/project") || theme === "light"
                    ? "shadow-[1px_3px_24px_#fff_inset]"
                    : "shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"
                } box2 py-2 px-2 md:px-3 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}
              >
                <ProjectIcon theme={theme} openProject={openProject} />
              </div>
            </div>
          </p>
          {openProject && (
            <div className="absolute left-16 top-1 z-50">
              <HoveredText text={"Projects"} theme={theme} />
            </div>
          )}
        </Link>
      </li>

      <li className="relative sidebar-list">
        <Link to="/user/friend">
          <div
            className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
            onMouseEnter={() => setOpenPeoples(true)}
            onMouseLeave={() => setOpenPeoples(false)}
          >
            <div
              className={`${
                isPageActive("/user/friend") || theme === "light"
                  ? "shadow-[1px_3px_24px_#fff_inset]"
                  : "shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"
              } box2 py-2 px-2 md:px-3 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}
            >
              <PeoplesIcon theme={theme} openPeoples={openPeoples} />
            </div>
          </div>
        </Link>
        {openPeoples && (
          <div className="absolute left-16 top-1 z-50">
            <HoveredText text={"Friends"} theme={theme} />
          </div>
        )}
      </li>
      <li className="relative sidebar-list">
        <Link to="/dashboard/meeting-schedule">
          <div
            className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
            onMouseEnter={() => setOpenMeeting(true)}
            onMouseLeave={() => setOpenMeeting(false)}
          >
            <div
              className={`${
                isPageActive("/dashboard/meeting-schedule") || theme === "light"
                  ? "shadow-[1px_3px_24px_#fff_inset]"
                  : "shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"
              } box2 py-2 px-2 md:px-3 shadow-[1px_3px_24px_#fff_inset] rounded-[5px]`}
            >
              <VideoIcon theme={theme} openMeeting={openMeeting} />
            </div>
          </div>
        </Link>
        {openMeeting && (
          <div className="absolute left-16 top-1 z-50">
            <HoveredText text={"Meetings"} theme={theme} />
          </div>
        )}
      </li>
    </ul>
  );
};

export default MiniSidebar;
MiniSidebar.propTypes = {
  user: PropTypes.object,
  theme: PropTypes.string.isRequired,
};
