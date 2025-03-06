import { RiVerifiedBadgeFill } from "react-icons/ri";


const ProductInfo = ({productName}) => {
    return (
   
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <p className="text-blue-500 font-bold capitalize">{productName}</p>
                <RiVerifiedBadgeFill className="text-blue-500 bg-blue-100 rounded-full text-xl" />
          
            </div>
          <h1 className="text-2xl md:text-4xl font-bold  capitalize">{productName}</h1>
         
          {/* Creator Info */}
          <div className="flex items-center gap-2 md:gap-4 lg:p-4  rounded-lg">
            <img
              src="https://res.cloudinary.com/dv51da0o9/image/upload/v1737951598/iofkn2cviuxpedwus7uk.png"
              alt="Creator"
              className="h-14 md:w-16 w-14 md:h-16 rounded-full border-2 border-white shadow-md"
            />
            <div>
              <p className="text-lg font-medium">Creator</p>
              <p className="text-green-600 font-medium">Online</p>
            </div>
          </div>
          </div>


    );
};

export default ProductInfo;