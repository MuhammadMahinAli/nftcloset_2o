import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards,Autoplay } from "swiper/modules";
import ar from "../../../assets/nft-image/vr.png";
import vvr from "../../../assets/nft-image/vvr.png";
import book from "../../../assets/nft-image/book.png";
import cartNft from "../../../assets/nft-image/cart-nft.png";
import lobby from "../../../assets/nft-image/lobby.png";
import pd from "../../../assets/nft-image/pd.png";
import threeD from "../../../assets/nft-image/3d.png";
import { useEffect, useState } from "react";

const VersionSlider = () => {
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
    //   useEffect(() => {
    //     const interval = setInterval(() => {
    //       if (bottomSwiper && topSwiper) {
    //         const nextIndex = (activeIndex + 1) % features.length;
    //         bottomSwiper.slideTo(nextIndex);
    //         topSwiper.slideTo(nextIndex);
    //         setActiveIndex(nextIndex);
    //       }
    //     }, 4000);
    
    //     return () => clearInterval(interval);
    //   }, [activeIndex, bottomSwiper, topSwiper]);
    return (
        <div>
        <div className="flex flex-col justify-between p-10">
          {/* Top Slider */}
          <div className="h-[500px] w-[400px]">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards,Autoplay]}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false, // Won't stop on user interaction
              }}
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
  
  <div className="relative w-full bg-white rounded-xl p-4">
    <div className="overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${activeIndex * 50}%)` // Show 2 cards at a time
        }}
      >
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className="w-1/2 flex-shrink-0 px-2"
          >
            <button
              onClick={() => {
                setActiveIndex(index);
                topSwiper?.slideTo(index);
              }}
              className={`
                w-full flex justify-center items-center rounded-xl
                transition-all duration-300
                ${
                  index === activeIndex
                    ? 'bg-[#6366F1] text-white py-4 px-1'
                    : 'bg-transparent text-gray-700 py-3 px-4'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <img
                  src={feature.icon}
                  alt=""
                  className={`w-6 h-6 ${
                    index === activeIndex ? 'filter brightness-0 invert' : ''
                  }`}
                />
                <span className="whitespace-nowrap text-sm font-medium">
                  {feature.text}
                </span>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  
    {/* Dots Indicator */}
    <div className="flex justify-center gap-2 mt-6">
      {features.map((_, index) => (
        <button
          key={index}
          onClick={() => {
            setActiveIndex(index);
            topSwiper?.slideTo(index);
          }}
          className={`
            h-1.5 rounded-full transition-all duration-300
            ${index === activeIndex 
              ? 'w-6 bg-[#6366F1]' 
              : 'w-1.5 bg-gray-200'
            }
          `}
        />
      ))}
    </div>
  </div>
       
        </div>
      </div>
    );
};

export default VersionSlider;