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
import lobbySlider from "../../../assets/nft-image/lobby-slide.png";
import nftSlider from "../../../assets/nft-image/nft-slide.png";
import phySlider from "../../../assets/nft-image/Physical-slide.png";
import recroomSlider from "../../../assets/nft-image/Recroom-slide.png";
import sandboxSlider from "../../../assets/nft-image/sandbox-slide.png";
import techdesignbookSlider from "../../../assets/nft-image/TechnicalDesignBook-slide.png";
import vrChatSlider from "../../../assets/nft-image/vrchat-slide.png";
import vrSlider from "../../../assets/nft-image/VR-slide.png";
import comingSlider from "../../../assets/nft-image/coming-soon.png";
import threedSlider from "../../../assets/nft-image/3d-slide.png";
import { useEffect, useState } from "react";

const VersionSlider = ({ digitalAssets, displayImage }) => {
  console.log(digitalAssets);
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
      text: "Experience augmented reality with our AR viewer.",
      title: "View In AR",
      video:
        "https://onchain.dressx.com/static/assets/images/AR%20dressing_Video.mp4",
    },
    {
      id: 2,
      icon: vvr,
      text: "Dive into virtual reality with our immersive VR experience.",
      title: "View In VR",
      image: vrSlider,
    },
    {
      id: 3,
      icon: threeD,
      text: "Explore the details of our 3D file with an interactive view.",
      title: "3D File",
      image: threedSlider,
    },
    {
      id: 4,
      icon: book,
      text: "Access the technical design book for in-depth insights.",
      title: "Technical design book",
      image: techdesignbookSlider,
    },
    {
      id: 5,
      icon: pd,
      text: "Discover the elegance of our physical dress collection.",
      title: "Physical Dress",
      image: phySlider,
    },
    {
      id: 6,
      icon: cartNft,
      text: "Own a unique digital asset with our exclusive NFT.",
      title: "NFT",
      image: nftSlider,
    },
    {
      id: 7,
      icon: lobby,
      text: "Unlock access to exclusive spaces with your virtual lobby key.",
      title: "Virtual lobby access key",
      image: lobbySlider,
    },
    {
      id: 8,
      icon: certification,
      text: "Review the official certification to ensure authenticity.",
      title: "Certification",
      image: comingSlider,
    },
    {
      id: 9,
      icon: recroom,
      text: "Explore the innovative design of our Recroom wearable.",
      title: "Recroom wearable",
      image: recroomSlider,
    },
    {
      id: 10,
      icon: animated,
      text: "Enjoy a dynamic display with our animated design.",
      title: "Animated",
      image: comingSlider,
    },
    {
      id: 11,
      icon: vrChat,
      text: "Customize your avatar with this exclusive VR Chat wearable.",
      title: "VR Chat Wearable",
      image: vrChatSlider,
    },
    {
      id: 12,
      icon: sandbox,
      text: "Step into a new world with our innovative sandbox wearable.",
      title: "Sandbox wearable",
      image: sandboxSlider,
    },
    {
      id: 13,
      icon: story,
      text: "Own the narrative behind our creation with story ownership.",
      title: "Ownership of story",
      image: comingSlider,
    },
  ];

  // Create a mapping object for feature text to digitalAssets keys
  const featureKeyMap = {
    "View In AR": "arversion",
    "View In VR": "vrversion",
    "3D File": "dfile",
    "Technical design book": "technicaldesignbook",
    "Virtual lobby access key": "virtuallobbyaccesskey",
    "Ownership of story": "ownershipofstory",
    Certification: "certification",
    "Sandbox wearable": "sandboxwearable",
    "VR Chat Wearable": "vrchatwearable",
    Animated: "animated",
    "Recroom wearable": "recroom",
  };

  // Filter available features using the mapping
  const availableFeatures = features.filter((feature) => {
    const digitalAssetsKey = featureKeyMap[feature.text];
    return (
      digitalAssetsKey &&
      digitalAssets[digitalAssetsKey] &&
      digitalAssets[digitalAssetsKey] !== ""
    );
  });

  // Filter slider data using the same mapping
  const availableSliderData = sliderData.filter((slide) => {
    const digitalAssetsKey = featureKeyMap[slide.title];
    return (
      digitalAssetsKey &&
      digitalAssets[digitalAssetsKey] &&
      digitalAssets[digitalAssetsKey] !== ""
    );
  });
  // ... keep all your imports and initial states ...

  // // Filter available features and slider data based on digitalAssets
  // const availableFeatures = features.filter(feature => {
  //   const featureKey = feature.text.toLowerCase().replace(/\s+/g, '');
  //   return digitalAssets[featureKey] && digitalAssets[featureKey] !== "";
  // });

  // const availableSliderData = sliderData.filter(slide => {
  //   const slideKey = slide.title.toLowerCase().replace(/\s+/g, '');
  //   return digitalAssets[slideKey] && digitalAssets[slideKey] !== "";
  // });

  // Reset activeIndex if it's out of bounds after filtering
  useEffect(() => {
    if (activeIndex >= availableFeatures.length) {
      setActiveIndex(0);
    }
  }, [availableFeatures.length, activeIndex]);

  return (
    <div className="bg-white rounded-xl shadow-[4px_2px_14px_-1px_rgba(0,_0,_0,_0.1)] space-y-4 p-3">
      <h1 className="font-bold text-gray-700 text-sm lg:text-[15px] xl:text-xl text-center py-3">
        Unleash the Full Potential of Your NFT
      </h1>
      <div className="flex flex-col justify-center items-center ">
        {/* Top Slider */}
        <div className="rounded-xl w-[200px] h-[373px] bg-white md:h-[380px] m lg:h-[400px] lg:w-[200px] xl:h-[515px] xl:w-[300px] 3xl:h-[512px]">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards, Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
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
            {availableSliderData.map((feature, index) => (
              <SwiperSlide key={feature.id}>
                <div
                  className={`flex flex-col justify-center items-center rounded-xl  bg-white w-[200px] h-[373px] md:h-[380px]  lg:h-[400px] lg:w-[200px] xl:h-[515px] xl:w-[300px] 3xl:h-[512px] transition-all duration-300
                      ${
                        index === activeIndex
                          ? "transform -translate-y-4 rounded-lg "
                          : ""
                      }
                    `}
                >
                  <div className="h-[80%] md:h-[50%] xl:h-[60%] rounded-t-lg  w-full flex justify-center items-center">
                    {feature.video ? (
                      <video
                        className="rounded-lg"
                        muted
                        autoPlay
                        playsInline
                        loop
                      >
                        <source src="/arVideo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="object-cover rounded-lg w-full"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-center items-center space-y-1 lg:space-y-2 px-1 md:px-3 pt-3 xl:pt-6 pb-6 md:pb-2 xl:pb-6">
                    <p className="text-[15px] md:text-[16px] lg:text-[15px] xl:text-xl font-bold text-gray-800 text-center">
                      {" "}
                      {feature.title}
                    </p>
                    <p className=" text-[14px] xl:text-[16px] text-center">
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

        {/* Bottom Slider for tab and desktop */}
        <div className="hidden md:block relative w-full bg-white rounded-xl p-2">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * 50}%)`,
              }}
            >
              {availableFeatures.map((feature, index) => (
                <div key={feature.id} className="w-1/2 flex-shrink-0 px-2 group transition-all">
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
                      ? "bg-[#847EF4] text-white py-4 px-4"
                      : "bg-transparent text-gray-700 py-3 px-4  hover:bg-[#847EF4] hover:text-white"
                  }
                `}
                  >
                    <div className="flex items-center gap-3 ">
                      <img
                        src={feature.icon}
                        alt=""
                        className={`w-6 h-6  transition-all group-hover:[filter:brightness(0)_invert(1)] ${
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
            {availableFeatures.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  topSwiper?.slideTo(index);
                }}
                className={`
                    h-1.5 rounded-full transition-all duration-300
                    ${
                      index === activeIndex
                        ? "w-6 bg-[#847EF4]"
                        : "w-1.5 bg-gray-200"
                    }
                  `}
              />
            ))}
          </div>
        </div>

        {/* Bottom Slider for mobile */}
        <div className="md:hidden w-11/12 bg-white p-2 shadow-lg rounded-xl">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {availableFeatures.map((feature, index) => (
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
                      ? "bg-[#847EF4] text-white py-4 px-4"
                      : "bg-transparent text-gray-700 py-3 px-4 hover:bg-[#847EF4] hover:text-white"
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
            {availableFeatures.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  topSwiper?.slideTo(index);
                }}
                className={`
                    h-1.5 rounded-full transition-all duration-300
                    ${
                      index === activeIndex
                        ? "w-6 bg-[#847EF4]"
                        : "w-1.5 bg-gray-200"
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
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/effect-cards";
// import { EffectCards, Autoplay } from "swiper/modules";
// import ar from "../../../assets/nft-image/vr.png";
// import vvr from "../../../assets/nft-image/vvr.png";
// import book from "../../../assets/nft-image/book.png";
// import cartNft from "../../../assets/nft-image/cart-nft.png";
// import lobby from "../../../assets/nft-image/lobby.png";
// import certification from "../../../assets/nft-image/certification.png";
// import recroom from "../../../assets/nft-image/recroom.png";
// import animated from "../../../assets/nft-image/animated.png";
// import vrChat from "../../../assets/nft-image/vr-chat.png";
// import sandbox from "../../../assets/nft-image/sandbox.png";
// import story from "../../../assets/nft-image/story.png";
// import pd from "../../../assets/nft-image/pd.png";
// import threeD from "../../../assets/nft-image/3d.png";
// import { useEffect, useState } from "react";

// const VersionSlider = ({digitalAssets}) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [topSwiper, setTopSwiper] = useState(null);
//   const [bottomSwiper, setBottomSwiper] = useState(null);

//   const features = [
//     {
//       id: 1,
//       icon: ar,
//       text: "View In AR",
//       isPrimary: true,
//     },
//     {
//       id: 2,
//       icon: vvr,
//       text: "View In VR",
//     },
//     {
//       id: 3,
//       icon: threeD,
//       text: "3D File",
//     },
//     {
//       id: 4,
//       icon: book,
//       text: "Technical design book",
//     },
//     {
//       id: 5,
//       icon: pd,
//       text: "Physical Dress",
//     },
//     {
//       id: 6,
//       icon: cartNft,
//       text: "NFT",
//     },
//     {
//       id: 7,
//       icon: lobby,
//       text: "Virtual lobby access key",
//     },
//     {
//       id: 8,
//       icon: certification,
//       text: "Certification",
//     },
//     {
//       id: 9,
//       icon: recroom,
//       text: "Recroom wearable",
//     },
//     {
//       id: 10,
//       icon: animated,
//       text: "Animated",
//     },
//     {
//       id: 11,
//       icon: vrChat,
//       text: "VR Chat Wearable",
//     },
//     {
//       id: 12,
//       icon: sandbox,
//       text: "Sandbox wearable",
//     },
//     {
//       id: 13,
//       icon: story,
//       text: "Ownership of story",
//     },
//   ];
//   const sliderData = [
//     {
//       id: 1,
//       icon: ar,
//       text: "lorem ispam lorem ispam lorem ispam",
//       title: "View In AR",
//     },
//     {
//       id: 2,
//       icon: vvr,
//       text: "lorem ispam lorem ispam lorem ispam",
//       title: "View In VR",
//     },
//     {
//       id: 3,
//       icon: threeD,
//       text: "lorem ispam lorem ispam lorem ispam",
//       title: "3D File",
//     },
//     {
//       id: 4,
//       icon: book,
//       text: "lorem ispam lorem ispam lorem ispam",
//       title: "Technical design book",
//     },
//     {
//       id: 5,
//       icon: pd,
//       text: "lorem ispam lorem ispam lorem ispam",
//       title: "Physical Dress",
//     },
//     {
//       id: 6,
//       icon: cartNft,
//       text: "lorem ispam lorem ispam lorem ispam",
//       title: "NFT",
//     },
//     {
//       id: 7,
//       icon: lobby,
//       text: "lorem ispam lorem ispam lorem ispam",
//       title: "Virtual lobby access key",
//     },
//     {
//       id: 8,
//       icon: certification,
//       text: "lorem ispam lorem ispam lorem ispam",
//       title: "Certification",
//     },
//     {
//       id: 9,
//       icon: recroom,
//       text: "lorem ispam lorem ispam lorem ispam",
//       title: "Recroom wearable",
//     },
//     {
//       id: 10,
//       icon: animated,
//       text: "lorem ispam lorem ispam lorem ispam",
//       title: "Animated",
//     },
//     {
//       id: 11,
//       icon: vrChat,
//       text: "lorem ispam lorem ispam lorem ispam",
//       title: "VR Chat Wearable",
//     },
//     {
//       id: 12,
//       icon: sandbox,
//       text: "lorem ispam lorem ispam lorem ispam",
//       title: "Sandbox wearable",
//     },
//     {
//       id: 13,
//       icon: story,
//       text: "lorem ispam lorem ispam lorem ispam",
//       title: "Ownership of story",
//     },
//   ];

//   //   useEffect(() => {
//   //     const interval = setInterval(() => {
//   //       if (bottomSwiper && topSwiper) {
//   //         const nextIndex = (activeIndex + 1) % features.length;
//   //         bottomSwiper.slideTo(nextIndex);
//   //         topSwiper.slideTo(nextIndex);
//   //         setActiveIndex(nextIndex);
//   //       }
//   //     }, 4000);

//   //     return () => clearInterval(interval);
//   //   }, [activeIndex, bottomSwiper, topSwiper]);
//   return (
//     <div className="p-3">
//       <div className="flex flex-col justify-center items-center ">
//         {/* Top Slider */}
//         <div className="rounded-lg w-[170px] h-[265px] bg-white md:h-[380px] md:w-[250px] lg:h-[360px] lg:w-[250px] xl:h-[515px] xl:w-[250px] 3xl:h-[512px]">
//           <Swiper
//             effect={"cards"}
//             grabCursor={true}
//             modules={[EffectCards, Autoplay]}
//             autoplay={{
//               delay: 4000,
//               disableOnInteraction: false, // Won't stop on user interaction md:h-[420px] md:w-[400px] md:h-[400px] md:w-[350px]
//             }}
//             className="mySwiper"
//             onSwiper={setTopSwiper}
//             onSlideChange={(swiper) => {
//               setActiveIndex(swiper.activeIndex);
//               if (
//                 bottomSwiper &&
//                 bottomSwiper.activeIndex !== swiper.activeIndex
//               ) {
//                 bottomSwiper.slideTo(swiper.activeIndex);
//               }
//             }}
//           >
//             {sliderData.map((feature, index) => (
//               <SwiperSlide key={feature.id}>
// <div
//   className={`flex flex-col justify-center items-center rounded-lg  bg-white w-[170px] h-[265px] md:h-[380px] md:w-[250px] lg:h-[360px] lg:w-[250px] xl:h-[515px] xl:w-[250px] 3xl:h-[512px] transition-all duration-300
//       ${
//         index === activeIndex
//           ? "transform -translate-y-4 rounded-lg "
//           : ""
//       }
//     `}
// >
//   <div className="h-[60%] md:h-[50%] xl:h-[60%] rounded-t-lg bg-gradient-to-b from-[#7e7e7e] via-[#aeaeae] to-[#eaeaea] w-full flex justify-center items-center">
//     <img
//       src="https://res.cloudinary.com/dv51da0o9/image/upload/v1737951598/iofkn2cviuxpedwus7uk.png"
//       className="w-20 md:w-32 lg:w-32 py-2 mt-5"
//     />
//   </div>
//   <div className="flex flex-col justify-center items-center space-y-1 lg:space-y-2 px-1 md:px-3 pt-3 pb-6 md:pb-2 xl:pb-6">
//     <p className="text-[15px] md:text-[16px] lg:text-xl font-bold text-gray-800 text-center">
//       {" "}
//       {feature.title}
//     </p>
//     <p className=" text-[14px] lg:text-[16px] text-center">
//       {" "}
//       {feature.text}
//     </p>
//     <button className="text-[15px] lg:text-[16px] border border-gray-700 rounded-3xl px-9 py-1 lg:py-2">
//       Buy to get
//     </button>
//   </div>
// </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>

//         {/* Bottom Slider for tab and destop */}

//         <div className="hidden md:block relative w-full bg-white rounded-xl p-2">
//           <div className="overflow-hidden">
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{
//                 transform: `translateX(-${activeIndex * 50}%)`, // Show 2 cards at a time
//               }}
//             >
//               {features.map((feature, index) => (
//                 <div key={feature.id} className="w-1/2 flex-shrink-0 px-2">
//                   <button
//                     onClick={() => {
//                       setActiveIndex(index);
//                       topSwiper?.slideTo(index);
//                     }}
//                     className={`
//                 w-full flex justify-center items-center rounded-xl
//                 transition-all duration-300
//                 ${
//                   index === activeIndex
//                     ? "bg-[#847EF4] text-white py-4 px-1"
//                     : "bg-transparent text-gray-700 py-3 px-4"
//                 }
//               `}
//                   >
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={feature.icon}
//                         alt=""
//                         className={`w-6 h-6 ${
//                           index === activeIndex
//                             ? "filter brightness-0 invert"
//                             : ""
//                         }`}
//                       />
//                       <span className="whitespace-nowrap text-sm font-medium">
//                         {feature.text}
//                       </span>
//                     </div>
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Dots Indicator */}
//           <div className="flex justify-center gap-2 mt-6">
//             {features.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   setActiveIndex(index);
//                   topSwiper?.slideTo(index);
//                 }}
//                 className={`
//             h-1.5 rounded-full transition-all duration-300
//             ${index === activeIndex ? "w-6 bg-[#12c9b5]" : "w-1.5 bg-gray-200"}
//           `}
//               />
//             ))}
//           </div>
//         </div>
//         {/* Bottom Slider for mbl */}
//         <div className="md:hidden w-11/12  bg-white p-2 shadow-lg rounded-xl">
//           <div className="overflow-hidden">
//             <div
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{
//                 transform: `translateX(-${activeIndex * 100}%)`,
//               }}
//             >
//               {features.map((feature, index) => (
//                 <div key={feature.id} className="w-full flex-shrink-0">
//                   <button
//                     onClick={() => {
//                       setActiveIndex(index);
//                       topSwiper?.slideTo(index);
//                     }}
//                     className={`
//                   w-full flex justify-center items-center rounded-xl
//                   transition-all duration-300
//                   ${
//                     index === activeIndex
//                       ? "bg-[#12c9b5] text-white py-4 px-4"
//                       : "bg-transparent text-gray-700 py-3 px-4"
//                   }
//                 `}
//                   >
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={feature.icon}
//                         alt=""
//                         className={`w-6 h-6 ${
//                           index === activeIndex
//                             ? "filter brightness-0 invert"
//                             : ""
//                         }`}
//                       />
//                       <span className="whitespace-nowrap text-sm font-medium">
//                         {feature.text}
//                       </span>
//                     </div>
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex justify-center gap-2 mt-4">
//             {features.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   setActiveIndex(index);
//                   topSwiper?.slideTo(index);
//                 }}
//                 className={`
//               h-1.5 rounded-full transition-all duration-300
//               ${
//                 index === activeIndex ? "w-6 bg-[#12c9b5]" : "w-1.5 bg-gray-200"
//               }
//             `}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VersionSlider;
