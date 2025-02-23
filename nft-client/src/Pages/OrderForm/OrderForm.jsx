import ar from "../../assets/nft-image/vr.png";
import darkAr from "../../assets/nft-image/darkvr.png";
import vvr from "../../assets/nft-image/vvr.png";
import book from "../../assets/nft-image/book.png";
import cartNft from "../../assets/nft-image/cart-nft.png";
import lobby from "../../assets/nft-image/lobby.png";
import pd from "../../assets/nft-image/pd.png";
import threeD from "../../assets/nft-image/3d.png";
import { FaPlus } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const OrderForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const features = [
    {
      id: 1,
      icon: ar,
      text: "View In AR",
      isPrimary: true,
    },
    {
      id: 2,
      icon: vvr,
      text: "View In VR",
    },
    {
      id: 3,
      icon: threeD,
      text: "3D File",
    },
    {
      id: 4,
      icon: book,
      text: "Technical design book",
    },
    {
      id: 5,
      icon: pd,
      text: "Physical Dress",
    },
    {
      id: 6,
      icon: cartNft,
      text: "NFT",
    },
    {
      id: 7,
      icon: lobby,
      text: "Virtual lobby access key",
    },
  ];
  const addresses = [
    {
      id: 1,
      label: "Home",
      street: "Ct-06-19 6Th Floor Subang Square Jln Ss 15/4G Ss15",
      city: "Petaling Jaya",
      area: "Selangor",
      isSelected: true,
    },
    {
      id: 2,
      label: "Kuala Lumper",
      street: "Ct-06-19 6Th Floor Subang Square Jln Ss 15/4G Ss15",
      city: "Petaling Jaya",
      area: "Selangor",
      isSelected: false,
    },
    {
      id: 3,
      label: "Kuala Lumper",
      street: "Ct-06-19 6Th Floor Subang Square Jln Ss 15/4G Ss15",
      city: "Petaling Jaya",
      area: "Selangor",
      isSelected: false,
    },
  ];
  return (
    <>
      <h1 className="text-gray-800 text-3xl lg:text-5xl font-bold capitalize text-center py-4 md:py-3 lg:py-7">
        Order Summary
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5 md:p-10 lg:p-5">
        {/* left */}
        <div className="space-y-6 ">
          <div className="flex  flex-col justify-center items-center ">
            {/* Product Image */}
            <div className="border  w-[300px] lg:w-[400px] lg:h-[400px] bg-white shadow-lg rounded-lg">
              <img
                src="https://res.cloudinary.com/dv51da0o9/image/upload/v1737951598/iofkn2cviuxpedwus7uk.png"
                alt="Black Hoodie #43"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          {/* Creator Section */}
          <div className="flex items-center gap-3 mb-8">
            <img
              src="https://res.cloudinary.com/dv51da0o9/image/upload/v1737951598/iofkn2cviuxpedwus7uk.png"
              alt="Creator"
              className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full"
            />
            <div>
              <p className="text-[17px] md:text-2xl font-bold">Creator</p>
              <p className="text-[16px] md:text-xl text-green-600">Online</p>
            </div>
          </div>
        </div>
        {/* right */}
        <div className=" space-y-4">
          {/* Product Details */}
          <div className="flex-1">
            <h2 className="text-3xl text-gray-800 font-bold pb-6">
              Black Hoodie #43
            </h2>

            {/* version */}
            <div className="mb-3 md:hidden relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="flex items-center space-x-3 font-semibold text-gray-700">
        <img src={darkAr} className="h-5 w-5" alt="Ar" />
      <p>    View in AR</p>
          </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-max bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-2 flex flex-col gap-2">
            {features.map((feature) => (
              <button
                key={feature.id}
                className={`
                  flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left
                  ${
                    feature.isPrimary
                      ? "bg-indigo-500 text-white hover:bg-indigo-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                  transition-colors duration-200
                `}
              >
                <img src={feature.icon} className="h-5 w-5" alt={feature.text} />
                <span className="whitespace-nowrap font-medium text-sm">
                  {feature.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
            <div className="hidden md:flex flex-wrap gap-5 p-4">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  className={`
            flex items-center gap-3 px-4 py-3 rounded-lg
            ${
              feature.isPrimary
                ? "bg-indigo-500 text-white hover:bg-indigo-600"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }
            transition-colors duration-200
          `}
                >
                  <img src={feature.icon} className="h-6" />
                  <span className="whitespace-nowrap font-semibold text-sm md:text-lg lg:text-xl">
                    {feature.text}
                  </span>
                </button>
              ))}
            </div>

            {/* color, size, m */}
            <div className="space-y-6 md:p-4">
              {/* Color Selection */}
              <div>
                <h3 className="text-gray-700 text-[17px] md:text-xl font-medium mb-2">
                  Color
                </h3>
                <div className="flex gap-2">
                  <button className="px-4 py-1 border border-gray-300 rounded-full text-[17px] md:text-xl hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    Red
                  </button>
                </div>
              </div>

              {/* Material Selection */}
              <div>
                <h3 className="text-gray-700 text-[17px] md:text-xl font-medium mb-2">
                  Material
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-1 border border-gray-300 rounded-full text-[17px] md:text-xl hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    Cotton
                  </button>
                  <button className="px-4 py-1 border border-gray-300 rounded-full text-[17px] md:text-xl hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    Cotton-Polyester Blend
                  </button>
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-gray-700 text-[17px] md:text-xl font-medium">
                    Size
                  </h3>
                  <button className="text-[17px] md:text-xl text-gray-600 underline flex items-center">
                    Size Chart
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["X-Small", "Small", "Medium", "Large", "X-Large"].map(
                    (size, index) => (
                      <button
                        key={size}
                        disabled={index > 0}
                        className={`px-4 py-1 rounded-full text-[17px] md:text-xl
                ${
                  index === 0
                    ? "border-2 border-gray-900"
                    : "border border-gray-200 text-gray-400"
                }`}
                      >
                        {size}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-[17px] md:text-xl text-gray-600">
                  In Stock
                </span>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="md:p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[23px] md:text-2xl font-semibold">
                  Delivery Address
                </h2>
                <button className="bg-black text-[17px] md:text-xl text-white px-2 md:px-4 py-2 rounded-md md:rounded-lg hover:bg-gray-800 transition-colors">
                  <p className="hidden"> Add New Address</p>
                  <FaPlus className="text-white" />
                </button>
              </div>

              <div className="mb-4">
                <h3 className="text-gray-700 text-[17px] md:text-xl font-bold mb-3">
                  Saved Addresses
                </h3>

                <div className="space-y-3">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="border border-gray-900 shadow-md rounded-lg p-2 md:p-4"
                    >
                      <div className="flex items-start">
                        <input
                          type="radio"
                          name="address"
                          checked={address.isSelected}
                          className="mt-1 mr-3"
                          onChange={() => {}}
                        />

                        <div className="flex-grow">
                          <div className="flex items-center mb-2">
                            <div className="flex items-center gap-2">
                              {address.label === "Home" ? (
                                <svg
                                  className="w-6 h-6 md:w-8 md:h-8"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="w-6 h-6 md:w-8 md:h-8"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              )}
                              <span className="text-[17px] md:text-[22px]">
                                {address.label}
                              </span>
                            </div>
                          </div>

                          <div className="text-gray-600 text-[17px] md:text-[20px]">
                            <p className="text-[15px] md:text-[20px]">
                              Street: {address.street}
                            </p>
                            <div className="flex gap-1 md:gap-2">
                              <p className="text-[15px] md:text-[20px]">
                                City: {address.city}
                              </p>
                              <p className="text-[15px] md:text-[20px]">
                                Area: {address.area}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderForm;
