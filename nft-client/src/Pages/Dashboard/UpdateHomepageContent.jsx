import { useEffect, useState } from "react";
import { useAddHomePageControlMutation, useGetAllHomePageControlQuery } from "../../features/homePageControl/homePageControlApi";
import { useGetAllProductQuery } from "../../features/product/productApi";
import { useGetAllCollectionQuery } from "../../features/collection/collectionApi";
import Swal from "sweetalert2";


const UpdateHomepageContent = () => {
    const [addHomePageControl] = useAddHomePageControlMutation();
   const { data: getAllProduct } = useGetAllProductQuery();
     const { data: getAllCollection } = useGetAllCollectionQuery();
     const { data: getAllHomePageControl } = useGetAllHomePageControlQuery();
   
     const getAllHomePageControlItem = getAllHomePageControl?.data;
    
   
   
    const products = getAllProduct?.data;
    const collections = getAllCollection?.data;
    
    
    const [formData, setFormData] = useState({
        BannerCollection: getAllHomePageControlItem?.BannerCollection || [],
        bestProducts: getAllHomePageControlItem?.bestProducts || [],
        newArrivalProducts: getAllHomePageControlItem?.newArrivalProducts || [],
        fofLabLink: getAllHomePageControlItem?.fofLabLink || "",
      });
    
      // Update formData when getAllHomePageControlItem changes
      useEffect(() => {
        if (getAllHomePageControlItem) {
          setFormData({
            BannerCollection: getAllHomePageControlItem.BannerCollection || [],
            bestProducts: getAllHomePageControlItem.bestProducts || [],
            newArrivalProducts: getAllHomePageControlItem.newArrivalProducts || [],
            fofLabLink: getAllHomePageControlItem.fofLabLink || "",
          });
        }
      }, [getAllHomePageControlItem]);
    
      const [activeTab, setActiveTab] = useState("newArrival");
    
      // Debug logging
      useEffect(() => {
        console.log("Current formData:", formData);
        console.log("Active Tab:", activeTab);
      }, [formData, activeTab]);
    
      const isProductSelected = (productId) => {
        const currentList =
          activeTab === "newArrival"
            ? formData.newArrivalProducts
            : formData.bestProducts;
        return currentList.some(
          (p) => p.product === productId || p.product?._id === productId
        );
      };
    
      const isCollectionSelected = (collectionId) => {
        return formData.BannerCollection.some(
          (c) => c.collection === collectionId || c.collection?._id === collectionId
        );
      };
    
      const handleProductToggle = (productId) => {
        const listKey = activeTab === 'newArrival' ? 'newArrivalProducts' : 'bestProducts';
        
        setFormData(prev => {
          const currentList = prev[listKey];
          const isSelected = currentList.some(p => 
            p.product === productId || p.product?._id === productId
          );
          
          const updatedList = isSelected
            ? currentList.filter(p => 
                p.product !== productId && p.product?._id !== productId
              )
            : [...currentList, { product: productId }];
    
          return {
            ...prev,
            [listKey]: updatedList
          };
        });
      };
    
    
    
      const handleCollectionToggle = (collectionId) => {
        setFormData(prev => {
          const isSelected = prev.BannerCollection.some(c => 
            c.collection === collectionId || c.collection?._id === collectionId
          );
          
          const updatedList = isSelected
            ? prev.BannerCollection.filter(c => 
                c.collection !== collectionId && c.collection?._id !== collectionId
              )
            : [...prev.BannerCollection, { collection: collectionId }];
    
          return {
            ...prev,
            BannerCollection: updatedList
          };
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await addHomePageControl(formData).unwrap();
          Swal.fire({
            title: "Success!",
            text: "Homepage controls have been updated successfully",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#2CBA7A",
            timer: 2000,
            timerProgressBar: true,
            toast: true,
            position: "top-end",
            showConfirmButton: false
          });
        } catch (error) {
          console.error("Failed to update:", error);
          Swal.fire({
            title: "Error!",
            text: error?.data?.message || "Failed to update homepage controls",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#2CBA7A",
            timer: 3000,
            timerProgressBar: true,
            toast: true,
            position: "top-end",
            showConfirmButton: false
          });
        }
      };
      //const [activeTab, setActiveTab] = useState('newArrival');
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
      const tabs = [
        {
          id: 'newArrival',
          label: 'New Arrival Products',
          count: formData.newArrivalProducts.length
        },
        {
          id: 'bestProduct',
          label: 'Best Products',
          count: formData.bestProducts.length
        },
        {
          id: 'collections',
          label: 'Collections',
          count: formData.BannerCollection.length
        },
        {
          id: 'fofLabLink',
          label: 'FOF Lab Link'
        }
      ];
    
      // Close dropdown when clicking outside
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (!event.target.closest('.dropdown-container')) {
            setIsDropdownOpen(false);
          }
        };
    
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
      }, []);
    
    
    return (
        <div className="px-0 py-4 md:px-4 md:py-4 lg:px-7 lg:py-7 lg:min-h-screen">
           <div className="mb-8 relative dropdown-container md:hidden">
        <div className="border-b border-gray-200">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full md:w-64 flex items-center justify-between px-4 py-2 text-sm md:text-[17px] font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2CBA7A]"
            >
              <span className="flex items-center">
                {tabs.find(tab => tab.id === activeTab)?.label}
                {activeTab !== 'fofLabLink' && (
                  <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2.5 rounded-full text-xs">
                    {tabs.find(tab => tab.id === activeTab)?.count}
                  </span>
                )}
              </span>
              <svg
                className={`ml-2 h-5 w-5 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Dropdown Menu Items */}
            {isDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full md:w-64 bg-white rounded-md shadow-lg">
                <div className="py-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-2 text-sm md:text-[17px] ${
                        activeTab === tab.id
                          ? 'bg-gray-100 text-[#2CBA7A]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {tab.label}
                      {tab.count !== undefined && (
                        <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2.5 rounded-full text-xs">
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

               {/* Product Selection Tabs  tab,dekstop*/}
      <div className=" mb-8">
        <div className="border-b border-gray-200">
          <div className="hidden md:flex space-x-3 lg:space-x-8">
            <button
              type="button"
              onClick={() => setActiveTab("newArrival")}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm md:text-[16px] lg:text-[17px] transition-colors duration-200 ${
                activeTab === "newArrival"
                  ? "border-[#2CBA7A] text-[#2CBA7A]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              New Arrival Products
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2.5 rounded-full text-xs">
                {formData.newArrivalProducts.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("bestProduct")}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm md:text-[16px] lg:text-[17px] transition-colors duration-200 ${
                activeTab === "bestProduct"
                  ? "border-[#2CBA7A] text-[#2CBA7A]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Best Products
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2.5 rounded-full text-xs">
                {formData.bestProducts.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("collections")}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm md:text-[16px] lg:text-[17px] transition-colors duration-200 ${
                activeTab === "collections"
                  ? "border-[#2CBA7A] text-[#2CBA7A]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Collections
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2.5 rounded-full text-xs">
                {formData.BannerCollection.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("fofLabLink")}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm md:text-[16px] lg:text-[17px] transition-colors duration-200 ${
                activeTab === "fofLabLink"
                  ? "border-[#2CBA7A] text-[#2CBA7A]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              FOF Lab Link
            </button>
          </div>
        </div>

        {/* Product/Collection Grid */}
        <form onSubmit={handleSubmit} className="lg:mt-6">
          {activeTab === "fofLabLink" ? (
            <div className="bg-white p-2 lg:p-6 rounded-xl shadow-md">
              <div className="max-w-2xl">
                <label
                  htmlFor="fofLabLink"
                  className="block text-lg font-bold text-gray-700 mb-2"
                >
                  FOF Lab Link
                </label>
                <input
                  type="text"
                  id="fofLabLink"
                  name="fofLabLink"
                  value={formData.fofLabLink}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fofLabLink: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#26B893]"
                  placeholder="Enter FOF Lab Link"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-6 rounded-xl shadow-md">
              {activeTab !== "collections"
                ? products?.map((product) => (
                    <div
                      key={product._id}
                      className={`relative flex items-start space-x-4 p-2 md:p-4 rounded-lg transition-all duration-200 ${
                        isProductSelected(product._id)
                          ? "bg-green-50 border-2 border-green-500"
                          : "bg-gray-50 border-2 border-transparent hover:border-gray-200"
                      }`}
                    >
                      {/* Product Info */}
                      <div className="flex-grow">
                        <label className="flex items-start space-x-3 cursor-pointer">
                          <div className="relative">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-green-500 rounded border-gray-300 focus:ring-green-500 transition-all duration-200"
                              checked={isProductSelected(product._id)}
                              onChange={() => handleProductToggle(product._id)}
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900 capitalize">
                              {product.productName}
                            </span>
                            <span className="text-sm text-gray-500">
                              ${product.price}
                            </span>
                          
                          </div>
                        </label>
                      </div>
                    </div>
                  ))
                : collections?.map((collection) => (
                    <div
                      key={collection._id}
                      className={`relative flex items-start space-x-4 p-2 md:p-4  rounded-lg transition-all duration-200 ${
                        isCollectionSelected(collection._id)
                          ? "bg-green-50 border-2 border-green-500"
                          : "bg-gray-50 border-2 border-transparent hover:border-gray-200"
                      }`}
                    >
                      <div className="flex-grow">
                        <label className="flex items-start space-x-3 cursor-pointer">
                          <div className="relative">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-green-500 rounded border-gray-300 focus:ring-green-500 transition-all duration-200"
                              checked={isCollectionSelected(collection._id)}
                              onChange={() =>
                                handleCollectionToggle(collection._id)
                              }
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900 capitalize">
                              {collection.collectionName}
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                  ))}
            </div>
          )}
          <div className="mt-6 flex justify-end">
          <button className=" text-xl bg-[#2CBA7A] text-white py-2 px-4 rounded hover:bg-[#42bd86]">
             Save changes
            </button>
          </div>
        </form>
      </div>
        </div>
    );
};

export default UpdateHomepageContent;