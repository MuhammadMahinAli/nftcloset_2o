import { FaPlus } from "react-icons/fa";
import {  FaRegTrashCan } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDeleteProductMutation, useGetAllProductQuery } from "../../features/product/productApi";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const AllProduct = () => {
  const { data: getAllProduct } = useGetAllProductQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const products = getAllProduct?.data;
  const { user } = useSelector((state) => state.auth);
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

  console.log(user.email);

  return (
    <div className="p-3 xl:p-8 z-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
      </div>

      <div className="flex justify-between mb-6">
        <div className="relative w-[200px] md:w-[400px] 3xl:w-[500px]">
          <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl md:text-3xl" />
          <input
            placeholder="Search by  name or traits"
            className="w-full pl-9 md:pl-12 py-1 md:py-3 bg-[rgb(246,244,243)] rounded-lg"
          />
        </div>
       
        <Link to="/manageAccount/add-new-product">
          <button className="bg-[#26B893] hover:bg-emerald-600 py-2 px-3 flex rounded-lg items-center space-x-2">
            <FaPlus className="h-4 w-4 md:mr-2 text-white" />
            <p className="text-white hidden md:block">Create new product</p>
          </button>
        </Link>
  
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div
            key={product._id}
            className="relative overflow-hidden bg-white rounded-xl shadow-xl"
          >
          
              <div className="flex justify-center items-center py-4 h-[67%] lg:h-[72%] xl:h-[68%] 3xl:h-[75%]">
                <img
                  src={product.displayImage}
                  alt={product.productName}
                  className="w-36 xl:w-64 h-full pt-2 object-cover"
                />
              </div>
              <div className="absolute top-2 right-2 flex gap-3 py-1">
                <button size="icon">
                  <Link to={`/manageAccount/update-product/${product?._id}`}>
                  <FiEdit3 className=" text-blue-500 text-2xl" />
                  </Link>
              
                </button>
                <button onClick={()=>handleDelete(product?._id)} size="icon" className="text-red-500 text-xl">
                  <FaRegTrashCan />
                </button>
              </div>
          


            <div className="p-4 border-t border-gray-400">
              <h3 className="font-bold text-lg xl:text-xl">{product.productName}</h3>
              <p className="text-sm xl:text-lg text-gray-500">$ {product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
// import React from 'react';

// const AllProduct = () => {

//     // Example collections data
// const collections = [
//     {
//       id: 1,
//       name: "Mad Lads",
//       dropDate: "31st January",
//       items: 10,
//       description: "Create A Countdown Timer That Counts Down In Seconds, Minutes, Hours And Days To Any Date, With Time Zone Support. It Also Counts Up From A Past Date.",
//       discount: "50% Discount"
//     },
//     {
//       id: 2,
//       name: "Mad Lads",
//       dropDate: "31st January",
//       items: 10,
//       description: "Create A Countdown Timer That Counts Down In Seconds, Minutes, Hours And Days To Any Date, With Time Zone Support. It Also Counts Up From A Past Date.",
//       discount: "50% Discount"
//     },
//   ];

//     return (
//         <div>
//     <div className="p-8 max-w-7xl mx-auto">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl font-bold">All Collections</h1>
//         </div>
//         <Link href="/create-collection">
//           <Button className="bg-[#10B981] hover:bg-[#059669] text-white">
//             Create New Collection
//           </Button>
//         </Link>
//       </div>

//       <div className="relative mb-6">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//         <Input
//           placeholder="Search by name or traits"
//           className="pl-10"
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {collections.map((collection) => (
//           <Card key={collection.id} className="overflow-hidden">
//             <Link href={`/collection/${collection.id}`}>
//               <a className="block">
//                 <div className="relative">
//                   <div className="aspect-[2/1] bg-[#F0F0F0]" />
//                   <Button
//                     className="absolute top-4 left-4 bg-gradient-to-b from-[#ADD8E6] to-white text-black hover:from-[#8CC7E0] hover:to-[#F8F8F8]"
//                   >
//                     TRY ON
//                   </Button>
//                   <div className="absolute top-4 right-4 text-sm bg-black text-white px-2 py-1 rounded">
//                     {collection.discount}
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <div className="text-sm text-gray-500 mb-1">
//                         Drop Date: {collection.dropDate}
//                       </div>
//                       <h3 className="text-xl font-semibold mb-1">{collection.name}</h3>
//                       <div className="text-sm text-gray-500">{collection.items} Items</div>
//                     </div>
//                     <div className="flex gap-2">
//                       <Button variant="ghost" size="icon" className="h-8 w-8">
//                         <Pencil className="h-4 w-4" />
//                       </Button>
//                       <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>

//                   <p className="text-gray-600 text-sm mb-4">
//                     {collection.description}
//                   </p>

//                   <div className="flex gap-2">
//                     <Button className="flex-1 bg-[#90EE90] hover:bg-[#32CD32] text-black">
//                       Storyline
//                     </Button>
//                     <Button variant="outline" className="flex-1">
//                       Details
//                     </Button>
//                   </div>
//                 </div>
//               </a>
//             </Link>
//           </Card>
//         ))}
//       </div>
//     </div>

//         </div>
//     );
// };

// export default AllProduct;
