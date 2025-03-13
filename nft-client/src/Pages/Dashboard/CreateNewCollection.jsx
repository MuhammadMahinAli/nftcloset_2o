import { useState, useEffect } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Swal from "sweetalert2";
import { rawFileUpload } from "../utils/cloudinaryForRaw";
import { useGetAllProductQuery } from "../../features/product/productApi";
import { RiCloseFill } from "react-icons/ri";
import { useAddCollectionMutation } from "../../features/collection/collectionApi";

const CreateNewCollection = () => {
  const { data: getAllProduct } = useGetAllProductQuery();
  const [addCollection] = useAddCollectionMutation();
  const [formData, setFormData] = useState({
    collectionName: "",
    collectionDescription: "",
    publishType: "",
    publishDate: "",
    fromDate: "",
    toDate: "",
    displayImage: "",
    discount: 0,
    products: [],
    storyLink: "",
  });

  const products = getAllProduct?.data;

  const [isDiscountEnabled, setIsDiscountEnabled] = useState(false);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dateError, setDateError] = useState("");

  // Add this function to get today's date in YYYY-MM-DDThh:mm format
  // Helper functions at the top
  const getMinDateTime = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrow.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}T00:00`;
  };

  // Get today's date for Instant publishing
  const getTodayDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Update handleInputChange function
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "publishType") {
      const newPublishDate =
        value === "Instant" ? getTodayDateTime() : getMinDateTime();
      setFormData((prev) => ({
        ...prev,
        publishType: value,
        publishDate: newPublishDate,
        // Set fromDate to exactly match publishDate
        fromDate:
          value === "Instant"
            ? getTodayDateTime().split("T")[0]
            : getMinDateTime().split("T")[0],
        toDate: "",
      }));
      return;
    }

    if (name === "publishDate") {
      const selectedDate = new Date(value);
      const minDate = new Date(getMinDateTime());

      if (selectedDate < minDate) {
        setDateError("Please select a date starting from tomorrow");
        return;
      } else {
        setDateError("");
        setFormData((prev) => ({
          ...prev,
          publishDate: value,
          // Set fromDate to exactly match the selected publishDate
          fromDate: value.split("T")[0],
          toDate: "",
        }));
      }
      return;
    }

    if (name === "toDate") {
      const selectedToDate = new Date(value);
      const publishDate = new Date(formData.publishDate);

      if (selectedToDate <= publishDate) {
        setDateError("End date must be after the publish date");
        return;
      } else {
        setDateError("");
        setFormData((prev) => ({
          ...prev,
          toDate: value,
        }));
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update getMinToDate to use the actual publishDate
  const getMinToDate = () => {
    const publishDate = new Date(formData.publishDate);
    const nextDay = new Date(publishDate);
    nextDay.setDate(publishDate.getDate() + 1);
    return nextDay.toISOString().split("T")[0];
  };

  // Add useEffect to set initial date for Instant publish
  useEffect(() => {
    if (formData.publishType === "Instant") {
      setFormData((prev) => ({
        ...prev,
        publishDate: getMinDateTime(),
      }));
    }
  }, []);

  // Handle input changes
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // Handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Please upload an image file",
      });
      return;
    }

    // Check image dimensions
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      if (img.width !== 1024 || img.height !== 320) {
        Swal.fire({
          icon: "error",
          title: "Invalid Image Dimensions",
          text: "Image must be exactly 1024 x 320 pixels",
        });
        return;
      }

      setIsUploading(true);
      try {
        const uploadedUrl = await rawFileUpload(file, "image", (progress) =>
          setUploadProgress(progress)
        );

        setFormData((prev) => ({
          ...prev,
          displayImage: uploadedUrl,
        }));
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    };
  };

  // Handle product selection

  const handleProductSelection = (productId) => {
    setFormData((prev) => {
      // Check if product is already selected
      const isSelected = prev.products.some(
        (item) => item.productId === productId
      );

      if (isSelected) {
        // Remove product if already selected
        return {
          ...prev,
          products: prev.products.filter(
            (item) => item.productId !== productId
          ),
        };
      } else {
        // Add product with the required format
        return {
          ...prev,
          products: [...prev.products, { productId }],
        };
      }
    });
  };
  // const handleProductSelection = (productId) => {
  //   setFormData(prev => {
  //     const isSelected = prev.products.includes(productId);

  //     if (isSelected) {
  //       // Remove product if already selected
  //       return {
  //         ...prev,
  //         products: prev.products.filter(id => id !== productId)
  //       };
  //     } else {
  //       // Add product if not selected
  //       return {
  //         ...prev,
  //         products: [...prev.products, productId]
  //       };
  //     }
  //   });
  //   //setIsOpenDropDown(false);
  // };

  // Handle product removal
  const handleRemoveProduct = (productToRemove) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((product) => product !== productToRemove),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    // Check required fields
    const requiredFields = {
      collectionName: "Collection Name",
      collectionDescription: "Collection Description",
      publishType: "Publish Type",
      publishDate: "Publish Date",
      displayImage: "Display Image",
      storyLink: "Story Link",
    };

    // Validate required fields
    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field] || formData[field].trim() === "") {
        Swal.fire({
          icon: "error",
          title: "Required Field Missing",
          text: `Please fill in the ${label} field`,
        });
        return;
      }
    }

    // Validate discount fields if discount is enabled
    if (isDiscountEnabled) {
      if (!formData.fromDate || !formData.toDate) {
        Swal.fire({
          icon: "error",
          title: "Discount Dates Required",
          text: "Please set both start and end dates for the discount period",
        });
        return;
      }

      if (!formData.discount || formData.discount <= 0) {
        Swal.fire({
          icon: "error",
          title: "Invalid Discount",
          text: "Please enter a valid discount amount",
        });
        return;
      }
    }

    // // Prepare form data for submission
    // const submissionData = {
    //   ...formData,
    //   // If discount is not enabled, reset discount-related fields
    //   ...((!isDiscountEnabled) && {
    //     discount: 0,
    //     fromDate: "",
    //     toDate: ""
    //   })
    // };

    try {
      const response = await addCollection(formData).unwrap();
      console.log(response);
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Hurray!",
          text: "You've added a new collection!",
        });
        setIsDiscountEnabled(false);
        setFormData({
          collectionName: "",
          collectionDescription: "",
          publishType: "",
          publishDate: "",
          fromDate: "",
          toDate: "",
          displayImage: "",
          discount: 0,
          products: [],
          storyLink: "",
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          err.data?.message ||
          "Something went wrong while adding the collection!",
      });
    }
  };

  // Update the discount toggle handler
  const handleDiscountToggle = () => {
    if (!formData.publishDate) {
      Swal.fire({
        icon: "warning",
        title: "Set Publish Date First",
        text: "Please select a publish date before enabling discount",
      });
      return;
    }
    setIsDiscountEnabled(!isDiscountEnabled);
  };

  // Effect to handle discount toggle
  useEffect(() => {
    if (!isDiscountEnabled) {
      setFormData((prev) => ({
        ...prev,
        discount: 0,
        fromDate: "",
        toDate: "",
      }));
    }
  }, [isDiscountEnabled]);
  return (
    <div className="mx-auto py-5 md:p-6">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold mb-6">Create Collection</h1>

        {/* Display Image Section */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-5">
          <h2 className="text-lg xl:text-xl font-gray-700 font-medium">
            Display Image
          </h2>
          <div className="pt-5 mb-8 flex justify-center items-center">
            <label className="relative cursor-pointer">
              <div className=" flex justify-center items-center">
                {formData.displayImage ? (
                  <div className="relative w-5/12   m-2 border bg-[#fff] rounded flex flex-col space-y-3 items-center justify-center">
                    <img
                      src={formData.displayImage}
                      alt="Preview"
                      className="object-cover border p-2 rounded-md border-[#26B893]"
                    />

                    <div
                      onClick={() =>
                        setFormData({ ...formData, displayImage: "" })
                      }
                      className="absolute -top-8 -right-2 bg-[#26B893] text-white rounded-full font-bold mt-2 p-1 "
                    >
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 md:border-4 bg-slate-100 border-dashed border-gray-300 rounded-lg p-8 w-48 h-40 flex flex-col items-center justify-center hover:border-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-gray-400 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    <p className="text-base text-gray-500">Upload PNG</p>
                    <p className="text-sm text-gray-400">1024 x 320 Pixels</p>
                  </div>
                )}

                {/* Progress Indicator */}
                {isUploading && (
                  <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
                    <div className="relative">
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle
                          className="text-gray-200"
                          strokeWidth="4"
                          stroke="currentColor"
                          fill="transparent"
                          r="20"
                          cx="24"
                          cy="24"
                        />
                        <circle
                          className="text-[#26B893]"
                          strokeWidth="4"
                          strokeDasharray={125.6}
                          strokeDashoffset={
                            125.6 * ((100 - uploadProgress) / 100)
                          }
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="20"
                          cx="24"
                          cy="24"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-semibold">
                          {uploadProgress}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
                accept="image/*"
                disabled={isUploading}
              />
            </label>
          </div>
        </div>

        {/* General Information and Products & Discount Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* General Information */}
          <div className="bg-white rounded-xl shadow-lg p-3 md:p-5">
            <h2 className="text-lg xl:text-2xl font-gray-700 font-medium">
              General Information
            </h2>

            <div className="space-y-6 px-3 py-5">
              <div>
                <p className="text-sm xl:text-xl font-semibold text-gray-600 mb-2">
                  Collection Name
                </p>
                <input
                  type="text"
                  name="collectionName"
                  value={formData.collectionName}
                  onChange={handleInputChange}
                  className="font-semibold text-sm xl:text-lg w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                  placeholder="Jacket With Products"
                />
              </div>

              <div>
                <p className="text-sm xl:text-xl font-semibold text-gray-600 mb-2">
                  Collection Description
                </p>
                <textarea
                  name="collectionDescription"
                  value={formData.collectionDescription}
                  onChange={handleInputChange}
                  className="text-sm xl:text-lg w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                  rows={4}
                  placeholder="Enter collection description..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm xl:text-xl text-gray-600 font-semibold mb-2">
                    Publish Type
                  </p>
                  <select
                    name="publishType"
                    value={formData.publishType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                  >
                    <option value="">Select Type</option>
                    <option value="Instant">Instant</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>
                <div>
                  <p className="text-sm xl:text-xl text-gray-600 font-semibold mb-2">
                    Date & Time
                  </p>
                  <input
                    type="datetime-local"
                    name="publishDate"
                    value={formData.publishDate}
                    onChange={handleInputChange}
                    min={
                      formData.publishType === "Scheduled"
                        ? getMinDateTime()
                        : undefined
                    }
                    className={`w-full px-4 py-2 rounded-lg border ${
                      dateError ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-[#26B893]`}
                    disabled={formData.publishType === "Instant"}
                  />
                  {dateError && (
                    <p className="text-red-500 text-sm mt-1">{dateError}</p>
                  )}
                </div>
              </div>
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm xl:text-xl text-gray-600 font-semibold mb-2">
                    Publish Type
                  </p>
                  <select
                    name="publishType"
                    value={formData.publishType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                  >
                    <option value="Instant">Instant</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>
                <div>
                  <p className="text-sm xl:text-xl text-gray-600 font-semibold mb-2">
                    Date & Time
                  </p>
                  <input
                    type="datetime-local"
                    name="publishDate"
                    value={formData.publishDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                  />
                </div>
              </div> */}

              <div>
                <p className="text-sm xl:text-xl text-gray-600 font-bold mb-2">
                  Story Link
                </p>
                <input
                  type="url"
                  name="storyLink"
                  value={formData.storyLink}
                  onChange={handleInputChange}
                  className="text-sm xl:text-lg w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                  placeholder="Enter story link"
                />
              </div>
            </div>
          </div>

          {/* Products & Discount Section */}
          <div className="space-y-6 bg-white rounded-xl shadow-lg p-3 md:p-5">
            <div>
              <h2 className="text-sm xl:text-xl text-gray-600 font-bold mb-2">
                Products
              </h2>
              {/* Selected products display */}
              <div className="mt-4">
                <div className="flex flex-col flex-wrap gap-2">
                  {formData.products.map((item) => {
                    // Find the product details from the products array
                    const product = products.find(
                      (p) => p._id === item.productId
                    );
                    return product ? (
                      <div
                        key={item.productId}
                        className="bg-[#DEFFF0] px-3 py-3 rounded-lg flex justify-between items-center gap-2"
                      >
                        <span className="capitalize text-[#05be68] text-[16px] lg:text-lg">
                          {product.productName}
                        </span>
                        <RiCloseFill
                          onClick={() => handleRemoveProduct(item.productId)}
                          className="text-2xl text-[#05be68] hover:text-[#288d5e] cursor-pointer hover:scale-x-110"
                        />
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
              <div className="relative w-full">
                <button
                  type="button"
                  onClick={() => setIsOpenDropDown(!isOpenDropDown)}
                  className="px-3 py-2 my-5 w-full text-gray-600 hover:bg-gray-100 rounded-md flex justify-between items-center border focus:ring-2 focus:ring-[#26B893] border-gray-300"
                >
                  Select Products
                  <IoIosArrowDropdownCircle
                      className={`text-2xl ml-1 text-gray-400 transition-transform ${
                        isOpenDropDown ? "-rotate-180" : "-rotate-0"
                      }`}/>
                </button>

                {/* Dropdown menu */}
                {isOpenDropDown && (
                  <div className="absolute right-0 mt-0 w-full bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <ul className="py-1">
                      {products?.map((product) => (
                        <li key={product._id}>
                          <label className="flex items-center w-full px-4 py-2 cursor-pointer hover:bg-gray-100">
                            <input
                              type="checkbox"
                              name="product"
                              value={product._id}
                              checked={formData.products.some(
                                (item) => item.productId === product._id
                              )}
                              onChange={() =>
                                handleProductSelection(product._id)
                              }
                              className="mr-2"
                            />
                            <span className="text-base text-gray-700 capitalize">
                              {product.productName}
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Discount Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm xl:text-2xl text-gray-600 font-bold mb-2">
                  Discount
                </h2>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isDiscountEnabled}
                    onChange={handleDiscountToggle}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#9ffcd2] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4DEAA2]"></div>
                </label>
              </div>

              {isDiscountEnabled && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm xl:text-xl text-gray-600 font-bold mb-2">
                      Discount Amount
                    </p>
                    <input
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                      placeholder="Enter discount amount"
                    />
                  </div>

                  <div>
                    <p className="text-sm xl:text-xl text-gray-600 font-bold mb-2">
                      Discount Period
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="date"
                        name="fromDate"
                        value={formData.fromDate}
                        disabled={true}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
                      />
                      <input
                        type="date"
                        name="toDate"
                        value={formData.toDate}
                        onChange={handleInputChange}
                        min={getMinToDate()}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                      />
                      {dateError && (
                        <p className="text-red-500 text-sm mt-1">{dateError}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#26B893] text-white rounded-lg hover:bg-[#6bd1b8] focus:outline-none focus:ring-2 focus:ring-[#26B893] focus:ring-offset-2"
          >
            Create New Collection
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewCollection;
//{
//  "collectionName": "df",
//  "collectionDescription": "sc",
//  "publishType": "Instant",
//  "publishDate": "",
//  "fromDate": "2025-02-11",
//  "toDate": "2025-02-26",
//  "displayImage": "https://res.cloudinary.com/dv51da0o9/image/upload/v1740460850/fn25oyl331brz8zy5no8.png",
//  "discount": "12",
//  "products": [],
//  "storyLink": "https://dsf.com"
//}

// import { useState } from "react";
// import { IoIosArrowDropdownCircle } from "react-icons/io";

// const CreateNewCollection = () => {
//   const [selectedProducts, setSelectedProducts] = useState(["Jacket"]);
//   const [isDiscountEnabled, setIsDiscountEnabled] = useState(false);
//   const [isOpenDropDown, setIsOpenDropDown] = useState(false);

//   console.log(isDiscountEnabled);

//   return (
//     <div className=" mx-auto py-5 md:p-6 ">
//       <h1 className="text-2xl font-semibold mb-6">Create Collection</h1>

//       {/* Display Image Section */}
//       <div className="mb-8 bg-white rounded-xl shadow-lg p-5">
//         <h2 className="text-lg xl:text-xl font-gray-700 font-medium">
//           Display Image
//         </h2>
//         <div className="pt-5 mb-8 flex justify-center items-center">
//           <div className="border-2 md:border-4 bg-slate-100 border-dashed border-gray-300 rounded-lg p-8 w-48 h-40 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-8 w-8 text-gray-400 mb-2"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
//               />
//             </svg>
//             <p className="text-base text-gray-500">Upload PNG</p>
//             <p className="text-sm text-gray-400">1024 x 320 Pixels</p>
//           </div>
//         </div>
//       </div>

//       {/* General Information */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="bg-white rounded-xl shadow-lg p-3 md:p-5">
//           <h2 className="text-lg xl:text-2xl font-gray-700 font-medium">
//             General Information
//           </h2>

//           <div className="space-y-6 px-3 py-5">
//             <div>
//               <p className="text-sm xl:text-xl font-semibold text-gray-600 mb-2">
//                 Collection Name
//               </p>
//               <input
//                 type="text"
//                 className="font-semibold text-sm xl:text-lg w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
//                 placeholder="Jacket With Products"
//               />
//             </div>

//             <div>
//               <p className="text-sm xl:text-xl font-semibold text-gray-600 mb-2">
//                 Collection Description
//               </p>
//               <textarea
//                 className="text-sm xl:text-lg w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
//                 rows={4}
//                 placeholder="Enter collection description..."
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm xl:text-xl text-gray-600 font-semibold mb-2">
//                   Publish Type
//                 </p>
//                 <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]">
//                   <option>Instant</option>
//                 </select>
//               </div>
//               <div>
//                 <p className="text-sm xl:text-xl text-gray-600 font-semibold mb-2">
//                   Date & Time
//                 </p>
//                 <input
//                   type="datetime-local"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
//                 />
//               </div>
//             </div>

//             <div>
//               <p className="text-sm xl:text-xl text-gray-600 font-bold mb-2">
//                 Story Link
//               </p>
//               <input
//                 type="url"
//                 className="text-sm xl:text-lg  w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
//                 placeholder="Enter story link"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Products & Discount Section */}
//         <div className="space-y-6 bg-white rounded-xl shadow-lg p-3 md:p-5">
//           <div>
//             <h2 className="text-sm xl:text-xl text-gray-600 font-bold mb-2">
//               Products
//             </h2>
//             <div className="relative w-full">
//               {/* Dropdown button */}
//               <button
//                 onClick={() => setIsOpenDropDown(!isOpenDropDown)}
//                 className="px-3 py-2 my-5 w-full text-gray-600 hover:bg-gray-100 rounded-md flex justify-between items-center border focus:ring-2 focus:ring-[#26B893] border-gray-300"
//               >
//                 Select Product
//                 <IoIosArrowDropdownCircle className="text-2xl" />
//               </button>

//               {/* Dropdown menu */}
//               {isOpenDropDown && (
//                 <div className="absolute right-0 mt-0 w-full bg-white rounded-md shadow-lg z-10 border border-gray-200">
//                   <ul className="py-1">
//                     <li className="block cursor-pointer text-base px-4 py-2  text-gray-700 hover:bg-gray-100">
//                       Black Jacket
//                     </li>
//                     <li className="block cursor-pointer text-base px-4 py-2  text-gray-700 hover:bg-gray-100">
//                       Green Jacket
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//             <button className="text-base text-gray-700 font-bold bg-[#a7f8d3] px-4 py-2 rounded-2xl">
//               + Add Products
//             </button>
//           </div>

//           <div>
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-sm xl:text-2xl text-gray-600 font-bold mb-2">
//                 Discount
//               </h2>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="sr-only peer"
//                   checked={isDiscountEnabled}
//                   onChange={() => setIsDiscountEnabled(!isDiscountEnabled)}
//                 />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#9ffcd2] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#a7f8d3]"></div>
//               </label>
//             </div>

//             {isDiscountEnabled && (
//               <div className="space-y-4">
//                 <div>
//                   <p className="text-sm xl:text-xl text-gray-600 font-bold mb-2">
//                     Discount Amount
//                   </p>
//                   <input
//                     type="number"
//                     className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
//                     placeholder="Enter discount amount"
//                   />
//                 </div>

//                 <div>
//                   <p className="text-sm xl:text-xl text-gray-600 font-bold mb-2">
//                     Discount Period
//                   </p>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <input
//                       type="date"
//                       className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
//                       placeholder="From"
//                     />
//                     <input
//                       type="date"
//                       className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
//                       placeholder="To"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Submit Button */}
//       <div className="mt-8 flex justify-end">
//         <button className="px-6 py-3 bg-[#26B893] text-white rounded-lg hover:bg-[#6bd1b8] focus:outline-none focus:ring-2 focus:ring-[#26B893] focus:ring-offset-2">
//           Create New Collection
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateNewCollection;
