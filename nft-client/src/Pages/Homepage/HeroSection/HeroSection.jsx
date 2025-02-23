import HeroImage from "../../../assets/nft-clogetlogo-2@2x.png";
import blurHeroImage from "../../../assets/blur-hero.png";
import digitalCollection from "../../../assets/frame-18@2x.png";
import MintModal from "../MintNFTModal/MintModal";
import { useContext, useEffect, useState } from "react";
//import { useAuthCheck } from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";

const HeroSection = () => {
  AOS.init();
  const [openMintModal, setOpenMintModal] = useState(false);
  const navigate = useNavigate();

  const handleMint = () => {
    if (!userEmail) {
      navigate("/seller/signup");
    } else {
      setOpenMintModal(true);
    }
  };
  return (
    <>
      <div
        className={`lg:bg-gradient-to-b from-pink-100 to-white relative md:m-6 rounded-xl bg-no-repeat flex flex-col lg:flex-row lg:justify-between items-center  md:px-10 2xl:px-14  md:py-5 lg:py-20 text-gray-500 overflow-x-hidden scrollbar-hide space-y-4`}
      >
        {/****************************************** Left content ***********************************/}
        <div className="absolute flex justify-center items-center">
          <img
            className="w-7/12 p-20 opacity-30 blur-md object-cover"
            alt=""
            src={HeroImage}
          />
        </div>

        <div
          data-aos="fade-up-left"
          data-aos-duration="1200"
          className="flex flex-col items-center lg:items-start lg:space-y-5 3xl:space-y-10 "
        >
          <div className="py-3 flex flex-col space-y-3 lg:space-y-10 3xl:space-y-16 ">
            <b className="font-extrabold text-center lg:text-start text-2xl md:text-4xl lg:text-[50px] 3xl:text-[60px] tracking-[0.05em] capitalize inline-block text-gray-800">
              Unlock Digital
            </b>
            <b className="font-extrabold text-center lg:text-start text-2xl md:text-4xl lg:text-[50px] 3xl:text-[60px] tracking-[0.05em] capitalize inline-block text-gray-800">
              Fashion Trends
            </b>
          </div>
          <div className="">
            <div className="flex justify-center items-center">
              <Link
                to="/seller/signup"
                className="bg-gradient-to-r text-2xl  md:text-4xl lg:text-6xl uppercase font-extrabold from-[#D71EF9] via-[#0EB8DA] to-[#17D6A7] inline-block text-transparent bg-clip-text cursor-pointer"
              >
                MINT NOW
              </Link>
            </div>
            <div className="flex items-center space-x-3 py-4">
              <div className="flex  items-center  bg-gray-900  text-white hover:bg-white hover:text-gray-900 border border-gray-900 px-2 bg-gray rounded-xl filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
                <label
                  htmlFor="mint-popup"
                  onClick={handleMint}
                  className="capitalize cursor-pointer text-[18px] font-semibold px-3"
                >
                  Mint NFT
                </label>
              </div>
              {/* become seller button */}
              <div className="flex  items-center px-3 py-1 rounded-xl text-gray-900 hover:text-white hover:bg-gray-900 border-2 border-white ">
                <p className="cursor-pointer capitalize text-[18px]  p-[6px] rounded-lg font-semibold ">
                  <h1>Explore</h1>
                </p>
              </div>
            </div>
          </div>
        </div>
        {openMintModal === true && (
          <MintModal
            openMintModal={openMintModal}
            setOpenMintModal={setOpenMintModal}
          />
        )}
        {/****************************************** Right content ***********************************/}

        <div
          // data-aos="fade-up-right"
          // data-aos-duration="1200"
          className=" border border-white px-3 py-4 lg:pt-5 rounded-xl  shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)] backdrop-filter:blur(20px); xl:ml-10  w-11/12 md:w-[380px] lg:w-[450px] lg:h-[480px] xl:h-[500px] 3xl:w-[500px] 3xl:h-[530px]"
        >
          <img
            className="w-full md:h-[400px] lg:h-[440px] xl:h-[450px] 3xl:h-[490px] object-cover bg-[#F5C4D6] rounded-lg"
            alt=""
            src={HeroImage}
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
// import HeroImage from "../../../assets/nft-clogetlogo-2@2x.png";
// import blurHeroImage from "../../../assets/blur-hero.png";
// import digitalCollection from "../../../assets/frame-18@2x.png";
// import MintModal from "../MintNFTModal/MintModal";
// import { useContext, useEffect, useState } from "react";
// //import { useAuthCheck } from "../../../hooks/useAuth";
// import { Link, useNavigate } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Swal from "sweetalert2";
// //import { NFTMarketplaceContext } from "../../../../Context/NFTMarketplaceContext";

// const HeroSection = () => {
//   AOS.init();
//   //const { checkWalletConnected, fetchNFT } = useContext(NFTMarketplaceContext);
//   const [openMintModal, setOpenMintModal] = useState(false);
//   //const { userEmail } = useAuthCheck();
//   const navigate = useNavigate();
//   const [wallet, setWallet] = useState("");
//   // useEffect(() => {
//   //   const connectWallet = async () => {
//   //     const wallet = await checkWalletConnected();
//   //     setWallet(wallet);
//   //     const items = await fetchNFT();
//   //     console.log(items);
//   //   };
//   //   connectWallet();
//   // }, [userEmail]);
//   //
//   const handleMint = () => {
//     if (!userEmail) {
//       navigate("/seller/signup");
//     } else {
//       setOpenMintModal(true);
//     }
//   };
//   //bg-[url({${HeroImage}})] bg-no-repeat
//   return (
//     <>
//       <div
//         className={`bg-gradient-to-b from-pink-100 to-white relative m-6 rounded-xl bg-no-repeat flex flex-col-reverse md:flex-row lg:justify-between items-center px-20 md:px-10 2xl:px-14  py-10 lg:py-20 text-gray-500 overflow-x-hidden scrollbar-hide`}
//       >
//         {/****************************************** Left content ***********************************/}
//         <div className="absolute flex justify-center items-center">
//           <img
//             className="w-7/12 p-20 opacity-30 blur-md object-cover"
//             alt=""
//             src={HeroImage}
//           />
//         </div>

//         <div
//           data-aos="fade-up-left"
//           data-aos-duration="1200"
//           className="flex flex-col items-center md:items-start lg:space-y-5 3xl:space-y-10"
//         >
//           <div className="py-3 flex flex-col lg:space-y-10 3xl:space-y-16">
//             <b className="text-center md:text-start text-2xl lg:text-[50px] 3xl:text-[60px] tracking-[0.05em] capitalize inline-block text-gray-800">
//               Unlock Digital
//             </b>
//             <b className="text-center md:text-start text-2xl lg:text-[50px] 3xl:text-[60px] tracking-[0.05em] capitalize inline-block text-gray-800">
//               Fashion Trends
//             </b>
//           </div>
//           {/* <h1 className="bg-gradient-to-r text-6xl uppercase font-bold from-[#D71EF9] via-[#0EB8DA] to-[#17D6A7] inline-block text-transparent bg-clip-text">mint now</h1> */}
//           {/* <p className="text-center md:text-start lg:pt-10 text-lg lg:text-[40px] 3xl:text-[40px] text-gray-500 capitalize font-semibold">33/5555 MINTED</p> */}
//           {/* buttons container start */}
//           <div className="">
//             <div className="">
//               {/* {userEmail ? (
//                 <>
//                   <label
//                     htmlFor="mint-popup"
//                     className="bg-gradient-to-r text-6xl uppercase font-bold from-[#D71EF9] via-[#0EB8DA] to-[#17D6A7] inline-block text-transparent bg-clip-text cursor-pointer"
//                   >
//                     MINT NOW
//                   </label>
//                 </>
//               ) : ( */}
//                 <Link
//                   to="/seller/signup"
//                   className="bg-gradient-to-r text-6xl uppercase font-bold from-[#D71EF9] via-[#0EB8DA] to-[#17D6A7] inline-block text-transparent bg-clip-text cursor-pointer"
//                 >
//                   MINT NOW
//                 </Link>
//               {/* )} */}
//             </div>
//             <div className="flex items-center space-x-3 py-4">
//               <div className="lg:flex hidden items-center  bg-gray-900  text-white hover:bg-white hover:text-gray-900 border border-gray-900 px-2 bg-gray rounded-xl filter:blur(2px) backdrop-filter:blur(20px) h-[47px]">
//                 <label
//                    htmlFor="mint-popup"
//                   onClick={handleMint}
//                   className="capitalize cursor-pointer text-[18px] font-semibold px-3"
//                 >
//                   Mint NFT
//                 </label>
//               </div>
//               {/* become seller button */}
//               <div className="lg:flex hidden items-center px-3 py-1 rounded-xl text-gray-900 hover:text-white hover:bg-gray-900 border-4 border-white ">
//                 <p className="cursor-pointer capitalize text-[18px]  p-[6px] rounded-lg font-semibold ">
//                   <h1>Explore</h1>
//                 </p>
//               </div>
//             </div>
//           </div>
//           {/* buttons container end */}
//           {/* <div className="pr-5 text-center md:text-start break-all lg:pr-8 pt-3 lg:pt-0 3xl:leading-10  lg:text-[22px] text-lg md:text-[16px] 3xl:text-[25px] capitalize font-semibold inline-block">Max 2 NFTS PER WALLET . PER NFT PRICE 0.03 ETH + GAS</div> */}
//         </div>
//         {openMintModal === true && (
//           <MintModal
//             openMintModal={openMintModal}
//             setOpenMintModal={setOpenMintModal}
//           />
//         )}
//         {/****************************************** Right content ***********************************/}

//         <div
//           data-aos="fade-up-right"
//           data-aos-duration="1200"
//           className="border border-white px-5 pt-5 rounded-xl  shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)] backdrop-filter:blur(20px); xl:ml-10 w-[250px] lg:w-[450px] lg:h-[480px] xl:h-[500px] 3xl:w-[500px] 3xl:h-[530px]"
//         >
//           <img
//             className="w-full xl:h-[450px] 3xl:h-[490px] object-cover bg-[#F5C4D6] rounded-lg"
//             alt=""
//             src={HeroImage}
//           />
//         </div>
//       </div>
//       {/***************************************** Digital collection  *******************************/}

//     </>
//   );
// };

// export default HeroSection;
