import { useState } from "react";
import Cube from "../../icons/NFTIcon/Cube";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import RequestDetailsModal from "./RequestDetailsModal";
import DashboardAllOrder from "./orders/DashboardAllOrder";
import DashboardPendingOrder from "./orders/DashboardPendingOrder";
import DashboardApprovedOrder from "./orders/DashboardApprovedOrder";
import DashboardDeclinedOrder from "./orders/DashboardDeclinedOrder";
import DashboardNotClaimedOrder from "./orders/DashboardNotClaimedOrder";
import DashboardRecievedOrder from "./orders/DashboardRecievedOrder";
import { useSelector } from "react-redux";

const AllOrders = () => {
  // States for tabs
  const [isAll, setIsAll] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [isReceived, setIsReceived] = useState(false);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const userEmail = user?.email;

  const handleOpenModal = (order) => {
    setIsOpenModal(true);
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setSelectedOrder(null);
  };

  // Function to handle tab clicks
  const handleTabClick = (tab) => {
    // Reset all tabs to false
    setIsAll(false);
    setIsPending(false);
    setIsApproved(false);
    setIsDeclined(false);
    setIsClaimed(false);
    setIsReceived(false);

    // Set the clicked tab to true
    switch (tab) {
      case "all":
        setIsAll(true);
        break;
      case "pending":
        setIsPending(true);
        break;
      case "approved":
        setIsApproved(true);
        break;
      case "declined":
        setIsDeclined(true);
        break;
      case "claimed":
        setIsClaimed(true);
        break;
      case "received":
        setIsReceived(true);
        break;
      default:
        setIsAll(true);
    }
  };

  function formatIsoDateToHumanReadable(isoDateString) {
    const date = new Date(isoDateString);

    if (isNaN(date.getTime())) {
      return "";
    }

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  }

  return (
    <div className="p-3 xs:p-4 md:p-7">
      <div className="flex justify-between items-center">
        <div className="py-3 md:py-6 flex  items-center space-x-3">
          <Cube />
          <h1 className="text-3xl font-bold">Orders</h1>
        </div>
        <div className="relative md:hidden">
          {/* Dropdown button */}
          <button
            onClick={() => setIsOpenDropDown(!isOpenDropDown)}
            className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md flex items-center border border-gray-600"
          >
            Status
            <IoIosArrowDropdownCircle
                      className={`text-xl ml-1 text-gray-400 transition-transform ${
                        isOpenDropDown ? "-rotate-180" : "-rotate-0"
                      }`}/>
          </button>

          {/* Dropdown menu */}
          {isOpenDropDown && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <ul className="py-1">
                <li
                  onClick={() => handleTabClick("all")}
                  className="cursor-pointer block text-right font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  All
                </li>
                <li
                  onClick={() => handleTabClick("pending")}
                  className="cursor-pointer block text-right font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Pending
                </li>
                <li
                  onClick={() => handleTabClick("approved")}
                  className="cursor-pointer block text-right font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Approved
                </li>
                <li
                  onClick={() => handleTabClick("declined")}
                  className="cursor-pointer block text-right font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Declined
                </li>
                <li
                  onClick={() => handleTabClick("claimed")}
                  className="cursor-pointer block text-right font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Claimed
                </li>
                <li
                  onClick={() => handleTabClick("received")}
                  className="cursor-pointer block text-right font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Received
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <ul className="hidden md:grid grid-cols-6 gap-5">
        <li
          onClick={() => handleTabClick("all")}
          className={`text-center pb-2 border-b text-sm xl:text-xl font-bold cursor-pointer 
                    ${
                      isAll
                        ? "text-gray-800 border-gray-700"
                        : "text-[#A1A4AE] border-[#A1A4AE]"
                    }`}
        >
          All
        </li>
        <li
          onClick={() => handleTabClick("pending")}
          className={`text-center pb-2 border-b text-sm xl:text-xl font-bold cursor-pointer 
                    ${
                      isPending
                        ? "text-gray-800 border-gray-700"
                        : "text-[#A1A4AE]  border-[#A1A4AE]"
                    }`}
        >
          Pending
        </li>
        <li
          onClick={() => handleTabClick("approved")}
          className={`text-center pb-2 border-b text-sm xl:text-xl font-bold cursor-pointer 
                    ${
                      isApproved
                        ? "text-gray-800 border-gray-700"
                        : "text-[#A1A4AE]  border-[#A1A4AE]"
                    }`}
        >
          Approved
        </li>
        <li
          onClick={() => handleTabClick("declined")}
          className={`text-center pb-2 border-b text-sm xl:text-xl font-bold cursor-pointer 
                    ${
                      isDeclined
                        ? "text-gray-800 border-gray-700"
                        : "text-[#A1A4AE]  border-[#A1A4AE]"
                    }`}
        >
          Declined
        </li>
        <li
          onClick={() => handleTabClick("claimed")}
          className={`text-center pb-2 border-b text-sm xl:text-xl font-bold cursor-pointer 
                    ${
                      isClaimed
                        ? "text-gray-800 border-gray-700"
                        : "text-[#A1A4AE]  border-[#A1A4AE]"
                    }`}
        >
          Claimed
        </li>
        <li
          onClick={() => handleTabClick("received")}
          className={`text-center pb-2 border-b text-sm xl:text-xl font-bold cursor-pointer 
                    ${
                      isReceived
                        ? "text-gray-800 border-gray-700"
                        : "text-[#A1A4AE]  border-[#A1A4AE]"
                    }`}
        >
          Received
        </li>
      </ul>
      {/* <h1 className="text-3xl font-bold pt-8">User Control</h1>
      <div className="p-4 xs:p-6 rounded-2xl bg-[#f4f4f4] transition-colors duration-200 mt-6 md:mt-10">
        <div className="flex justify-between items-center  py-5">
          left
          <div className="flex items-center gap-2 xl:gap-6">
            <div className="px-3 py-1 bg-primary/10 text-primary text-sm dark:bg-primary/20">
              <Cube />
            </div>
            <div>
              <p className="text-lg xl:text-xl font-semibold  text-gray-900">
                Approved
              </p>
              <p className="text-sm xl:text-base  text-gray-700">
                on tue, 12 nov
              </p>
            </div>
          </div>

          right
          <div className="flex justify-between items-center space-x-5">
            <button className=" hidden md:block px-3 py-2 rounded-md text-sm xl:text-lg  text-white bg-[#2CBA7A] hover:text-primary/80">
              Confirm Reciept
            </button>

            <p className="text-sm xl:text-xl  text-gray-700">Track</p>
          </div>
        </div>

        <div className=" bg-white border rounded-2xl shadow-lg p-5">
          <div className="flex flex-col md:flex-row justify-between items-center pb-7 space-y-5">
            <div className="rounded-lg overflow-hidden flex flex-col md:flex-row  justify-between items-center space-y-2 md:space-x-3">
              <div className="w-44 h-48 md:w-24 md:h-28 xl:w-44 xl:h-48 bg-gray-200 flex justify-center items-center rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1627389955646-6596047473d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8M2QlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D"
                  alt="productName"
                  className="w-36 h-40 md:w-20 md:h-24 xl:w-36 xl:h-40 object-cover rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg xl:text-2xl font-semibold text-foreground">
                  Product Name
                </h3>
                <p className="text-sm xl:text-lg text-gray-500 -foreground mt-1">
                  Lorem ipsum dolor icing elit. Quod, at!
                </p>
                <p className="text-sm xl:text-lg text-gray-500 -foreground mt-1">
                  Size: L,S
                </p>
              </div>
            </div>

            <div className="w-full md:w-4/12 xl:w-5/12 flex flex-col gap-3">
              <button className="py-2 xl:py-4 rounded-md text-[11px] xs:text-sm xl:text-xl font-medium bg-black text-white text-primary-foreground hover:bg-primary/90">
                Claim Your Digital Assets
              </button>
              <button className="py-2 xl:py-4 rounded-md text-[11px] xs:text-sm xl:text-xl font-medium text-black border border-black text-primary-foreground hover:bg-primary/90">
                Claim Your Digital Assets
              </button>
            </div>
          </div>
          <hr />
          <p className="text-sm xl:text-lg pt-5 text-gray-500 text-muted-foreground">
            The return/exchange window for this item is closed.
          </p>
        </div>
      </div> */}
      {/* <h1 className="text-3xl font-bold pt-8">Admin Control</h1>
      <div className="p-4 xs:p-6 rounded-2xl bg-[#f4f4f4] transition-colors duration-200 mt-6 md:mt-10">
        <div className="flex justify-between items-center  py-5">
          left 
          <div className="flex items-center gap-2 xl:gap-6">
            <div className="px-3 py-1 bg-primary/10 text-primary text-sm dark:bg-primary/20">
              <Cube />
            </div>
            <div>
              <p className="text-lg xl:text-xl font-semibold  text-gray-900">
                Approved
              </p>
              <p className="text-sm xl:text-base  text-gray-700">
                on tue, 12 nov
              </p>
            </div>
          </div>

    right 
          <div className="flex justify-between items-center space-x-5">
           

            <p onClick={()=>setIsOpenModal(true)} className="text-sm xl:text-xl  text-gray-700">Details</p>
          </div>
        </div>

        <div className=" bg-white border rounded-2xl shadow-lg p-5">
          <div className="flex flex-col md:flex-row justify-between items-center pb-7 space-y-5">
            <div className="rounded-lg overflow-hidden flex flex-col md:flex-row  justify-between items-center space-y-2 md:space-x-3">
              <div className="w-44 h-48 md:w-24 md:h-28 xl:w-44 xl:h-48 bg-gray-200 flex justify-center items-center rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1627389955646-6596047473d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8M2QlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D"
                  alt="productName"
                  className="w-36 h-40 md:w-20 md:h-24 xl:w-36 xl:h-40 object-cover rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg xl:text-2xl font-semibold text-foreground">
                  Product Name
                </h3>
                <p className="text-sm xl:text-lg text-gray-500 -foreground mt-1">
                  Lorem ipsum dolor icing elit. Quod, at!
                </p>
                <p className="text-sm xl:text-lg text-gray-500 -foreground mt-1">
                  Size: L,S
                </p>
              </div>
            </div>

            <div className="w-full md:w-4/12 xl:w-5/12 flex flex-col gap-3">
              <button className="py-2 xl:py-4 rounded-md text-[11px] xs:text-sm xl:text-xl font-medium bg-black text-white text-primary-foreground hover:bg-primary/90">
                Claim Your Digital Assets
              </button>
              <button className="py-2 xl:py-4 rounded-md text-[11px] xs:text-sm xl:text-xl font-medium text-black border border-black text-primary-foreground hover:bg-primary/90">
                Claim Your Digital Assets
              </button>
            </div>
          </div>
          <hr />
          <p className="text-sm xl:text-lg pt-5 text-gray-500 text-muted-foreground">
            The return/exchange window for this item is closed.
          </p>
        </div>
      </div> */}
      <div className="min-h-screen">
        {/* Tab content sections    */}
        {isAll && (
          <div className="">
            <DashboardAllOrder
              userEmail={userEmail}
              selectedOrder={selectedOrder}
              isOpenModal={isOpenModal}
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
              formatIsoDateToHumanReadable={formatIsoDateToHumanReadable}
            />
          </div>
        )}
        {isPending && (
          <div className="mt-4">
            <DashboardPendingOrder
              userEmail={userEmail}
              selectedOrder={selectedOrder}
              isOpenModal={isOpenModal}
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
              formatIsoDateToHumanReadable={formatIsoDateToHumanReadable}
            />
          </div>
        )}
        {isApproved && (
          <div className="mt-4">
            <DashboardApprovedOrder
              userEmail={userEmail}
              selectedOrder={selectedOrder}
              isOpenModal={isOpenModal}
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
              formatIsoDateToHumanReadable={formatIsoDateToHumanReadable}
            />
          </div>
        )}
        {isDeclined && (
          <div className="mt-4">
            <DashboardDeclinedOrder
              userEmail={userEmail}
              selectedOrder={selectedOrder}
              isOpenModal={isOpenModal}
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
              formatIsoDateToHumanReadable={formatIsoDateToHumanReadable}
            />
          </div>
        )}
        {isClaimed && (
          <div className="mt-4">
            <DashboardNotClaimedOrder
              userEmail={userEmail}
              selectedOrder={selectedOrder}
              isOpenModal={isOpenModal}
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
              formatIsoDateToHumanReadable={formatIsoDateToHumanReadable}
            />
          </div>
        )}
        {isReceived && (
          <div className="mt-4">
            <DashboardRecievedOrder
              userEmail={userEmail}
              selectedOrder={selectedOrder}
              isOpenModal={isOpenModal}
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
              formatIsoDateToHumanReadable={formatIsoDateToHumanReadable}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
