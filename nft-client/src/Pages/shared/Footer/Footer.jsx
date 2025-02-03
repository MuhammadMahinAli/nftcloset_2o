import { FaDiscord, FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="bg-gray-100 px-10 w-full">
      <div className="mx-auto flex justify-between items-center p-8">
        <div className="w-1/3">
        <img className="" src='nft-logo.png' alt=''/>
          <p className="mt-4 text-lg text-gray-600">
            NFT Closet Is The Go-To Marketplace For Digital Fashion. Mint, Buy,
            And Sell Fashion NFTs With AR, VR, And Virtual Try-On Features.
            Upgrade Your E-Commerce Site To Web3 With Our API. Partnered With
            AWS For Seamless Supply Chain Management.
          </p>
          <h2 className="font-semibold text-xl pt-8 text-gray-800">Follow Us</h2>
          <div className="mt-6 flex items-center space-x-4">
            {/* <a href="#" className="border rounded-lg p-2">
              <img
                src="link-to-english-icon.png"
                alt="English"
                className="w-6 h-6"
              />
            </a> */}
            <a href="#" className="border rounded-lg p-2">
            <FaDiscord className="text-2xl" />
            </a>
            <a href="#" className="border rounded-lg p-2">
            <FaXTwitter className="text-2xl"/>
            </a>
          </div>
        </div>
        <div className="w-1/3 flex justify-between -mt-28">
          <div>
            <h2 className="font-semibold text-2xl text-gray-800"></h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="font-semibold text-xl text-gray-800 hover:text-teal-500">
                About Us
                </a>
              </li>
              
              <li>
                <a href="#" className="font-semibold text-xl text-gray-800 hover:text-teal-500">
                  Market
                </a>
              </li>
              <li>
                <a href="#" className="font-semibold text-xl text-gray-800 hover:text-teal-500">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className=""></h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="font-semibold text-xl text-gray-800 hover:text-teal-500">
                Virtual Try-On
                </a>
              </li>
              <li>
                <a href="#" className="font-semibold text-xl text-gray-800 hover:text-teal-500">
                  Collections
                </a>
              </li>
              <li>
                <a href="#" className="font-semibold text-xl text-gray-800 hover:text-teal-500">
                  Market X
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex justify-between items-center border-t py-3 px-7">
        <p className="text-gray-600 font-semibold">&copy; 2023 NFT Closet X</p>
        <a href="#" className="text-gray-600 font-semibold hover:text-teal-500">
          Privacy & Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;

// const Footer = () => {
//     return (
//         <div classNameName="flex flex-col-reverse lg:flex-row justify-evenly items-center bg-blue-100 text-gray-600 py-2 space-y-4 lg:space-y-0">
//         <div classNameName="text-sm md:text-lg lg:text-xl capitalize inline-block">
//         @2023 KWS
//       </div>
//       <div classNameName="flex space-x-4 pb-2 lg:pb-0">
//         <p classNameName="text-sm md:text-lg lg:text-xl">Careers   Stocks</p>
//         <p classNameName="text-sm md:text-lg lg:text-xl">Privicy & Policy</p>
//         </div>
//     </div>
//       );
// };

// export default Footer;
