// import { useState } from "react";
// import { fileUpload } from "../../utils/cloudinary";

// const CreateCollection = () => {
//   const [formData, setFormData] = useState({
//     collectionName: "",
//     collectionDescription: "",
//     publishType: "",
//     publishDate: "",
//     displayImage: "",
//     discount: 0,
//     products: [],
//   });
//   const [previewImage, setPreviewImage] = useState("");
//   const handleImageUpload = async (event, type) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     try {
//       const uploadedUrl = await fileUpload(file);
//       if (type === "displayImage") {
//         setFormData({ ...formData, displayImage: uploadedUrl });
//         setPreviewImage(uploadedUrl);
//       } else if (type === "extraImages") {
//         setFormData({
//           ...formData,
//           extraImages: [...formData.extraImages, uploadedUrl],
//         });
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   const onInputChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => {
//       return {
//         ...prev,
//         [name]: value,
//       };
//     });
//   };

//   const handleProductToggle = (product) => {
//     setFormData((prevData) => {
//       const products = [...prevData.products];
//       const index = products.findIndex((p) => p.product === product);

//       if (index >= 0) {
//         products.splice(index, 1);
//       } else {
//         products.push({ product });
//       }

//       return { ...prevData, products };
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData);

//   };

//   return (
//     <div className="p-8 bg-white min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* General Information */}
//           <div className="col-span-2 bg-gray-100 p-6 rounded-lg">
//             <h2 className="text-lg font-semibold mb-4">General Information</h2>
//             {/*  Collection Name  */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">
//                 Collection Name
//               </label>
//               <input
//                 type="text"
//                 name="collectionName"
//                 value={formData.collectionName}
//                 onChange={onInputChange}
//                 className="w-full p-2 border rounded"
//                 placeholder="Jacket With Pockets"
//               />
//             </div>
//             {/*  Collection description  */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">
//                 Collection Description
//               </label>
//               <textarea
//                 name="collectionDescription"
//                 value={formData.collectionDescription}
//                 onChange={onInputChange}
//                 className="w-full p-2 border rounded"
//                 rows="3"
//                 placeholder="Lorem Ipsum Dolor Sit Amet Consectetur."
//               ></textarea>
//             </div>
//             {/* publish type */}
//             <div className="col-span-2 bg-gray-100 p-6 rounded-lg">
//               <h2 className="text-lg font-semibold mb-4">Publish Type</h2>
//               {["Instant", "Drop"].map((label, index) => (
//                 <div key={index} className="mb-4">
//                   <label className="block text-sm font-medium mb-2">
//                     {label}
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full p-2 border rounded"
//                     name="publishType"
//                     value={formData.publishType}
//                     onChange={onInputChange}
//                   />
//                 </div>
//               ))}
//             </div>
//             {/* publish date */}
//             <div>
//               <label className="block text-sm font-medium">publish date</label>
//               <div className="flex  items-center space-x-2">
//                 <input
//                   type="datetime-local-local"
//                   name="publishDate"
//                   value={formData.publishDate}
//                   onChange={onInputChange}
//                   className="w-8 h-8 rounded-[800px]"
//                 />
//               </div>
//             </div>
//             {/* story */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">
//                 Story Link
//               </label>
//               <input
//                 type="text"
//                 name="storyLink"
//                 value={formData.storyLink}
//                 onChange={onInputChange}
//                 className="w-full p-2 border rounded"
//                 placeholder="Jacket With Pockets"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Display Image */}
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold mb-4">Display Image</h2>
//           <input
//             type="file"
//             onChange={(e) => handleImageUpload(e, "displayImage")}
//             className="mb-2"
//           />
//           {formData.displayImage && (
//             <div className="w-64 h-64 bg-gray-100 rounded flex items-center justify-center">
//               <img
//                 src={formData.displayImage}
//                 alt="Preview"
//                 className="object-cover w-full h-full rounded"
//               />
//             </div>
//           )}
//         </div>

//         {/* discount */}
//         <div className="bg-gray-100 p-6 rounded-lg">
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">Price</label>
//             <input
//               type="number"
//               name="discount"
//               value={formData.discount}
//               onChange={onInputChange}
//               className="w-full p-2 border rounded"
//               placeholder="$45.66"
//             />
//           </div>

