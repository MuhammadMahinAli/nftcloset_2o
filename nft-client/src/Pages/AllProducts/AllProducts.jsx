import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [isOpenOption, setIsOpenOption] = useState(false);
  const [isOpenIndex, setIsOpenIndex] = useState(null);
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

  const toggleActive = (i) => {
    setIsOpenIndex(i);
    setIsOpenOption(true);
  };
  const toggleInactive = () => {
    setIsOpenIndex(null);
    setIsOpenOption(false);
  };
  return (
    <div className="p-3 md:p-5 lg:p-10 ">
      {/* <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
      </div> */}
      {/* filter & option */}

      <div className="flex justify-between mb-6">
        {/* filter */}
        <div className="flex  space-x-3">
          <div className="p-1 flex justify-center items-center border rounded-md">
            <CiFilter className="text-xl md:text-3xl " />
          </div>
          <div className="relative w-[200px] md:w-[300px] lg:w-[400px] 3xl:w-[500px]">
            <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl md:text-3xl" />
            <input
              placeholder="Search products"
              className="w-full pl-9 md:pl-12 py-1 md:py-2 bg-[#F6F4F3] rounded-lg"
            />
          </div>
        </div>
        {/* option */}
        <div className="flex  space-x-3">
          <div className="p-1 flex justify-center items-center border rounded-md">
            <svg
              className="w-5 md:w-6"
              viewBox="0 0 27 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0064 17.1597C15.6326 16.6654 15.7302 15.9616 16.2245 15.5879C16.7188 15.2142 17.4225 15.3117 17.7964 15.806L16.0064 17.1597ZM22.0199 21.3911C22.3937 21.8854 22.296 22.5892 21.8018 22.9629C21.3075 23.3368 20.6037 23.2391 20.2299 22.7448L22.0199 21.3911ZM22.247 22.0679C22.247 22.6876 21.7446 23.19 21.1249 23.19C20.5052 23.19 20.0028 22.6876 20.0028 22.0679H22.247ZM20.0028 1.1221C20.0028 0.502386 20.5052 0 21.1249 0C21.7446 0 22.247 0.502386 22.247 1.1221H20.0028ZM22.0198 22.7449C21.6459 23.2391 20.9422 23.3367 20.448 22.9628C19.9537 22.5889 19.8562 21.8853 20.23 21.3909L22.0198 22.7449ZM24.4551 15.8059C24.829 15.3117 25.5327 15.2142 26.027 15.588C26.5212 15.9619 26.6188 16.6656 26.2449 17.1599L24.4551 15.8059ZM15.4935 0C16.1132 0 16.6156 0.502386 16.6156 1.1221C16.6156 1.74181 16.1132 2.2442 15.4935 2.2442V0ZM1.4119 2.2442C0.792198 2.2442 0.289797 1.74181 0.289797 1.1221C0.289797 0.502386 0.792198 0 1.4119 0V2.2442ZM15.4935 4.18917C16.1132 4.18917 16.6156 4.69156 16.6156 5.31127C16.6156 5.93098 16.1132 6.43337 15.4935 6.43337V4.18917ZM4.22911 6.43337C3.60941 6.43337 3.10701 5.93098 3.10701 5.31127C3.10701 4.69156 3.60941 4.18917 4.22911 4.18917V6.43337ZM15.4935 8.37834C16.1132 8.37834 16.6156 8.88074 16.6156 9.50044C16.6156 10.1201 16.1132 10.6225 15.4935 10.6225V8.37834ZM7.04483 10.6225C6.42513 10.6225 5.92273 10.1201 5.92273 9.50044C5.92273 8.88074 6.42513 8.37834 7.04483 8.37834V10.6225ZM17.7964 15.806L22.0199 21.3911L20.2299 22.7448L16.0064 17.1597L17.7964 15.806ZM20.0028 22.0679V1.1221H22.247V22.0679H20.0028ZM20.23 21.3909L24.4551 15.8059L26.2449 17.1599L22.0198 22.7449L20.23 21.3909ZM15.4935 2.2442H1.4119V0H15.4935V2.2442ZM15.4935 6.43337H4.22911V4.18917H15.4935V6.43337ZM15.4935 10.6225H7.04483V8.37834H15.4935V10.6225Z"
                fill="#272727"
              />
            </svg>
          </div>
          {/* for tab */}
          <ul className="border rounded-md hidden md:flex">
            <li className="text-lg font-bold text-green-500 bg-gray-100 px-3 py-1 border-r ">
              24h
            </li>
            <li className="text-lg font-bold text-gray-700 px-3 py-1 border-r ">
              7d
            </li>
            <li className="text-lg font-bold text-gray-700 px-3 py-1 ">30d</li>
          </ul>
        </div>
      </div>
      {/* for mbl */}
      <ul className="border rounded-md md:hidden grid grid-cols-3 w-44">
        <li className="text-[16px] font-bold text-green-500 bg-gray-100 px-3 py-1 border-r ">
          24h
        </li>
        <li className="text-[16px] font-bold text-gray-700 px-3 py-1 border-r ">
          7d
        </li>
        <li className="text-[16px] font-bold text-gray-700 px-3 py-1 ">30d</li>
      </ul>
      <div className="xs:p-5 md:p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 pt-3">
        {products.map((product, i) => (
          <div
            onMouseEnter={() => toggleActive(i)}
            onMouseLeave={toggleInactive}
            key={product.id}
            className="pb-8  2xl:pb-12 relative overflow-hidden bg-white rounded-xl shadow-xl"
          >
            <>
              <div className="flex justify-center items-center py-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-28 lg:w-44 h-full pt-2 object-cover"
                />
              </div>

              <div className="p-3  space-y-1 md:space-y-2 border-t border-gray-300">
                <h3 className="font-bold text-xl md:text-xl text-gray-700">
                  {product.name}
                </h3>
                <p className="text-[18px] md:text-lg text-gray-500">
                  {product.price}
                </p>
              </div>
            </>
             {isOpenIndex === i && ( 
            <div className="absolute bottom-0  w-full flex justify-between bg-[#12C9B5] py-1 xl:py-2">
              <p className="text-center w-10/12 border-r text-lg md:text-lg text-white">
                Buy now
              </p>
              <IoCartOutline className="text-3xl text-white mr-3 ssm:mr-5 lg:mr-8 xl:mr-5" />
            </div>
              )} 
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
