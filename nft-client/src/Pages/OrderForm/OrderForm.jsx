import ar from "../../assets/nft-image/vr.png";
import vvr from "../../assets/nft-image/vvr.png";
import book from "../../assets/nft-image/book.png";
import cartNft from "../../assets/nft-image/cart-nft.png";
import lobby from "../../assets/nft-image/lobby.png";
import pd from "../../assets/nft-image/pd.png";
import threeD from "../../assets/nft-image/3d.png";

const OrderForm = () => {
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
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 p-10">
        {/* left */}
        <div className="space-y-6 ">
          <div className="flex  flex-col justify-center items-center ">
            {/* Product Image */}
            <div className="border rounded-md w-[400px] h-[400px]">
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
              className="w-20 h-20 rounded-full"
            />
            <div>
              <p className="text-2xl font-medium">Creator</p>
              <p className="text-xl text-green-600">Online</p>
            </div>
          </div>
        </div>
        {/* right */}
        <div className=" space-y-4">
          {/* Product Details */}
          <div className="flex-1">
            <h2 className="text-5xl font-bold pb-6">Black Hoodie #43</h2>

            {/* version */}
            <div className="flex flex-wrap gap-5 p-4">
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
                  <span className="whitespace-nowrap font-semibold text-xl">
                    {feature.text}
                  </span>
                </button>
              ))}
            </div>

            {/* color, size, m */}
            <div className="space-y-6 p-4">
              {/* Color Selection */}
              <div>
                <h3 className="text-gray-700 text-xl font-medium mb-2">
                  Color
                </h3>
                <div className="flex gap-2">
                  <button className="px-4 py-1 border border-gray-300 rounded-full text-xl hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    Red
                  </button>
                </div>
              </div>

              {/* Material Selection */}
              <div>
                <h3 className="text-gray-700 text-xl font-medium mb-2">
                  Material
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-1 border border-gray-300 rounded-full text-xl hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    Cotton
                  </button>
                  <button className="px-4 py-1 border border-gray-300 rounded-full text-xl hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    Cotton-Polyester Blend
                  </button>
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-gray-700 text-xl font-medium">Size</h3>
                  <button className="text-xl text-gray-600 underline flex items-center">
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
                        className={`px-4 py-1 rounded-full text-xl
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
                <span className="text-xl text-gray-600">In Stock</span>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Delivery Address</h2>
                <button className="bg-black text-xl text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  Add New Address
                </button>
              </div>

              <div className="mb-4">
                <h3 className="text-gray-700 text-xl font-bold mb-3">
                  Saved Addresses
                </h3>

                <div className="space-y-3">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="border border-gray-900 shadow-md rounded-lg p-4"
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
                                  className="w-8 h-8"
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
                                  className="w-8 h-8"
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
                              <span className="text-[22px]">
                                {address.label}
                              </span>
                            </div>
                          </div>

                          <div className="text-gray-600 text-[20px]">
                            <p className="text-[20px]">
                              Street: {address.street}
                            </p>
                            <div className="flex gap-2">
                              <p className="text-[20px]">
                                City: {address.city}
                              </p>
                              <p className="text-[20px]">
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
      {/* ----------------------------------------------------------------------------- */}
    </div>
  );
};

export default OrderForm;
