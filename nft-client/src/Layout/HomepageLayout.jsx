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
import ScrollToTop from "./ScrollToTop";

const HomepageLayout = () => {
  //-------------------------------------------

  const [isLoading, setIsLoading] = useState(false);


  //console.log("userpost",getUserPost);


  useEffect(() => {
    setIsLoading(true);
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);


  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollToTop>
      <div className="bg-white text-gray-800 min-h-srceen">
        <Nav />
        <div className="bg-[url('locofy.png')] bg-no-repeat text-gray-500">
          <Outlet />
          <Footer />
        </div>
      </div>
    </ScrollToTop>
  );
};

export default HomepageLayout;
