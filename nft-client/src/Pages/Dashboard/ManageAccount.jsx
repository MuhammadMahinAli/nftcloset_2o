import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import dashboard from "../../assets/nft-image/dash-image.png";
import pen from "../../assets/nft-image/edit.png";
import phone from "../../assets/nft-image/phone.png";
import location from "../../assets/nft-image/location.png";
import { Link } from "react-router-dom";

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
  const actions = [
    {
      name: "All Orders",
      //icon: ShoppingBag,
      href: "/orders",
      color: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      name: "All Products",
      // icon: Package,
      href: "/products",
      color: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      name: "All Collections",
      // icon: FolderPlus,
      href: "/collections",
      color: "bg-pink-100",
      iconColor: "text-pink-600",
    },
    {
      name: "Add New Product",
      // icon: Plus,
      href: "/products/new",
      color: "bg-violet-100",
      iconColor: "text-violet-600",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <Link  key={action.name} to={action.href}>
            <div className="border p-6 cursor-pointer hover:shadow-md transition-shadow">
              <div
                className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}
              >
                {/* <action.icon className={`h-6 w-6 ${action.iconColor}`} /> */}
              </div>
              <h3 className="font-medium">{action.name}</h3>
            </div>
          </Link>
        ))}
      </div>

      <h1 className="text-2xl xl:text-3xl font-bold pl-6 py-6 text-center">
        Admin Dashboard!
      </h1>
      <div className="pl-1 xl:pl-10 3xl:pl-5 py-9  flex flex-col lg:flex-row items-start justify-between space-x-0 lg:space-x-7 space-y-6 lg:space-y-0">
        {/* left side */}
        <div className="w-full lg:w-6/12 3xl:w-6/12 ">
          {/* Header Section */}
          <div className="bg-white rounded-lg px-4 py-4 md:py-0 mb-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl xl:text-3xl font-bold">Hello Mahin!</h1>
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
          <div className="hidden lg:block mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg xl:text-xl font-bold">Latest Orders</h3>
              <button className=" xl:text-lg font-bold text-gray-700 text-sm">
                View All
              </button>
            </div>
            <div className="grid gap-4 xl:gap-6 3xl:gap-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className={`${order.bgColor} rounded-lg p-3 xl:p-4 flex items-center justify-between`}
                >
                  <div className="flex  items-center space-x-2">
                    <div className="w-10 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <img
                        src="https://images.unsplash.com/photo-1627389955646-6596047473d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8M2QlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D"
                        alt={order.product}
                        className="w-8 h-10 object-cover"
                      />
                    </div>
                    <span className="text-[15px] xl:text-[18px] font-medium">
                      {order.product}
                    </span>
                  </div>

                  <span
                    className={`${getStatusColor(
                      order.status
                    )} text-[15px] xl:text-[18px] font-medium`}
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
        <div className="w-full lg:w-6/12 3xl:w-6/12  shadow-2xl">
          {/* Manage Account Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex  justify-between items-center mb-6">
              <h2 className="text-xl  xl:text-3xl  font-bold">
                Manage My Account
              </h2>
              <img src={pen} alt="edit" className="w-5 h-5" />
            </div>

            {/* Profile Info */}
            <div className="flex flex-col md:flex-row gap-6 md:border-b border-gray-200 py-4">
              <div className="md:w-1/3">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
                  <img
                    src={
                      userInfo.avatar ||
                      "https://plus.unsplash.com/premium_photo-1671077420134-4cce62252a2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8M2QlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D"
                    }
                    alt="Profile"
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-lg  xl:text-xl  text-center md:text-left">
                      {userInfo.name}
                    </h3>
                    <p className="text-gray-500 text-base  xl:text-lg  text-center md:text-left">
                      {userInfo.email}
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
                  {userInfo.phone}
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
                  {userInfo.location}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-start w-full py-6 border rounded-lg px-3 md:hidden">
              <div className="flex flex-col justify-center items-center space-y-1">
                <img src={phone} alt="phone" className="w-7 h-7" />
                <p className="text-gray-700 text-[15px] font-bold">
                  Phone Number
                </p>

                <p className="text-[14px] ">{userInfo.phone}</p>
              </div>
              <div className="flex flex-col justify-center items-center space-y-1">
                <img src={location} alt="phone" className="w-6 h-7" />
                <p className="text-gray-700 text-[15px] font-bold">Location</p>

                <p className="text-[14px] ">{userInfo.location}</p>
              </div>
            </div>

            {/* Address Book Section */}
            <div className="flex items-center space-x-2 py-4">
              <h3 className="text-[12px] xl:text-[18px] font-bold text-gray-700">
                Address Book
              </h3>
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
                    <p className="text-gray-500 text-[12px] xl:text-[16px] mb-2">
                      DEFAULT SHIPPING ADDRESS
                    </p>
                    <h4 className="font-bold text-gray-700 mb-2  xl:text-[24px]">
                      {userInfo.address.name}
                    </h4>
                    <p className="text-gray-600 text-[14px] xl:text-[17px]">
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

      <h1 className="text-2xl xl:text-3xl font-bold pl-6 py-6 text-center">
        User Dashboard!
      </h1>
      <div className="border shadow-lg bg-white rounded-lg p-6">
        <div className="flex  justify-between items-center mb-6">
          <h2 className="text-xl  xl:text-3xl  font-bold">Manage My Account</h2>
          <img src={pen} alt="edit" className="w-5 h-5" />
        </div>

        {/* Profile Info */}
        <div className="flex flex-col md:flex-row gap-6 md:border-b border-gray-200 py-4">
          <div className="md:w-1/3">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
              <img
                src={
                  userInfo.avatar ||
                  "https://plus.unsplash.com/premium_photo-1671077420134-4cce62252a2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8M2QlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D"
                }
                alt="Profile"
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-lg  xl:text-xl  text-center md:text-left">
                  {userInfo.name}
                </h3>
                <p className="text-gray-500 text-base  xl:text-lg  text-center md:text-left">
                  {userInfo.email}
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

            <p className="text-[14px] text-gray-600 xl:text-[19px]">
              {userInfo.phone}
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
              {userInfo.location}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-start w-full py-6 border rounded-lg px-3 md:hidden">
          <div className="flex flex-col justify-center items-center space-y-1">
            <img src={phone} alt="phone" className="w-7 h-7" />
            <p className="text-gray-700 text-[15px] font-bold">Phone Number</p>

            <p className="text-[14px] ">{userInfo.phone}</p>
          </div>
          <div className="flex flex-col justify-center items-center space-y-1">
            <img src={location} alt="phone" className="w-6 h-7" />
            <p className="text-gray-700 text-[15px] font-bold">Location</p>

            <p className="text-[14px] ">{userInfo.location}</p>
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
            {[1, 2].map((i) => (
              <div
                key={i}
                className={`${i === 1 ? "border-r" : ""} rounded-lg py-2`}
              >
                <p className="text-gray-500 text-[12px] xl:text-[16px] mb-2">
                  DEFAULT SHIPPING ADDRESS
                </p>
                <h4 className="font-bold text-gray-700 mb-2  xl:text-[24px]">
                  {userInfo.address.name}
                </h4>
                <p className="text-gray-600 text-[14px] xl:text-[17px]">
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
    </>
  );
};

export default ManageAccount;
