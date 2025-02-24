import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards, Autoplay } from "swiper/modules";
import ar from "../../../assets/nft-image/vr.png";
import vvr from "../../../assets/nft-image/vvr.png";
import book from "../../../assets/nft-image/book.png";
import cartNft from "../../../assets/nft-image/cart-nft.png";
import lobby from "../../../assets/nft-image/lobby.png";
import certification from "../../../assets/nft-image/certification.png";
import recroom from "../../../assets/nft-image/recroom.png";
import animated from "../../../assets/nft-image/animated.png";
import vrChat from "../../../assets/nft-image/vr-chat.png";
import sandbox from "../../../assets/nft-image/sandbox.png";
import story from "../../../assets/nft-image/story.png";
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
    {
      id: 8,
      icon: certification,
      text: "Certification",
    },
    {
      id: 9,
      icon: recroom,
      text: "Recroom wearable",
    },
    {
      id: 10,
      icon: animated,
      text: "Animated",
    },
    {
      id: 11,
      icon: vrChat,
      text: "VR Chat Wearable",
    },
    {
      id: 12,
      icon: sandbox,
      text: "Sandbox wearable",
    },
    {
      id: 13,
      icon: story,
      text: "Ownership of story",
    },
  ];
  const sliderData = [
    {
      id: 1,
      icon: ar,
      text: "lorem ispam lorem ispam lorem ispam",
      title: "View In AR",
    },
    {
      id: 2,
      icon: vvr,
      text: "lorem ispam lorem ispam lorem ispam",
      title: "View In VR",
    },
    {
      id: 3,
      icon: threeD,
      text: "lorem ispam lorem ispam lorem ispam",
      title: "3D File",
    },
    {
      id: 4,
      icon: book,
      text: "lorem ispam lorem ispam lorem ispam",
      title: "Technical design book",
    },
    {
      id: 5,
      icon: pd,
      text: "lorem ispam lorem ispam lorem ispam",
      title: "Physical Dress",
    },
    {
      id: 6,
      icon: cartNft,
      text: "lorem ispam lorem ispam lorem ispam",
      title: "NFT",
    },
    {
      id: 7,
      icon: lobby,
      text: "lorem ispam lorem ispam lorem ispam",
      title: "Virtual lobby access key",
    },
    {
      id: 8,
      icon: certification,
      text: "lorem ispam lorem ispam lorem ispam",
      title: "Certification",
    },
    {
      id: 9,
      icon: recroom,
      text: "lorem ispam lorem ispam lorem ispam",
      title: "Recroom wearable",
    },
    {
      id: 10,
      icon: animated,
      text: "lorem ispam lorem ispam lorem ispam",
      title: "Animated",
    },
    {
      id: 11,
      icon: vrChat,
      text: "lorem ispam lorem ispam lorem ispam",
      title: "VR Chat Wearable",
    },
    {
      id: 12,
      icon: sandbox,
      text: "lorem ispam lorem ispam lorem ispam",
      title: "Sandbox wearable",
    },
    {
      id: 13,
      icon: story,
      text: "lorem ispam lorem ispam lorem ispam",
      title: "Ownership of story",
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
    <div className="p-3">
      <div className="flex flex-col justify-center items-center ">
        {/* Top Slider */}
        <div className="rounded-lg w-[170px] h-[265px] bg-white md:h-[350px] md:w-[250px] lg:h-[360px] lg:w-[250px] xl:h-[400px] xl:w-[250px]">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards, Autoplay]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false, // Won't stop on user interaction md:h-[420px] md:w-[400px] md:h-[400px] md:w-[350px]
            }}
            className="mySwiper"
            onSwiper={setTopSwiper}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
              if (
                bottomSwiper &&
                bottomSwiper.activeIndex !== swiper.activeIndex
              ) {
                bottomSwiper.slideTo(swiper.activeIndex);
              }
            }}
          >
            {sliderData.map((feature, index) => (
              <SwiperSlide key={feature.id}>
                <div
                  className={`flex flex-col justify-center items-center rounded-lg  bg-white w-[170px] h-[265px] md:h-[350px] md:w-[250px] lg:h-[360px] lg:w-[250px] xl:h-[400px] xl:w-[250px] transition-all duration-300
                      ${
                        index === activeIndex
                          ? "transform -translate-y-4 rounded-lg "
                          : ""
                      }
                    `}
                >
                  <div className="h-[60%] md:h-[50%] xl:h-[60%] rounded-t-lg bg-gradient-to-b from-[#7e7e7e] via-[#aeaeae] to-[#eaeaea] w-full flex justify-center items-center">
                    <img
                      src="https://res.cloudinary.com/dv51da0o9/image/upload/v1737951598/iofkn2cviuxpedwus7uk.png"
                      className="w-20 md:w-32 lg:w-32 py-2 mt-5"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center space-y-1 lg:space-y-2 px-1 md:px-3 pt-3 pb-6 md:pb-2 xl:pb-6">
                    <p className="text-[15px] md:text-[16px] lg:text-xl font-bold text-gray-800 text-center">
                      {" "}
                      {feature.title}
                    </p>
                    <p className=" text-[14px] lg:text-[16px] text-center">
                      {" "}
                      {feature.text}
                    </p>
                    <button className="text-[15px] lg:text-[16px] border border-gray-700 rounded-3xl px-9 py-1 lg:py-2">
                      Buy to get
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Bottom Slider for tab and destop */}

        <div className="hidden md:block relative w-full bg-white rounded-xl p-2">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * 50}%)`, // Show 2 cards at a time
              }}
            >
              {features.map((feature, index) => (
                <div key={feature.id} className="w-1/2 flex-shrink-0 px-2">
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
                    ? "bg-[#12c9b5] text-white py-4 px-1"
                    : "bg-transparent text-gray-700 py-3 px-4"
                }
              `}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={feature.icon}
                        alt=""
                        className={`w-6 h-6 ${
                          index === activeIndex
                            ? "filter brightness-0 invert"
                            : ""
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
            ${index === activeIndex ? "w-6 bg-[#12c9b5]" : "w-1.5 bg-gray-200"}
          `}
              />
            ))}
          </div>
        </div>
        {/* Bottom Slider for mbl */}
        <div className="md:hidden w-11/12  bg-white p-2 shadow-lg rounded-xl">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {features.map((feature, index) => (
                <div key={feature.id} className="w-full flex-shrink-0">
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
                      ? "bg-[#12c9b5] text-white py-4 px-4"
                      : "bg-transparent text-gray-700 py-3 px-4"
                  }
                `}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={feature.icon}
                        alt=""
                        className={`w-6 h-6 ${
                          index === activeIndex
                            ? "filter brightness-0 invert"
                            : ""
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

          <div className="flex justify-center gap-2 mt-4">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  topSwiper?.slideTo(index);
                }}
                className={`
              h-1.5 rounded-full transition-all duration-300
              ${
                index === activeIndex ? "w-6 bg-[#12c9b5]" : "w-1.5 bg-gray-200"
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
