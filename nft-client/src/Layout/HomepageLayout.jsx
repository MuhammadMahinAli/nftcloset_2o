import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar/Navbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
//import RightSidebar from "../Pages/Homepage/RightSidebar";
import BottomNavbar from "../common/BottomNavbar/BottomNavbar";
import Loading from "../Pages/Loading/Loading";
import Footer from "../Pages/shared/Footer/Footer";
import { Nav } from "../Pages/shared/NavBar/Nav";

const HomepageLayout = () => {
  //-------------------------------------------
  let [isOpen, setIsOpen] = useState(true);
  //const theme = useSelector((state) => state.theme.theme);
  const { user } = useSelector((state) => state.auth);
  // const { user } = useSelector((state) => state.auth);
  // console.log(user);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //console.log("userpost",getUserPost);
  const handleSidebarLinkClick = (path) => {
    setIsLoading(true);
    navigate(path);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    setIsLoading(true);
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //     if (user) {
  //       navigate("/home");
  //     } else {
  //       navigate("/login");
  //     }
  //   }, 2000); // 5-second delay

  // Clean up the timer
  //   return () => clearTimeout(timer);
  // }, [user, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="bg-white text-gray-800">
        <Nav />
        <div className="bg-[url('locofy.png')] bg-no-repeat text-gray-500">
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomepageLayout;