//           {/* discount period*/}
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">
//               Discord period
//             </label>
//             <div className="flex space-x-4">
//               <div>
//                 <label className="block text-sm font-medium">From</label>
//                 <div className="flex  items-center space-x-2">
//                   <input
//                     type="datetime-local"
//                     name="publishDate"
//                     value={formData.publishDate}
//                     onChange={onInputChange}
//                     className="w-40 h-8 rounded-[800px]"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">To</label>
//                 <div className="flex  items-center space-x-2">
//                   <input
//                     type="datetime-local"
//                     name="publishDate"
//                     value={formData.publishDate}
//                     onChange={onInputChange}
//                     className="w-40 h-8 rounded-[800px]"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* products*/}
//             <div className="col-span-2 bg-gray-100 p-6 rounded-lg">
//               {[
//                 "AR Version",
//                 "VR Version",
//                 "3D File",
//                 "Technical Design Book",
//                 "Virtual Lobby Access Key",
//                 "Ownership Of Story",
//                 "Certification",
//                 "Sandbox Wearable",
//                 "VR Chat Wearable",
//                 "Animated",
//               ].map((label, index) => (
//                 <div key={index} className="mb-4">
//                   <label className="inline-flex items-center">
//                     <input
//                       type="checkbox"
//                       className="mr-2"
//                       checked={formData.products.some(
//                         (p) => p.product === label
//                       )}
//                       onChange={() => handleProductToggle(label)}
//                     />
//                     {label}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="mt-6">
//           <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
//             Add Product
//           </button>
//         </div>

//       </form>
//     </div>
//   );
// };

// export default CreateCollection;
import { useState } from "react";
import { fileUpload } from "../../utils/cloudinary";
import {
  useAddCollectionMutation,
  useDeleteCollectionMutation,
  useGetAllCollectionQuery,
} from "../../../features/collection/collectionApi";
import { useGetAllProductQuery } from "../../../features/product/productApi";
import UpdateCollection from "./UpdateCollection";
import Swal from "sweetalert2";

const CreateCollection = () => {
  const [deleteCollection] = useDeleteCollectionMutation();
  const [addCollection] = useAddCollectionMutation();
  const { data: getAllCollection } = useGetAllCollectionQuery();
  const { data: getAllProduct } = useGetAllProductQuery();

  const allCollection = getAllCollection?.data;
  console.log(allCollection);

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
      const index = products.findIndex((p) => p.product === productId);

      if (index >= 0) {
        products.splice(index, 1);
      } else {
        products.push({ product: productId });
      }

      return { ...prevData, products };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check required fields
    const requiredFields = {
      collectionName: "Collection Name",
      collectionDescription: "Collection Description", 
      publishType: "Publish Type",
      publishDate: "Publish Date",
      displayImage: "Display Image",
      products: "Products"
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        Swal.fire({
          icon: "error",
          title: "Required Field Missing",
          text: `Please fill in the ${label} field`
        });
        return;
      }
    }

    try {
      const response = await addCollection(formData).unwrap();
      console.log(response);
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Hurray!",
          text: "You've added a new collection!"
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
        text: "Something went wrong while adding the collection!"
      });
    }
  };
  // --------------- edit collection start -------------------//

  const [editMode, setEditMode] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);

  const handleEdit = (collection) => {
    setSelectedCollection(collection);
    setEditMode(true);
  };

  // ------------------------delete collection ------------]
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
        deleteCollection(id)
          .unwrap()
          .then(() => {
            Swal.fire(
              "Deleted!",
              "Your collection has been deleted.",
              "success"
            );
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

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-center text-3xl font-bold text-gray-700 rounded-xl py-5">
        All Collection
      </h1>
      <ul className="bg-gray-100 p-5 space-y-9">
        {allCollection?.map((collection, i) => (
          <li className="flex justify-between" key={i}>
            <p className="capitalize">
              {i + 1}. {collection?.collectionName}
            </p>
            <button
              className="px-3 py-3 bg-green-500 text-white rounded-xl"
              onClick={() => handleEdit(collection)}
            >
              Edit
            </button>
            <button
              className="px-3 py-3 bg-red-500 text-white rounded-xl"
              onClick={() => handleDelete(collection?._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {editMode && (
        <UpdateCollection
          collectionInfo={selectedCollection}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      )}

      <h1 className="text-center text-3xl font-bold text-gray-700 rounded-xl py-5">
        Add New Collection
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

          {/* Products */}
          {/* <div className="col-span-2 bg-gray-100 p-6 rounded-lg">
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
            ].map((label) => (
              <div key={label} className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={formData.products.includes(label)}
                    onChange={() => handleProductToggle(label)}
                  />
                  {label}
                </label>
              </div>
            ))}
          </div> */}
          <div className="col-span-2 bg-gray-100 p-6 rounded-lg">
            {getAllProduct?.data?.map((product) => (
              <div key={product._id} className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={formData.products.some(
                      (p) => p.product === product._id
                    )}
                    onChange={() => handleProductToggle(product._id)}
                  />
                  {product.productName}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Add Collection
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCollection;
