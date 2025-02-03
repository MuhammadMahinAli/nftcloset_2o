/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { rawFileUpload } from "../../utils/cloudinaryForRaw";
import { fileUpload } from "../../utils/cloudinary";
import { useUpdateProductInfoMutation } from "../../../features/product/productApi";
import Swal from "sweetalert2";

const UpdateProduct = ({
  editMode,
  selectedProduct,
  setSelectedProduct,
  setEditMode,
  newFormData,
  setNewFormData,
}) => {
  const [updateProductInfo] = useUpdateProductInfoMutation();
  const [currentColor, setCurrentColor] = useState("");
  //const [currentVideo, setCurrentVideo] = useState("");
  //const [currentImage, setCurrentImage] = useState("");
  useEffect(() => {
    if (selectedProduct) {
      setNewFormData((prevState) => ({
        ...prevState,
        productName: selectedProduct.productName || "",
        productDescription: selectedProduct.productDescription || "",
        displayImage: selectedProduct.displayImage || "",
        colors: selectedProduct.colors || [],
        price: selectedProduct.price || "",
        stock: selectedProduct.stock || "",
        buyingLink: selectedProduct.buyingLink || "",
        extraVideos: selectedProduct.extraVideos || [],
        extraImages: selectedProduct.extraImages || [],
        digitalAssets: {
          ...prevState.digitalAssets, // Ensures existing data isn't wiped
          arversion: selectedProduct.digitalAssets?.arversion || "",
          vrversion: selectedProduct.digitalAssets?.vrversion || "",
          dfile: selectedProduct.digitalAssets?.dfile || "",
          technicaldesignbook:
            selectedProduct.digitalAssets?.technicaldesignbook || "",
          virtuallobbyaccesskey:
            selectedProduct.digitalAssets?.virtuallobbyaccesskey || "",
          ownershipofstory:
            selectedProduct.digitalAssets?.ownershipofstory || "",
          certification: selectedProduct.digitalAssets?.certification || "",
          sandboxwearable: selectedProduct.digitalAssets?.sandboxwearable || "",
          vrchatwearable: selectedProduct.digitalAssets?.vrchatwearable || "",
          animated: selectedProduct.digitalAssets?.animated || "",
        },
        tokenDetails: {
          ...prevState.tokenDetails, // Prevents data loss
          blockchain: selectedProduct.tokenDetails?.blockchain || "",
          tokenstandard: selectedProduct.tokenDetails?.tokenstandard || "",
          contractaddress: selectedProduct.tokenDetails?.contractaddress || "",
          contractlink: selectedProduct.tokenDetails?.contractlink || "",
        },
        sizeChart: selectedProduct.sizeChart || "",
        sizeWithMaterial: selectedProduct.sizeWithMaterial || [],
      }));
    }
  }, [selectedProduct, setNewFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewFormData((prev) => {
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
    if (currentColor && !newFormData.colors.includes(currentColor)) {
      setNewFormData({
        ...newFormData,
        colors: [...newFormData.colors, currentColor],
      });
      setCurrentColor("");
    }
  };

  const handleRemoveColor = (colorToRemove) => {
    setNewFormData({
      ...newFormData,
      colors: newFormData.colors.filter((color) => color !== colorToRemove),
    });
  };

  //const handleInputChange = (e) => {
  //    setSelectedProduct((prev) => ({
  //      ...prev,
  //      [e.target.name]: e.target.value,
  //    }));
  //  };
  const [previewImage, setPreviewImage] = useState("");
  const [previewVideos, setPreviewVideos] = useState([]);
  const [currentSizes, setCurrentSizes] = useState([]);

  const handleImageUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const uploadedUrl = await fileUpload(file);
      if (type === "displayImage") {
        setNewFormData({ ...newFormData, displayImage: uploadedUrl });
        setPreviewImage(uploadedUrl);
      } else if (type === "extraImages") {
        setNewFormData({
          ...newFormData,
          extraImages: [...newFormData.extraImages, uploadedUrl],
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
      setNewFormData({
        ...newFormData,
        extraVideos: [...newFormData.extraVideos, uploadedUrl],
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
      setNewFormData({ ...newFormData, sizeChart: uploadedUrl });
    } catch (error) {
      console.error("Error uploading size chart:", error);
    }
  };
  const handleAddRow = () => {
    setNewFormData({
      ...newFormData,
      sizeWithMaterial: [
        ...newFormData.sizeWithMaterial,
        { material: "", sizes: [] },
      ],
    });
  };

  const toggleSizeSelection = (materialIndex, size) => {
    setCurrentSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );

    setNewFormData((prev) => ({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("new form data", newFormData);

    const id = selectedProduct?._id;
    // updateProductInfo({
    //   id,
    //   data: newFormData,
    // });
    // Send formData to your backend or further processing here

    try {
      const response = await  updateProductInfo({
        id,
        data: newFormData,
      }).unwrap();
      console.log(response);
      if(response.success){
        Swal.fire({
          icon: "success",
          title: "Hurry !",
          text: "You've updated product information. !",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      }
    } catch (err) {
      console.log(err);
    }

  
  };

  return (
    <div className="py-4">
      {editMode && (
        <form onSubmit={handleSubmit} className="bg-red-200 p-5">
          <button
            onClick={() => setEditMode(false)}
            className="px-3 py-3 bg-green-500 text-white rounded-xl"
          >
            Close
          </button>
          <h1 className="capitalize text-center text-3xl font-bold text-gray-700 rounded-xl py-5">
            {`  Update Product  "${newFormData?.productName}" `}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* General Information */}
            <div className="col-span-2 bg-gray-100 p-6 rounded-lg">
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
                  value={newFormData?.productName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Jacket With Pockets"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Product Description
                </label>
                <textarea
                  name="productDescription"
                  value={newFormData?.productDescription}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                  placeholder="Lorem Ipsum Dolor Sit Amet Consectetur."
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Buying link
                </label>
                <input
                  type="text"
                  name="buyingLink"
                  value={newFormData?.buyingLink}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Crossmint link"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Colors</label>
                <div className="flex  items-center space-x-2">
                  <input
                    type="color"
                    value={currentColor}
                    onChange={(e) => setCurrentColor(e.target.value)}
                    className="w-8 h-8 rounded-[800px]"
                  />
                  <button
                    type="button"
                    onClick={handleAddColor}
                    className="p-2 bg-blue-500 text-white rounded"
                  >
                    Save Color
                  </button>
                </div>
                {/* <>{selectedProduct?._id}</> */}
                <div className="mt-2 flex space-x-2">
                  {newFormData?.colors?.map((color, index) => (
                    <div key={index} className="relative group">
                      <div
                        className="w-8 h-8 border rounded-full"
                        style={{ backgroundColor: color }}
                      ></div>
                      <button
                        onClick={() => handleRemoveColor(color)}
                        className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-xs opacity-0 group-hover:opacity-100"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Display Image */}
            {/* <div className="bg-gray-100 p-6 rounded-lg">
    <h2 className="text-lg font-semibold mb-4">Display Image</h2>
    <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded">
      <p>Upload Image</p>
    </div>
  </div> */}

            {/* Display Image */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Display Image</h2>
              <input
                type="file"
                onChange={(e) => handleImageUpload(e, "displayImage")}
                className="mb-2"
              />
              {newFormData?.displayImage && (
                <div className="w-64 h-64 bg-gray-100 rounded flex items-center justify-center">
                  <img
                    src={newFormData?.displayImage}
                    alt="Preview"
                    className="object-cover w-full h-full rounded"
                  />
                </div>
              )}
            </div>

            {/* Extra Videos */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Extra Videos</h2>
              <div className="flex gap-3 items-center">
                <input
                  type="file"
                  onChange={handleVideoUpload}
                  className="mb-2"
                />
                <div className="flex gap-4 flex-wrap">
                  {newFormData?.extraVideos?.map((url, idx) => (
                    <video
                      src={url}
                      controls
                      className="rounded-md h-20"
                      key={`video-preview-key-${url}`}
                    ></video>
                  ))}
                </div>
              </div>
            </div>

            {/* Extra Images */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Extra Images</h2>
              <input
                type="file"
                onChange={(e) => handleImageUpload(e, "extraImages")}
                className="mb-2"
              />
              <div className="flex gap-4 flex-wrap">
                {newFormData?.extraImages?.map((url, idx) => (
                  <img
                    src={url}
                    alt={`Extra ${idx}`}
                    key={`image-preview-key-${url}`}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                ))}
              </div>
            </div>

            {/* Pricing And Stock */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Pricing And Stock</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Price</label>
                <input
                  type="text"
                  name="price"
                  value={newFormData?.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="$45.66"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Stock</label>
                <input
                  name="stock"
                  value={newFormData?.stock}
                  onChange={handleInputChange}
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="56"
                />
              </div>
            </div>

            {/* Digital Assets */}
            {/* <div className="col-span-2 bg-gray-100 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Digital Assets</h2>
              {[
                "AR Version",
                "VR Version",
                "3D File",
                "Technical Design Book",
                "Virtual Lobby Access Key",
                "Ownership Of Story",
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
                      newFormData?.digitalAssets[
                        label.replace(/[^a-zA-Z]+/g, "").toLowerCase()
                      ] || ""
                    }
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div> */}

            {/* Token Details */}
            {/* <div className="bg-gray-100 p-6 rounded-lg">
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
                    className="w-full p-2 border rounded"
                    name={`tokenDetails.${label
                      .replace(/[^a-zA-Z]+/g, "")
                      .toLowerCase()}`}
                    value={
                      newFormData?.tokenDetails[
                        label.replace(/[^a-zA-Z]+/g, "").toLowerCase()
                      ] || ""
                    }
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div> */}
            <div className="col-span-2 bg-gray-100 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Digital Assets</h2>

              {/* AR Version */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  AR Version
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  name="digitalAssets.arversion"
                  value={newFormData?.digitalAssets?.arversion || ""}
                  onChange={handleInputChange}
                />
              </div>

              {/* VR Version */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  VR Version
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  name="digitalAssets.vrversion"
                  value={newFormData?.digitalAssets?.vrversion || ""}
                  onChange={handleInputChange}
                />
              </div>

              {/* 3D File */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  3D File
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  name="digitalAssets.dfile"
                  value={newFormData?.digitalAssets?.dfile || ""}
                  onChange={handleInputChange}
                />
              </div>

              {/* Technical Design Book */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Technical Design Book
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  name="digitalAssets.technicaldesignbook"
                  value={newFormData?.digitalAssets?.technicaldesignbook || ""}
                  onChange={handleInputChange}
                />
              </div>

              {/* Virtual Lobby Access Key */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Virtual Lobby Access Key
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  name="digitalAssets.virtuallobbyaccesskey"
                  value={
                    newFormData?.digitalAssets?.virtuallobbyaccesskey || ""
                  }
                  onChange={handleInputChange}
                />
              </div>

              {/* Ownership of Story */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Ownership Of Story
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  name="digitalAssets.ownershipofstory"
                  value={newFormData?.digitalAssets?.ownershipofstory || ""}
                  onChange={handleInputChange}
                />
              </div>

              {/* Certification */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Certification
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  name="digitalAssets.certification"
                  value={newFormData?.digitalAssets?.certification || ""}
                  onChange={handleInputChange}
                />
              </div>

              {/* Sandbox Wearable */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Sandbox Wearable
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  name="digitalAssets.sandboxwearable"
                  value={newFormData?.digitalAssets?.sandboxwearable || ""}
                  onChange={handleInputChange}
                />
              </div>

              {/* VR Chat Wearable */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  VR Chat Wearable
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  name="digitalAssets.vrchatwearable"
                  value={newFormData?.digitalAssets?.vrchatwearable || ""}
                  onChange={handleInputChange}
                />
              </div>

              {/* Animated */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Animated
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  name="digitalAssets.animated"
                  value={newFormData?.digitalAssets?.animated || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Token Details</h2>

              {/* Blockchain */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Blockchain
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  name="tokenDetails.blockchain"
                  value={newFormData?.tokenDetails?.blockchain || ""}
                  onChange={handleInputChange}
                />
              </div>

              {/* Token Standard */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Token Standard
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  name="tokenDetails.tokenstandard"
                  value={newFormData?.tokenDetails?.tokenstandard || ""}
                  onChange={handleInputChange}
                />
              </div>

              {/* Contract Address */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Contract Address
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  name="tokenDetails.contractaddress"
                  value={newFormData?.tokenDetails?.contractaddress || ""}
                  onChange={handleInputChange}
                />
              </div>

              {/* Contract Link */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Contract Link
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  name="tokenDetails.contractlink"
                  value={newFormData?.tokenDetails?.contractlink || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Size and Materials */}
            <div className="col-span-2 bg-gray-100 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Size And Materials</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Size Chart
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleSizeChartUpload}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* <div>
                <label className="block text-sm font-medium mb-2">
                  Material and Size
                </label>
                {newFormData?.sizeWithMaterial.map((entry, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Material"
                        value={entry.material}
                        onChange={(e) => {
                          const updatedMaterial = e.target.value;
                          setNewFormData((prev) => {
                            const updated = [...prev.sizeWithMaterial];
                            updated[index].material = updatedMaterial;
                            return { ...prev, sizeWithMaterial: updated };
                          });
                        }}
                        className="p-2 border rounded w-1/2"
                      />
                      <button
                        type="button"
                        className="p-2 bg-green-500 text-white rounded"
                        onClick={handleAddRow}
                      >
                        +
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map((size) => (
                        <button
                          key={size}
                          type="button"
                          className={`p-2 border rounded ${
                            entry.sizes.includes(size)
                              ? "bg-green-300"
                              : "bg-gray-200"
                          }`}
                          onClick={() => toggleSizeSelection(index, size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div> */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Material and Size
                </label>

                {newFormData?.sizeWithMaterial &&
                newFormData.sizeWithMaterial.length > 0 ? (
                  newFormData.sizeWithMaterial.map((entry, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Material"
                          value={entry.material || ""} // Prevents undefined value errors
                          onChange={(e) => {
                            const updatedMaterial = e.target.value;
                            setNewFormData((prev) => {
                              const updated = prev.sizeWithMaterial
                                ? [...prev.sizeWithMaterial]
                                : [];
                              updated[index] = {
                                ...updated[index],
                                material: updatedMaterial,
                              };
                              return { ...prev, sizeWithMaterial: updated };
                            });
                          }}
                          className="p-2 border rounded w-1/2"
                        />
                        <button
                          type="button"
                          className="p-2 bg-green-500 text-white rounded"
                          onClick={handleAddRow}
                        >
                          +
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-2">
                        {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map(
                          (size) => (
                            <button
                              key={size}
                              type="button"
                              className={`p-2 border rounded ${
                                entry?.sizes?.includes(size)
                                  ? "bg-green-300"
                                  : "bg-gray-200"
                              }`}
                              onClick={() => toggleSizeSelection(index, size)}
                            >
                              {size}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No materials added yet.</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Update Product
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateProduct;
