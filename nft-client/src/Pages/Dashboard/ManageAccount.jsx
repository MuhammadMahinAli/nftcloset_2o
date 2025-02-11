import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import dashboard from "../../assets/nft-image/dash-image.png";
import pen from "../../assets/nft-image/edit.png";
import phone from "../../assets/nft-image/phone.png";
import location from "../../assets/nft-image/location.png";

const ManageAccount = () => {
  const userInfo = {
    name: "Connie Robertson",
    email: "victoriasimmmons@2020.com",
    phone: "04978602356",
    location: "United States",
    address: {
      name: "Mehajabin Tonni",
      street: "Block A 111 Jln Meru New City Centre",
      city: "Klang",
      state: "Selangor",
      country: "Malaysia",
    },
  };

  const orders = [
    {
      id: 1,
      product: "Black Hoodie",
      status: "Completed",
      bgColor: "bg-green-100",
    },
    {
      id: 2,
      product: "Black Hoodie",
      status: "Shipping",
      bgColor: "bg-purple-100",
    },
    {
      id: 3,
      product: "Black Hoodie",
      status: "Refund",
      bgColor: "bg-yellow-100",
    },
    {
      id: 4,
      product: "Black Hoodie",
      status: "Pending",
      bgColor: "bg-red-100",
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
    <div className="px-10 py-9 bg-[url('./dashboard.png')] bg-cover bg-center bg-no-repeat min-h-screen flex flex-col lg:flex-row items-start justify-between space-y-6 lg:space-y-0">
      {/* left side */}
      <div className="w-full lg:w-6/12 3xl:w-5/12 pr-4">
        {/* Header Section */}
        <div className="bg-white rounded-lg px-4 mb-0 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Hello Mahin!</h1>
              <p className="text-[16px] text-gray-500">
                Here's An Overview Of Your Recent Activities.
              </p>
            </div>
            <div className="hidden md:block">
              <img src={dashboard} alt="Activity Overview" className="w-52" />
            </div>
          </div>
        </div>
        {/* Latest Orders */}
        <div className="hidden lg:block mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Latest Orders</h3>
            <button className="font-bold text-gray-700 text-sm">
              View All
            </button>
          </div>
          <div className="grid gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className={`${order.bgColor} rounded-lg p-3 flex items-center justify-between`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1627389955646-6596047473d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8M2QlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D"
                      alt={order.product}
                      className="w-8 h-10 object-cover"
                    />
                  </div>
                  <span className="text-[15px] font-medium">
                    {order.product}
                  </span>
                </div>

                <span
                  className={`${getStatusColor(
                    order.status
                  )} text-[15px] font-medium`}
                >
                  {order.status}
                </span>
                <div className="flex items-center space-x-4">
                  <button className="text-gray-400">•••</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="w-full lg:w-6/12 3xl:w-7/12 pr-4">
        {/* Manage Account Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Manage My Account</h2>
            <img src={pen} alt="edit" className="w-5 h-5" />
          </div>

          {/* Profile Info */}
          <div className="flex flex-col md:flex-row gap-6 border-b border-gray-200 py-4">
            <div className="md:w-1/3">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={
                    userInfo.avatar ||
                    "https://plus.unsplash.com/premium_photo-1671077420134-4cce62252a2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8M2QlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D"
                  }
                  alt="Profile"
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-lg">{userInfo.name}</h3>
                  <p className="text-gray-500">{userInfo.email}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Contact Info */}
          <div className="flex justify-between items-start w-full py-6">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <img src={phone} alt="phone" className="w-5 h-5" />
                <p className="text-gray-700 text-[15px] font-bold">
                  Phone Number
                </p>
              </div>

              <p className="text-[14px] ">{userInfo.phone}</p>
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <img src={location} alt="phone" className="w-5 h-5" />
                <p className="text-gray-700 text-[15px] font-bold">Location</p>
              </div>

              <p className="text-[14px] ">{userInfo.location}</p>
            </div>

            {/* <div className="flex items-center space-x-3">
                 <img src={location} alt="location" className="w-5 h-5" />
                 <p className="text-sm font-semibold">Location</p>
                  <div>
               
                 
                    <p className="text-gray-500">{userInfo.location}</p>
                  </div>
                </div> */}
          </div>

          {/* Address Book Section */}
          <div className="flex items-center space-x-2 py-4">
            <h3 className="font-bold text-gray-700">Address Book</h3>
            <button className="text-green-500 text-sm border-l pl-1">
              EDIT
            </button>
          </div>

          {/* Address Book List */}
          <div className="">
            <div className="grid md:grid-cols-2 gap-4 pt-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className={`${i === 1 ? "border-r" : ""} rounded-lg py-2`}
                >
                  <p className="text-gray-500 text-[12px] mb-2">
                    DEFAULT SHIPPING ADDRESS
                  </p>
                  <h4 className="font-bold text-gray-700 mb-2">
                    {userInfo.address.name}
                  </h4>
                  <p className="text-gray-600 text-[14px]">
                    Street: {userInfo.address.street}
                    <br />
                    City: {userInfo.address.city}
                    <br />
                    State/province/area: {userInfo.address.state}
                    <br />
                    Country: {userInfo.address.country}
                  </p>
                </div>
              ))}
            </div>
          </div>

           <div className="lg:hidden mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Latest Orders</h3>
            <button className="font-bold text-gray-700 text-sm">
              View All
            </button>
          </div>
          <div className="grid gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className={`${order.bgColor} rounded-lg p-3 flex items-center justify-between`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1627389955646-6596047473d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8M2QlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D"
                      alt={order.product}
                      className="w-8 h-10 object-cover"
                    />
                  </div>
                  <span className="text-[15px] font-medium">
                    {order.product}
                  </span>
                </div>

                <span
                  className={`${getStatusColor(
                    order.status
                  )} text-[15px] font-medium`}
                >
                  {order.status}
                </span>
                <div className="flex items-center space-x-4">
                  <button className="text-gray-400">•••</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default ManageAccount;
