import fashionSlider from "../../../assets/nft-image/future-slider1.png";
import { useGetAllHomePageControlQuery } from "../../../features/homePageControl/homePageControlApi";
const FashionLab = () => {
    const { data: getAllHomePageControl } = useGetAllHomePageControlQuery();
    const getAllHomePageControlItem = getAllHomePageControl?.data;

   // console.log(getAllHomePageControlItem);
    const labLink = getAllHomePageControlItem?.fofLabLink;
  return (
    <div className="px-5 py-7 lg:p-10 bg-[url('/future-bg.png')] bg-no-repeat bg-cover">
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-white text-2xl lg:text-5xl font-bold roboto capitalize text-center py-2 md:py-3 lg:py-5">
          Future of Fashion Lab
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row lg:py-3">
        {/* left */}
        <div className="w-full lg:w-1/2 flex justify-center items-center mb-4 ">
          <img src={fashionSlider} className="w-60 md:w-[450px] lg:w-[400px] 3xl:w-[500px] border-2 border-white rounded-xl" />
        </div>
        {/* right */}

        <div className=" w-full lg:w-1/2 space-y-5  overflow-hidden">
          <div className=" space-y-5 relative rounded-lg overflow-hidden">
            {/* Glass effect overlay */}
            <div className="absolute inset-0 backdrop-blur-sm bg-white/15 mx-2 md:mx-16  lg:mx-2 rounded-md"></div>

            {/* Content */}
            <div className="relative p-4 md:p-6 flex flex-col h-full md:mx-14 lg:mx-2">
              <h2 className="text-[22px] md:text-2xl 3xl:text-4xl font-semibold text-white mb-3">
                Future Of Fashion Lab
              </h2>

              <p className="text-white/80 text-[16px] md:text-[17px] 3xl:text-[24px] mb-3">
              The Future of Fashion Lab will feature a virtual lobby, 3D dress designs, AR/VR versions of outfits, sandbox wear, animated videos, and many more immersive features, redefining the fashion experience.
              </p>
            </div>
          </div>
          <a href={labLink} target="blank" className="text-[17px] lg:text-[20px] float-right px-4 py-3 bg-white/60 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-white/30 transition-colors">
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default FashionLab;
