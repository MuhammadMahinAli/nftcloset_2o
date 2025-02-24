import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import banner from "../../assets/nft-image/banner.png";
import { IoReloadSharp } from "react-icons/io5";

const AllCollection = () => {
  const products = [
    {
      id: 1,
      name: "Blue Jacket",
      price: "40 $",
      image: "https://i.ibb.co.com/k0RjY1J/s1.jpg",
    },
    {
      id: 2,
      name: "Blue Jacket",
      price: "40 $",
      image: "https://i.ibb.co.com/k0RjY1J/s1.jpg",
    },
    {
      id: 3,
      name: "Blue Jacket",
      price: "40 $",
      image: "https://i.ibb.co.com/k0RjY1J/s1.jpg",
    },
  ];

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
        {products.map((product) => (
          <div
            key={product.id}
            className="relative overflow-hidden bg-white rounded-2xl shadow-xl"
          >
            <div className="flex justify-center items-center">
              <img
                src={banner}
                alt={product.name}
                className=" h-full object-cover"
              />
            </div>
            <div className="px-2 xl:px-4 py-2">
              <div className="flex justify-between items-center">
                <p className="text-sm xl:text-lg text-gray-700">
                  Drop date: 31st january
                </p>
                <p className="text-sm xl:text-lg font-bold text-red-500">
                  50% discount{" "}
                </p>
              </div>

              <div className="py-2 lg:py-4 flex  items-center space-x-3">
                <p className="text-lg xl:text-3xl text-gray-800 font-bold capitalize">
                  mad lads
                </p>
                <p className="text-sm xl:text-lg text-gray-500">10 Items </p>
              </div>

              <p className="pb-1 md:pb-3 text-sm xl:text-lg text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At,
                amet odit optio soluta cum, obcaecati incidunt quam iusto et ad,
                accusamus dolore repellendus. Aut, quas perspiciatis ipsa minima
                quaerat nobis laudantium laboriosam, beatae blanditiis nam
                dolores iste dignissimos dolorem excepturi.
              </p>
            </div>

            <div className="grid grid-cols-2">
              <button className="py-2 xl:py-3 xl:text-xl bg-[#2CBA7A] text-white">
                Storyline
              </button>
          
              <button className="py-2 xl:py-3 xl:text-xl bg-[#B5FFDD] text-[#2CBA7A]">
              <Link to="/collection-details">
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
