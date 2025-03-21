import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useGetAllHomePageControlQuery } from "../../../features/homePageControl/homePageControlApi";

const CollectionSlider = () => {

 
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { data: getAllHomePageControl } = useGetAllHomePageControlQuery();
  const getAllHomePageControlItem = getAllHomePageControl?.data;
  const getFeaturedCollection = getAllHomePageControlItem?.BannerCollection;

 

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % getFeaturedCollection.length);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + getFeaturedCollection.length) % getFeaturedCollection.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 700); 

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="relative w-full mb-10 ">
  
      <div className="relative h-[150px] md:h-[200px] lg:h-[250px] xl:h-[350px] 3xl:h-[400px] mx-10 md:mx-14 rounded-xl overflow-hidden">
   
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {getFeaturedCollection?.map((slide, index) => (
            <img
              key={index}
              src={slide.collection.displayImage}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#EDECEC] rounded-lg md:px-1 h-[150px] md:h-[200px] lg:h-[250px] xl:h-[350px] 3xl:h-[400px] hover:bg-[#d1d0d0] transition-colors disabled:opacity-50"
      >
        <IoIosArrowBack className="h-6 w-6 text-gray-600" />
      </button>
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#EDECEC] rounded-lg md:px-1 h-[150px] md:h-[200px] lg:h-[250px] xl:h-[350px] 3xl:h-[400px] hover:bg-[#d1d0d0] transition-colors disabled:opacity-50"
      >
        <IoIosArrowForward className="h-6 w-6 text-gray-600" />
      </button>

      {/* Dots indicator */}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {getFeaturedCollection?.map((_, index) => (
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
      </div>
    </div>
  );
};

export default CollectionSlider;
