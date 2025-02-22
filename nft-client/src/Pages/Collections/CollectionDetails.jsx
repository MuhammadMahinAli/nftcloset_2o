import { IoIosSearch } from "react-icons/io";
import banner from "../../assets/nft-image/banner.png";
import { IoCartOutline, IoReloadSharp } from "react-icons/io5";
import { useEffect, useState } from "react";

const CollectionDetails = () => {
  const collectionData = {
    image: banner,
    name: "digital collection",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At amet odit optio soluta cum, obcaecati incidunt quam iusto et ad, accusamus dolore repellendus. Aut, quas perspiciatis ipsa minima quaerat nobis laudantium laboriosam, beatae blanditiis nam dolores iste dignissimos dolorem excepturi.",
  };
  const [isOpenOption, setIsOpenOption] = useState(false);
  const [isOpenIndex, setIsOpenIndex] = useState(null);
  const products = [
    {
      id: 1,
      name: "Blue Jacket",
      price: "40 $",
      image: "https://i.ibb.co.com/k0RjY1J/s1.jpg",
    },
    {
      id: 2,
      name: "Blue Jacket",
      price: "40 $",
      image: "https://i.ibb.co.com/k0RjY1J/s1.jpg",
    },
    {
      id: 3,
      name: "Blue Jacket",
      price: "40 $",
      image: "https://i.ibb.co.com/k0RjY1J/s1.jpg",
    },
    {
      id: 4,
      name: "Blue Jacket",
      price: "40 $",
      image: "https://i.ibb.co.com/k0RjY1J/s1.jpg",
    },
  ];

  const toggleActive = (i) => {
    setIsOpenIndex(i);
    setIsOpenOption(true);
  };
  const toggleInactive = () => {
    setIsOpenIndex(null);
    setIsOpenOption(false);
  };
  const [timeLeft, setTimeLeft] = useState({
    days: 360,
    hours: 24,
    minutes: 60,
    seconds: 60,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newSeconds = prevTime.seconds - 1;

        if (newSeconds < 0) {
          const newMinutes = prevTime.minutes - 1;

          if (newMinutes < 0) {
            const newHours = prevTime.hours - 1;

            if (newHours < 0) {
              const newDays = prevTime.days - 1;

              if (newDays < 0) {
                clearInterval(timer);
                return prevTime;
              }

              return {
                days: newDays,
                hours: 23,
                minutes: 59,
                seconds: 59,
              };
            }

            return {
              ...prevTime,
              hours: newHours,
              minutes: 59,
              seconds: 59,
            };
          }

          return {
            ...prevTime,
            minutes: newMinutes,
            seconds: 59,
          };
        }

        return {
          ...prevTime,
          seconds: newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <div className="p-3 md:p-8 lg:p-10 ">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold capitalize">digital collection</h1>
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
        <div className="w-full flex justify-center items-center">
          <img
            src={collectionData.image}
            alt={collectionData.name}
            className="w-full h-full pt-2 object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-start py-3 lg:py-7 space-y-5 lg:space-y-0 lg:space-x-5">
        {/* left */}
        <div className="w-full lg:w-5/12 p-2 xl:p-5 bg-white shadow-lg space-y-1 lg:space-y-2">
          <p className="text-xl xl:text-3xl font-bold text-red-500">
            50% discount{" "}
          </p>
          <p className="text-[15px] xl:text-[16px] text-gray-500 capitalize">
            will be for 10 days after
          </p>
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
        </div>
        {/* right */}
        <div className="w-full lg:w-1/2 p-2 lg:p-0 space-y-1 ">
          <p className="text-xl xl:text-2xl font-bold text-gray-800">Details</p>
          <p className="text-[16px] text-gray-700 py-2">
            {collectionData.details}
          </p>
          <button className="text-[15px] xl:text-[16px] lg:text-xl font-semibold text-white px-3 py-2 rounded-md bg-[#26B893]">
            Story Line
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
        {products.map((product, i) => (
          <div
            onMouseEnter={() => toggleActive(i)}
            onMouseLeave={toggleInactive}
            key={product.id}
            className="pb-8  2xl:pb-12 relative overflow-hidden bg-white rounded-xl shadow-xl"
          >
            <>
              <div className="flex justify-center items-center py-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-28 lg:w-40 h-full pt-2 object-cover"
                />
              </div>

              <div className="p-3  space-y-1 md:space-y-2 border-t border-gray-300">
                <h3 className="font-bold text-lg md:text-lg text-gray-700">
                  {product.name}
                </h3>
                <p className="text-[18px] md:text-[17px] text-gray-500">
                  {product.price}
                </p>
              </div>
            </>
            {isOpenIndex === i && (
              <div className="absolute bottom-0  w-full flex justify-between bg-[#12C9B5] py-1 xl:py-2">
                <p className="text-center w-10/12 border-r text-lg md:text-lg text-white">
                  Buy now
                </p>
                <IoCartOutline className="text-3xl text-white mr-3 ssm:mr-5 lg:mr-8 xl:mr-5" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionDetails;
