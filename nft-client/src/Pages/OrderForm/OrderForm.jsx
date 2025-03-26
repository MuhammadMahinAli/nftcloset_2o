// import ar from "../../assets/nft-image/vr.png";
// import darkAr from "../../assets/nft-image/darkvr.png";
// import vvr from "../../assets/nft-image/vvr.png";
// import book from "../../assets/nft-image/book.png";
// import cartNft from "../../assets/nft-image/cart-nft.png";
// import lobby from "../../assets/nft-image/lobby.png";
// import certification from "../../assets/nft-image/certification.png";
// import recroom from "../../assets/nft-image/recroom.png";
// import animated from "../../assets/nft-image/animated.png";
// import vrChat from "../../assets/nft-image/vr-chat.png";
// import sandbox from "../../assets/nft-image/sandbox.png";
// import story from "../../assets/nft-image/story.png";
// import pd from "../../assets/nft-image/pd.png";
// import threeD from "../../assets/nft-image/3d.png";
// import { FaPlus } from "react-icons/fa";
// import { useContext, useEffect, useRef, useState } from "react";
// import { useLoaderData } from "react-router-dom";
// import namer from "color-namer";
// import { AuthContext } from "../../Context/UserContext";
// import { useGetSingleUserQuery } from "../../features/auth/authApi";

// const OrderForm = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { userId } = useContext(AuthContext);
//   const { data: getSingleUser } = useGetSingleUserQuery(userId);
//   const dropdownRef = useRef(null);
//   const data = useLoaderData();
//   const productInfo = data?.data;
//   const userInfo = getSingleUser?.data;
//   console.log(productInfo);
//   const {
//     productName,
//     _id,
//     displayImage,
//     digitalAssets,
//     colors,
//     sizeWithMaterial,
//     sizeChart,
//   } = productInfo;

//   const [selectedMaterial, setSelectedMaterial] = useState(
//     sizeWithMaterial[0].material
//   );
//   const allSizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
//   const sizeMap = {
//     XS: "X-Small",
//     S: "Small",
//     M: "Medium",
//     L: "Large",
//     XL: "X-Large",
//     "2XL": "2X-Large",
//     "3XL": "3X-Large",
//   };
//   const hexColors = colors?.map((hex) => {
//     const names = namer(hex);
//     return {
//       hex,
//       name: names.basic[0].name, // gets the most basic matching color name
//     };
//   });
//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const features = [
//     {
//       id: 1,
//       icon: ar,
//       text: "View In AR",
//       isPrimary: true,
//     },
//     {
//       id: 2,
//       icon: vvr,
//       text: "View In VR",
//     },
//     {
//       id: 3,
//       icon: threeD,
//       text: "3D File",
//     },
//     {
//       id: 4,
//       icon: book,
//       text: "Technical design book",
//     },
//     {
//       id: 5,
//       icon: pd,
//       text: "Physical Dress",
//     },
//     {
//       id: 6,
//       icon: cartNft,
//       text: "NFT",
//     },
//     {
//       id: 7,
//       icon: lobby,
//       text: "Virtual lobby access key",
//     },
//     {
//       id: 8,
//       icon: certification,
//       text: "Certification",
//     },
//     {
//       id: 9,
//       icon: recroom,
//       text: "Recroom wearable",
//     },
//     {
//       id: 10,
//       icon: animated,
//       text: "Animated",
//     },
//     {
//       id: 11,
//       icon: vrChat,
//       text: "VR Chat Wearable",
//     },
//     {
//       id: 12,
//       icon: sandbox,
//       text: "Sandbox wearable",
//     },
//     {
//       id: 13,
//       icon: story,
//       text: "Ownership of story",
//     },
//   ];

//   const featureKeyMap = {
//     "View In AR": "arversion",
//     "View In VR": "vrversion",
//     "3D File": "dfile",

