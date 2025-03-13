import { RiVerifiedBadgeFill } from "react-icons/ri";
import adminlogo from "../../../assets/nft-image/nftcloset_logo.png";

const ProductInfo = ({ productName }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <p className="text-blue-500 font-bold capitalize">{productName}</p>
        <RiVerifiedBadgeFill className="text-blue-500 bg-blue-100 rounded-full text-xl" />
      </div>
      <h1 className="text-2xl md:text-4xl font-bold  capitalize">
        {productName}
      </h1>

      {/* Creator Info */}
      <div className="flex items-center gap-2 md:gap-3 lg:p-3  rounded-lg">
        <img
          src={adminlogo}
          alt="Creator"
          className="h-10 md:w-14 w-10 md:h-14 rounded-full border-2 border-white shadow-md"
        />
        <div>
          <p className="text-lg capitalize font-bold">NFT closet x </p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
