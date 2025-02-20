import { useState } from "react";
import PageOne from "../Ai/PageOne";
import Page from "../Ai/Pages";

const HomePageControl = () => {
  const [open, setOpen] = useState(false);
  const bestProducts = [
    {
      id: 1,
      name: "Blue Jacket",
      price: "50$",
      image:
        "https://img.freepik.com/free-photo/beautiful-shot-big-farmhouse-clear-blue-sky_181624-15996.jpg",
    },
    {
      id: 2,
      name: "Blue Jacket",
      price: "40$",
      image:
        "https://img.freepik.com/free-photo/beautiful-shot-big-farmhouse-clear-blue-sky_181624-15996.jpg",
    },
    {
      id: 3,
      name: "Blue Jacket",
      price: "40$",
      image:
        "https://img.freepik.com/free-photo/beautiful-shot-big-farmhouse-clear-blue-sky_181624-15996.jpg",
    },
    {
      id: 4,
      name: "Blue Jacket",
      price: "40$",
      image:
        "https://img.freepik.com/free-photo/beautiful-shot-big-farmhouse-clear-blue-sky_181624-15996.jpg",
    },
    {
      id: 5,
      name: "Blue Jacket",
      price: "40$",
      image:
        "https://img.freepik.com/free-photo/beautiful-shot-big-farmhouse-clear-blue-sky_181624-15996.jpg",
    },
    {
      id: 6,
      name: "Blue Jacket",
      price: "40$",
      image:
        "https://img.freepik.com/free-photo/beautiful-shot-big-farmhouse-clear-blue-sky_181624-15996.jpg",
    },
    {
      id: 7,
      name: "Blue Jacket",
      price: "40$",
      image:
        "https://img.freepik.com/free-photo/beautiful-shot-big-farmhouse-clear-blue-sky_181624-15996.jpg",
    },
    {
      id: 8,
      name: "Blue Jacket",
      price: "40$",
      image:
        "https://img.freepik.com/free-photo/beautiful-shot-big-farmhouse-clear-blue-sky_181624-15996.jpg",
    },
  ];
  const newArraivalProducts = [
    {
      id: 9,
      name: "Blue Jacket",
      price: "40$",
      image:
        "https://img.freepik.com/free-photo/3d-rendering-loft-luxury-living-room-with-bookshelf-near-bookshelf_105762-2224.jpg",
    },
    {
      id: 10,
      name: "Blue Jacket",
      price: "40$",
      image:
        "https://img.freepik.com/free-photo/3d-rendering-loft-luxury-living-room-with-bookshelf-near-bookshelf_105762-2224.jpg",
    },
    {
      id: 11,
      name: "Blue Jacket",
      price: "40$",
      image:
        "https://img.freepik.com/free-photo/3d-rendering-loft-luxury-living-room-with-bookshelf-near-bookshelf_105762-2224.jpg",
    },
    {
      id: 12,
      name: "Blue Jacket",
      price: "40$",
      image:
        "https://img.freepik.com/free-photo/3d-rendering-loft-luxury-living-room-with-bookshelf-near-bookshelf_105762-2224.jpg",
    },
    {
      id: 15,
      name: "Blue Jacket",
      price: "40$",
      image:
        "https://img.freepik.com/free-photo/3d-rendering-loft-luxury-living-room-with-bookshelf-near-bookshelf_105762-2224.jpg",
    },
    {
      id: 16,
      name: "Blue Jacket",
      price: "40$",
      image:
        "https://img.freepik.com/free-photo/3d-rendering-loft-luxury-living-room-with-bookshelf-near-bookshelf_105762-2224.jpg",
    },
    {
      id: 17,
      name: "Blue Jacket",
      price: "40$",
      image:
        "https://img.freepik.com/free-photo/3d-rendering-loft-luxury-living-room-with-bookshelf-near-bookshelf_105762-2224.jpg",
    },
    {
      id: 18,
      name: "Blue Jacket",
      price: "40$",
      image:
        "https://img.freepik.com/free-photo/3d-rendering-loft-luxury-living-room-with-bookshelf-near-bookshelf_105762-2224.jpg",
    },
  ];
  return (
    <div className="py-5">
      <h1 className="text-xl lg:text-3xl font-bold text-gray-700 rounded-xl py-5">
        Homepage Controls
      </h1>
      {/* banner */}
      <div>
        <div className="flex justify-between items-center">
          <p className="text-lg lg:text-xl font-bold text-gray-700 rounded-xl py-5">
            Banners
          </p>
          <p
            onClick={() => setOpen(true)}
            className="text-lg lg:text-xl font-bold text-green-700 rounded-xl py-5"
          >
            Update
          </p>
        </div>

        <PageOne />
      </div>
      {/* banner */}
      <div>
        <p className="text-lg lg:text-xl font-bold text-gray-700 rounded-xl py-5">
          New Arrival
        </p>
        <Page products={newArraivalProducts} />
      </div>
      {/* banner */}
      <div>
        <p className="text-lg lg:text-xl font-bold text-gray-700 rounded-xl py-5">
          Best Products
        </p>
        <Page products={bestProducts} />
      </div>
      {/* banner */}
      <div>
        <p className="text-lg lg:text-xl font-bold text-gray-700 rounded-xl py-5">
          Fof Lab link
        </p>
        <div>
          <p className="text-sm xl:text-xl font-semibold text-gray-600 mb-2">
            FOF Lab details
          </p>
          <input
            type="labDetails"
            className="font-semibold text-sm xl:text-lg w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26B893]"
            placeholder="Jacket With Products"
          />
        </div>
        <button className="mt-5 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-[#26B893] focus:ring-offset-2">
          Save
        </button>
      </div>
      {open && (
        <div className="z-50  fixed top-0 left-0  flex justify-center items-center bg-black/40 bg-opacity-50 w-screen h-screen overflow-y-scroll">
          <div className="w-full h-[500px]  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle  transition-all md:w-[600px] xl:h-[600px] 3xl:h-[700px] 3xl:w-[800px] overflow-y-scroll cursor-pointer"></div>
        </div>
      )}
    </div>
  );
};

export default HomePageControl;