//     "Ownership of story": "ownershipofstory",
//     "Certification": "certification",
//     "Sandbox wearable": "sandboxwearable",
//     "VR Chat Wearable": "vrchatwearable",
//     "Animated": "animated",
//     "Recroom wearable": "recroom",
//     "Technical design book": "technicaldesignbook",
//     "Virtual lobby access key": "virtuallobbyaccesskey",
//   };

//     // Filter features that have available values in digitalAssets
//     const availableFeatures = features.filter(feature => {
//       const assetKey = featureKeyMap[feature.text];
//       return assetKey && digitalAssets[assetKey] && digitalAssets[assetKey].length > 0;
//     });

//     // Group features by category
//     const groupedFeatures = availableFeatures.reduce((acc, feature) => {
//       if (!acc[feature.category]) {
//         acc[feature.category] = [];
//       }
//       acc[feature.category].push(feature);
//       return acc;
//     }, {});

//   return (
//     <>
//       <h1 className="text-gray-800 text-3xl lg:text-5xl font-bold capitalize text-center py-4 md:py-3 lg:py-7">
//         Order Summary
//       </h1>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5 md:p-10 lg:p-5">
//         {/* left */}
//         <div className="space-y-6 ">
//           <div className="flex  flex-col justify-center items-center ">
//             {/* Product Image */}
//             <div className="border  w-[300px] lg:w-[400px] lg:h-[400px] bg-white shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] rounded-lg">
//               <img
//                 src={displayImage}
//                 alt="Black Hoodie #43"
//                 className="w-full h-full object-cover rounded-lg"
//               />
//             </div>
//           </div>
//           {/* Creator Section */}
//           <div className="flex items-center gap-3 mb-8">
//             <img
//               src="https://res.cloudinary.com/dv51da0o9/image/upload/v1737951598/iofkn2cviuxpedwus7uk.png"
//               alt="Creator"
//               className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full"
//             />
//             <div>
//               <p className="text-[17px] md:text-2xl font-bold">Creator</p>
//               <p className="text-[16px] md:text-xl text-green-600">Online</p>
//             </div>
//           </div>
//         </div>
//         {/* right */}
//         <div className=" space-y-4">
//           {/* Product Details */}
//           <div className="flex-1">
//             <h2 className="text-3xl text-gray-800 font-bold pb-6">
//               {productName}
//             </h2>

//             {/* version */}
//             <div className="mb-3 md:hidden relative" ref={dropdownRef}>
//               {/* Dropdown Button */}
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
//               >
//                 <span className="flex items-center space-x-3 font-semibold text-gray-700">
//                   <img src={darkAr} className="h-5 w-5" alt="Ar" />
//                   <p> View in AR</p>
//                 </span>
//                 <svg
//                   className={`w-4 h-4 transition-transform duration-200 ${
//                     isOpen ? "rotate-180" : ""
//                   }`}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 9l-7 7-7-7"
//                   />
//                 </svg>
//               </button>

//               {/* Dropdown Menu */}
//               {isOpen && (
//                 <div className="absolute top-full left-0 mt-2 w-max bg-white border border-gray-200 rounded-lg shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] z-50">
//                   <div className="p-2 flex flex-col gap-2">
//                     {features.map((feature) => (
//                       <button
//                         key={feature.id}
//                         className={`
//                   flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left
//                   ${
//                     feature.isPrimary
//                       ? "bg-indigo-500 text-white hover:bg-indigo-600"
//                       : "text-gray-700 hover:bg-gray-50"
//                   }
//                   transition-colors duration-200
//                 `}
//                       >
//                         <img
//                           src={feature.icon}
//                           className="h-5 w-5"
//                           alt={feature.text}
//                         />
//                         <span className="whitespace-nowrap font-medium text-sm">
//                           {feature.text}
//                         </span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="space-y-6">
//       {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
//         <div key={category} className="space-y-2">

//           <div className="hidden md:flex flex-wrap gap-3">
//             {categoryFeatures.map((feature) => (
//               <button
//                 key={feature.id}
//                 className={`flex justify-center items-center gap-2 p-3 rounded-lg transition-all
//                      ${
//               feature.isPrimary
//                 ? "bg-indigo-500 text-white hover:bg-indigo-600"
//                 : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
//             }
//             transition-colors duration-200
//           `}
//               >
//                 <img className="text-2xl" src={feature.icon} />
//                 <span className="whitespace-nowrap font-semibold text-sm md:text-lg lg:text-xl">{feature.text}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>

