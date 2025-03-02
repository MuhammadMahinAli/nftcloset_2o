import {useState } from "react";
import BestProductSlider from "../Sliders/BestProductSlider/BestProductSlider";
import NewArrivalSlider from "../Sliders/NewArrivalSlider/NewArrivalSlider";
import CollectionSlider from "../Homepage/CollectionSlider/CollectionSlider";
import {
  useGetAllHomePageControlQuery,
} from "../../features/homePageControl/homePageControlApi";
import { Link } from "react-router-dom";

const HomePageControl = () => {
  const [open, setOpen] = useState(false);
  const { data: getAllHomePageControl } = useGetAllHomePageControlQuery();

  const getAllHomePageControlItem = getAllHomePageControl?.data;
  const getFeaturedCollection = getAllHomePageControlItem?.BannerCollection;
  const getBestProducts = getAllHomePageControlItem?.bestProducts;
  const getNewArrival = getAllHomePageControlItem?.newArrivalProducts;
 

  
  return (
    <div className="py-5">
      <h1 className="text-xl lg:text-3xl font-bold text-gray-700 rounded-xl py-5">
        Homepage Controls
      </h1>

   

      {/* Banners Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <p className="text-lg lg:text-xl font-bold text-gray-700 rounded-xl py-5">
            Banners
          </p>
          <Link
            to='/manageAccount/update-home-page-content'
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            Update
          </Link>
        </div>
        <CollectionSlider getFeaturedCollection={getFeaturedCollection} />
      </div>

      {/* Sliders */}
      <div className="mt-8">
        <NewArrivalSlider getNewArrival={getNewArrival} />
      </div>
      <div className="mt-8">
        <BestProductSlider getBestProducts={getBestProducts} />
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Update Banners</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            {/* Add your modal content here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePageControl;
