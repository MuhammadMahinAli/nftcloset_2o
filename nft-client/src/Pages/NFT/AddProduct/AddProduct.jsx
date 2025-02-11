import React, { useEffect, useState } from "react";
import { fileUpload } from "../../utils/cloudinary.js";
import { rawFileUpload } from "../../utils/cloudinaryForRaw.js";
import Swal from "sweetalert2";
import { addproduct } from "../../../features/product/productSlice.js";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetAllProductQuery,
} from "../../../features/product/productApi.js";
import UpdateProduct from "../UpdateProduct/UpdateProduct.jsx";

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
  const [currentImage, setCurrentImage] = useState("");

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
      sizeWithMaterial: "Size with Material"
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field] || 
          (Array.isArray(formData[field]) && formData[field].length === 0) ||
          (field === 'sizeWithMaterial' && (!formData[field][0].material || formData[field][0].sizes.length === 0))) {
        Swal.fire({
          icon: "error",
          title: "Required Field Missing",
          text: `Please fill in the ${label} field`
        });
        return;
      }
    }

    try {
      const response = await addProduct(formData).unwrap();
      console.log(response);
      if(response.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "You've added a new product!"
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
        text: "Something went wrong while adding the product!"
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
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
          .unwrap()
          .then(() => {
            Swal.fire(
              'Deleted!',
              'Your product has been deleted.',
              'success'
            );
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: error.message
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
      <div className="p-8 bg-white min-h-screen">

      <h1
            className="text-center text-3xl font-bold text-gray-700 rounded-xl py-5"
          >
        All Product
            </h1>
        {/* allProduct */}
        <ul className="bg-gray-100 p-5 space-y-9">
          {products?.map((product, i) => (
            <li className="flex justify-between" key={i}>
              <p>{i+1}. {product?.productName}</p>
              <button className="px-3 py-3 bg-green-500 text-white rounded-xl" onClick={() => handleEdit(product)}>Edit</button>
              <button className="px-3 py-3 bg-red-500 text-white rounded-xl" onClick={()=>handleDelete(product?._id)}>Delete</button>
            </li>
          ))}
        </ul>

        {/* edit start */}

        <UpdateProduct
          editMode={editMode}
          setEditMode={setEditMode}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          newFormData={newFormData}
          setNewFormData={setNewFormData}
        />

        {/* edit end */}

        <h1
            className="text-center text-3xl font-bold text-gray-700 rounded-xl py-5"
          >
        Add New Product
            </h1>
        <form onSubmit={handleSubmit}>
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
                  value={formData.productName}
                  onChange={onInputChange}
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
                  value={formData.productDescription}
                  onChange={onInputChange}
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
                  value={formData.buyingLink}
                  onChange={onInputChange}
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
                <div className="mt-2 flex space-x-2">
                  {formData.colors.map((color, index) => (
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
              {formData.displayImage && (
                <div className="w-64 h-64 bg-gray-100 rounded flex items-center justify-center">
                  <img
                    src={formData.displayImage}
                    alt="Preview"
                    className="object-cover w-full h-full rounded"
                  />
                </div>
              )}
            </div>

            {/* Extra Videos */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Extra Videos</h2>
       nav       <div className="flex gap-3 items-center">
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

            {/* Extra Images */}
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

            {/* Pricing And Stock */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Pricing And Stock</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Price</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={onInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="$45.66"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Stock</label>
                <input
                  name="stock"
                  value={formData.stock}
                  onChange={onInputChange}
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="56"
                />
              </div>
            </div>

            {/* Digital Assets */}
            <div className="col-span-2 bg-gray-100 p-6 rounded-lg">
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
                      formData.digitalAssets[
                        label.replace(/[^a-zA-Z]+/g, "").toLowerCase()
                      ] || ""
                    }
                    onChange={onInputChange}
                  />
                </div>
              ))}
            </div>

            {/* Token Details */}
            <div className="bg-gray-100 p-6 rounded-lg">
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
                      formData.tokenDetails[
                        label.replace(/[^a-zA-Z]+/g, "").toLowerCase()
                      ] || ""
                    }
                    onChange={onInputChange}
                  />
                </div>
              ))}
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
              {/* <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Select Size
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map(
                    (size, index) => (
                      <button
                        key={index}
                        className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
                      >
                        {size}
                      </button>
                    )
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Add Material
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Cotton", "Polyester"].map((material, index) => (
                    <input
                      key={index}
                      type="text"
                      value={material}
                      className="p-2 border rounded bg-gray-100"
                      readOnly
                    />
                  ))}
                </div>
              </div> */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Material and Size
                </label>
                {formData.sizeWithMaterial.map((entry, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex gap-2 mb-2">
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
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
              Add Product
            </button>
          </div>
        </form>
      </div>
      {/* 2 */}
      {/* <form className="p-6 space-y-6 bg-white shadow rounded" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium">Product Name</label>
        <input
          type="text"
          className="w-full mt-1 p-2 border rounded"
          value={formData.productName}
          onChange={(e) =>
            setFormData({ ...formData, productName: e.target.value })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Product Description</label>
        <textarea
          className="w-full mt-1 p-2 border rounded"
          value={formData.productDescription}
          onChange={(e) =>
            setFormData({ ...formData, productDescription: e.target.value })
          }
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium">Display Image</label>
        <input
          type="text"
          className="w-full mt-1 p-2 border rounded"
          value={formData.displayImage}
          onChange={(e) =>
            setFormData({ ...formData, displayImage: e.target.value })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Colors</label>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={currentColor}
            onChange={(e) => setCurrentColor(e.target.value)}
            className="w-10 h-10 border rounded"
          />
          <button
            type="button"
            onClick={handleAddColor}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Add Color
          </button>
        </div>
        <div className="mt-2 flex space-x-2">
          {formData.colors.map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 border rounded"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Price</label>
        <input
          type="number"
          className="w-full mt-1 p-2 border rounded"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Stock</label>
        <input
          type="number"
          className="w-full mt-1 p-2 border rounded"
          value={formData.stock}
          onChange={(e) =>
            setFormData({ ...formData, stock: e.target.value })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Buying Link</label>
        <input
          type="text"
          className="w-full mt-1 p-2 border rounded"
          value={formData.buyingLink}
          onChange={(e) =>
            setFormData({ ...formData, buyingLink: e.target.value })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Extra Videos</label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded"
            value={currentVideo}
            onChange={(e) => setCurrentVideo(e.target.value)}
          />
          <button
            type="button"
            onClick={handleAddVideo}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Add Video
          </button>
        </div>
        <ul className="mt-2">
          {formData.extraVideos.map((video, index) => (
            <li key={index}>{video}</li>
          ))}
        </ul>
      </div>

      <div>
        <label className="block text-sm font-medium">Extra Images</label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded"
            value={currentImage}
            onChange={(e) => setCurrentImage(e.target.value)}
          />
          <button
            type="button"
            onClick={handleAddImage}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Add Image
          </button>
        </div>
        <ul className="mt-2">
          {formData.extraImages.map((image, index) => (
            <li key={index}>{image}</li>
          ))}
        </ul>
      </div>

      <div>
        <label className="block text-sm font-medium">Material and Sizes</label>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Material"
            className="w-full mt-1 p-2 border rounded"
            value={currentMaterial}
            onChange={(e) => setCurrentMaterial(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map((size) => (
              <label key={size} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  value={size}
                  checked={currentSizes.includes(size)}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setCurrentSizes((prev) =>
                      isChecked
                        ? [...prev, size]
                        : prev.filter((s) => s !== size)
                    );
                  }}
                />
                <span>{size}</span>
              </label>
            ))}
          </div>
          <button
            type="button"
            onClick={handleMaterialSizeChange}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Add Material with Sizes
          </button>
        </div>
        <ul className="mt-2">
          {formData.sizeWithMaterial.map((entry, index) => (
            <li key={index}>
              {entry.material}: {entry.sizes.join(", ")}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <label className="block text-sm font-medium">Size Chart</label>
        <input
          type="text"
          className="w-full mt-1 p-2 border rounded"
          value={formData.sizeChart}
          onChange={(e) =>
            setFormData({ ...formData, sizeChart: e.target.value })
          }
        />
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-green-500 text-white rounded"
      >
        Add Product
      </button>
    </form> */}
    </>
  );
};

export default AddProduct;