//             {/* color, size, m */}
//             <div className="space-y-6 md:p-4">
//               {/* Color Selection */}
//               <div>
//                 <h3 className="text-gray-700 text-[17px] md:text-xl font-medium mb-2">
//                   Color
//                 </h3>
//                 <div className="flex gap-2">
//                   {hexColors.map((color, index) => (
//                     <>
//                       <button
//                         style={{ color: color.hex }}
//                         className="capitalize px-4 py-1 border border-gray-300 rounded-full text-[17px] md:text-xl hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//                       >
//                         {color.name}
//                       </button>
//                     </>
//                   ))}
//                 </div>{" "}
//               </div>

//               {/* Material Selection */}
//               <div className="w-full">
//                 <h3 className="text-gray-700 text-[17px] md:text-xl font-medium mb-2">
//                   Material
//                 </h3>
//                 {/* Material Tabs */}
//                 <div className="flex gap-2 mb-4">
//                   {sizeWithMaterial?.map((item) => (
//                     <button
//                       key={item._id}
//                       onClick={() => setSelectedMaterial(item.material)}
//                       className={`capitalize px-4 py-1 border border-gray-300 rounded-full text-[17px] md:text-xl hover:border-gray-400 focus:outline-none
//                          ${
//                            selectedMaterial === item.material
//                              ? "border-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//                              : "border-gray-300 hover:bg-gray-200"
//                          }
//                         `}
//                       // className={`px-4 py-2 rounded-lg text-[17px] md:text-xl transition-all ${
//                       //   selectedMaterial === item.material
//                       //     ? 'bg-blue-500 text-white'
//                       //     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                       // }`}
//                     >
//                       {item.material}
//                     </button>
//                   ))}
//                 </div>

//                 {/* Sizes */}
//                 <div className="mt-4">
//                   <div className="flex items-center gap-2 mb-2">
//                     <h3 className="text-gray-700 text-[17px] md:text-xl font-medium">
//                       Size -
//                     </h3>
//                     <a
//                       href={sizeChart}
//                       target="blank"
//                       className="text-[17px] md:text-xl text-gray-600 underline flex items-center"
//                     >
//                       Size Chart
//                       <svg
//                         className="w-4 h-4 ml-1"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
//                         />
//                       </svg>
//                     </a>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {allSizes.map((size) => {
//                       const currentMaterial = sizeWithMaterial?.find(
//                         (item) => item.material === selectedMaterial
//                       );
//                       const isAvailable = currentMaterial?.sizes.includes(size);

//                       return (
//                         <span
//                           key={size}
//                           className={`px-4 py-1 border border-gray-300 rounded-full text-center text-[17px] md:text-xl
//                   ${
//                     isAvailable
//                       ? "text-gray-700"
//                       : "text-gray-400 line-through "
//                   }`}
//                         >
//                           {sizeMap[size]}
//                         </span>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>

//               {/* Stock Status */}
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 <span className="text-[17px] md:text-xl text-gray-600">
//                   In Stock
//                 </span>
//               </div>
//             </div>

//             {/* Delivery Address */}
//             <div className="md:p-4">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-[23px] md:text-2xl font-semibold">
//                   Delivery Address
//                 </h2>
//                 <button className="bg-black text-[17px] md:text-xl text-white px-2 md:px-4 py-2 rounded-md md:rounded-lg hover:bg-gray-800 transition-colors">
//                   <p className="hidden"> Add New Address</p>
//                   <FaPlus className="text-white" />
//                 </button>
//               </div>

//               <div className="mb-4">
//                 <h3 className="text-gray-700 text-[17px] md:text-xl font-bold mb-3">
//                   Saved Addresses
//                 </h3>

