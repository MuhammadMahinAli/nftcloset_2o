import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import banner from "../../assets/nft-image/banner.png";
import { useDeleteCollectionMutation, useGetAllCollectionQuery } from "../../features/collection/collectionApi";
import Swal from "sweetalert2";

const AllCollections = () => {
  const { data: getAllCollection } = useGetAllCollectionQuery();
  const [deleteCollection] = useDeleteCollectionMutation();
  const collections = getAllCollection?.data;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Get day with ordinal suffix (1st, 2nd, 3rd, etc.)
    const day = date.getDate();
    const ordinal = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };
  
    // Format the date
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).replace(/(\d+)/, `$1${ordinal(day)}`);
  };

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
    <div className="p-3 xl:p-8 ">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">All Collections</h1>
      </div>

      <div className="flex justify-between mb-6">
        <div className="relative w-[200px] md:w-[400px] 3xl:w-[500px]">
          <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl md:text-3xl" />
          <input
            placeholder="Search by  name or traits"
            className="w-full pl-9 md:pl-12 py-1 md:py-3 bg-[#F6F4F3] rounded-lg"
          />
        </div>
        <Link to="/manageAccount/create-collection">
          <button className="bg-[#26B893] hover:bg-emerald-600 py-2 px-3 flex rounded-lg items-center space-x-2">
            <FaPlus className="h-4 w-4 md:mr-2 text-white" />
            <p className="text-white hidden md:block">Create New Collection</p>
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections?.map((product) => (
          <div
            key={product.id}
            className=" relative overflow-hidden bg-white rounded-2xl shadow-xl"
          >
            <div className="pt-14 flex justify-center items-center w-full  ">
              <img
                src={product.displayImage}
                alt={product.collectionName}
                className="h-[150px] md:h-[200px] lg:h-[250px] 3xl:h-[300px] rounded-2xl w-full object-cover"
              />
            </div>
            <div className="px-2 xl:px-4 py-2">
              <div className="flex justify-between items-center">
                <p className="text-sm xl:text-lg text-gray-700">
                  Drop date: {formatDate(product.fromDate)}
                </p>
                <p className="text-sm xl:text-lg font-bold text-red-500">
                {product.discount}% discount{" "}
                </p>
              </div>

              <div className="py-2 lg:py-4 flex  items-center space-x-3">
                <p className="text-lg xl:text-3xl text-gray-800 font-bold capitalize">
                {product.collectionName}
                </p>
                <p className="text-sm xl:text-lg text-gray-500">{product.products.length} Items </p>
              </div>

              <p className="pb-1 md:pb-3 text-sm xl:text-lg text-gray-700">
              {product.collectionDescription.slice(0,295)}
              </p>
            </div>

            <div className="grid grid-cols-2">
              <button className="py-2 xl:py-3 xl:text-xl bg-[#2CBA7A] text-white">
              <a href={product.storyLink}>
              Storyline
                </a>
              </button>
          
              <button className="py-2 xl:py-3 xl:text-xl bg-[#B5FFDD] text-[#2CBA7A]">
              <Link to="/collection-details">
                Details
                </Link>
              </button>
              
              
            </div>
            

            <div className="absolute top-2 right-2 flex gap-3 p-3">
              <button size="icon">
                <Link to={`/manageAccount/update-collection/${product._id}`}>
                <FiEdit3 className=" text-blue-900 text-[23px] lg:text-2xl" />
                </Link>
              
              </button>
              <button
                size="icon"
                onClick={()=>handleDelete(product._id)}
                className="text-red-500 text-[20px] lg:text-xl"
              >
                <FaRegTrashCan />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCollections;
