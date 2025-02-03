/* eslint-disable no-unused-vars */

import { useState } from "react";
import { fileUpload } from "../../utils/cloudinary";
import Swal from "sweetalert2";
import { useGetAllProductQuery } from "../../../features/product/productApi";
import {
  useDeleteCollectionMutation,
  useUpdateCollectionInfoMutation,
} from "../../../features/collection/collectionApi";

const UpdateCollection = ({ collectionInfo, setEditMode }) => {
  const [updateCollectionInfo] = useUpdateCollectionInfoMutation();
  const { data: getAllProduct } = useGetAllProductQuery();

  console.log(getAllProduct?.data);

  const [formData, setFormData] = useState({
    collectionName: collectionInfo.collectionName || "",
    collectionDescription: collectionInfo.collectionDescription || "",
    publishType: collectionInfo.publishType || "",
    publishDate: collectionInfo.publishDate || "",
    fromDate: collectionInfo.fromDate || "",
    toDate: collectionInfo.toDate || "",
    displayImage: collectionInfo.displayImage || "",
    discount: collectionInfo.discount || 0,
    products: collectionInfo.products || [],
    storyLink: collectionInfo.storyLink || "",
  });
  const [previewImage, setPreviewImage] = useState("");

  const handleImageUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const uploadedUrl = await fileUpload(file);
      if (type === "displayImage") {
        setFormData({ ...formData, displayImage: uploadedUrl });
        setPreviewImage(uploadedUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleProductToggle = (productId) => {
    setFormData((prevData) => {
      const products = [...prevData.products];
      const index = products.findIndex((p) => p.product._id === productId);

      if (index >= 0) {
        // Remove the product if it's already selected
        products.splice(index, 1);
      } else {
        // Add the product in the correct format
        products.push({ product: { _id: productId } });
      }

      return { ...prevData, products };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("updated collection", formData);
    const id = collectionInfo?._id;

    try {
      const response = await updateCollectionInfo({
        id,
        data: formData,
      }).unwrap();
      console.log(response);
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Hurry !",
          text: "You've updated collection information !",
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
    <div className="my-8 bg-green-200 min-h-screen">
      <button
        onClick={() => setEditMode(false)}
        className="px-3 py-3 bg-green-500 text-white rounded-xl"
      >
        Close
      </button>
      <h1 className="text-center text-3xl font-bold text-gray-700 rounded-xl py-5">
        Update Collection
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* General Information */}
          <div className="col-span-2 bg-gray-100 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">General Information</h2>
            {/*  Collection Name  */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Collection Name
              </label>
              <input
                type="text"
                name="collectionName"
                value={formData.collectionName}
                onChange={onInputChange}
                className="w-full p-2 border rounded"
                placeholder="Jacket With Pockets"
              />
            </div>
            {/*  Collection description  */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Collection Description
              </label>
              <textarea
                name="collectionDescription"
                value={formData.collectionDescription}
                onChange={onInputChange}
                className="w-full p-2 border rounded"
                rows="3"
                placeholder="Lorem Ipsum Dolor Sit Amet Consectetur."
              ></textarea>
            </div>
            {/* publish type */}
            <div className="col-span-2 bg-gray-100 p-6 rounded-lg">
              <>
                <label className="text-[18px] md:text-xl text-gray-600">
                  Publish Type:
                </label>
                <input
                  type="text"
                  list="categoryList"
                  id="publishType"
                  name="publishType"
                  value={formData.publishType}
                  onChange={onInputChange}
                  className="pl-6 xs:px-2 xs:w-full py-3 w-11/12 rounded-lg box-border border-[0.5px] border-solid border-gray-100 bg-[#e4ecf7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] outline-none md:w-[430px] lg:w-[460px] flex flex-col space-y-2 font-medium gray600"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>

                <datalist id="categoryList">
                  {Array.from(new Set(["Instant", "Drop"])).map(
                    (option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </datalist>
              </>
            </div>
            {/* publish date */}
            <div>
              <label className="block text-sm font-medium">Publish Date</label>
              <div className="flex items-center space-x-2">
                <input
                  type="datetime-local"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={onInputChange}
                  className="w-60 h-8 rounded-[800px]"
                />
              </div>
            </div>
            {/* story */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Story Link
              </label>
              <input
                type="text"
                name="storyLink"
                value={formData.storyLink}
                onChange={onInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter story link"
              />
            </div>
          </div>
        </div>

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

        {/* Extra Images Preview */}
        {/* {formData.extraImages && formData.extraImages.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {formData.extraImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Extra Image ${index + 1}`}
                className="w-32 h-32 object-cover rounded"
              />
            ))}
          </div>
        )} */}

        {/* Discount */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Discount</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={onInputChange}
              className="w-full p-2 border rounded"
              placeholder="$45.66"
            />
          </div>

          {/* Discount Period */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Discount Period
            </label>
            <div className="flex space-x-4">
              <div>
                <label className="block text-sm font-medium">From</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="datetime-local"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={onInputChange}
                    className="w-40 h-8 rounded-[800px]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">To</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="datetime-local"
                    name="toDate"
                    value={formData.toDate}
                    onChange={onInputChange}
                    className="w-40 h-8 rounded-[800px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 bg-gray-100 p-6 rounded-lg">
            {getAllProduct?.data?.map((product) => (
              <div key={product._id} className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={formData.products.some(
                      (p) => p.product._id === product._id
                    )}
                    onChange={() => handleProductToggle(product._id)}
                  />
                  {product.productName}
                </label>
              </div>
            ))}
          </div>

          {/* <div className="col-span-2 bg-gray-100 p-6 rounded-lg">
  {getAllProduct?.data?.map((product) => (
    <div key={product._id} className="mb-4">
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={formData.products.some(p => p.product === product._id)}
          onChange={() => handleProductToggle(product._id)}
        />
        {product.productName}
      </label>
    </div>
  ))}
</div> */}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Update Collection
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCollection;
