import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuthCheck } from "../../utils/authCheck";
import { useUniqueRouteAccess } from "../../utils/useUniqueRouteAccess";
import { pathGenerate } from "../../utils/pathGenerate";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
// import {NFTMarketplaceContext} from "../../../../Context/NFTMarketplaceContext";
// import {truncate} from "../../utils/truncate";
const HamburgerDropdown = ({ setIsHamburgerDropdownVisible }) => {
  const uniqueRouteAccess = useUniqueRouteAccess();
  const { role, logout: originalLogout } = useAuthCheck();

  //set user email & role
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;

  const [toPath, setToPath] = useState("/");

  // //setting path
  useEffect(() => {
    const path = pathGenerate(role, uniqueRouteAccess);
    setToPath(path);
  }, [role]);

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
  const handleLinkClick = () => {
    setIsHamburgerDropdownVisible(false);
  };
  return (
    <>
      {/* list for mbl */}

      {/* list for dekstop */}
      <div
        data-aos="fade-top"
        data-aos-duration="100"
        className=" overflow-y-scroll absolute end-0 z-10 top-10 md:top-20 left-0 md:-left-3   lg:hidden px-2 py-5 divide-y divide-gray-100 rounded-md border border-gray-100 bg-[#fff] shadow-xl"
        role="menu"
      >
        <div
          className="float-right"
          onClick={() => setIsHamburgerDropdownVisible(false)}
        >
          <AiOutlineCloseCircle className="text-2xl 3xl:text-3xl" />
        </div>
        <div className="flex flex-col-reverse lg:flex-row-reverse 3xl:flex-row justify-between items-start ">
          {/* right */}

          {/* left */}
          <div className="w-full lg:w-4/12 3xl:hidden">
            <a href="/">
              <h1 className="rounded-md text-xl font-bold p-2  m-2 cursor-pointer">
                {" "}
                Home
              </h1>
            </a>
            <Link to="/market">
              <h1 onClick={handleLinkClick} className="rounded-md text-xl font-bold p-2 m-2 cursor-pointer">
                Market
              </h1>
            </Link>
            <Link to="/collections">
              <h1 onClick={handleLinkClick} className="rounded-md text-xl font-bold p-2 m-2 cursor-pointer">
                Collections
              </h1>
            </Link>
            <Link to={userId ? "/manageAccount" : "/login"}>
              <h1 onClick={handleLinkClick} className="rounded-md text-xl font-bold p-2 m-2 cursor-pointer">
                {userId ? "Dashboard" : "Login"}
              </h1>
            </Link>
            <Link to={userId ? "/manageAccount/orders" : "/login"}>
              <h1 onClick={handleLinkClick} className="rounded-md text-xl font-bold p-2 m-2 cursor-pointer">
                Orders
              </h1>
            </Link>
            <Link to={userId ? "/manageAccount/settings" : "/login"}>
              <h1 onClick={handleLinkClick} className="rounded-md text-xl font-bold p-2 m-2 cursor-pointer">
                Settings
              </h1>
            </Link>
            {userId && (
              <h1
                onClick={logout}
                className=" rounded-md text-xl font-bold p-2 m-2 cursor-pointer"
              >
                Logout
              </h1>
            )}
          </div>
          {/* {location.pathname === "/manageAccount" && (
        <Link to="/manageAccount/orders">
          <div className="rounded-md text-xl font-bold p-2 m-2 cursor-pointer">
            Orders
          </div>
        </Link>
      )} */}
        </div>
      </div>
    </>
  );
};

export default HamburgerDropdown;
