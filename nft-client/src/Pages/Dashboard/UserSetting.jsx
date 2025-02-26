import phone from "../../assets/nft-image/phone.png";
import pen from "../../assets/nft-image/edit.png";
import location from "../../assets/nft-image/location.png";
import { Link } from "react-router-dom";
import { useGetSingleUserQuery } from "../../features/auth/authApi";
import { useContext } from "react";
import { AuthContext } from "../../Context/UserContext";

const UserSetting = () => {
  const { userId } = useContext(AuthContext);
  const { data: getSingleUser } = useGetSingleUserQuery(userId);
  const userInfo = getSingleUser?.data;

  const totalAddress = userInfo?.addresses;

  console.log("plm", userInfo, totalAddress);

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
      case "Completed":
        return "text-green-600";
      case "Shipping":
        return "text-purple-600";
      case "Refund":
        return "text-yellow-600";
      case "Pending":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };
  return (
    <>
      <div className="border shadow-lg bg-white rounded-lg p-6 my-10 mx-5">
        <div className="flex  justify-between items-center mb-6">
          <h2 className="text-xl  xl:text-3xl  font-bold">Manage My Account</h2>
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
                  {userInfo?.name.firstName}
                  {userInfo?.name.lastName}
                </h3>
                <p className="text-gray-500 text-base  xl:text-lg  text-center md:text-left">
                  {userInfo?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Info */}
        <div className="hidden md:grid md:grid-cols-2 gap-4 w-full py-6 px-3">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <img src={phone} alt="phone" className="w-7 h-7" />
              <p className="text-gray-700 text-[15px] xl:text-[20px] font-bold">
                Phone Number
              </p>
            </div>

            {userInfo?.phoneNumber ? (
              <p className="text-[14px] text-gray-600 xl:text-[19px]">
                {userInfo?.phoneNumber}
              </p>
            ) : (
              <p className="text-[14px] text-gray-600 xl:text-[19px]">
                No Number Added
              </p>
            )}
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
            <p className="text-gray-700 text-[15px] font-bold">Phone Number</p>

            {userInfo?.phoneNumber ? (
              <p className="text-[14px]">{userInfo?.phoneNumber}</p>
            ) : (
              <p className="text-[14px]">No Number Added</p>
            )}
          </div>
          <div className="flex flex-col justify-center items-center space-y-1">
            <img src={location} alt="phone" className="w-6 h-7" />
            <p className="text-gray-700 text-[15px] font-bold">Location</p>

            <p className="text-[14px] ">
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
          <button className="text-green-500 text-sm border-l pl-1">EDIT</button>
        </div>

        {/* Address Book List */}
        <div className="">
          <div className="grid md:grid-cols-2 gap-4 pt-2">
            {totalAddress?.map((address, index) => (
              <div
                key={index}
                className={`${index === 1 ? "border-r" : ""} rounded-lg py-2`}
              >
                {address?.isDefault === true && (
                  <p className="text-blue-500 text-[12px] xl:text-[16px] mb-2">
                    DEFAULT SHIPPING ADDRESS
                  </p>
                )}
                <h4 className="font-bold text-gray-700 mb-2  xl:text-[24px]">
                  {address.name}
                </h4>
                <p className="text-gray-600 text-[14px] xl:text-[17px] capitalize">
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

            {/* {userInfo?.addresses.length > 2 && (
              <div className="col-span-2 text-center mt-2">
                <button className="text-blue-600 hover:underline text-sm">
                  View all addresses ({userInfo?.addresses.length})
                </button>
              </div>
            )} */}

            {userInfo?.addresses.length === 0 && (
              <div className="col-span-2 text-center py-4 text-gray-500">
                No addresses found
              </div>
            )}
          </div>
        </div>

        <div className="lg:hidden mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Latest Orders</h3>
            <button className="font-bold text-gray-700 text-sm">
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {orders.map((action) => (
              <div
                className={`${action.bgColor} rounded-lg md:h-[180px] lg:h-[200px] 3xl:h-[250px]  border p-6 flex flex-col justify-center items-center`}
                key={action.name}
              >
                <div className={` flex items-center justify-center mb-4`}>
                  <img
                    src="https://images.unsplash.com/photo-1627389955646-6596047473d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8M2QlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D"
                    className="w-14 h-16"
                    alt=""
                  />
                </div>
                <h3 className="text-sm md:text-lg xl:text-xl font-bold text-center ">
                  {action.product}
                </h3>
                <h3
                  className={` ${getStatusColor(
                    action.status
                  )} text-sm md:text-lg xl:text-xl font-bold text-center `}
                >
                  {action.status}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSetting;
