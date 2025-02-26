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

const ProductsDetails = () => {
  const data = useLoaderData();
    const productInfo = data?.data;
const { productName,
  productDescription,
  displayImage,
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

  return (
    <div>
      {/* <div className="flex justify-between p-10">

        <div className="w-1/2 space-y-6 relative py-7">
          <div className="border py-14 rounded-xl shadow-lg">
            <div className="flex  flex-col justify-center items-center ">

              <div className="border rounded-md w-[400px] h-[400px]">
                <img
                  src="https://res.cloudinary.com/dv51da0o9/image/upload/v1737951598/iofkn2cviuxpedwus7uk.png"
                  alt="Black Hoodie #43"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
           
            <div className="absolute right-4 bottom- flex items-center gap-3 bg-gray-200 rounded-md px-3 py-2">
              <img src={glass} className="w-12" />
              <img src={cube} className="w-8" />
              <img src={expand} className="w-6" />
            </div>
          </div>
        </div>
    
        <div className="px-7 w-1/2 space-y-4">
          <h2 className="text-5xl font-bold pb-6">Black Hoodie #43</h2>
        
          <div className="flex items-center gap-3 mb-8">
            <img
              src="https://res.cloudinary.com/dv51da0o9/image/upload/v1737951598/iofkn2cviuxpedwus7uk.png"
              alt="Creator"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="text-2xl font-medium">Creator</p>
              <p className="text-xl text-green-600">Online</p>
            </div>
          </div>

         <ExtraAssets/>
         <DescriptionCard/>
         <PriceCard/>
         <TokenCard/>
         <CollectionCard/>
         <ActivityCard/>
          <div>
            
      
        <VersionSlider/>
          </div>
        </div>
      </div> */}

      <div className="hidden lg:grid grid-cols-2 gap-5 py-10 px-5 xl:px-10">
        {/* left */}
        <div className=" space-y-5">
          <ProductImage displayImage={displayImage} />
          <ExtraAssets extraVideos={extraVideos} extraImages={extraImages} />
          <PriceCard price={price} collection={collection} />
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
        <ExtraAssets extraVideos={extraVideos} extraImages={extraImages} />
        <VersionSlider digitalAssets={digitalAssets} displayImage={displayImage} />
        <DescriptionCard  productDescription={productDescription} />
        <PriceCard price={price} collection={collection}   />
        <TokenCard tokenDetails={tokenDetails} />
        <CollectionCard collection={collection}   />
        <ActivityCard />
      </div>
    </div>
  );
};

export default ProductsDetails;

// import { useEffect, useState } from "react";
// import glass from "../../assets/nft-image/glass.png";
// import cube from "../../assets/nft-image/cube.png";
// import expand from "../../assets/nft-image/expand.png";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/effect-cards";
// import { EffectCards } from "swiper/modules";
// import ar from "../../assets/nft-image/vr.png";
// import vvr from "../../assets/nft-image/vvr.png";
// import book from "../../assets/nft-image/book.png";
// import cartNft from "../../assets/nft-image/cart-nft.png";
// import lobby from "../../assets/nft-image/lobby.png";
// import pd from "../../assets/nft-image/pd.png";
// import threeD from "../../assets/nft-image/3d.png";

// const ProductsDetails = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [topSwiper, setTopSwiper] = useState(null);

//   const features = [
//     {
//       id: 1,
//       icon: ar,
//       text: "View In AR",
//       isPrimary: true,
//       description: "Experience this product in augmented reality",
//       bgColor: "bg-blue-100",
//     },
//     {
//       id: 2,
//       icon: vvr,
//       text: "View In VR",
//       description: "Immerse yourself in virtual reality",
//       bgColor: "bg-green-100",
//     },
//     {
//       id: 3,
//       icon: threeD,
//       text: "3D File",
//       description: "Download the 3D model file",
//       bgColor: "bg-yellow-100",
//     },
//     {
//       id: 4,
//       icon: book,
//       text: "Technical design book",
//       description: "View detailed technical specifications",
//       bgColor: "bg-orange-100",
//     },
//     {
//       id: 5,
//       icon: pd,
//       text: "Physical Dress",
//       description: "Order the physical product",
//       bgColor: "bg-purple-100",
//     },
//     {
//       id: 6,
//       icon: cartNft,
//       text: "NFT",
//       description: "Own the digital collectible",
//       bgColor: "bg-pink-100",
//     },
//     {
//       id: 7,
//       icon: lobby,
//       text: "Virtual lobby access key",
//       description: "Enter the virtual showroom",
//       bgColor: "bg-indigo-100",
//     },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (topSwiper) {
//         const nextIndex = (activeIndex + 1) % features.length;
//         topSwiper.slideTo(nextIndex);
//         setActiveIndex(nextIndex);
//       }
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [activeIndex, topSwiper]);

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-12">
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Left Column - Product Image */}
//         <div className="lg:w-1/2 space-y-6">
//           <div className="relative border rounded-xl shadow-lg p-6">
//             <div className="flex justify-center items-center">
//               <div className="relative w-full max-w-[400px] aspect-square">
//                 <img
//                   src="https://res.cloudinary.com/dv51da0o9/image/upload/v1737951598/iofkn2cviuxpedwus7uk.png"
//                   alt="Black Hoodie #43"
//                   className="w-full h-full object-cover rounded-lg"
//                 />
//               </div>
//             </div>
//             {/* View Controls */}
//             <div className="absolute right-4 bottom-4 flex items-center gap-3 bg-gray-100 rounded-lg p-2">
//               <button className="hover:opacity-75 transition-opacity">
//                 <img src={glass} alt="View" className="w-8 h-8" />
//               </button>
//               <button className="hover:opacity-75 transition-opacity">
//                 <img src={cube} alt="3D View" className="w-8 h-8" />
//               </button>
//               <button className="hover:opacity-75 transition-opacity">
//                 <img src={expand} alt="Expand" className="w-8 h-8" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Product Details */}
//         <div className="lg:w-1/2 space-y-6">
//           <div className="space-y-4">
//             <h1 className="text-4xl font-bold">Black Hoodie #43</h1>

