import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useGetAllHomePageControlQuery } from "../../../features/homePageControl/homePageControlApi";

const NewArrivalSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { data: getAllHomePageControl } = useGetAllHomePageControlQuery();
  const getAllHomePageControlItem = getAllHomePageControl?.data;
  const getNewArrival = getAllHomePageControlItem?.newArrivalProducts;

  // Replace slides array with products array and calculate slides based on viewport
  const getItemsPerSlide = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) return 1; // mobile
      if (window.innerWidth < 1024) return 2; // tablet
      return 4; // desktop
    }
    return 4; // default for SSR
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(getNewArrival?.length / itemsPerSlide);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="py-3 md:py-10">
           <h1 className="roboto text-gray-600 text-3xl lg:text-5xl font-bold capitalize text-center pb-4 md:pb-3 lg:pb-5">
          New Arraivals
        </h1>
      <div className="relative w-full">
   
        <div className="relative h-[350px] md:h-[350px]  xl:h-[380px] 3xl:h-[470px] mx-10 md:mx-14 rounded-xl overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="w-full h-full flex-shrink-0 flex gap-4 py-3"
              >
                {getNewArrival
                  .slice(
                    slideIndex * itemsPerSlide,
                    (slideIndex + 1) * itemsPerSlide
                  )
                  ?.map((product) => (
                    <div
                      key={product.id}
                      className="flex-1 h-full bg-white hover:bg-[#edecec] rounded-lg overflow-hidden shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="relative  overflow-hidden flex justify-center items-center">
                        <img
                          src={product?.product?.displayImage}
                          alt={product?.product?.productName}
                          className="w-40 xl:w-44 3xl:w-60 py-3 h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 border-t border-gray-300">
                        <h3 className="text-gray-800 font-bold text-xl xl:text-2xl mb-2 capitalize">
                          {product?.product?.productName}
                        </h3>
                        <p className="text-gray-500 font-semibold lg:text-lg ">
                          ${product?.product?.price}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#EDECEC] rounded-lg md:px-1  h-[350px] md:h-[350px]  xl:h-[380px] 3xl:h-[470px] hover:bg-[#d1d0d0] transition-colors disabled:opacity-50"
        >
          <IoIosArrowBack className="h-6 w-6 text-gray-600" />
        </button>
        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#EDECEC] rounded-lg md:px-1  h-[350px] md:h-[350px]  xl:h-[380px] 3xl:h-[470px] hover:bg-[#d1d0d0] transition-colors disabled:opacity-50"
        >
          <IoIosArrowForward className="h-6 w-6 text-gray-600" />
        </button>

        {/* Dots indicator */}
        {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentSlide(index);
                }
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-blue-400" : "bg-gray-400"
              }`}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default NewArrivalSlider;