//                 <div className="space-y-3">
//                   {userInfo?.addresses?.map((address) => (
//                     <div
//                       key={address.id}
//                       className="border border-gray-900 shadow-md rounded-lg p-2 md:p-4"
//                     >
//                       <div className="flex items-start">
//                         <input
//                           type="radio"
//                           name="address"
//                           checked={address.isSelected}
//                           className="mt-1 mr-3"
//                           onChange={() => {}}
//                         />

//                         <div className="flex-grow">
//                           <div className="flex items-center mb-2">
//                             <div className="flex items-center gap-2">
//                               {address.label === "Home" ? (
//                                 <svg
//                                   className="w-6 h-6 md:w-8 md:h-8"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//                                   />
//                                 </svg>
//                               ) : (
//                                 <svg
//                                   className="w-6 h-6 md:w-8 md:h-8"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                                   />
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                                   />
//                                 </svg>
//                               )}
//                               <span className="text-[17px] md:text-[22px]">
//                                 {address.country}
//                               </span>
//                             </div>
//                           </div>

//                           <div className="text-gray-600 text-[17px] md:text-[20px]">
//                             <p className="text-[15px] md:text-[20px]">
//                               Address: {address.homeAddress}
//                             </p>
//                             <p className="text-[15px] md:text-[20px]">
//                               Street: {address.street}
//                             </p>

//                             <p className="text-[15px] md:text-[20px]">
//                               City: {address.city}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OrderForm;