//             {/* Creator Info */}
//             <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
//               <img
//                 src="https://res.cloudinary.com/dv51da0o9/image/upload/v1737951598/iofkn2cviuxpedwus7uk.png"
//                 alt="Creator"
//                 className="w-16 h-16 rounded-full border-2 border-white shadow-md"
//               />
//               <div>
//                 <p className="text-lg font-medium">Creator</p>
//                 <p className="text-green-600 font-medium">Online</p>
//               </div>
//             </div>
//           </div>

//           {/* Feature Showcase */}
//           <div className="space-y-8">
//             {/* Top Slider */}
//             <div className="h-[400px]">
//               <Swiper
//                 effect={"cards"}
//                 grabCursor={true}
//                 modules={[EffectCards]}
//                 className="mySwiper"
//                 onSwiper={setTopSwiper}
//                 onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
//               >
//                 {features.map((feature, index) => (
//                   <SwiperSlide key={feature.id}>
//                     <div
//                       className={`
//                         h-full w-full rounded-xl p-6
//                         ${feature.bgColor}
//                         transition-all duration-300
//                         ${index === activeIndex ? 'transform scale-105' : ''}
//                       `}
//                     >
//                       <div className="flex flex-col items-center justify-center h-full space-y-6">
//                         <img
//                           src={feature.icon}
//                           alt={feature.text}
//                           className="w-24 h-24 object-contain"
//                         />
//                         <h3 className="text-2xl font-bold text-center">
//                           {feature.text}
//                         </h3>
//                         <p className="text-center text-gray-600">
//                           {feature.description}
//                         </p>
//                       </div>
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             </div>

//             {/* Bottom Navigation */}
//             <div className="bg-white rounded-xl shadow-md p-4">
//               <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
//                 {features.map((feature, index) => (
//                   <button
//                     key={feature.id}
//                     onClick={() => {
//                       setActiveIndex(index);
//                       topSwiper?.slideTo(index);
//                     }}
//                     className={`
//                       flex items-center gap-2 px-4 py-3 rounded-lg
//                       transition-all duration-300 flex-shrink-0
//                       ${
//                         index === activeIndex
//                           ? 'bg-indigo-500 text-white transform -translate-y-1 shadow-lg'
//                           : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
//                       }
//                     `}
//                   >
//                     <img
//                       src={feature.icon}
//                       alt=""
//                       className={`w-6 h-6 ${
//                         index === activeIndex ? 'filter brightness-0 invert' : ''
//                       }`}
//                     />
//                     <span className="whitespace-nowrap font-medium">
//                       {feature.text}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductsDetails;
