import { useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const CreateNewCollection = () => {
  const [selectedProducts, setSelectedProducts] = useState(["Jacket"]);
  const [isDiscountEnabled, setIsDiscountEnabled] = useState(false);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

  console.log(isDiscountEnabled);

  return (
    <div className=" mx-auto py-5 md:p-6 ">
      <h1 className="text-2xl font-semibold mb-6">Create Collection</h1>

      {/* Display Image Section */}
      <div className="mb-8 bg-white rounded-xl shadow-lg p-5">
        <h2 className="text-lg xl:text-xl font-gray-700 font-medium">
          Display Image
        </h2>
        <div className="pt-5 mb-8 flex justify-center items-center">
          <div className="border-2 md:border-4 bg-slate-100 border-dashed border-gray-300 rounded-lg p-8 w-48 h-40 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-400 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <p className="text-base text-gray-500">Upload PNG</p>
            <p className="text-sm text-gray-400">1280 x 720 Pixels</p>
          </div>
        </div>
      </div>

      {/* General Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-3 md:p-5">
          <h2 className="text-lg xl:text-2xl font-gray-700 font-medium">
            General Information
          </h2>

          <div className="space-y-6 px-3 py-5">
            <div>
              <p className="text-sm xl:text-xl font-semibold text-gray-600 mb-2">
                Collection Name
              </p>
              <input
                type="text"
                className="font-semibold text-sm xl:text-lg w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                placeholder="Jacket With Products"
              />
            </div>

            <div>
              <p className="text-sm xl:text-xl font-semibold text-gray-600 mb-2">
                Collection Description
              </p>
              <textarea
                className="text-sm xl:text-lg w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                rows={4}
                placeholder="Enter collection description..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm xl:text-xl text-gray-600 font-semibold mb-2">
                  Publish Type
                </p>
                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]">
                  <option>Instant</option>
                </select>
              </div>
              <div>
                <p className="text-sm xl:text-xl text-gray-600 font-semibold mb-2">
                  Date & Time
                </p>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                />
              </div>
            </div>

            <div>
              <p className="text-sm xl:text-xl text-gray-600 font-bold mb-2">
                Story Link
              </p>
              <input
                type="url"
                className="text-sm xl:text-lg  w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                placeholder="Enter story link"
              />
            </div>
          </div>
        </div>

        {/* Products & Discount Section */}
        <div className="space-y-6 bg-white rounded-xl shadow-lg p-3 md:p-5">
          <div>
            <h2 className="text-sm xl:text-xl text-gray-600 font-bold mb-2">
              Products
            </h2>
            <div className="relative w-full">
              {/* Dropdown button */}
              <button
                onClick={() => setIsOpenDropDown(!isOpenDropDown)}
                className="px-3 py-2 my-5 w-full text-gray-600 hover:bg-gray-100 rounded-md flex justify-between items-center border focus:ring-2 focus:ring-[#26B893] border-gray-300"
              >
                Select Product
                <IoIosArrowDropdownCircle className="text-2xl" />
              </button>

              {/* Dropdown menu */}
              {isOpenDropDown && (
                <div className="absolute right-0 mt-0 w-full bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <ul className="py-1">
                    <li className="block cursor-pointer text-base px-4 py-2  text-gray-700 hover:bg-gray-100">
                      Black Jacket
                    </li>
                    <li className="block cursor-pointer text-base px-4 py-2  text-gray-700 hover:bg-gray-100">
                      Green Jacket
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <button className="text-base text-gray-700 font-bold bg-[#a7f8d3] px-4 py-2 rounded-2xl">
              + Add Products
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm xl:text-2xl text-gray-600 font-bold mb-2">
                Discount
              </h2>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isDiscountEnabled}
                  onChange={() => setIsDiscountEnabled(!isDiscountEnabled)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#9ffcd2] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#a7f8d3]"></div>
              </label>
            </div>

            {isDiscountEnabled && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm xl:text-xl text-gray-600 font-bold mb-2">
                    Discount Amount
                  </p>
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                    placeholder="Enter discount amount"
                  />
                </div>

                <div>
                  <p className="text-sm xl:text-xl text-gray-600 font-bold mb-2">
                    Discount Period
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="date"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                      placeholder="From"
                    />
                    <input
                      type="date"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                      placeholder="To"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-end">
        <button className="px-6 py-3 bg-[#26B893] text-white rounded-lg hover:bg-[#6bd1b8] focus:outline-none focus:ring-2 focus:ring-[#26B893] focus:ring-offset-2">
          Create New Collection
        </button>
      </div>
    </div>
  );
};

export default CreateNewCollection;
