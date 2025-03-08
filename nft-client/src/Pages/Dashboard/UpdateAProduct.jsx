import React, { useEffect, useState } from "react";
import { fileUpload } from "../../utils/cloudinary.js";
import { rawFileUpload } from "../../utils/cloudinaryForRaw.js";
import Swal from "sweetalert2";
import { addproduct } from "../../features/product/productSlice.js";
import { useAddProductMutation, useUpdateProductInfoMutation } from "../../features/product/productApi.js";
import UpdateProduct from "../NFT/UpdateProduct/UpdateProduct.jsx";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import sizeChart from "../../assets/nft-image/size-chart.png";
import { FaPlus } from "react-icons/fa";
import { useGetAllCollectionQuery } from "../../features/collection/collectionApi.js";
import { FiCheckCircle } from "react-icons/fi";
import { useLoaderData } from "react-router-dom";

const UpdateAProduct = () => {
  const [addProduct] = useAddProductMutation();
    const [updateProductInfo] = useUpdateProductInfoMutation();
  const { data: getAllCollection } = useGetAllCollectionQuery();
  const productData = useLoaderData();
  const collections = getAllCollection?.data;

  console.log(collections);

  // --------------- Add product start -------------------//

  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    displayImage: "",
    colors: [],
    price: "",
    stock: "",
    buyingLink: "",
    extraVideos: [],
    extraImages: [],
    digitalAssets: {
      arversion: "",
      vrversion: "",
      dfile: "",
      technicaldesignbook: "",
      virtuallobbyaccesskey: "",
      ownershipofstory: "",
      certification: "",
      sandboxwearable: "",
      vrchatwearable: "",
      animated: "",
      recroom: "",
    },
    collection: {
      collectionId: "",
    },
    tokenDetails: {
      blockchain: "",
      tokenstandard: "",
      contractaddress: "",
      contractlink: "",
    },
    sizeChart: "",
    sizeWithMaterial: [
      { material: "cotton", sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"] },
    ],
  });

  useEffect(() => {
    if (productData?.data) {
      const product = productData.data;
      setFormData({
        productName: product.productName || "",
        productDescription: product.productDescription || "",
        displayImage: product.displayImage || "",
        colors: product.colors || [],
        price: product.price || "",
        stock: product.stock || "",
        buyingLink: product.buyingLink || "",
        extraVideos: product.extraVideos || [],
        extraImages: product.extraImages || [],
        digitalAssets: product.digitalAssets || {
          arversion: product.arversion || "",
          vrversion: product.virtuallobbyaccesskey || "",
          dfile: product.dfile || "",
          technicaldesignbook: product.technicaldesignbook || "",
          virtuallobbyaccesskey: product.virtuallobbyaccesskey || "",
          ownershipofstory: product.ownershipofstory || "",
          certification: product.certification || "",
          sandboxwearable: product.sandboxwearable || "",
          vrchatwearable: product.vrchatwearable || "",
          animated: product.animated || "",
          recroom: product.recroom || "",
        },
        collection: product.collection || {
          collectionId: "",
        },
        tokenDetails: product.tokenDetails || {
          blockchain: product.blockchain || "",
          tokenstandard: product.tokenstandard || "",
          contractaddress: product.contractaddress || "",
          contractlink: product.contractlink || "",
        },
        sizeChart: product.sizeChart || "",
        sizeWithMaterial: product.sizeWithMaterial || [
          {
            material: "cotton",
            sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
          },
        ],
      });
    }
  }, [productData]);

  const [currentColor, setCurrentColor] = useState("");
  const [currentVideo, setCurrentVideo] = useState("");
  const [isOpenAsset, setIsOpenAsset] = useState(false);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const onInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name.startsWith("digitalAssets.")) {
        return {
          ...prev,
          digitalAssets: {
            ...prev.digitalAssets,
            [name.split(".")[1]]: value,
          },
        };
      }

      if (name.startsWith("tokenDetails.")) {
        return {
          ...prev,
          tokenDetails: {
            ...prev.tokenDetails,
            [name.split(".")[1]]: value,
          },
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAddColor = () => {
    if (currentColor && !formData.colors.includes(currentColor)) {
      setFormData({ ...formData, colors: [...formData.colors, currentColor] });
      setCurrentColor("");
    }
  };

  const handleRemoveColor = (colorToRemove) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter((color) => color !== colorToRemove),
    });
  };

  const [previewImage, setPreviewImage] = useState("");
  const [previewVideos, setPreviewVideos] = useState([]);

  const handleImageUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const uploadedUrl = await fileUpload(file);
      if (type === "displayImage") {
        setFormData({ ...formData, displayImage: uploadedUrl });
        setPreviewImage(uploadedUrl);
      } else if (type === "extraImages") {
        setFormData({
          ...formData,
          extraImages: [...formData.extraImages, uploadedUrl],
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const [count, setCount] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!isUploading) {
      setCount(0); // Reset count when upload is complete
      return;
    }

    const generateRandomSteps = () => {
      const numberOfSteps = 8;
      let steps = [];
      let previousTarget = 0;

      for (let i = 0; i < numberOfSteps - 1; i++) {
        const minTarget = previousTarget + 5;
        const maxTarget = Math.min(95, previousTarget + 25);
        const target = Math.floor(
          Math.random() * (maxTarget - minTarget) + minTarget
        );

        steps.push({
          target,
          duration: Math.random() * 1000 + 500,
        });

        previousTarget = target;
      }

      steps.push({ target: 100, duration: 2000 });
      return steps;
    };

    const steps = generateRandomSteps();
    let currentStep = 0;

    const animate = () => {
      if (currentStep >= steps.length) return;

      const step = steps[currentStep];
      const startValue = currentStep > 0 ? steps[currentStep - 1].target : 0;
      const increment = (step.target - startValue) / (step.duration / 50);
      let currentValue = startValue;

      const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= step.target) {
          currentValue = step.target;
          clearInterval(interval);
          currentStep++;
          if (currentStep < steps.length) {
            animate();
          }
        }
        setCount(Math.round(currentValue));
      }, 50);

      return () => clearInterval(interval);
    };

    animate();
  }, [isUploading]);

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const uploadId = Date.now().toString();
    setUploadProgress((prev) => ({
      ...prev,
      [uploadId]: 0,
    }));

    try {
      const uploadedUrl = await rawFileUpload(file, "video", (progress) => {
        setUploadProgress((prev) => ({
          ...prev,
          [uploadId]: progress,
        }));
      });

      setFormData({
        ...formData,
        extraVideos: [...formData.extraVideos, uploadedUrl],
      });
      setPreviewVideos([...previewVideos, uploadedUrl]);
      setIsUploading(false);

      // Clear progress after successful upload
      setUploadProgress((prev) => {
        const newProgress = { ...prev };
        delete newProgress[uploadId];
        return newProgress;
      });
    } catch (error) {
      console.error("Error uploading video:", error);
      // Clear progress on error
      setUploadProgress((prev) => {
        const newProgress = { ...prev };
        delete newProgress[uploadId];
        return newProgress;
      });

      // Show error message
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Failed to upload video. Please try again.",
      });
    }
  };
  // size

  // Add these states at the top of your component
  const [sizeChartUploadCount, setSizeChartUploadCount] = useState(0);
  const [isSizeChartUploading, setIsSizeChartUploading] = useState(false);

  // Add this useEffect for size chart upload progress
  useEffect(() => {
    if (!isSizeChartUploading) {
      setSizeChartUploadCount(0);
      return;
    }

    const generateRandomSteps = () => {
      const numberOfSteps = 8;
      let steps = [];
      let previousTarget = 0;

      for (let i = 0; i < numberOfSteps - 1; i++) {
        const minTarget = previousTarget + 5;
        const maxTarget = Math.min(95, previousTarget + 25);
        const target = Math.floor(
          Math.random() * (maxTarget - minTarget) + minTarget
        );

        steps.push({
          target,
          duration: Math.random() * 1000 + 500,
        });

        previousTarget = target;
      }

      steps.push({ target: 100, duration: 2000 });
      return steps;
    };

    const steps = generateRandomSteps();
    let currentStep = 0;

    const animate = () => {
      if (currentStep >= steps.length) return;

      const step = steps[currentStep];
      const startValue = currentStep > 0 ? steps[currentStep - 1].target : 0;
      const increment = (step.target - startValue) / (step.duration / 50);
      let currentValue = startValue;

      const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= step.target) {
          currentValue = step.target;
          clearInterval(interval);
          currentStep++;
          if (currentStep < steps.length) {
            animate();
          } else {
            setIsSizeChartUploading(false);
          }
        }
        setSizeChartUploadCount(Math.round(currentValue));
      }, 50);

      return () => clearInterval(interval);
    };

    animate();
  }, [isSizeChartUploading]);

  // Update the handleSizeChartUpload function
  const handleSizeChartUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsSizeChartUploading(true);

    try {
      const uploadedUrl = await rawFileUpload(file, "raw");
      setFormData({ ...formData, sizeChart: uploadedUrl });
    } catch (error) {
      console.error("Error uploading size chart:", error);
    }
  };

  // const handleVideoUpload = async (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   try {
  //     const uploadedUrl = await rawFileUpload(file, "video");
  //     setFormData({
  //       ...formData,
  //       extraVideos: [...formData.extraVideos, uploadedUrl],
  //     });
  //     setPreviewVideos([...previewVideos, uploadedUrl]);
  //   } catch (error) {
  //     console.error("Error uploading video:", error);
  //   }
  // };

  // const handleSizeChartUpload = async (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   try {
  //     const uploadedUrl = await rawFileUpload(file, "raw");
  //     setFormData({ ...formData, sizeChart: uploadedUrl });
  //   } catch (error) {
  //     console.error("Error uploading size chart:", error);
  //   }
  // };

  const [currentMaterial, setCurrentMaterial] = useState("");
  const [currentSizes, setCurrentSizes] = useState([]);

  // Inside your component
  const toggleSizeSelection = (materialIndex, size) => {
    setCurrentSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );

    setFormData((prev) => ({
      ...prev,
      sizeWithMaterial: prev.sizeWithMaterial.map((entry, index) =>
        index === materialIndex
          ? {
              ...entry,
              sizes: entry.sizes.includes(size)
                ? entry.sizes.filter((s) => s !== size)
                : [...entry.sizes, size],
            }
          : entry
      ),
    }));
  };

  const handleAddRow = () => {
    setFormData({
      ...formData,
      sizeWithMaterial: [
        ...formData.sizeWithMaterial,
        { material: "", sizes: [] },
      ],
    });
  };

  // Add these functions to your component
  const handleDeleteVideo = (indexToDelete) => {
    setFormData((prev) => ({
      ...prev,
      extraVideos: prev.extraVideos.filter(
        (_, index) => index !== indexToDelete
      ),
    }));
  };

  const handleDeleteImage = (indexToDelete) => {
    setFormData((prev) => ({
      ...prev,
      extraImages: prev.extraImages.filter(
        (_, index) => index !== indexToDelete
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productId = productData?.data?._id
    // Check required fields
    const requiredFields = {
      productName: "Product Name",
      productDescription: "Product Description",
      displayImage: "Display Image",
      price: "Price",
      stock: "Stock",
      buyingLink: "Buying Link",
      colors: "Colors",
      collection: "Collection",
      sizeWithMaterial: "Size with Material",
    };

    // Check all basic required fields
    for (const [field, label] of Object.entries(requiredFields)) {
      if (
        !formData[field] ||
        (Array.isArray(formData[field]) && formData[field].length === 0) ||
        (field === "sizeWithMaterial" &&
          (!formData[field][0].material ||
            formData[field][0].sizes.length === 0)) ||
        (field === "collection" && !formData.collection?.collectionId)
      ) {
        Swal.fire({
          icon: "error",
          title: "Required Field Missing",
          text: `Please fill in the ${label} field`,
        });
        return;
      }
    }

    // Check if at least one of extraImages or extraVideos has data
    if (
      formData.extraImages.length === 0 &&
      formData.extraVideos.length === 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Required Field Missing",
        text: "Please add either Extra Images or Extra Videos",
      });
      return;
    }

    // Check all token details fields
    const tokenDetailsFields = [
      "blockchain",
      "tokenstandard",
      "contractaddress",
      "contractlink",
    ];

    for (const field of tokenDetailsFields) {
      if (!formData.tokenDetails[field]) {
        Swal.fire({
          icon: "error",
          title: "Required Field Missing",
          text: `Please fill in the Token Details - ${
            field.charAt(0).toUpperCase() + field.slice(1)
          }`,
        });
        return;
      }
    }

    console.log("form", formData);

    try {
        const response = await updateProductInfo({
            id: productId,
            data: formData
          }).unwrap();
      console.log(response);
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "You've added a new product!",
        });
        // setFormData({
        //   productName: "",
        //   productDescription: "",
        //   displayImage: "",
        //   colors: [],
        //   price: "",
        //   stock: "",
        //   buyingLink: "",
        //   extraVideos: [],
        //   extraImages: [],
        //   digitalAssets: {
        //     arversion: "",
        //     vrversion: "",
        //     dfile: "",
        //     technicaldesignbook: "",
        //     virtuallobbyaccesskey: "",
        //     ownershipofstory: "",
        //     certification: "",
        //     sandboxwearable: "",
        //     vrchatwearable: "",
        //     animated: "",
        //   },
        //   collection: {
        //     collectionId: "",
        //   },
        //   tokenDetails: {
        //     blockchain: "",
        //     tokenstandard: "",
        //     contractaddress: "",
        //     contractlink: "",
        //   },
        //   sizeChart: "",
        //   sizeWithMaterial: [
        //     {
        //       material: "cotton",
        //       sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        //     },
        //   ],
        // });

        // Reset any other state if needed
        // setCurrentColor("");
        // setPreviewImage("");
        // setPreviewVideos([]);
        // setIsOpenAsset(false);
        // setIsOpenDropDown(false);
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while adding the product!",
      });
    }
  };


  return (
    <>
      <div className="my-4 p-2 lg:p-8  min-h-screen">
        {/* edit end */}

        <h1 className="text-xl lg:text-3xl font-bold text-gray-700 rounded-xl py-5">
         Update Product
        </h1>
        <form onSubmit={handleSubmit} className="my-4">
          <div className="grid grid-cols-1  lg:grid-cols-3 gap-4 lg:gap-6">
            {/* General Information */}

            {/* box 1 */}
            <>
              <div className="col-span-1 lg:col-span-2 bg-white shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">
                  General Information
                </h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={onInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                    placeholder="Jacket With Pockets"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Product Description
                  </label>
                  <textarea
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={onInputChange}
                    className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                    rows="3"
                    placeholder="Lorem Ipsum Dolor Sit Amet Consectetur."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium">Colors</label>
                  <div className="flex  items-center space-x-2">
                    <input
                      type="color"
                      value={currentColor}
                      onChange={(e) => setCurrentColor(e.target.value)}
                      className="w-8 h-8 rounded-[800px] "
                    />
                    <button
                      type="button"
                      onClick={handleAddColor}
                      className="p-2 bg-blue-500 text-white rounded-md"
                    >
                      Save Color
                    </button>
                  </div>
                  <div className="mt-2 flex space-x-2">
                    {formData.colors.map((color, index) => (
                      <div key={index} className="relative group">
                        <div
                          className="w-8 h-7 border rounded-md"
                          style={{ backgroundColor: color }}
                        ></div>
                        <button
                          onClick={() => handleRemoveColor(color)}
                          className="absolute top-0 right-0 -mt-2 -mr-2 bg-[#26B893] text-white w-4 h-4 flex items-center justify-center rounded-full text-xs opacity-0 group-hover:opacity-100"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>

            {/* box 2 */}
            <>
              <div className="bg-white shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] p-2">
                <h2 className="text-lg font-semibold mb-4">Display Image</h2>

                <input
                  type="file"
                  id="display"
                  onChange={(e) => handleImageUpload(e, "displayImage")}
                  className="mb-2 hidden"
                />
                {formData.displayImage ? (
                  <div className="relative m-2 border bg-[#fff] rounded flex flex-col space-y-3 items-center justify-center">
                    <img
                      src={formData.displayImage}
                      alt="Preview"
                      className="object-cover border border-[#26B893] rounded"
                    />

                    <div
                      onClick={() =>
                        setFormData({ ...formData, displayImage: "" })
                      }
                      className="absolute -top-5 -right-2 bg-[#26B893] text-white rounded-full font-bold mt-2 p-1 "
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
                  <div className="m-2 bg-white rounded flex flex-col items-center justify-center">
                    <img
                      src="https://img.freepik.com/free-vector/goal-achievement-teamwork-business-concept-career-growth-cooperation-development-project_107791-29.jpg"
                      alt="Preview"
                      className="object-cover h-full rounded"
                    />
                    <label htmlFor="display">
                      <p className="text-base text-center text-gray-700 font-bold bg-[#a7f8d3] px-4 py-2 rounded-xl">
                        Select an Image
                      </p>
                    </label>
                  </div>
                )}
              </div>
            </>

            {/* box 3 */}
            <div className="col-span-1 lg:col-span-2 bg-white shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] p-6">
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Extra Videos</h2>
                <div className="grid grid-cols-3 gap-y-2 md:gap-y-4 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6 3xl:grid-cols-7 xl:gap-x-1 mb-4">
                  {formData.extraVideos.map((url, idx) => (
                    <div
                      key={`video-${idx}`}
                      className="relative w-16 xs:w-20 h-16  md:w-24 md:h-20 bg-gray-100 rounded-lg border-2 border-[#26B893] group"
                    >
                      <video
                        src={url}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div
                        onClick={() => handleDeleteVideo(idx)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-[#26B893] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#5ad8b8]"
                      >
                        <svg
                          className="w-4 h-4"
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
                  ))}

                  {/* Upload Progress Indicators */}
                  {Object.entries(uploadProgress).map(
                    ([uploadId, progress]) => (
                      <div
                        key={uploadId}
                        className="relative w-16 xs:w-20 h-16  md:w-24 md:h-20 bg-gray-100 rounded-lg border-2 border-[#26B893] flex items-center justify-center"
                      >
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
                              strokeDashoffset={125.6 * ((100 - count) / 100)}
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
                              {count}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  )}

                  {/* Upload Button */}
                  <div
                    className="border-2 border-dashed border-[#26B893] w-16 xs:w-20 h-16  md:w-24 md:h-20 flex items-center justify-center bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      document.getElementById("video-upload").click()
                    }
                  >
                    <svg
                      className="bg-[#26B893] w-6 h-6 text-[#fff] rounded"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <input
                    id="video-upload"
                    type="file"
                    onChange={handleVideoUpload}
                    className="hidden"
                    accept="video/*"
                  />
                </div>
              </div>
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Extra Images</h2>
                <div className="grid grid-cols-3 gap-y-2 md:gap-y-4 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6 3xl:grid-cols-7 xl:gap-x-1 mb-4">
                  {formData.extraImages.map((url, idx) => (
                    <div
                      key={`image-${idx}`}
                      className="relative w-w-16 xs:w-20 h-16  md:w-24 md:h-20 bg-gray-100 rounded-lg border-2 border-[#26B893] group"
                    >
                      <img
                        src={url}
                        alt={`Extra ${idx}`}
                        className="w-full h-full object-cover rounded-lg"
                      />

                      <div
                        onClick={() => handleDeleteImage(idx)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-[#26B893] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#5ad8b8]"
                      >
                        <svg
                          className="w-4 h-4"
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
                  ))}
                  <div
                    className="w-w-16 xs:w-20 h-16  md:w-24 md:h-20 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-[#26B893] hover:bg-gray-100"
                    onClick={() =>
                      document.getElementById("image-upload").click()
                    }
                  >
                    <svg
                      className="bg-[#26B893] w-6 h-6 text-[#fff] rounded"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    onChange={(e) => handleImageUpload(e, "extraImages")}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              </div>
            </div>

            {/* box 4 */}
            {/* Pricing And Stock */}
            <>
              <div className=" bg-white shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">
                  Pricing And Stock
                </h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={onInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                    placeholder="$45.66"
                  />
                </div>
                <div className="mb-4">
  <label className="block text-sm font-medium mb-2">
    Stock
  </label>
  <select
    name="stock"
    value={formData.stock}
    onChange={onInputChange}
    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#26B893]"
  >
    <option value="">Select</option>
    <option value="available">In Stock</option>
    <option value="notAvailable">Out of Stock</option>
  </select>
</div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Buying link
                  </label>
                  <input
                    type="text"
                    name="buyingLink"
                    value={formData.buyingLink}
                    onChange={onInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                    placeholder="Crossmint link"
                  />
                </div>
              </div>
            </>

            {/* box 5 */}
            {/* Digital Assets */}
            <>
              <div className="col-span-1 lg:col-span-2 bg-white shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Digital Assets</h2>
                {[
                  "AR Version",
                  "VR Version",
                  "3D File",
                  "Technical Design Book",
                  "Virtual Lobby Access Key",
                  "Ownership Of Story",
                ].map((label, index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      {label}
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                      name={`digitalAssets.${label
                        .replace(/[^a-zA-Z]+/g, "")
                        .toLowerCase()}`}
                      value={
                        formData.digitalAssets[
                          label.replace(/[^a-zA-Z]+/g, "").toLowerCase()
                        ] || ""
                      }
                      onChange={onInputChange}
                    />
                  </div>
                ))}

                {isOpenAsset && (
                  <>
                    {[
                      "Certification",
                      "Sandbox Wearable",
                      "VR Chat Wearable",
                      "Animated",
                      "Recroom",
                    ].map((label, index) => (
                      <div key={index} className="mb-4">
                        <label className="block text-sm font-medium mb-2 ">
                          {label}
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                          name={`digitalAssets.${label
                            .replace(/[^a-zA-Z]+/g, "")
                            .toLowerCase()}`}
                          value={
                            formData.digitalAssets[
                              label.replace(/[^a-zA-Z]+/g, "").toLowerCase()
                            ] || ""
                          }
                          onChange={onInputChange}
                        />
                      </div>
                    ))}
                  </>
                )}

                <div
                  onClick={() => setIsOpenAsset(!isOpenAsset)}
                  className="flex items-center justify-center  "
                >
                  {isOpenAsset === true ? (
                    <svg
                      className={`w-8 h-8 border hover:bg-gray-100 rounded transform transition-transform duration-300 ${
                        isOpenAsset ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className={`w-8 h-8 border hover:bg-gray-100 rounded transform transition-transform duration-300 ${
                        isOpenAsset ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </>

            {/* box 6 */}
            <>
              {/* Token Details */}
              <div className="space-y-5">
                <div className="bg-white shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] p-6 rounded-lg">
                  <h2 className="text-sm xl:text-xl text-gray-600 font-bold mb-2">
                    Collection
                  </h2>
                  <div className="relative w-full">
                    <div
                      onClick={() => setIsOpenDropDown(!isOpenDropDown)}
                      className="px-3 py-2 my-5 capitalize w-full text-gray-600 hover:bg-gray-100 rounded-md flex justify-between items-center border focus:ring-2 focus:ring-[#26B893] border-gray-300"
                    >
                      {collections?.find(
                        (c) => c._id === formData.collection?.collectionId
                      )?.collectionName || "Select Collection"}
                      <IoIosArrowDropdownCircle className="text-2xl" />
                    </div>

                    {isOpenDropDown && (
                      <div className="absolute right-0 mt-0 w-full bg-white rounded-md shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] z-10 border border-gray-200">
                        <ul className="py-1">
                          {collections?.map((collection, i) => (
                            <li key={i}>
                              <label className="flex items-center w-full px-4 py-2 cursor-pointer hover:bg-gray-100">
                                <input
                                  type="radio"
                                  name="collection"
                                  value={collection._id}
                                  checked={
                                    formData.collection?._id === collection._id
                                  }
                                  onChange={() => {
                                    setFormData({
                                      ...formData,
                                      collection: {
                                        collectionId: collection._id,
                                      },
                                    });
                                    setIsOpenDropDown(false);
                                  }}
                                  className="mr-2"
                                />
                                <span className="text-base text-gray-700 capitalize">
                                  {collection.collectionName}
                                </span>
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="w-40 text-base text-gray-700 font-bold bg-[#a7f8d3] px-4 py-2 rounded-2xl">
                    Add Collection
                  </div>
                </div>

                <div className="bg-white shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] p-6 rounded-lg">
                  <h2 className="text-lg font-semibold mb-4">Token Details</h2>
                  {[
                    "Blockchain",
                    "Token Standard",
                    "Contract Address",
                    "Contract Link",
                  ].map((label, index) => (
                    <div key={index} className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        {label}
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                        name={`tokenDetails.${label
                          .replace(/[^a-zA-Z]+/g, "")
                          .toLowerCase()}`}
                        value={
                          formData.tokenDetails[
                            label.replace(/[^a-zA-Z]+/g, "").toLowerCase()
                          ] || ""
                        }
                        onChange={onInputChange}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-1 lg:col-span-3 bg-white shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">
                  Size And Materials:
                </h2>


                <div className="flex items-center space-x-2 mb-4">
                  <h2 className="text-lg font-medium">Size Chart:</h2>
                  <label htmlFor="size" className="relative cursor-pointer">
                    {formData.sizeChart ? (
                      <div
                        className="py-2 px-3 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-[#26B893] hover:bg-gray-100"
                        onClick={() =>
                          document.getElementById("image-upload").click()
                        }
                      >
                        <span className="text-[#26B893] font-bold">
                          Uploaded
                        </span>{" "}
                        <FiCheckCircle className="text-xl ml-2 text-[#26B893]" />
                      </div>
                    ) : (
                      <img
                        className="h-14 w-24"
                        src={sizeChart}
                        alt="Size Chart"
                      />
                    )}

                    {/* Progress Indicator */}
                    {isSizeChartUploading && (
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
                                125.6 * ((100 - sizeChartUploadCount) / 100)
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
                              {sizeChartUploadCount}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    accept=".pdf, .png, .jpg, .jpeg, .gif, .webp"
                    id="size"
                    onChange={handleSizeChartUpload}
                    className="hidden"
                    disabled={isSizeChartUploading}
                  />
                </div>

                <div className="relative">
                  {formData.sizeWithMaterial.map((entry, index) => (
                    <div key={index} className="mb-4 w-11/12">
                      <div className="flex flex-col lg:flex-row justify-between gap-2 mb-2">
                        <div className="w-full lg:w-9/12 ">
                          <p className="text-sm text-gray-900 py-1 font-semibold">
                            Seclect Size
                          </p>
                          <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                            {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map(
                              (size) => (
                                <button
                                  key={size}
                                  type="button"
                                  className={`p-2 border rounded ${
                                    entry.sizes.includes(size)
                                      ? "bg-[#A7F8D3]"
                                      : "bg-gray-200"
                                  }`}
                                  onClick={() =>
                                    toggleSizeSelection(index, size)
                                  }
                                >
                                  {size}
                                </button>
                              )
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-900 py-1 font-semibold">
                            Metarials
                          </p>
                          <input
                            type="text"
                            placeholder="Material"
                            value={entry.material}
                            onChange={(e) => {
                              const updatedMaterial = e.target.value;
                              setFormData((prev) => {
                                const updated = [...prev.sizeWithMaterial];
                                updated[index].material = updatedMaterial;
                                return { ...prev, sizeWithMaterial: updated };
                              });
                            }}
                            className="p-2 border rounded text-lg focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div
                    onClick={handleAddRow}
                    className="bg-[#2CBA7A] rounded-full  absolute -bottom-9 right-0 md:bottom-0 md:right-5"
                  >
                    <FaPlus className="m-2 text-white  text-center text-[15px] md:text-xl" />
                  </div>
                </div>
              </div>
            </>
          </div>

          <div className="float-right my-6">
            <button className="w-full text-xl bg-[#2CBA7A] text-white py-2 px-4 rounded hover:bg-[#42bd86]">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateAProduct;
