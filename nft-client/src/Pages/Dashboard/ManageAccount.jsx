import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import dashboard from "../../assets/nft-image/dash-image.png";
import pen from "../../assets/nft-image/edit.png";
import phone from "../../assets/nft-image/phone.png";
import location from "../../assets/nft-image/location.png";
import { Link } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa6";
import CollectionOne from "../../icons/NFTIcon/DashboardIcons/CollectionOne";
import OrderOne from "../../icons/NFTIcon/DashboardIcons/OrderOne";
import ProductOne from "../../icons/NFTIcon/DashboardIcons/ProductOne";
import { useContext, useState } from "react";
import { useGetSingleUserQuery } from "../../features/auth/authApi";
import { AuthContext } from "../../Context/UserContext";
import AddOrUpdateAddress from "./AddOrUpdateAddress";
import { useSelector } from "react-redux";
import { useGetAllOrderByMemberQuery, useGetAllOrderQuery } from "../../features/order/orderApi";

const ManageAccount = () => {
  const { userId } = useContext(AuthContext);
  const [isOpenEditAddress, setIsOpenEditAddress] = useState(false);
  const { data: getSingleUser } = useGetSingleUserQuery(userId);
    const { data: getAllOrder, isLoading } = useGetAllOrderQuery();
    const { data: getAllOrderByMember } = useGetAllOrderByMemberQuery(userId);
    const allOrder = getAllOrder?.data;
    const allMyOrder = getAllOrderByMember?.data;
  const userInfo = getSingleUser?.data;

  console.log(allMyOrder);

  const totalAddress = userInfo?.addresses;
  const { user } = useSelector((state) => state.auth);
  const orders = [
    {
      id: 1,
      product: "Black Hoodie",
      status: "Completed",
      bgColor: "bg-[#e5ffe8]",
    },
    {
      id: 2,
      product: "Black Hoodie",
      status: "Shipping",
      bgColor: "bg-[#f6f3f9]",
    },
    {
      id: 3,
      product: "Black Hoodie",
      status: "Refund",
      bgColor: "bg-[#fff4de]",
    },
    {
      id: 4,
      product: "Black Hoodie",
      status: "Pending",
      bgColor: "bg-[#ffe2e5]",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "declined":
        return "text-red-600";
        case "shipping":
          return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };
  const actions = [
    {
      name: "All Orders",
      icon: <OrderOne />,
      to: "/manageAccount/orders",
      color: "#ff947a",
      iconColor: "text-orange-600",
      bgColor: "#fff4de",
    },
    {
      name: "All Products",
      icon: <ProductOne />,
      to: "/manageAccount/all-products",
      color: "#3cd856",
      iconColor: "text-emerald-600",
      bgColor: "#dcfce7",
    },
    {
      name: "All Collections",
      icon: <CollectionOne />,
      to: "/manageAccount/all-collections",
      color: "#fa5a7d",
      iconColor: "text-pink-600",
      bgColor: "#ffe2e5",
    },
    {
      name: "Add New Product",
      icon: <FaPlus className="text-2xl font-bold text-white" />,
      to: "/manageAccount/add-new-product",
      color: "#bf83ff",
      iconColor: "text-violet-600",
      bgColor: "#f3e8ff",
    },
  ];
  console.log("user", user);
  return (
    <>
          { user?.email !== "nftclosetx@gmail.com" ?
      <div className="pl-1 xl:pl-10 3xl:pl-5 py-9  grid grid-cols-1 lg:grid-cols-2 space-x-0 lg:space-x-7 space-y-6 lg:space-y-0">
        {/* left side */}
        <div className="w-full ">
          {/* Header Section */}
          <div className="bg-white rounded-lg px-4 py-4 md:py-0 mb-0 shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)]">
            <div className="flex items-center justify-between py-5">
              <div>
                <h1 className="text-2xl xl:text-3xl font-bold">
                  Hello {userInfo?.name?.firstName}!
                </h1>
                <p className="text-[16px] xl:text-[18px] text-gray-500 pt-2">
                  Here's An Overview Of Your Recent Activities.
                </p>
              </div>
              <div className="">
                <img
                  src="https://plus.unsplash.com/premium_photo-1671077420134-4cce62252a2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8M2QlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D"
                  alt="Activity Overview"
                  className="w-40 md:w-52"
                />
              </div>
            </div>
          </div>
          {/* Latest Orders */}
          <div className="hidden lg:block mt-8 bg-white rounded-lg p-6 shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg xl:text-xl font-bold">Latest Orders</h3>
              <button className=" xl:text-lg font-bold text-gray-700 text-sm">
                View All
              </button>
            </div>
            <div className="min-h-[200px] grid gap-4 xl:gap-6 3xl:gap-4">
              {allMyOrder?.map((order) => (
                <div
                  key={order.id}
                  className={`${order.bgColor} rounded-lg p-3 xl:p-4 flex items-center justify-between`}
                >
                  <div className="flex  items-center space-x-2">
                    <div className="w-12 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                      <img
                        src={order?.productID.displayImage || "https://images.unsplash.com/photo-1627389955646-6596047473d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8M2QlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D" }
                        alt={order?.productID?.productName}
                        className="w-8 h-10 object-cover"
                      />
                    </div>
                    <span className="text-[15px] xl:text-[18px] font-medium capitalize">
                    {order?.productID?.productName}
                    </span>
                  </div>

                  <span
                    className={`${getStatusColor(
                      order.status
                    )} text-[15px] xl:text-[18px] font-medium capitalize`}
                  >
                    {order.status}
                  </span>
                  <div className="flex items-center space-x-4">
                    <button className="text-gray-400 xl:text-[18px]">
                      •••
                    </button>
                  </div>
                </div>
              ))}
{
  allMyOrder?.length === 0 &&
  <p  className="text-lg xl:text-xl font-semibold text-gray-600">No Order available to show.</p>
}
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="w-full   ">
          {/* Manage Account Section */}
          <div className="bg-white rounded-lg p-6 shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)]">
            <div className="flex  justify-between items-center mb-6">
              <h2 className="text-xl  xl:text-3xl  font-bold">
                Manage My Account
              </h2>
              <Link to="/manageAccount/update-profile">
                <img src={pen} alt="edit" className="w-5 h-5" />
              </Link>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col md:flex-row gap-6 md:border-b border-gray-200 py-4">
              <div className="md:w-1/3">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
                  <img
                    src={
                      userInfo?.profilePic ||
                      "https://plus.unsplash.com/premium_photo-1671077420134-4cce62252a2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8M2QlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D"
                    }
                    alt="Profile"
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-lg  xl:text-xl  text-center md:text-left">
                      {userInfo?.name?.firstName} {userInfo?.name?.lastName}
                    </h3>
                    <p className="text-gray-500 text-base  xl:text-lg  text-center md:text-left">
                      {userInfo?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact Info */}
            <div className="hidden md:grid md:grid-cols-2 gap-4 w-full py-6 ">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <img src={phone} alt="phone" className="w-7 h-7" />
                  <p className="text-gray-700 text-[15px] xl:text-[20px] font-bold">
                    Phone Number
                  </p>
                </div>

                <p className="text-[14px] text-gray-600 xl:text-[19px]">
                  {userInfo?.phoneNumber
                    ? userInfo?.phoneNumber
                    : "No Number Added"}
                </p>
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <img src={location} alt="phone" className="w-7 h-7" />
                  <p className="text-gray-700 text-[15px] xl:text-[20px] font-bold">
                    Location
                  </p>
                </div>

                <p className="text-[14px] xl:text-[19px] text-gray-600">
                  {userInfo?.addresses[0]?.country
                    ? userInfo?.addresses[0]?.country
                    : "No Location Added"}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-start w-full py-6 border rounded-lg px-3 md:hidden">
              <div className="flex flex-col justify-center items-center space-y-1">
                <img src={phone} alt="phone" className="w-7 h-7" />
                <p className="text-gray-700 text-[15px] font-bold">
                  Phone Number
                </p>

                <p className="text-[14px] ">
                  {" "}
                  {userInfo?.phoneNumber
                    ? userInfo?.phoneNumber
                    : "No Number Added"}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center space-y-1">
                <img src={location} alt="phone" className="w-6 h-7" />
                <p className="text-gray-700 text-[15px] font-bold">Location</p>

                <p className="text-[14px] ">
                  {" "}
                  {userInfo?.addresses[0]?.country
                    ? userInfo?.addresses[0]?.country
                    : "No Location Added"}
                </p>
              </div>
            </div>

            {/* Address Book Section */}
            <div className="flex items-center space-x-2 py-4">
              <h3 className="text-[12px] xl:text-[18px] font-bold text-gray-700">
                Address Book
              </h3>
              <button
                onClick={() => setIsOpenEditAddress(true)}
                className="text-green-500 text-sm border-l pl-1"
              >
                EDIT
              </button>
            </div>

            {/* Address Book List */}
            <div className="">
              <div className="grid md:grid-cols-2 gap-4 pt-2">
                {totalAddress?.map((address, i) => (
                  <div
                    key={i}
                    className={`${i === 1 ? "border-r" : ""} rounded-lg py-2`}
                  >
                   
                    <h4 className="font-bold text-gray-700 mb-2  xl:text-[24px]">
                      Address {i + 1} <span> {address?.isDefault && (
                          <span className="ml-2 text-xs bg-teal-100 text-teal-600 px-2 py-1 rounded">
                            DEFAULT
                          </span>
                        )}</span>
                    </h4>
                    <p className="text-gray-600 text-[14px] xl:text-[17px]">
                      Street: {address.street}
                      <br />
                      City: {address.city}
                      <br />
                      State/province/area: {address.homeAddress}
                      <br />
                      Country: {address.country}
                    </p>
                  </div>
                ))}
              </div>
              {totalAddress?.length === 0 && (
                <h4 className="font-bold text-gray-700 xl:text-xl ">
                  No Address Available to show
                </h4>
              )}
            </div>

            <div className="lg:hidden mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Latest Orders mbl</h3>
                <button className="font-bold text-gray-700 text-sm">
                  View All
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {allMyOrder?.map((action) => (
                  <div
                    className={`${action.bgColor} rounded-lg md:h-[180px] lg:h-[200px] 3xl:h-[250px]  border p-6 flex flex-col justify-center items-center`}
                    key={action.name}
                  >
                    <div className={` flex items-center justify-center mb-4`}>
                      <img
                        src={action?.productID.displayImage || "https://images.unsplash.com/photo-1627389955646-6596047473d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8M2QlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D"}
                        className="w-14 h-16"
                        alt=""
                      />
                    </div>
                    <h3 className="text-sm md:text-lg xl:text-xl font-bold text-center capitalize">
                      {action?.productID?.productName}
                    </h3>
                    <h3
                      className={` ${getStatusColor(
                        action.status
                      )} text-sm md:text-lg xl:text-xl font-bold text-center capitalize`}
                    >
                      {action.status}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {isOpenEditAddress && (
          <AddOrUpdateAddress setIsOpenEditAddress={setIsOpenEditAddress} />
        )}
      </div>

      :
      <div className="pl-1 xl:pl-10 3xl:pl-5 py-9  grid grid-cols-1 lg:grid-cols-2 space-x-0 lg:space-x-7 space-y-6 lg:space-y-0">
        {/* left side */}
        <div className="w-full  ">
          {/* Header Section */}
          <div className="bg-white rounded-lg px-4 py-4 md:py-0 mb-0 shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl xl:text-3xl font-bold">
                  Hello {userInfo?.name?.firstName} {userInfo?.name?.lastName} !
                </h1>
                <p className="text-[16px] xl:text-[18px] text-gray-500 pt-2">
                  Here's An Overview Of Your Recent Activities.
                </p>
              </div>
              <div className="">
                <img
                  src={dashboard}
                  alt="Activity Overview"
                  className="w-40 md:w-52"
                />
              </div>
            </div>
          </div>
          {/* Latest Orders */}
          <div className="hidden lg:block mt-8 bg-white rounded-lg p-6 shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg xl:text-xl font-bold">Latest Orders</h3>
              <Link to="/manageAccount/orders" className=" xl:text-lg font-bold text-gray-700 text-sm">
                View All
              </Link>
            </div>
            <div className="grid gap-4 xl:gap-6 3xl:gap-4">
              {allOrder?.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  className={`${order.bgColor} rounded-lg p-3 xl:p-4 flex items-center justify-between`}
                >
                  <div className="flex  items-center space-x-2 w-4/12">
                    <div className="w-10 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <img
                        src={ order?.productID?.displayImage || "https://images.unsplash.com/photo-1627389955646-6596047473d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8M2QlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D"}
                        alt={order?.productID?.productName}
                        className="w-8 h-10 object-cover"
                      />
                    </div>
                    <span className="text-[15px] xl:text-[18px] font-medium capitalize">
                    {order?.productID?.productName}
                    </span>
                  </div>

                  <span
                    className={`${getStatusColor(
                      order.status
                    )} text-[15px] xl:text-[18px] font-medium capitalize`}
                  >
                    {order.status}
                  </span>
                  <div className="flex items-center space-x-4">
                    <button className="text-gray-400 xl:text-[18px]">
                      •••
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="w-full  bg-white px-5 py-5 lg:py-0 shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)]">
          <h1 className=" text-2xl xl:text-3xl font-bold py-6">
            Quick Actions
          </h1>
          {/* Manage Account Section */}
          <div className="grid grid-cols-2 gap-4">
            {actions.map((action) => (
              <Link 
              to={action.to}
                style={{ backgroundColor: action.bgColor }}
                className={`md:h-[180px] lg:h-[200px] 3xl:h-[250px]  border p-6 flex flex-col justify-center items-center`}
                key={action.name}
              >
                <div
                  style={{ backgroundColor: action.color }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4`}
                >
                  {action.icon}
                </div>
                <h3 className="text-sm md:text-lg xl:text-xl font-bold text-center ">
                  {action.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      
        {/* </div> */}
      </div>
      }
    </>
  );
};

export default ManageAccount;
