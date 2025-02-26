import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import banner1280 from "../../assets/nft-image/banner1280.jpg";
import { IoReloadSharp } from "react-icons/io5";
import { useGetAllCollectionQuery } from "../../features/collection/collectionApi";

const AllCollection = () => {
  const { data: getAllCollection } = useGetAllCollectionQuery();
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
  

  return (
    <div className="p-3 md:p-7 lg:p-10 ">
      {/* <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">All Collections</h1>
      </div> */}

      <div className="flex justify-between mb-6">
        {/* filter */}
        <div className="flex  space-x-3">
          <div className="p-1 flex justify-center items-center border rounded-md">
            <IoReloadSharp className="text-xl md:text-2xl " />
          </div>
          <div className="relative w-[200px] md:w-[300px] lg:w-[400px] 3xl:w-[500px]">
            <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl md:text-3xl" />
            <input
              placeholder="Search collections"
              className="w-full pl-9 md:pl-12 py-1 md:py-2 bg-[#F6F4F3] rounded-lg"
            />
          </div>
        </div>
        {/* option */}

        {/* Status */}
        <div className="hidden md:block">
          <select
            id="statusSelect"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            // value={status}
            // onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Trending">Trending</option>
            {/* <option value="Shipped">Shipped</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option> */}
          </select>
        </div>
      </div>
      {/* for mbl */}
      <div className="mb-6 w-32">
        <select
          id="statusSelect"
          className="md:hidden w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          // value={status}
          // onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Trending">Trending</option>
          {/* <option value="Shipped">Shipped</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option> */}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections?.map((product) => (
          <div
            key={product.id}
            className="relative overflow-hidden bg-white rounded-2xl shadow-xl"
          >
            <div className="h-[150px] md:h-[200px] lg:h-[250px] flex justify-center items-center w-full  ">
              <img
                src={product.displayImage}
                alt={product.collectionName}
                className=" rounded-2xl w-full object-cover"
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
              <Link to={`/collection-details/${product?._id}`}>
                Details
                </Link>
              </button>
              
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCollection;
