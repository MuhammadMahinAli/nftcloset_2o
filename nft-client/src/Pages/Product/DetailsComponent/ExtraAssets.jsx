// import { useEffect, useState } from "react";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// const ExtraAssets = ({extraVideos,extraImages}) => {
//   const products = [
//     {
//       id: 1,
//       name: "Blue Jacket",
//       price: "40 $",
//       image: "https://i.ibb.co.com/k0RjY1J/s1.jpg",
//     },
//     {
//       id: 2,
//       name: "Blue Jacket",
//       price: "40 $",
//       image: "https://i.ibb.co.com/k0RjY1J/s1.jpg",
//     },
//     {
//       id: 3,
//       name: "Blue Jacket",
//       price: "40 $",
//       image: "https://i.ibb.co.com/k0RjY1J/s1.jpg",
//     },
//     {
//       id: 4,
//       name: "Blue Jacket",
//       price: "40 $",
//       image: "https://i.ibb.co.com/k0RjY1J/s1.jpg",
//     },
//     {
//       id: 5,
//       name: "Blue Jacket",
//       price: "40 $",
//       image: "https://i.ibb.co.com/k0RjY1J/s1.jpg",
//     },
//     {
//       id: 6,
//       name: "Blue Jacket",
//       price: "40 $",
//       image: "https://i.ibb.co.com/k0RjY1J/s1.jpg",
//     },
//   ];
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   // Replace slides array with products array and calculate slides based on viewport
//   const getItemsPerSlide = () => {
//     if (typeof window !== "undefined") {
//       if (window.innerWidth < 768) return 3; // mobile
//       if (window.innerWidth < 1024) return 3; // tablet
//       return 3; // desktop
//     }
//     return 3; // default for SSR
//   };

//   const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

//   useEffect(() => {
//     const handleResize = () => {
//       setItemsPerSlide(getItemsPerSlide());
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const totalSlides = Math.ceil(products.length / itemsPerSlide);

//   const nextSlide = () => {
//     if (isTransitioning) return;
//     setIsTransitioning(true);
//     setCurrentSlide((prev) => (prev + 1) % totalSlides);
//   };

//   const prevSlide = () => {
//     if (isTransitioning) return;
//     setIsTransitioning(true);
//     setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsTransitioning(false);
//     }, 700);

//     return () => clearTimeout(timer);
//   }, [currentSlide]);
//   return (
//     <div className="relative w-full ">
//       <div className="relative h-[120px] xs:h-[140px] md:h-[170px] lg:h-[170px]  xl:h-[200px] 3xl:h-[200px] mx-10 md:mx-14 rounded-xl overflow-hidden">
//         <div
//           className="flex transition-transform duration-700 ease-in-out h-full"
//           style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//         >
//           {Array.from({ length: totalSlides }).map((_, slideIndex) => (
//             <div
//               key={slideIndex}
//               className="w-full h-full flex-shrink-0 flex gap-4 py-3"
//             >
//               {products
//                 .slice(
//                   slideIndex * itemsPerSlide,
//                   (slideIndex + 1) * itemsPerSlide
//                 )
//                 .map((product) => (
//                   <div
//                     key={product.id}
//                     className="flex-1 h-full bg-white hover:bg-[#edecec] rounded-lg overflow-hidden shadow-xl hover:shadow-md transition-shadow duration-300"
//                   >
//                     <div className="relative  overflow-hidden flex justify-center items-center">
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         className="w-14 xs:w-20 md:w-24 ssm:w-[75px] lg:w-24 xl:w-28 2xl:w-32 3xl:w-28 py-3  object-cover hover:scale-105 transition-transform duration-300"
//                       />
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Navigation arrows */}
//       <button
//         onClick={prevSlide}
//         disabled={isTransitioning}
//         className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#EDECEC] p-1 md:p-2 rounded-full hover:bg-[#d1d0d0] transition-colors disabled:opacity-50"
//       >
//         <IoIosArrowBack className="h-4 w-4 md:h-6 md:w-6 text-gray-600" />
//       </button>
//       <button
//         onClick={nextSlide}
//         disabled={isTransitioning}
//         className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#EDECEC]  p-1 md:p-2 rounded-full hover:bg-[#d1d0d0] transition-colors disabled:opacity-50"
//       >
//         <IoIosArrowForward className="h-4 w-4 md:h-6 md:w-6 text-gray-600" />
//       </button>
//     </div>
//   );
// };

// export default ExtraAssets;
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaPlay } from "react-icons/fa"; // Import play icon for videos

const ExtraAssets = ({ extraVideos, extraImages }) => {
  // Combine videos and images into one array
  const allAssets = [...extraVideos, ...extraImages].map((asset, index) => ({
    id: index,
    url: asset,
    type: extraVideos.includes(asset) ? 'video' : 'image'
  }));

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getItemsPerSlide = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) return 3;
      if (window.innerWidth < 1024) return 3;
      return 3;
    }
    return 3;
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(allAssets.length / itemsPerSlide);

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

  // Handle asset click
  const handleAssetClick = (asset) => {
    window.open(asset.url, '_blank');
  };

  return (
    <div className="relative w-full">
      <div className="relative h-[100px] xs:h-[100px] md:h-[170px] lg:h-[130px] xl:h-[150px] 3xl:h-[150px] mx-10 md:mx-14 rounded-xl overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div
              key={slideIndex}
              className="w-full h-full flex-shrink-0 flex gap-4 py-3"
            >
              {allAssets
                .slice(
                  slideIndex * itemsPerSlide,
                  (slideIndex + 1) * itemsPerSlide
                )
                .map((asset) => (
                  <div
                    key={asset.id}
                    onClick={() => handleAssetClick(asset)}
                    className="flex-1 h-full bg-white  rounded-lg overflow-hidden shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] hover:shadow-md transition-shadow duration-300 cursor-pointer relative"
                  >
                    <div className="relative h-full overflow-hidden flex justify-center items-center">
                      {asset.type === 'video' ? (
                        <>
                          <video
                            src={asset.url}
                            className="w-14 xs:w-20 md:w-24 ssm:w-[75px] lg:w-24 xl:w-28 2xl:w-32 3xl:w-28 py-3 object-cover hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                            <FaPlay className="text-white text-2xl" />
                          </div>
                        </>
                      ) : (
                        <img
                          src={asset.url}
                          alt="Asset"
                          className="w-14 xs:w-20 md:w-24 ssm:w-[75px] lg:w-24 xl:w-32 2xl:w-32 3xl:w-32 py-3 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows - only show if there are multiple slides */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#EDECEC] p-1 md:p-2 rounded-full hover:bg-[#d1d0d0] transition-colors disabled:opacity-50"
          >
            <IoIosArrowBack className="h-4 w-4 md:h-6 md:w-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#EDECEC] p-1 md:p-2 rounded-full hover:bg-[#d1d0d0] transition-colors disabled:opacity-50"
          >
            <IoIosArrowForward className="h-4 w-4 md:h-6 md:w-6 text-gray-600" />
          </button>
        </>
      )}
    </div>
  );
};

export default ExtraAssets;