import glass from "../../assets/nft-image/glass.png";
import cube from "../../assets/nft-image/cube.png";
import expand from "../../assets/nft-image/expand.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards,Autoplay } from "swiper/modules";
import ar from "../../assets/nft-image/vr.png";
import vvr from "../../assets/nft-image/vvr.png";
import book from "../../assets/nft-image/book.png";
import cartNft from "../../assets/nft-image/cart-nft.png";
import lobby from "../../assets/nft-image/lobby.png";
import pd from "../../assets/nft-image/pd.png";
import threeD from "../../assets/nft-image/3d.png";
import { useEffect, useState } from "react";

const ProductsDetails = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [topSwiper, setTopSwiper] = useState(null);
    const [bottomSwiper, setBottomSwiper] = useState(null);

  const features = [
    {
      id: 1,
      icon: ar,
      text: "View In AR",
      isPrimary: true,
    },
    {
      id: 2,
      icon: vvr,
      text: "View In VR",
    },
    {
      id: 3,
      icon: threeD,
      text: "3D File",
    },
    {
      id: 4,
      icon: book,
      text: "Technical design book",
    },
    {
      id: 5,
      icon: pd,
      text: "Physical Dress",
    },
    {
      id: 6,
      icon: cartNft,
      text: "NFT",
    },
    {
      id: 7,
      icon: lobby,
      text: "Virtual lobby access key",
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      if (bottomSwiper && topSwiper) {
        const nextIndex = (activeIndex + 1) % features.length;
        bottomSwiper.slideTo(nextIndex);
        topSwiper.slideTo(nextIndex);
        setActiveIndex(nextIndex);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex, bottomSwiper, topSwiper]);

  return (
    <div>
      <div className="flex justify-between p-10">
        {/* left */}
        <div className="w-1/2 space-y-6 relative py-7">
          <div className="border py-14 rounded-xl shadow-lg">
            <div className="flex  flex-col justify-center items-center ">
              {/* Product Image */}
              <div className="border rounded-md w-[400px] h-[400px]">
                <img
                  src="https://res.cloudinary.com/dv51da0o9/image/upload/v1737951598/iofkn2cviuxpedwus7uk.png"
                  alt="Black Hoodie #43"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
            {/* Creator Section */}
            <div className="absolute right-4 bottom- flex items-center gap-3 bg-gray-200 rounded-md px-3 py-2">
              <img src={glass} className="w-12" />
              <img src={cube} className="w-8" />
              <img src={expand} className="w-6" />
            </div>
          </div>
        </div>
        {/* right */}
        <div className="px-7 w-1/2 space-y-4">
          <h2 className="text-5xl font-bold pb-6">Black Hoodie #43</h2>
          {/* Creator Section */}
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
          {/* slider */}
         
          <div>
            
            {/* -------------------------------------------------- */}
            <div>
      <div className="flex flex-col justify-between p-10">
        {/* Top Slider */}
        <div className="h-[500px] w-[400px]">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
            onSwiper={setTopSwiper}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
              if (bottomSwiper && bottomSwiper.activeIndex !== swiper.activeIndex) {
                bottomSwiper.slideTo(swiper.activeIndex);
              }
            }}
          >
            {features.map((feature, index) => (
              <SwiperSlide key={feature.id}>
                <div 
                  className={`h-[450px] w-[400px] transition-all duration-300
                    ${index === activeIndex ? 'transform -translate-y-4' : ''}
                    ${feature.text === 'NFT' ? 'bg-purple-300' : 'bg-gray-200'}
                  `}
                >
                 <p className="pt-5"> {feature.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Bottom Slider */}
        <div className="bg-red-300 h-[100px] flex justify-center items-center">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            modules={[Autoplay]}
            className="mySwiper"
            onSwiper={setBottomSwiper}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
              if (topSwiper && topSwiper.activeIndex !== swiper.activeIndex) {
                topSwiper.slideTo(swiper.activeIndex);
              }
            }}
          >
            {features.map((feature, index) => (
              <SwiperSlide key={feature.id}>
                <div
                  className={`
                    flex justify-center items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-300
                    ${index === activeIndex 
                      ? 'bg-indigo-500 text-white border-b-4 border-indigo-700' 
                      : 'bg-white text-gray-700'}
                  `}
                >
                  <img 
                    src={feature.icon} 
                    alt="" 
                    className={`h-6 ${index === activeIndex ? 'filter brightness-0 invert' : ''}`} 
                  />
                  <span className="font-semibold text-xl">
                    {feature.text}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
