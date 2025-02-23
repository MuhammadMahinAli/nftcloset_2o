import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const ExtraAssets = () => {
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
        {
          id: 4,
          name: "Blue Jacket",
          price: "40 $",
          image: "https://i.ibb.co.com/k0RjY1J/s1.jpg",
        },
        {
          id: 5,
          name: "Blue Jacket",
          price: "40 $",
          image: "https://i.ibb.co.com/k0RjY1J/s1.jpg",
        },
        {
          id: 6,
          name: "Blue Jacket",
          price: "40 $",
          image: "https://i.ibb.co.com/k0RjY1J/s1.jpg",
        },
      ];
      const [currentSlide, setCurrentSlide] = useState(0);
      const [isTransitioning, setIsTransitioning] = useState(false);
    
      // Replace slides array with products array and calculate slides based on viewport
      const getItemsPerSlide = () => {
        if (typeof window !== "undefined") {
          if (window.innerWidth < 768) return 1; // mobile
          if (window.innerWidth < 1024) return 2; // tablet
          return 3; // desktop
        }
        return 3; // default for SSR
      };
    
      const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());
    
      useEffect(() => {
        const handleResize = () => {
          setItemsPerSlide(getItemsPerSlide());
        };
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
      const totalSlides = Math.ceil(products.length / itemsPerSlide);
    
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
          <div className="relative w-full">
          
               <div className="relative h-[200px] md:h-[200px]  xl:h-[200px] 3xl:h-[200px] mx-10 md:mx-14 rounded-xl overflow-hidden">
                 <div
                   className="flex transition-transform duration-700 ease-in-out h-full"
                   style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                 >
                   {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                     <div
                       key={slideIndex}
                       className="w-full h-full flex-shrink-0 flex gap-4 py-3"
                     >
                       {products
                         .slice(
                           slideIndex * itemsPerSlide,
                           (slideIndex + 1) * itemsPerSlide
                         )
                         .map((product) => (
                           <div
                             key={product.id}
                             className="flex-1 h-full bg-white hover:bg-[#edecec] rounded-lg overflow-hidden shadow-xl hover:shadow-md transition-shadow duration-300"
                           >
                             <div className="relative  overflow-hidden flex justify-center items-center">
                               <img
                                 src={product.image}
                                 alt={product.name}
                                 className="w-40 xl:w-32 3xl:w-28 py-3  object-cover hover:scale-105 transition-transform duration-300"
                               />
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
                 className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#EDECEC] p-2 rounded-full hover:bg-[#d1d0d0] transition-colors disabled:opacity-50"
               >
                 <IoIosArrowBack className="h-6 w-6 text-gray-600" />
               </button>
               <button
                 onClick={nextSlide}
                 disabled={isTransitioning}
                 className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#EDECEC] p-2 rounded-full hover:bg-[#d1d0d0] transition-colors disabled:opacity-50"
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
    );
};

export default ExtraAssets;