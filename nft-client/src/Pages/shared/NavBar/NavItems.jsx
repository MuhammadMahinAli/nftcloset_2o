import cartIcon from "../../../assets/navbar/icons8fastcart60@2x.png";
import searchIcon from "../../../assets/navbar/-icon-search.svg";
import walletIcon from "../../../assets/navbar/icons8wallet60@2x.png";
import userIcon from "../../../assets/navbar/icons8maleuser60@2x.png";
import {RxHamburgerMenu} from "react-icons/rx";
import {useState} from "react";
import {Link} from "react-router-dom";

const NavItems = () => {
  //  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  return (
    <>
      <div className="flex justify-between items-center bg-white h-[100px] w-full px-10">
        {/* left side */}
        <div className="flex items-center space-x-3">
          {/* hamburger menu */}
          <button className="flex items-center justify-center cursor-pointer [border:none] p-0 bg-gray rounded-r-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) w-14 h-[47px]">
            <RxHamburgerMenu className="text-2xl" />
          </button>

          {/* search inputfield */}
          <div className="relative">
            <input className="[border:none] bg-gray rounded-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px)] backdrop-filter:blur(20px); pl-9 w-[310px] h-[47px]" placeholder="Search items, collection and accounts" type="text" />
            <img className="absolute top-4 left-2 w-[20.3px] h-[20.3px]" alt="" src={searchIcon} />
          </div>
        </div>

        {/* right side */}
        <div className="flex items-center space-x-2">
          {/* nav links */}
          <ul className="flex items-center space-x-4 [border:none] px-3 bg-gray rounded-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
            <li className="cursor-pointer text-lg hover:bg-gray-50 p-1 rounded-lg font-semibold">Home</li>
            <li className="cursor-pointer text-lg hover:bg-gray-50 p-1 rounded-lg font-semibold">Market</li>
            <li className="cursor-pointer text-lg hover:bg-gray-50 p-1 rounded-lg font-semibold">Collections</li>
            <li className="cursor-pointer text-lg hover:bg-gray-50 p-1 rounded-lg font-semibold">Recycles</li>
            <li className="cursor-pointer text-lg hover:bg-gray-50 p-1 rounded-lg font-semibold">Supply Chain</li>
            <li className="cursor-pointer text-lg hover:bg-gray-50 p-1 rounded-lg font-semibold">Market-X</li>
          </ul>

          {/* become seller button */}
          <div className="flex items-center  [border:none] px-2 bg-gray rounded-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
            <Link to="/seller/signin">
              <h1 className="capitalize text-lg font-semibold">become a seller</h1>
            </Link>
          </div>

          {/* connect wallet */}
          <div className="flex items-center  [border:none] px-2 bg-gray rounded-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
            <img className=" h-7 object-cover" alt="" src={walletIcon} />
            <h1 className="capitalize text-lg font-semibold px-1">connect wallet</h1>

            {/*User profile  */}
            <img className=" h-7 object-cover pl-3 border-l" alt="" src={userIcon} onClick={toggleDropdown} />
            {isDropdownVisible && (
              <div className="absolute end-0 z-10 4xl:mt-48 w-36 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg" role="menu">
                <Link to="/user/signup">
                  <h1 className="rounded-md text-lg font-semibold p-2 hover:bg-gray-100 m-2 cursor-pointer"> Sign up</h1>
                </Link>
                <Link to="/user/signin">
                  <h1 className="rounded-md text-lg font-semibold p-2 hover:bg-gray-100 m-2 cursor-pointer"> Sign in </h1>
                </Link>
              </div>
            )}
          </div>

          {/* cart button */}
          <div className="flex items-center  [border:none] px-2 bg-gray rounded-xl shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
            <img className="rounded-3xs h-7 m-2" alt="" src={cartIcon} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavItems;
