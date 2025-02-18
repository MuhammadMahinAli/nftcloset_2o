import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import banner from "../../assets/nft-image/banner.png";

const AllCollections = () => {
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
        {products.map((product) => (
          <div
            key={product.id}
            className="relative overflow-hidden bg-white rounded-2xl shadow-xl"
          >
            <div className="mt-10 flex justify-center items-center py-4">
              <img
                src={banner}
                alt={product.name}
                className=" h-full pt-2 object-cover"
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

              <div className="py-4 flex  items-center space-x-3">
                <p className="text-lg xl:text-3xl text-gray-800 font-bold capitalize">
                  mad lads
                </p>
                <p className="text-sm xl:text-lg text-gray-500">10 Items </p>
              </div>

              <p className="pb-3 text-sm xl:text-lg text-gray-700">
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
                Details
              </button>
            </div>

            <div className="absolute top-2 right-2 flex gap-3 p-3">
              <button size="icon">
                <FiEdit3 className=" text-blue-500 text-[23px] lg:text-2xl" />
              </button>
              <button
                size="icon"
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
