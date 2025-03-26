// import { useContext } from "react";
// import { useGetOrderStatusAndAssetsQuery, useGetOrderStatusForAdminQuery } from "../../../features/order/orderApi";
// import Cube from "../../../icons/NFTIcon/Cube";
// import { AuthContext } from "../../../Context/UserContext";
// import OrderCardPrompt from "./OrderCardPrompt";
// import RequestDetailsModal from "../RequestDetailsModal";
// import Swal from "sweetalert2";

// const DashboardRecievedOrder = ({userEmail, selectedOrder, isOpenModal,handleOpenModal, handleCloseModal, formatIsoDateToHumanReadable}) => {
//   const { userId } = useContext(AuthContext);
//   const { data: getAllOrder, isLoading } = useGetOrderStatusAndAssetsQuery({
//     status: "received",
//     id: userId,
//   });
//     const { data: getAllOrderForAdmin} = useGetOrderStatusForAdminQuery({
//       status: "received",
//     });

//     const confirmReceipt = async (orderId) => {
//       const result = await Swal.fire({
//         title: 'Did you receive your parcel?',
//         icon: 'question',
//         showCancelButton: true,
//         confirmButtonText: 'Yes, confirm',
//         cancelButtonText: 'No, cancel',
//       });

//       if (result.isConfirmed) {
//         try {
//           const response = await fetch(`https://test-two-22w0.onrender.com/api/v1/order/confirmReceipt/${orderId}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//           });

//           if (!response.ok) throw new Error('Failed to confirm receipt');

//           Swal.fire('Confirmed!', 'Receipt has been confirmed.', 'success');
//         } catch (err) {
//           Swal.fire('Error!', err.message, 'error');
//         }
//       }
//     };
//   console.log(getAllOrder,getAllOrderForAdmin);
//   const orderData = userEmail === "nftclosetx@gmail.com" ? getAllOrderForAdmin : getAllOrder;
//   if (isLoading) return <p>Orders is Loading...</p>;
//   if (getAllOrder?.length === 0)
//     return <p className="text-xl font-semibold">No order available.</p>;
//   return (
//     <div>
//       {orderData?.map((order, i) => (
//         <div
//           key={i}
//           className="p-4 xs:p-6 rounded-2xl bg-[#f4f4f4] transition-colors duration-200 mt-6 md:mt-10"
//         >
//           <div className="flex justify-between items-center  py-5">
//             {/* left */}
//             <div className="flex items-center gap-2 xl:gap-6">
//               <div className="px-3 py-1 bg-primary/10 text-primary text-sm dark:bg-primary/20">
//                 <Cube />
//               </div>
//               <div>
//                 <p className="text-lg xl:text-xl font-semibold  text-gray-900">
//                   Recieved
//                 </p>
//                 <p className="text-sm xl:text-base  text-gray-700">
//                   {formatIsoDateToHumanReadable(order?.updatedAt)}
//                 </p>
//                 <p className="text-sm xl:text-base  text-gray-700">
//                   ID: {order?.orderID}
//                 </p>
//               </div>
//             </div>

//             {/* right */}

//             {userEmail !== "nftclosetx@gmail.com" ? (
//               <div className="flex justify-between items-center space-x-5">
//                {order?.isConfirmRecipt === false && (
//                   <button
//                     onClick={() => confirmReceipt(order?._id)}
//                     className=" hidden md:block px-3 py-2 rounded-md text-sm xl:text-lg  text-white bg-[#2CBA7A] hover:text-primary/80"
//                   >
//                     Confirm Reciept
//                   </button>
//                 )}

//                 <p className="text-sm xl:text-xl  text-gray-700 hover:underline">
//                   Track
//                 </p>
//               </div>
//             ) : (
//               <p
//                 onClick={() => handleOpenModal(order)}
//                 className="cursor-pointer text-sm xl:text-xl text-gray-700 hover:underline"
//               >
//                 Details
//               </p>
//             )}
//           </div>
//           <OrderCardPrompt order={order} />
//         </div>
//       ))}
//             {isOpenModal && (
//         <RequestDetailsModal
//           isOpenModal={isOpenModal}
//           onClose={handleCloseModal}
//           order={selectedOrder}
//         />
//       )}
//     </div>
//   );
// };

// export default DashboardRecievedOrder;

import { useContext, useState, useEffect } from "react";
import {
  useGetOrderStatusAndAssetsQuery,
  useGetOrderStatusForAdminQuery,
} from "../../../features/order/orderApi";
import Cube from "../../../icons/NFTIcon/Cube";
import { AuthContext } from "../../../Context/UserContext";
import OrderCardPrompt from "./OrderCardPrompt";
import RequestDetailsModal from "../RequestDetailsModal";
import Swal from "sweetalert2";

const DashboardRecievedOrder = ({
  userEmail,
  selectedOrder,
  isOpenModal,
  handleOpenModal,
  handleCloseModal,
  formatIsoDateToHumanReadable,
}) => {
  const { userId } = useContext(AuthContext);
  const { data: initialOrders, isLoading } = useGetOrderStatusAndAssetsQuery({
    status: "received",
    id: userId,
  });
  const { data: initialOrdersForAdmin } = useGetOrderStatusForAdminQuery({
    status: "received",
  });

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(
      userEmail === "nftclosetx@gmail.com"
        ? initialOrdersForAdmin || []
        : initialOrders || []
    );
  }, [initialOrders, initialOrdersForAdmin, userEmail]);

  if (isLoading) return <p>Orders is Loading...</p>;
  if (!orders.length)
    return <p className="text-xl font-semibold">No order available.</p>;

  return (
    <div>
      {orders.map((order, i) => (
        <div
          key={i}
          className="p-4 xs:p-6 rounded-2xl bg-[#f4f4f4] transition-colors duration-200 mt-6 md:mt-10"
        >
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center gap-2 xl:gap-6">
              <div className="px-3 py-1 bg-primary/10 text-primary text-sm dark:bg-primary/20">
                <Cube />
              </div>
              <div>
                <p className="text-lg xl:text-xl font-semibold text-gray-900">
                  Received
                </p>
                <p className="text-sm xl:text-base text-gray-700">
                  {formatIsoDateToHumanReadable(order?.updatedAt)}
                </p>
                <p className="text-sm xl:text-base text-gray-700">
                  ID: {order?.orderID}
                </p>
              </div>
            </div>

            {userEmail !== "nftclosetx@gmail.com" ? (
              <div className="flex justify-between items-center space-x-5">
                <button className="hidden md:block px-3 py-2 rounded-md text-sm xl:text-lg text-white bg-[#2CBA7A] hover:text-primary/80">
                  Confirmed Receipt
                </button>

                <a
                  href={order?.trackingLink}
                  target="blank"
                  className="text-sm xl:text-xl  text-gray-700 hover:underline"
                >
                  Track
                </a>
              </div>
            ) : (
              <p
                onClick={() => handleOpenModal(order)}
                className="cursor-pointer text-sm xl:text-xl text-gray-700 hover:underline"
              >
                Details
              </p>
            )}
          </div>
          <OrderCardPrompt order={order} />
        </div>
      ))}
      {isOpenModal && (
        <RequestDetailsModal
          isOpenModal={isOpenModal}
          onClose={handleCloseModal}
          order={selectedOrder}
        />
      )}
    </div>
  );
};

export default DashboardRecievedOrder;
