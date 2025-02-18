import React, { useEffect, useState } from "react";
import { fileUpload } from "../../utils/cloudinary.js";
import { rawFileUpload } from "../../utils/cloudinaryForRaw.js";
import Swal from "sweetalert2";
import { addproduct } from "../../features/product/productSlice.js";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetAllProductQuery,
} from "../../features/product/productApi.js";
import UpdateProduct from "../NFT/UpdateProduct/UpdateProduct.jsx";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import sizeChart from "../../assets/nft-image/size-chart.png";
import { FaPlus } from "react-icons/fa";

const AddProduct = () => {
  const [addProduct] = useAddProductMutation();
  const { data: getAllProduct } = useGetAllProductQuery();
  const [deleteProduct] = useDeleteProductMutation();
  console.log(getAllProduct?.data);
  const products = getAllProduct?.data;

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

  const [currentColor, setCurrentColor] = useState("");
  const [currentVideo, setCurrentVideo] = useState("");
  const [isOpenAsset, setIsOpenAsset] = useState(false);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

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

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const uploadedUrl = await rawFileUpload(file, "video");
      setFormData({
        ...formData,
        extraVideos: [...formData.extraVideos, uploadedUrl],
      });
      setPreviewVideos([...previewVideos, uploadedUrl]);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const handleSizeChartUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const uploadedUrl = await rawFileUpload(file, "raw");
      setFormData({ ...formData, sizeChart: uploadedUrl });
    } catch (error) {
      console.error("Error uploading size chart:", error);
    }
  };

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

    // Check required fields
    const requiredFields = {
      productName: "Product Name",
      productDescription: "Product Description",
      displayImage: "Display Image",
      price: "Price",
      stock: "Stock",
      buyingLink: "Buying Link",
      colors: "Colors",
      sizeWithMaterial: "Size with Material",
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (
        !formData[field] ||
        (Array.isArray(formData[field]) && formData[field].length === 0) ||
        (field === "sizeWithMaterial" &&
          (!formData[field][0].material ||
            formData[field][0].sizes.length === 0))
      ) {
        Swal.fire({
          icon: "error",
          title: "Required Field Missing",
          text: `Please fill in the ${label} field`,
        });
        return;
      }
    }

    try {
      const response = await addProduct(formData).unwrap();
      console.log(response);
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "You've added a new product!",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2500);
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
  // --------------- Add product end -------------------//
  // --------------- edit product start -------------------//

  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newFormData, setNewFormData] = useState({});

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditMode(true);
  };

  // ------------------------delete product ------------]
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
          .unwrap()
          .then(() => {
            Swal.fire("Deleted!", "Your product has been deleted.", "success");
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: error.message,
            });
          });
      }
    });
  };

  //console.log("sp", selectedProduct);
  //console.log("nf", newFormData);
  //console.log(formData.extraVideos);
  return (
    <>
      <div className="p-8  min-h-screen">
        {/* edit end */}

        <h1 className="text-center text-3xl font-bold text-gray-700 rounded-xl py-5">
          Add New Product
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* General Information */}

            {/* box 1 */}
            <>
              <div className="col-span-2 bg-white shadow-lg p-6 rounded-lg">
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
                    className="w-full h-36 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#26B893]"
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
              {/* Display Image */}
              <div className="bg-white shadow-lg p-2">
                <h2 className="text-lg font-semibold mb-4">Display Image</h2>
                <label htmlFor="display">
                  <p className="text-base text-center text-gray-700 font-bold bg-[#a7f8d3] px-4 py-2 rounded-xl">
                    Select an Image
                  </p>
                </label>
                <input
                  type="file"
                  id="display"
                  onChange={(e) => handleImageUpload(e, "displayImage")}
                  className="mb-2 hidden"
                />
                {formData.displayImage ? (
                  <div className=" m-2 bg-[#eaeaea] rounded flex items-center justify-center">
                    <img
                      src={formData.displayImage}
                      alt="Preview"
                      className="object-cover w-52 rounded"
                    />
                  </div>
                ) : (
                  <div className="m-2 bg-[#eaeaea] rounded flex items-center justify-center">
                    <img
                      src="https://img.freepik.com/free-vector/gentleman-s-tuxedo-vector-design-element-remixed-from-artworks-by-henry-de-wolfe_53876-115546.jpg"
                      alt="Preview"
                      className="object-cover h-full w-52 rounded"
                    />
                  </div>
                )}
              </div>
            </>

            {/* box 3 */}

            {/* <div className="col-span-2 bg-white shadow-lg">
         
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Extra Images</h2>
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(e, "extraImages")}
                  className="mb-2"
                />
                <div className="flex gap-4 flex-wrap">
                  {formData.extraImages.map((url, idx) => (
                    <img
                      src={url}
                      alt={`Extra ${idx}`}
                      key={`image-preview-key-${url}`}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
          
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Extra Videos</h2>
                nav{" "}
                <div className="flex gap-3 items-center">
                  <input
                    type="file"
                    onChange={handleVideoUpload}
                    className="mb-2"
                  />
                  <div className="flex gap-4 flex-wrap">
                    {formData?.extraVideos?.map((url, idx) => (
                      <video
                        key={url}
                        src={url}
                        controls
                        style={{ borderRadius: "10px", width: "100%" }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div> */}

            <div className="col-span-2 bg-white shadow-lg p-6">
              {/* Extra Videos */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Extra Videos</h2>
                <div className="grid grid-cols-7 gap-5 mb-4">
                  {formData.extraVideos.map((url, idx) => (
                    <div
                      key={`video-${idx}`}
                      className="relative w-24 h-20 bg-gray-100 rounded-lg border-2 border-[#26B893] group"
                    >
                      <video
                        src={url}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {/* Delete Video Button */}
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
                  <div
                    className="border-2 border-dashed border-[#26B893] w-24 h-20 flex items-center justify-center bg-gray-50 rounded-lg  hover:bg-gray-100 cursor-pointer"
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

              {/* Extra Images */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Extra Images</h2>
                <div className="grid grid-cols-7 gap-5">
                  {formData.extraImages.map((url, idx) => (
                    <div
                      key={`image-${idx}`}
                      className="relative w-24 h-20 bg-gray-100 rounded-lg border-2 border-[#26B893] group"
                    >
                      <img
                        src={url}
                        alt={`Extra ${idx}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {/* Delete Image Button */}
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
                    className="w-24 h-20 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-[#26B893] hover:bg-gray-100"
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
            <>
              {/* Pricing And Stock */}
              <div className=" bg-white shadow-lg p-6 rounded-lg">
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
                  <input
                    name="stock"
                    value={formData.stock}
                    onChange={onInputChange}
                    type="number"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                    placeholder="56"
                  />
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
                    className="w-full p-2 border rounded"
                    placeholder="Crossmint link"
                  />
                </div>
              </div>
            </>

            {/* box 5 */}
            <>
              {/* Digital Assets */}
              {/* <div className="col-span-2 bg-white shadow-lg p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Digital Assets</h2>
                {[
                  "AR Version",
                  "VR Version",
                  "3D File",
                  "Technical Design Book",
                  "Virtual Lobby Access Key",
                  "Ownership Of Story",
                //   afterclick
                  "Certification",
                  "Sandbox Wearable",
                  "VR Chat Wearable",
                  "Animated",
                ].map((label, index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      {label}
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
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
              </div> */}

              <div className="col-span-2 bg-white shadow-lg p-6 rounded-lg">
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
                <div className="bg-white shadow-lg p-6 rounded-lg">
                  <h2 className="text-sm xl:text-xl text-gray-600 font-bold mb-2">
                    Collection
                  </h2>
                  <div className="relative w-full">
                    {/* Dropdown button */}
                    <div
                      onClick={() => setIsOpenDropDown(!isOpenDropDown)}
                      className="px-3 py-2 my-5 w-full text-gray-600 hover:bg-gray-100 rounded-md flex justify-between items-center border focus:ring-2 focus:ring-[#26B893] border-gray-300"
                    >
                      Select Collection
                      <IoIosArrowDropdownCircle className="text-2xl" />
                    </div>

                    {/* Dropdown menu */}
                    {isOpenDropDown && (
                      <div className="absolute right-0 mt-0 w-full bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <ul className="py-1">
                          <li className="block cursor-pointer text-base px-4 py-2  text-gray-700 hover:bg-gray-100">
                            Black Jacket
                          </li>
                          <li className="block cursor-pointer text-base px-4 py-2  text-gray-700 hover:bg-gray-100">
                            Green Jacket
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="w-40 text-base text-gray-700 font-bold bg-[#a7f8d3] px-4 py-2 rounded-2xl">
                    Add Collection
                  </div>
                </div>

                <div className="bg-white shadow-lg p-6 rounded-lg">
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
              {/* Size and Materials */}
              <div className="col-span-3 bg-white shadow-lg p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">
                  Size And Materials:
                </h2>
                <div className="flex items-center space-x-2 mb-4">
                  <h2 className="text-lg font-medium ">Size Chart:</h2>
                  <label htmlFor="size">
                    <img className="h-14 w-24" src={sizeChart} />
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    id="size"
                    onChange={handleSizeChartUpload}
                    className="w-full hidden p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                  />
                </div>

                <div className="relative">
                  {formData.sizeWithMaterial.map((entry, index) => (
                    <div key={index} className="mb-4 w-11/12">
                      <div className="flex justify-between gap-2 mb-2">
                        <div className="w-9/12 ">
                          <p className="text-lg text-gray-900 py-1 font-semibold">
                            Seclect Size
                          </p>
                          <div className="grid grid-cols-7 gap-2">
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
                          <p className="text-lg text-gray-900 py-1 font-semibold">
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
                    className="bg-[#2CBA7A] rounded-full  absolute bottom-0 right-5"
                  >
                    <FaPlus className="m-2 text-white  text-center text-xl" />
                  </div>
                </div>
              </div>
            </>
          </div>

          <div className="float-right mt-6">
            <button className="w-full text-xl bg-[#2CBA7A] text-white py-2 px-4 rounded hover:bg-[#42bd86]">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
