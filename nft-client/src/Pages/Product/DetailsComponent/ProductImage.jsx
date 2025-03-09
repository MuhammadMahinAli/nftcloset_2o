// import glass from "../../../assets/nft-image/glass.png";
// import cube from "../../../assets/nft-image/cube.png";
// import expand from "../../../assets/nft-image/expand.png";

// const ProductImage = ({displayImage}) => {
//     return (
//         <div className="bg-white shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)]  space-y-5">
//         {/* img */}
//            <div className="relative border rounded-xl  h-[370px] md:h-[350px] lg:h-[500px] py-5 px-3 md:px-0">
//              <div className="flex justify-center items-center">
//                <div className="relative w-[300px] lg:w-[400px] aspect-square">
//                  <img
//                   // src="https://res.cloudinary.com/dv51da0o9/image/upload/v1737951598/iofkn2cviuxpedwus7uk.png"
//                   src={displayImage}
//                   alt="Black Hoodie #43"
//                    className="w-full h-full object-cover rounded-lg"
//                  />
//                </div>
//              </div>
//              {/* View Controls */}
//              <div className="absolute right-[20%] bottom-2 md:right-4 md:bottom-4 flex items-center gap-5 bg-gray-100 rounded-lg p-2">
//                <button className="hover:opacity-75 transition-opacity">
//                  <img src={glass} alt="View" className="md:w-10 md:h-7" />
//                </button>
//                <button className="hover:opacity-75 transition-opacity">
//                  <img src={cube} alt="3D View" className="md:w-9 md:h-8" />
//                </button>
//                <button className="hover:opacity-75 transition-opacity">
//                  <img src={expand} alt="Expand" className="md:w-6 md:h-6" />
//                </button>
//              </div>
//            </div>
//         </div>
        
//     );
// };

// export default ProductImage;

import { useEffect, useRef } from "react";
import glass from "../../../assets/nft-image/glass.png";
import cube from "../../../assets/nft-image/cube.png";
import expand from "../../../assets/nft-image/expand.png";

const ProductImage = ({ displayImage }) => {
  const videoRef = useRef(null);

  // When displayImage changes, ensure the video starts playing if it's a video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Reload video to reset source
      videoRef.current.play(); // Auto-play newly selected video
    }
  }, [displayImage]);

  return (
    <div className="bg-white shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] space-y-5">
      {/* Display Image or Video */}
      <div className="relative border rounded-xl h-[370px] md:h-[350px] lg:h-[500px] py-5 px-3 md:px-0 flex justify-center items-center">
        <div className="relative w-[300px] lg:w-[400px] aspect-square">
          {displayImage.includes(".mp4") || displayImage.includes(".webm") ? (
            <video
              ref={videoRef} // Attach reference to video element
              key={displayImage} // Forces re-render when a new video is selected
              src={displayImage}
              controls
              autoPlay
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <img 
              src={displayImage} 
              alt="Selected Asset" 
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>
      </div>

      {/* View Controls */}
      <div className="absolute right-[20%] bottom-2 md:right-4 md:bottom-4 flex items-center gap-5 bg-gray-100 rounded-lg p-2">
        <button className="hover:opacity-75 transition-opacity">
          <img src={glass} alt="View" className="md:w-10 md:h-7" />
        </button>
        <button className="hover:opacity-75 transition-opacity">
          <img src={cube} alt="3D View" className="md:w-9 md:h-8" />
        </button>
        <button className="hover:opacity-75 transition-opacity">
          <img src={expand} alt="Expand" className="md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  );
};

export default ProductImage;
