import VersionSlider from "./DetailsComponent/VersionSlider";
import ExtraAssets from "./DetailsComponent/ExtraAssets";
import DescriptionCard from "./DetailsComponent/DescriptionCard";
import PriceCard from "./DetailsComponent/PriceCard";
import TokenCard from "./DetailsComponent/TokenCard";
import CollectionCard from "./DetailsComponent/CollectionCard";
import ActivityCard from "./DetailsComponent/ActivityCard";
import ProductImage from "./DetailsComponent/ProductImage";
import ProductInfo from "./DetailsComponent/ProductInfo";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

const ProductsDetails = () => {
  const data = useLoaderData();
    const productInfo = data?.data;
const { productName,
  _id,
  productDescription,
  displayImage: initialDisplayImage,
  price,
  stock,
  buyingLink,
  digitalAssets,
  collection,
  colors,
  extraVideos,
  extraImages,
  tokenDetails,
  sizeWithMaterial,
  sizeChart} = productInfo;


  const [displayImage, setDisplayImage] = useState(initialDisplayImage);

  return (
    <div>

      <div className="bg-[url('/ordersummarybg.png')]  bg-center bg-no-repeat hidden lg:grid grid-cols-2 gap-5 py-10 px-5 xl:px-10">
        {/* left */}
        <div className=" space-y-5">
          <ProductImage displayImage={displayImage} />
          <ExtraAssets extraVideos={extraVideos} extraImages={extraImages} onAssetClick={setDisplayImage} />
          <PriceCard _id={_id} price={price} collection={collection} />
          <TokenCard tokenDetails={tokenDetails} />
          <CollectionCard collection={collection} />
        </div>
        {/* right */}
        <div className=" space-y-5">
          <ProductInfo productName={productName} />
          <VersionSlider digitalAssets={digitalAssets} displayImage={displayImage} />
          <DescriptionCard  productDescription={productDescription} />
          <ActivityCard />
        </div>
      </div>
      <div className="lg:hidden grid grid-cols-1 gap-3 py-4 px-5">
        <ProductInfo  productName={productName}/>
        <ProductImage displayImage={displayImage}/>
        <ExtraAssets extraVideos={extraVideos} extraImages={extraImages} onAssetClick={setDisplayImage} />
        <VersionSlider digitalAssets={digitalAssets} displayImage={displayImage} />
        <DescriptionCard  productDescription={productDescription} />
        <PriceCard _id={_id} price={price} collection={collection}   />
        <TokenCard tokenDetails={tokenDetails} />
        <CollectionCard collection={collection}   />
        <ActivityCard />
      </div>
    </div>
  );
};

export default ProductsDetails;

