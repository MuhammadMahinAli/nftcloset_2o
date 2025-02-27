import React from 'react';
import { FaPhone, FaMapMarkerAlt, FaPencilAlt } from 'react-icons/fa';

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
      country: "Malaysia"
    }
  };

  const orders = [
    { id: 1, product: "Black Hoodie", status: "Completed", bgColor: "bg-green-100" },
    { id: 2, product: "Black Hoodie", status: "Shipping", bgColor: "bg-purple-100" },
    { id: 3, product: "Black Hoodie", status: "Refund", bgColor: "bg-yellow-100" },
    { id: 4, product: "Black Hoodie", status: "Pending", bgColor: "bg-red-100" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-green-600';
      case 'Shipping': return 'text-purple-600';
      case 'Refund': return 'text-yellow-600';
      case 'Pending': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Hello Mahin!</h1>
            <p className="text-gray-500">Here's An Overview Of Your Recent Activities.</p>
          </div>
          <div className="hidden md:block">
            <img src="/path-to-your-illustration.svg" alt="Activity Overview" className="w-32" />
          </div>
        </div>
      </div>

      {/* Manage Account Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Manage My Account</h2>
          <button className="text-blue-600">
            <FaPencilAlt />
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src={userInfo.avatar || "https://via.placeholder.com/80"} 
                alt="Profile" 
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-lg">{userInfo.name}</h3>
                <p className="text-gray-500">{userInfo.email}</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaPhone className="text-gray-400" />
                <div>
                  <p className="text-sm font-semibold">Phone Number</p>
                  <p className="text-gray-500">{userInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-gray-400" />
                <div>
                  <p className="text-sm font-semibold">Location</p>
                  <p className="text-gray-500">{userInfo.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Address Book */}
          <div className="md:w-2/3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Address Book</h3>
              <button className="text-blue-500 text-sm">EDIT</button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="border rounded-lg p-4">
                  <p className="text-gray-500 text-sm mb-2">DEFAULT SHIPPING ADDRESS</p>
                  <h4 className="font-semibold mb-2">{userInfo.address.name}</h4>
                  <p className="text-gray-600 text-sm">
                    Street: {userInfo.address.street}<br />
                    City: {userInfo.address.city}<br />
                    State/province/area: {userInfo.address.state}<br />
                    Country: {userInfo.address.country}
                  </p>
                </div>
              ))}
            </div>
            {userInfo?.addresses?.length === 0 && (
          <h4 className="font-bold text-gray-700 xl:text-lg ">
            No Address Available to show
          </h4>
        )}
          </div>
        </div>

        {/* Latest Orders */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Latest Orders</h3>
            <button className="text-blue-500 text-sm">View All</button>
          </div>
          <div className="grid gap-4">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className={`${order.bgColor} rounded-lg p-4 flex items-center justify-between`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <img src="/path-to-hoodie-image.jpg" alt={order.product} className="w-12 h-12 object-cover" />
                  </div>
                  <span className="font-medium">{order.product}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`${getStatusColor(order.status)} font-medium`}>
                    {order.status}
                  </span>
                  <button className="text-gray-400">•••</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccount; 