import { useState, useContext, useEffect, useRef } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";
import { useGetSingleUserQuery } from "../../features/auth/authApi";
import { FaPlus } from "react-icons/fa";
import namer from "color-namer";
import ar from "../../assets/nft-image/darkvr.png";
import darkAr from "../../assets/nft-image/darkvr.png";
import vvr from "../../assets/nft-image/vvr.png";
import book from "../../assets/nft-image/book.png";
import cartNft from "../../assets/nft-image/cart-nft.png";
import lobby from "../../assets/nft-image/lobby.png";
import certification from "../../assets/nft-image/certification.png";
import recroom from "../../assets/nft-image/recroom.png";
import animated from "../../assets/nft-image/animated.png";
import crossmint from "../../assets/nft-image/crossmint-logo.jpg";
import vrChat from "../../assets/nft-image/vr-chat.png";
import sandbox from "../../assets/nft-image/sandbox.png";
import story from "../../assets/nft-image/story.png";
import pd from "../../assets/nft-image/pd.png";
import threeD from "../../assets/nft-image/3d.png";
import { useAddOrderMutation } from "../../features/order/orderApi";
import Swal from "sweetalert2";
import adminlogo from "../../assets/nft-image/nftcloset_logo.png";
const OrderForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [addOrder] = useAddOrderMutation();
  const { userId } = useContext(AuthContext);
  const { data: getSingleUser } = useGetSingleUserQuery(userId);

  const dropdownRef = useRef(null);
  const data = useLoaderData();
  const productInfo = data?.data;
  const userInfo = getSingleUser?.data;
  const {
    productName,
    _id,
    displayImage,
    stock,
    digitalAssets,
    colors,
    sizeWithMaterial,
    sizeChart,
    buyingLink,
  } = productInfo || {};

  // Form state
  const [formData, setFormData] = useState({
    productID: _id || "",
    productInfo: {
      material: "",
      size: "",
      color: "",
    },
    deliveryAddress: {
      homeAddress: "",
      country: "",
      city: "",
      street: "",
      isDefault: false,
    },
    contactType: "",
    orderedBy: userId || "",
    crossMintOrderId: "",
    trackingLink: "",
    status: "pending",
    digitalAsset: "notClaimed",
    deliveryTypeInfo: null,
  });

  // Local state for selections
  const [selectedMaterial, setSelectedMaterial] = useState(
    sizeWithMaterial?.[0]?.material || ""
  );
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);

  const features = [
    {
      id: 1,
      icon: ar,
      text: "View In AR",
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
    {
      id: 8,
      icon: certification,
      text: "Certification",
    },
    {
      id: 9,
      icon: recroom,
      text: "Recroom wearable",
    },
    {
      id: 10,
      icon: animated,
      text: "Animated",
    },
    {
      id: 11,
      icon: vrChat,
      text: "VR Chat Wearable",
    },
    {
      id: 12,
      icon: sandbox,
      text: "Sandbox wearable",
    },
    {
      id: 13,
      icon: story,
      text: "Ownership of story",
    },
  ];

  const featureKeyMap = {
    "View In AR": "arversion",
    "View In VR": "vrversion",
    "3D File": "dfile",
    "Technical design book": "technicaldesignbook",
    "Virtual lobby access key": "virtuallobbyaccesskey",
    "Ownership of story": "ownershipofstory",
    Certification: "certification",
    "Sandbox wearable": "sandboxwearable",
    "VR Chat Wearable": "vrchatwearable",
    Animated: "animated",
    "Recroom wearable": "recroom",
  };

  // Filter features that have available values in digitalAssets
  const availableFeatures = features.filter((feature) => {
    const assetKey = featureKeyMap[feature.text];
    return (
      assetKey &&
      digitalAssets?.[assetKey] &&
      digitalAssets[assetKey].length > 0
    );
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update form data when selections change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      productInfo: {
        ...prev.productInfo,
        material: selectedMaterial,
        size: selectedSize,
        color: selectedColor,
      },
    }));
  }, [selectedMaterial, selectedSize, selectedColor]);

  // Update form data when address is selected
  useEffect(() => {
    if (selectedAddress) {
      setFormData((prev) => ({
        ...prev,
        deliveryAddress: {
          homeAddress: selectedAddress.homeAddress,
          country: selectedAddress.country,
          city: selectedAddress.city,
          street: selectedAddress.street,
          isDefault: selectedAddress.isSelected,
        },
      }));
    }
  }, [selectedAddress]);

  // Handle address selection
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  // Handle size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  // Handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };
  const handleMaterialSelect = (material) => {
    setSelectedMaterial(material);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    // Validate required fields
    const requiredFields = [
      { value: formData.productID, label: "Product ID" },
      { value: formData.productInfo.material, label: "Material" },
      { value: formData.productInfo.size, label: "Size" },
      { value: formData.productInfo.color, label: "Color" },
      {
        value: formData.deliveryAddress.homeAddress,
        label: "Delivery Address",
      },
      { value: formData.deliveryAddress.country, label: "Country" },
      { value: formData.deliveryAddress.city, label: "City" },
      { value: formData.deliveryAddress.street, label: "Street" },
      { value: formData.orderedBy, label: "Ordered By" },
      { value: formData.crossMintOrderId, label: "CrossMint Order ID" },
      { value: formData.contactType, label: "Contact Via" },
    ];

    for (const field of requiredFields) {
      if (
        !field.value ||
        (typeof field.value === "string" && field.value.trim() === "")
      ) {
        Swal.fire({
          icon: "error",
          title: "Required Field Missing",
          text: `Please fill in the ${field.label} field`,
        });
        return;
      }
    }

    try {
      const response = await addOrder(formData).unwrap();
      console.log(response);
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your order has been placed!",
        });
        setFormData({
          productID: "",
          productInfo: {
            material: "",
            size: "",
            color: "",
          },
          deliveryAddress: {
            homeAddress: "",
            country: "",
            city: "",
            street: "",
            isDefault: false,
          },
          orderedBy: userId || "",
          crossMintOrderId: "",
          trackingLink: "",
          status: "pending",
          digitalAsset: "notClaimed",
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. !",
      });
    }
  };

  const hexColors = colors?.map((hex) => {
    const names = namer(hex);
    return {
      hex,
      name: names.basic[0].name,
    };
  });

  return (
    <form onSubmit={handleSubmit} className="max-w-7xl mx-auto">
      <h1 className="text-gray-800 text-3xl lg:text-5xl font-bold capitalize text-center py-4 md:py-3 lg:py-7">
        Order Summary
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5 md:p-10 lg:p-5">
        {/* Left side - Product Image */}
        <div className="space-y-6">
          <div className="flex flex-col justify-center items-center">
            <div className="border w-[300px] lg:w-[400px] lg:h-[400px] bg-white shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] rounded-lg">
              <img
                src={displayImage}
                alt={productName}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          {/* Creator Section */}
          {/* <div className="flex items-center gap-3 mb-8">
            <img
              src="https://res.cloudinary.com/dv51da0o9/image/upload/v1737951598/iofkn2cviuxpedwus7uk.png"
              alt="Creator"
              className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full"
            />
            <div>
              <p className="text-[17px] md:text-2xl font-bold">Creator</p>
              <p className="text-[16px] md:text-xl text-green-600">Online</p>
            </div>
          </div> */}
          <div className="flex items-center gap-2 md:gap-3 lg:p-3  rounded-lg">
            <img
              src={adminlogo}
              alt="Creator"
              className="h-10 md:w-14 w-10 md:h-14 rounded-full border-2 border-white shadow-md"
            />
            <div>
              <p className="text-lg capitalize font-bold">NFT closet x </p>
            </div>
          </div>
        </div>

        {/* Right side - Form Fields */}
        <div className="space-y-6">
          <h2 className="text-3xl text-gray-800 font-bold capitalize">
            {productName}
          </h2>

          {/* Digital Assets Mobile Dropdown */}
          <div className="mb-3 md:hidden relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="flex items-center space-x-3 font-semibold text-gray-700">
                <img src={darkAr} className="h-5 w-5" alt="Ar" />
                <p>View in AR</p>
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
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

            {/* Mobile Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-full left-0 mt-2 w-max bg-white border border-gray-200 rounded-lg shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] z-50">
                <div className="p-2 flex flex-col gap-2">
                  {availableFeatures.map((feature) => (
                    <button
                      key={feature.id}
                      type="button"
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
                      <img
                        src={feature.icon}
                        className="h-5 w-5"
                        alt={feature.text}
                      />
                      <span className="whitespace-nowrap font-medium text-sm">
                        {feature.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Digital Assets Desktop */}
          <div className="hidden md:flex flex-wrap gap-3">
            {availableFeatures.map((feature) => (
              <button
                key={feature.id}
                type="button"
                className={`group flex items-center gap-2 px-4 py-2 rounded-lg transition-all
      ${
        feature.isPrimary
          ? "bg-indigo-500 text-white hover:bg-indigo-600"
          : "bg-white border border-gray-200 hover:bg-indigo-500 hover:text-white"
      }
    `}
              >
                <img
                  src={feature.icon}
                  className="h-5 w-5 transition-all group-hover:[filter:brightness(0)_invert(1)]"
                  alt={feature.text}
                />
                <span className="whitespace-nowrap font-semibold text-sm md:text-lg lg:text-lg">
                  {feature.text}
                </span>
              </button>
            ))}
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <h3 className="text-gray-700 text-[17px] md:text-xl font-medium">
              Color
            </h3>
            <div className="flex gap-2">
              {hexColors?.map((color, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleColorSelect(color.name)}
                  className={`capitalize px-4 py-1 border rounded-full text-[17px] md:text-xl hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
                    selectedColor === color.name
                      ? "border-gray-600 bg-gray-100"
                      : "border-gray-300"
                  }`}
                  style={{ color: color.hex }}
                >
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          {/* Material Selection */}
          <div className="space-y-2">
            <h3 className="text-gray-700 text-[17px] md:text-xl font-medium">
              Material
            </h3>
            <div className="flex gap-2">
              {sizeWithMaterial?.map((item) => (
                <button
                  key={item._id}
                  type="button"
                  onClick={() => handleMaterialSelect(item.material)}
                  className={`capitalize px-4 py-1 border rounded-full text-[17px] md:text-xl hover:border-gray-400 focus:outline-none ${
                    selectedMaterial === item.material
                      ? "border-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      : "border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {item.material}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-gray-700 text-[17px] md:text-xl font-medium">
                Size
              </h3>
              {sizeChart && (
                <a
                  href={sizeChart}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[17px] md:text-xl text-gray-600 underline flex items-center"
                >
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
                </a>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map((size) => {
                const currentMaterial = sizeWithMaterial?.find(
                  (item) => item.material === selectedMaterial
                );
                const isAvailable = currentMaterial?.sizes.includes(size);

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => isAvailable && handleSizeSelect(size)}
                    className={`px-4 py-1 border rounded-full text-center text-[17px] md:text-xl
                      ${
                        isAvailable
                          ? selectedSize === size
                            ? "border-gray-600 text-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                          : "border-gray-300 text-gray-400 line-through cursor-not-allowed"
                      }`}
                    disabled={!isAvailable}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stock Status */}

          {stock === "notAvailable" ? (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span className="text-[17px] md:text-xl text-gray-600">
                Out of Stock
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-[17px] md:text-xl text-gray-600">
                In Stock
              </span>
            </div>
          )}

          {/* Contact Selection */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-700 text-[17px] md:text-xl font-medium">
                Contact
              </h3>
              <Link
                to="/manageAccount/settings"
                className=" text-gray-700 px-4 py-2 rounded-lg underline transition-colors"
              >
                View profile
              </Link>
            </div>
            <div className="flex gap-2">
              {["Via Email", "Via WhatsApp"].map((type, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, contactType: type })
                  }
                  className={`capitalize px-4 py-1 border rounded-full text-[17px] md:text-xl hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
                    formData.contactType === type
                      ? "border-gray-600 bg-gray-100"
                      : "border-gray-300"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-[23px] md:text-2xl font-semibold">
                Delivery Address
              </h3>
              <Link
                to="/manageAccount/settings"
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <FaPlus />
              </Link>
            </div>

            <div className="space-y-3">
              {userInfo?.addresses?.map((address) => (
                <div
                  key={address._id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all
                    ${
                      selectedAddress?._id === address._id
                        ? "border-gray-900 shadow-md"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  onClick={() => handleAddressSelect(address)}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress?._id === address._id}
                      onChange={() => handleAddressSelect(address)}
                      className="mt-1 mr-3"
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
                            {address.country}
                          </span>
                        </div>
                      </div>

                      <div className="text-gray-600 text-[17px] md:text-[20px]">
                        <p className="text-[15px] md:text-[20px]">
                          Address: {address.homeAddress}
                        </p>
                        <p className="text-[15px] md:text-[20px]">
                          Street: {address.street}
                        </p>

                        <p className="text-[15px] md:text-[20px]">
                          City: {address.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <a
            href={buyingLink}
            target="blank"
            className={`w-full flex justify-center items-center space-x-4 py-3 bg-[#0c0c0c] text-gray-100 hover:bg-gray-900 rounded-lg text-lg font-medium transition-colors
              `}
          >
            <img className="h-10 w-10" src={crossmint} alt="Crossmint" />
            <p> Pay with Crossmint</p>
          </a>
          <label
            htmlFor="crossMintOrderId"
            className="block text-sm md:text-[17px] font-bold text-red-600 mb-0"
          >
            ***Buyer need to covers minting fee
          </label>
          {/* crossmint id */}
          <div className="max-w-2xl">
            <label
              htmlFor="crossMintOrderId"
              className="block text-lg font-bold text-gray-700 mb-2"
            >
              Crossmint Order Id
            </label>
            <input
              type="text"
              id="crossMintOrderId"
              name="crossMintOrderId"
              value={formData.crossMintOrderId}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  crossMintOrderId: e.target.value,
                }))
              }
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#26B893]"
              placeholder="Enter Crossmint ID"
            />
          </div>
          <button
            type="submit"
            disabled={!formData.crossMintOrderId}
            className={`w-full py-3 rounded-lg text-lg font-medium transition-colors
              ${
                formData.crossMintOrderId
                  ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {formData.crossMintOrderId
              ? "Place Order"
              : "CrossMint Order Id is Required"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default OrderForm;
