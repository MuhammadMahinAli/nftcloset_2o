import { useContext } from "react";
import {
  useGetOrderStatusAndAssetsQuery,
  useGetOrderStatusForAdminQuery,
  useUpdateOrderDigitalAssetStatusMutation,
} from "../../../features/order/orderApi";
import Cube from "../../../icons/NFTIcon/Cube";
import { AuthContext } from "../../../Context/UserContext";
import OrderCardPrompt from "./OrderCardPrompt";
import RequestDetailsModal from "../RequestDetailsModal";
import Swal from "sweetalert2";

const DashboardNotClaimedOrder = ({
  userEmail,
  selectedOrder,
  isOpenModal,
  handleOpenModal,
  handleCloseModal,
  formatIsoDateToHumanReadable,
}) => {
  const { userId } = useContext(AuthContext);

  // const { data: getAllOrder, isLoading } = useGetOrderStatusAndAssetsQuery({
  //   status: "claimed",
  //   id: userId,
  // });

  // const { data: getAllOrderForAdmin } = useGetOrderStatusForAdminQuery({
  //   status: "claimed",
  // });

  // const orderData =
  //   userEmail === "nftclosetx@gmail.com" ? getAllOrderForAdmin : getAllOrder;

  // const confirmReceipt = async (orderId) => {
  //   const result = await Swal.fire({
  //     title: 'Did you receive your parcel?',
  //     icon: 'question',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, confirm',
  //     cancelButtonText: 'No, cancel',
  //   });

  //   if (result.isConfirmed) {
  //     try {
  //       const response = await fetch(`https://nftcloset-2o.onrender.com/api/v1/order/confirmReceipt/${orderId}`, {
  //         method: 'PUT',
  //         headers: { 'Content-Type': 'application/json' },
  //       });

  //       if (!response.ok) throw new Error('Failed to confirm receipt');

  //       Swal.fire('Confirmed!', 'Receipt has been confirmed.', 'success');
  //     } catch (err) {
  //       Swal.fire('Error!', err.message, 'error');
  //     }
  //   }
  // };

  const {
    data: claimedOrders = [],
    isLoading: isLoadingClaimed,
  } = useGetOrderStatusAndAssetsQuery({
    status: "claimed",
    id: userId,
  });
  
  const {
    data: shippingOrders = [],
    isLoading: isLoadingShipping,
  } = useGetOrderStatusAndAssetsQuery({
    status: "shipping",
    id: userId,
  });
  
  const {
    data: claimedAdminOrders = [],
    isLoading: isAdminLoadingClaimed,
  } = useGetOrderStatusForAdminQuery({ status: "claimed" });
  
  const {
    data: shippingAdminOrders = [],
    isLoading: isAdminLoadingShipping,
  } = useGetOrderStatusForAdminQuery({ status: "shipping" });
  
  // Combine user or admin orders based on email
  const userOrders = [...claimedOrders, ...shippingOrders];
  const adminOrders = [...claimedAdminOrders, ...shippingAdminOrders];
  
  const orderData =
    userEmail === "nftclosetx@gmail.com" ? adminOrders : userOrders;
  
  const isLoading =
    userEmail === "nftclosetx@gmail.com"
      ? isAdminLoadingClaimed || isAdminLoadingShipping
      : isLoadingClaimed || isLoadingShipping;
  

  const confirmReceipt = async (order) => {
    const orderId = order?._id;
    const result = await Swal.fire({
      title: "Did you receive your parcel?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://nftcloset-2o.onrender.com/api/v1/order/confirmReceipt/${orderId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) throw new Error("Failed to confirm receipt");
        const formData = {
          trackingLink: order.trackingLink,
          status: order.status, // Keep the status the same (still "approved")
          digitalAsset: "received",
          deliveryTypeInfo: order.deliveryTypeInfo,
        };

        await updateOrderStatus({
          id: orderId,
          data: formData,
        }).unwrap();

        Swal.fire("Confirmed!", "Receipt has been confirmed.", "success");
      } catch (err) {
        Swal.fire("Error!", err.message, "error");
      }
    }
  };

  if (isLoading) return <p>Orders is Loading...</p>;
  if (orderData?.length === 0)
    return <p className="text-xl font-semibold">No order available.</p>;

  console.log(orderData);
  return (
    <div>
      {orderData?.map((order, i) => (
        <div
          key={i}
          className="p-4 xs:p-6 rounded-2xl bg-[#f4f4f4] transition-colors duration-200 mt-6 md:mt-10"
        >
          <div className="flex justify-between items-center  py-5">
            {/* left */}
            <div className="flex items-center gap-2 xl:gap-6">
              <div className="px-3 py-1 bg-primary/10 text-primary text-sm dark:bg-primary/20">
                <Cube />
              </div>
              <div>
                <p className="text-lg xl:text-xl font-semibold  text-gray-900">
                  Claimed
                </p>
                <p className="text-sm xl:text-base  text-gray-700">
                  {formatIsoDateToHumanReadable(order?.updatedAt)}
                </p>
                <p className="text-sm xl:text-base  text-gray-700">
                  ID: {order?.orderID}
                </p>
              </div>
            </div>

            {/* right */}

            {userEmail !== "nftclosetx@gmail.com" ? (
              <div className="flex justify-between items-center space-x-5">
                {order?.digitalAsset === "shipping" && (
                  <button
                    onClick={() => confirmReceipt(order?._id)}
                    className=" hidden md:block px-3 py-2 rounded-md text-sm xl:text-lg  text-white bg-[#2CBA7A] hover:text-primary/80"
                  >
                    Confirm Reciept
                  </button>
                )}
                {order?.isConfirmRecipt === true && (
                  <button className=" hidden md:block px-3 py-2 rounded-md text-sm xl:text-lg  text-white bg-[#2CBA7A] hover:text-primary/80">
                    Confirmed Reciept
                  </button>
                )}

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

export default DashboardNotClaimedOrder;
