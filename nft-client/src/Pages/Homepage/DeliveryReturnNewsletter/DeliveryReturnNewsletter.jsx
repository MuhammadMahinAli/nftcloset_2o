import returnImage from "../../../assets/pexelstiennguyen17776605-2@2x.png";
import {Link} from "react-router-dom";
import { useAuthCheck } from "../../utils/authCheck";
import { useEffect, useState } from "react";
import { pathGenerate } from "../../utils/pathGenerate";
import { useUniqueRouteAccess } from "../../utils/useUniqueRouteAccess";

const DeliveryReturnNewsletter = () => {
    // dashboard access
    const {userEmail, role} = useAuthCheck();
    const uniqueRouteAccess = useUniqueRouteAccess();
    const [toPath, setToPath] = useState("/");
  
    // //setting path
    useEffect(() => {
      const path = pathGenerate(role, uniqueRouteAccess);
      setToPath(path);
    }, [role]);
  return (
    <div className="flex justify-center items-center py-5 md:py-12">
  <div className="bg-white rounded-lg md:rounded-full md:w-[500px] p-5 md:p-10 shadow-lg relative mx-auto border border-[#EC7CB5]">

    
 
      <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-lg md:rounded-full">
        <h2 className="text-2xl text-gray-700 font-bold mb-2">Get The Alpha</h2>
        <p className="text-gray-500 mb-6">Sign Up To Our News Letter List</p>
        
 
        <div className="flex items-center bg-gray-200 rounded-lg overflow-hidden w-64 md:w-96">
          <input
            type="email"
            placeholder="Your Email Address"
            className="w-full bg-transparent px-4 py-2 text-gray-700 focus:outline-none"
          />
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg focus:outline-none">
            →
          </button>
        </div>
      </div>

  </div>
</div>

  );
};

export default DeliveryReturnNewsletter;
// import returnImage from "../../../assets/pexelstiennguyen17776605-2@2x.png";
// import {Link} from "react-router-dom";
// import { useAuthCheck } from "../../utils/authCheck";
// import { useEffect, useState } from "react";
// import { pathGenerate } from "../../utils/pathGenerate";
// import { useUniqueRouteAccess } from "../../utils/useUniqueRouteAccess";

// const DeliveryReturnNewsletter = () => {
//     // dashboard access
//     const {userEmail, role} = useAuthCheck();
//     const uniqueRouteAccess = useUniqueRouteAccess();
//     const [toPath, setToPath] = useState("/");
  
//     // //setting path
//     useEffect(() => {
//       const path = pathGenerate(role, uniqueRouteAccess);
//       setToPath(path);
//     }, [role]);
//   return (
//     <div data-aos="fade-up" data-aos-duration="1200" className="flex flex-col md:flex-row justify-evenly items-start md:pb-10 pb-5 md:px-10 lg:px-7 xl:px-5">
//       {/****************************************** Left comtent ***********************************/}
//       <div className="flex flex-col items-center md:w-6/12">
//         <div className="text-[22px] xl:text-[35px] text-center capitalize inline-block xl:w-[447px] xl:h-[75px]">{`delivery & returns`}</div>
//         <p className="text-center border-b-2 border-gray-600 text-[16px] xl:text-xl py-2 capitalize text-dimgray-200 inline-block">see more</p>

//         <div className="mt-5 mx-3 xl:mt-10 flex flex-col lg:flex-row space-x-5 items-center px-7 py-5 rounded-xl bg-[#d1fbf7]  shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)] backdrop-filter:blur(20px); xl:ml-10 ">
//           <img className="w-[300px] h-[200px] xl:h-[250px]" alt="" src={returnImage} />
//           <div className=" pt-3 xl:pt-0 text-dimgray-300">
//             <p className="m-0 text-xl xl:text-2xl capitalize text-center lg:text-start">YOUR NEAREST STORE</p>
//             <p className="m-0 text-sm xl:text-xl  text-dimgray-600 pt-3">Bangladesh: Mahin House Tower-B 5th floor 26 topkhana road Dhaka-1000. Malaysia: G-02-13, Damen Persiarian, Persiaran Kewajipan, Usj 1, 47600 Subang Jaya, Selangor</p>
//           </div>
//         </div>
//       </div>

//       {/****************************************** Right content ***********************************/}

//       <div className="flex flex-col items-center space-y-7 md:w-6/12 px-3 pt-7 md:pt-0">
//         <h1 className="text-[22px] xl:text-[35px] capitalize text-dimgray-200 text-center md:text-start">SIGN UP TO OUR NEWS LETTER LIST</h1>
//         <div className="flex">
//           <input type="email" placeholder="Email Address" className="flex flex-1  bordeR text-xl px-2 rounded-l-xl bg-[#d1fbf7]  shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)] backdrop-filter:blur(20px); w-full 3xl:w-[400px] h-14 xl:h-[60px]" />
//           <span className="flex items-center px-3 pointer-events-none bg-blue-400 text-white rounded-r-xl text-xl font-semibold">SEND</span>
//         </div>
//         {/* button */}
//         <ul className="grid grid-cols-2 grid-rows-2 gap-1 md:px-0">
//           <li>
//             <Link to={uniqueRouteAccess ? toPath :"/user/signin"}>
//             <div className="mt-3 md:mt-5 flex justify-center items-center space-x-5 px-7 py-3 rounded-xl bg-[#d1fbf7]  shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)] backdrop-filter:blur(20px); xl:ml-10  xl:w-52 ">
//               <h1 className="text-sm lg:text-xl font-semibold capitalize inline-block">my account</h1>
//             </div>
//             </Link>
//           </li> 
//           <li>
//             <Link to='/contact'>
//             <div className="mt-3 md:mt-5 flex justify-center items-center space-x-5 px-7 py-3 rounded-xl bg-[#d1fbf7]  shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)] backdrop-filter:blur(20px); xl:ml-10 xl:w-52  ">
//               <h1 className="text-sm lg:text-xl font-semibold capitalize inline-block">contact us</h1>
//             </div>
//             </Link>
//           </li>
//           <li>
//           <Link to='/about-us'>
//             <div className="mt-3 md:mt-5 flex justify-center items-center space-x-5 px-7 py-3 rounded-xl bg-[#d1fbf7]  shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)] backdrop-filter:blur(20px); xl:ml-10 xl:w-52 ">
//               <h1 className="text-sm lg:text-xl font-semibold capitalize inline-block">about us</h1>
//             </div></Link>
//           </li>
//           <li>
//           <Link to='/market-x'>
//             <div className="mt-3 md:mt-5 flex justify-center items-center space-x-5 px-7 py-3 rounded-xl bg-[#d1fbf7]  shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)] backdrop-filter:blur(20px); xl:ml-10 xl:w-52 ">
//               <h1 className="text-sm lg:text-xl font-semibold capitalize inline-block">market X</h1>
//             </div>
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default DeliveryReturnNewsletter;
