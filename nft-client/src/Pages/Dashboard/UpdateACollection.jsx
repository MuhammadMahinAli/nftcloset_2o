import { useState, useEffect } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Swal from "sweetalert2";
import { useGetAllProductQuery } from "../../features/product/productApi";
import { RiCloseFill } from "react-icons/ri";
import { useUpdateCollectionInfoMutation } from "../../features/collection/collectionApi";
import { useLoaderData } from "react-router-dom";
import { fileUpload } from "../utils/cloudinary";
import { rawFileUpload } from "../utils/cloudinaryForRaw";

const UpdateACollection = () => {
  const collectionData = useLoaderData();
  //console.log("col", collectionData);
  const { data: getAllProduct } = useGetAllProductQuery();
  const [updateCollectionInfo] = useUpdateCollectionInfoMutation();
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

  useEffect(() => {
    if (collectionData?.data) {
      const collection = collectionData.data;
      setFormData({
        collectionName: collection.collectionName,
        collectionDescription: collection.collectionDescription,
        publishType: "",
        publishDate: collection.publishDate,
        fromDate: collection.fromDate || "",
        toDate: collection.toDate || "",
        displayImage: collection.displayImage,
        discount: collection.discount || 0,
        products: collection.products || [],
        storyLink: collection.storyLink,
      });

      // Set discount toggle if discount exists
      setIsDiscountEnabled(!!collection.discount);
    }
  }, [collectionData]);
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

  // Handle image upload
  // const handleImageUpload = async (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   try {
  //     setIsUploading(true);
  //     setUploadProgress(0);

  //     const uploadedUrl = await fileUpload(file, (progress) => {
  //       setUploadProgress(Math.round(progress));
  //     });

  //     setFormData((prev) => ({
  //       ...prev,
  //       displayImage: uploadedUrl,
  //     }));
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Upload Failed",
  //       text: "Failed to upload image. Please try again.",
  //     });
  //   } finally {
  //     setIsUploading(false);
  //     setUploadProgress(0);
  //   }
  // };
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

  // handleProductSelection function
  const handleProductSelection = (product) => {
    setFormData((prev) => {
      const isSelected = prev.products.some(
        (item) => item.productId._id === product._id
      );

      if (isSelected) {
        return {
          ...prev,
          products: prev.products.filter(
            (item) => item.productId._id !== product._id
          ),
        };
      } else {
        return {
          ...prev,
          products: [
            ...prev.products,
            {
              productId: {
                _id: product._id,
              },
            },
          ],
        };
      }
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    const collectionId = collectionData?.data?._id;

    // Validation checks remain the same
    const requiredFields = {
      collectionName: "Collection Name",
      collectionDescription: "Collection Description",
      publishType: "Publish Type",
      publishDate: "Publish Date",
      toDate: "Offer End Date",
      displayImage: "Display Image",
      storyLink: "Story Link",
    };

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

    try {
      const response = await updateCollectionInfo({
        id: collectionId,
        data: formData,
      }).unwrap();

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Collection updated successfully!",
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          err.data?.message ||
          "Something went wrong while updating the collection!",
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

  console.log(formData.products);
  return (
    <div className="mx-auto py-5 md:p-6">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold mb-6">Update Collection</h1>

        {/* Display Image Section */}
        <div className="mb-8 bg-white rounded-xl shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] p-5">
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
                      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#26B893]"></div>
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
          <div className="bg-white rounded-xl shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] p-3 md:p-5">
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
          <div className="space-y-6 bg-white rounded-xl shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] p-3 md:p-5">
            <div>
              <div>
                <h2 className="text-sm xl:text-xl text-gray-600 font-bold mb-2">
                  Products
                </h2>

                {/* Selected Products Display - Green Tags */}
                <div className="space-y-2 mb-4">
                  {formData.products.map((item) => {
                    // Find the product name from the products array
                    const productDetails = products?.find(
                      (p) => p._id === item.productId._id
                    );

                    return (
                      <div
                        key={item._id}
                        className="bg-[#E8FFF4] px-4 py-2 rounded flex justify-between items-center"
                      >
                        <div className="flex items-center gap-3">
                          <div>
                            <span className="text-[#26B893] text-lg capitalize">
                              {productDetails?.productName || "Product"}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            handleProductSelection({
                              _id: item.productId._id,
                            })
                          }
                          className="text-[#26B893] hover:text-[#1a8b6f]"
                        >
                          <RiCloseFill className="text-xl" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Product Selection Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsOpenDropDown(!isOpenDropDown)}
                    className="w-full px-4 py-2 text-left text-gray-600 bg-white border rounded-md focus:outline-none focus:ring-1 focus:ring-[#26B893] flex justify-between items-center"
                  >
                    <span className="text-gray-500">
                      Select Products
                      {formData.products.length > 0 && (
                        <span className="ml-2 bg-[#E8FFF4] text-[#26B893] px-2 py-1 rounded-full text-sm">
                          {formData.products.length}
                        </span>
                      )}
                    </span>
                    <IoIosArrowDropdownCircle
                      className={`text-xl text-gray-400 transition-transform ${
                        isOpenDropDown ? "-rotate-180" : "-rotate-0"
                      }`}
                    />
                  </button>

                  {isOpenDropDown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] max-h-[300px] overflow-y-auto">
                      <div className="py-1">
                        {products?.map((product) => {
                          const isSelected = formData.products.some(
                            (item) => item.productId._id === product._id
                          );
                          return (
                            <label
                              key={product._id}
                              className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleProductSelection(product)}
                                className="w-4 h-4 text-[#26B893] border-gray-300 rounded focus:ring-[#26B893] mr-3"
                              />
                              <div className="flex items-center gap-3">
                                <div>
                                  <span className="text-gray-700 text-lg capitalize">
                                    {product.productName}
                                  </span>
                                </div>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
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
            Update Collection
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateACollection;
