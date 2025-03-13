import { IoIosSearch } from "react-icons/io";
import banner from "../../assets/nft-image/banner.png";
import banner1280 from "../../assets/nft-image/banner1280.jpg";
import { IoCartOutline, IoReloadSharp } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";

const CollectionDetails = () => {
   const {userId} = useContext(AuthContext);
  const data = useLoaderData();
  const collectionInfo = data?.data;
  const {
    collectionName,
    collectionDescription,
    publishType,
    publishDate,
    displayImage,
    toDate,
    discount,
    products,
    storyLink,
  } = collectionInfo;

  const [isOpenOption, setIsOpenOption] = useState(false);
  const [isOpenIndex, setIsOpenIndex] = useState(null);

  const toggleActive = (i) => {
    setIsOpenIndex(i);
    setIsOpenOption(true);
  };
  const toggleInactive = () => {
    setIsOpenIndex(null);
    setIsOpenOption(false);
  };


  const publishDatee = new Date(publishDate);
  const toDatee = new Date(toDate);

  // const [timeLeft, setTimeLeft] = useState(() => {
  //   const now = new Date();
  //   const difference = publishDatee.getTime() - now.getTime();

  //   if (difference <= 0) {
  //     return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  //   }

  //   return {
  //     days: Math.floor(difference / (1000 * 60 * 60 * 24)),
  //     hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
  //     minutes: Math.floor((difference / (1000 * 60)) % 60),
  //     seconds: Math.floor((difference / 1000) % 60),
  //   };
  // });

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     const now = new Date();
  //     const difference = publishDatee.getTime() - now.getTime();

  //     if (difference <= 0) {
  //       clearInterval(timer);
  //       setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  //       return;
  //     }

  //     setTimeLeft({
  //       days: Math.floor(difference / (1000 * 60 * 60 * 24)),
  //       hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
  //       minutes: Math.floor((difference / 1000 / 60) % 60),
  //       seconds: Math.floor((difference / 1000) % 60),
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);
 
 
  const [timeLeft, setTimeLeft] = useState(() => {
    const now = new Date();
    // For Scheduled collections, calculate time until publish date
    // For Instant collections with active offer, calculate time until offer ends
    const targetDate = publishType === "Scheduled" ? publishDatee : toDatee;
    const difference = targetDate.getTime() - now.getTime();
  
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  });
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const targetDate = publishType === "Scheduled" ? publishDatee : toDatee;
      const difference = targetDate.getTime() - now.getTime();
  
      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
  
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 * 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);
  
    return () => clearInterval(timer);
  }, [publishType, publishDatee, toDatee]);
 
  const timeBlocks = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  console.log(products);

  return (
    <div className="p-3 md:p-8 lg:p-10 ">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold capitalize">{collectionName}</h1>
      </div>

      <div className="flex justify-between mb-6">
        {/* filter */}
        <div className="flex  space-x-3">
          <div className="p-1 flex justify-center items-center border rounded-md">
            <IoReloadSharp className="text-xl md:text-2xl " />
          </div>
          <div className="relative w-[200px] md:w-[300px] lg:w-[400px] 3xl:w-[500px]">
            <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl md:text-3xl" />
            <input
              placeholder="Search collections"
              className="w-full pl-9 md:pl-12 py-1 md:py-2 bg-[#F6F4F3] rounded-lg"
            />
          </div>
        </div>
        {/* option */}

        {/* Status */}
        <div className="hidden md:block">
          <select
            id="statusSelect"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            // value={status}
            // onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Trending">Trending</option>
          </select>
        </div>
      </div>
      {/* for mbl */}
      <div className="mb-6 w-32">
        <select
          id="statusSelect"
          className="md:hidden w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          // value={status}
          // onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Trending">Trending</option>
        </select>
      </div>

      {/* details */}
      <div className="">
        <div className="w-full  flex justify-center items-center">
          <img
            src={displayImage}
            alt={collectionName}
            className="w-full  pt-2 object-cover rounded-2xl"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 py-3 lg:py-7 space-y-5 lg:space-y-0 lg:space-x-5">
        {/* left */}
        <div className="w-full  p-2 xl:p-5 bg-white shadow-lg space-y-1 lg:space-y-2">
          <p className="text-xl xl:text-3xl font-bold text-red-500">
            {discount}% discount{" "}
          </p>
          <p className="text-[15px] xl:text-[16px] text-gray-500 capitalize">
  {publishType === "Scheduled" ? (
    // For Scheduled collections
    new Date() > publishDatee ? (
      timeBlocks[0].value === 0 ? (
        "Collection is now available"
      ) : (
        `Collection will be available in ${timeBlocks[0].value} days`
      )
    ) : timeBlocks[0].value === 0 ? (
      "Collection will launche in"
    ) : timeBlocks[0].value === 1 ? (
      "Collection will launche in"
    ) : (
      `Collection launches in ${timeBlocks[0].value} days`
    )
  ) : (
    // For Instant collections
    new Date() <= toDatee ? (
      <>
        <span className="block mb-1">This offer is currently available!</span>
        {timeBlocks[0].value === 0 ? (
          timeBlocks[1].value === 0 ? (
            timeBlocks[2].value === 0 ? (
              "Hurry! Offer ends in less than a minute"
            ) : (
              `Hurry! Offer ends in ${timeBlocks[2].value} minutes`
            )
          ) : (
            `Limited time offer - ends in ${timeBlocks[1].value} hours ${timeBlocks[2].value} minutes`
          )
        ) : (
          `Special offer available for ${timeBlocks[0].value} days and ${timeBlocks[1].value} hours`
        )}
      </>
    ) : (
      "This offer has ended"
    )
  )}
</p>
          {((publishType === "Scheduled") || 
  (publishType === "Instant" && new Date() <= toDatee)) && (
  <div className="flex gap-4 py-4">
    {timeBlocks.map((block, index) => (
      <div
        key={index}
        className="flex flex-col items-center justify-center px-1 w-20 h-16 bg-gray-800 text-white rounded-lg"
      >
        <span className="text-[14px] md:text-xl font-bold">
          {block.value}
        </span>
        <span className="text-[13px] md:text-sm">{block.label}</span>
      </div>
    ))}
  </div>
)}
        </div>
        {/* right */}
        <div className="w-full p-2 lg:p-0 space-y-1 ">
          <p className="text-xl xl:text-2xl font-bold text-gray-800">Details</p>
          <p className="text-[16px] text-gray-700 py-2">
            {collectionDescription}
          </p>
          <button className="text-[15px] xl:text-[16px] lg:text-xl font-semibold text-white px-3 py-2 rounded-md bg-[#26B893] hover:bg-[#54bea4]">
            <Link to={storyLink}>Story Line</Link>
          </button>
        </div>
      </div>
      {/* products */}

      <div className="flex items-center justify-center py-8">
        <h1 className="text-2xl text-gray-800 text-center font-bold capitalize">
          {" "}
          product in this collection
        </h1>
      </div>
      <div className="xs:p-5 md:p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 pt-3">
        {products.map((product, i) => {
          // Calculate offer validity and prices
          const toDatee = new Date(toDate); // Replace with your actual toDate
          const isOfferValid = new Date() <= toDatee;
          const originalPrice = product.productId.price;
          const discountPercentage = discount;
          const discountAmount = (originalPrice * discountPercentage) / 100;
          const finalPrice = originalPrice - discountAmount;
          const savingAmount = originalPrice - finalPrice;

          return (
            <Link
            to={`${userId ? `/products-details/${product?.productId?._id}` : "/login"}`}
              onMouseEnter={() => toggleActive(i)}
              onMouseLeave={toggleInactive}
              key={product.id}
              className="pb-10 md:pb-10 3xl:pb-[60px] relative overflow-hidden bg-white rounded-xl shadow-xl"
            >
              <>
                <div className="flex justify-center items-center py-4 h-[65%] lg:h-[70%] xl:h-[65%] 2xl:h-[70%] 3xl:h-[72%] relative">
                  <img
                    src={product.productId.displayImage}
                    alt={product.productId.productName}
                    className="w-28 lg:w-40 h-full pt-2 object-cover"
                  />
                  {isOfferValid && (
                    <span className=" rounded-bl-2xl rounded-tr-2xl bg-rose-600 absolute -right-px -top-px text-white text-xs px-3 py-2">
                      Save $ {savingAmount.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="p-3 space-y-1 md:space-y-2 border-t border-gray-300">
                  <h3 className="font-bold text-lg md:text-lg text-gray-700 capitalize">
                    {product.productId.productName}
                  </h3>
                  <div className="flex items-center gap-2">
                    {isOfferValid ? (
                      <>
                        <p className="text-[18px] md:text-[21px] text-green-600 font-bold">
                          ${finalPrice.toFixed(2)}
                        </p>
                        <p className="text-[14px] md:text-[14px] text-gray-500 line-through">
                          ${originalPrice.toFixed(2)}
                        </p>
                      </>
                    ) : (
                      <p className="text-[18px] md:text-[17px] text-gray-500">
                        ${originalPrice.toFixed(2)}
                      </p>
                    )}
                  </div>
            
                </div>
              </>
              {isOpenIndex === i && (
                <Link
                  to={`${userId ? `/orders/${product?._id}` : "/login"}`}
                  className="absolute bottom-0 w-full flex justify-between bg-[#12C9B5] py-1 xl:py-2"
                >
                  <p className="text-center w-10/12 border-r text-lg lg:text-[16px] xl:text-[18px] text-white">
                    {isOfferValid ? "Buy with discount" : "Buy now"}
                  </p>
                  <IoCartOutline className="text-3xl text-white mr-3 ssm:mr-5 lg:mr-8 xl:mr-5" />
                </Link>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionDetails;
