import Swal from "sweetalert2";
import { useSendDigitalAssetsEmailMutation } from "../../../features/auth/authApi";
import { useSelector } from "react-redux";
import { useUpdateOrderStatusMutation } from "../../../features/order/orderApi";

const OrderCardPrompt = ({ order }) => {
  const [sendDigitalAssetsEmail] = useSendDigitalAssetsEmailMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const { user } = useSelector((state) => state.auth);
  // const handleSendAssetsByEmail = async (e, email, orderID, digitalAssets) => {
  //   e.preventDefault();
  //   try {
  //     const result = await sendDigitalAssetsEmail({
  //       email,
  //       orderID,
  //       digitalAssets,
  //     }).unwrap();
  //     alert(result.message);
  //   } catch (err) {
  //     alert(`Error: ${err.message}`);
  //   }
  // };

  // const handleSendAssetsByEmail = async (e, email, orderID, digitalAssets) => {
  //   e.preventDefault();
  //   try {
  //     const result = await sendDigitalAssetsEmail({
  //       email,
  //       orderID,
  //       digitalAssets,
  //     }).unwrap();
  
  //     // Replace alert with SweetAlert2 success alert:
  //     Swal.fire({
  //       title: 'Success!',
  //       text: result.message,
  //       icon: 'success',
  //       confirmButtonText: 'OK',
  //     });
  //   } catch (err) {
  //     // Replace alert with SweetAlert2 error alert:
  //     Swal.fire({
  //       title: 'Error!',
  //       text: err.message,
  //       icon: 'error',
  //       confirmButtonText: 'OK',
  //     });
  //   }
  // };
  // const handlePendingOrder = () => {
  //   Swal.fire({
  //     icon: "info",
  //     title: "Mission Failed!",
  //     text: "Your Order is not approved yet.",
  //     showConfirmButton: false,
  //     timer: 1500,
  //   });
  // };

  const handleClaimDigitalAssets = async (e) => {
    e.preventDefault();
  
    if (!order) {
      Swal.fire({
        icon: "error",
        title: "Order Not Found",
        text: "No order information available.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
  
    switch (order.status) {
      case "approved":
        try {
          const result = await sendDigitalAssetsEmail({
            email: order.orderedBy?.email,
            orderID: order.orderID,
            digitalAssets: order.productID?.digitalAssets,
          }).unwrap();
  
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: result.message,
            confirmButtonText: "OK",
          });
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: err.message,
            confirmButtonText: "OK",
          });
        }
        break;
  
      case "pending":
        Swal.fire({
          icon: "info",
          title: "Order Pending",
          text: "Your order is still pending approval. Please wait until it is approved to claim your digital assets.",
          showConfirmButton: false,
          timer: 1500,
        });
        break;
  
      case "declined":
        Swal.fire({
          icon: "error",
          title: "Order Declined",
          text: "Your order has been declined. You cannot claim your digital assets.",
          showConfirmButton: false,
          timer: 1500,
        });
        break;
  
      default:
        Swal.fire({
          icon: "warning",
          title: "Invalid Order Status",
          text: "Your order status is not recognized.",
          showConfirmButton: false,
          timer: 1500,
        });
        break;
    }
  };
  

  const handleOrderForPhy = async (e) => {
    e.preventDefault();
  
    if (!order) return;
  
    // 1. Check the order's status first
    if (order.status === "approved") {
      // 2. If status is "approved", proceed to handle the digitalAsset logic
      const { digitalAsset } = order;
  
      switch (digitalAsset) {
        case "notClaimed":
          try {
            const orderId = order._id;
  
            // Mark as claimed
            const formData = {
              trackingLink: order.trackingLink,
              status: order.status,       // Keep the status the same (still "approved")
              digitalAsset: "claimed",
            };
  
            const response = await updateOrderStatus({
              id: orderId,
              data: formData,
            }).unwrap();
  
            if (response.success) {
              Swal.fire({
                icon: "success",
                title: `Admin will contact you via ${order.contactType}`,
                text: "Your request for claiming the Physical Version has been sent.",
                showConfirmButton: false,
                timer: 3500,
              });
            }
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went wrong while claiming the Physical Version.",
              showConfirmButton: false,
              timer: 3500,
            });
          }
          break;
  
        case "shipping":
          Swal.fire({
            icon: "info",
            title: "Shipping In Progress",
            text: "Your order is currently in transit.",
            showConfirmButton: false,
            timer: 3500,
          });
          break;
  
        case "claimed":
          Swal.fire({
            icon: "info",
            title: "You’ve already claimed a Physical Version.",
            text: "Your order is still in process.",
            showConfirmButton: false,
            timer: 3500,
          });
          break;
  
        case "received":
          Swal.fire({
            icon: "success",
            title: "Order Received",
            text: "Your order has already been delivered!",
            showConfirmButton: false,
            timer: 3500,
          });
          break;
  
        default:
          // Fallback or unknown digitalAsset
          Swal.fire({
            icon: "warning",
            title: "Unknown Order Status",
            text: "Please contact support for more details.",
            showConfirmButton: false,
            timer: 3500,
          });
          break;
      }
    } else if (order.status === "declined") {
      // 3. If status is "declined"
      Swal.fire({
        icon: "error",
        title: "Order Declined",
        text: "Your order has been declined. Please contact support for further details.",
        showConfirmButton: false,
        timer: 3500,
      });
    } else if (order.status === "pending") {
      // 4. If status is "pending"
      Swal.fire({
        icon: "info",
        title: "Order Pending",
        text: "Your order is not approved yet. Please wait for further updates or contact support.",
        showConfirmButton: false,
        timer: 3500,
      });
    }
  };
  
  
  return (
    <div className=" bg-white border rounded-2xl shadow-lg p-5">
      <div className="flex flex-col md:flex-row justify-between items-center pb-7 space-y-5">
        <div className="rounded-lg overflow-hidden flex flex-col md:flex-row  justify-between items-center space-y-2 md:space-x-3">
          <div className="w-44 h-48 md:w-24 md:h-28 xl:w-44 xl:h-48 bg-gray-200 flex justify-center items-center rounded-xl">
            <img
              src={order?.productID?.displayImage}
              alt="productName"
              className="w-36 h-40 md:w-20 md:h-24 xl:w-36 xl:h-40 object-cover rounded-lg"
            />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg xl:text-2xl font-semibold text-foreground capitalize">
              {order?.productID?.productName}
            </h3>
            {order?.productID?.productDescription &&
              <p className="text-sm xl:text-lg text-gray-500 -foreground mt-1">
              {order?.productID?.productDescription.slice(0,40)}...
             </p>
            }
            <p className="text-sm xl:text-lg text-gray-500 -foreground mt-1 capitalize">
              Metarial: {order?.productInfo?.material}
            </p>
            <p className="text-sm xl:text-lg text-gray-500 -foreground mt-1">
              Size: {order?.productInfo?.size}
            </p>
          </div>
        </div>
        {user?.email !== "nftclosetx@gmail.com" && (
          <div className="w-full md:w-4/12 xl:w-5/12 flex flex-col gap-3">
            <button
                onClick={handleClaimDigitalAssets}
              className="py-2 xl:py-4 rounded-md text-[11px] xs:text-sm xl:text-xl font-medium bg-black text-white text-primary-foreground hover:bg-primary/90"
            >
              Claim Your Digital Assets
            </button>
            <button
              onClick={handleOrderForPhy}
              className="py-2 xl:py-4 rounded-md text-[11px] xs:text-sm xl:text-xl font-medium text-black border border-black text-primary-foreground hover:bg-primary/90"
            >
              Claim Your Physical Version
            </button>
          </div>
        )}
      </div>
      <hr />
      <p className="text-sm xl:text-lg pt-5 text-gray-500 text-muted-foreground">
        The return/exchange window for this item is closed.
      </p>
    </div>
  );
};

export default OrderCardPrompt;
