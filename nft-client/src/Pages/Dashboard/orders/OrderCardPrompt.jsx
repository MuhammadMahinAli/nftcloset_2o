import Swal from "sweetalert2";
import { useSendDigitalAssetsEmailMutation } from "../../../features/auth/authApi";
import { useSelector } from "react-redux";
import { useUpdateOrderStatusMutation } from "../../../features/order/orderApi";
import { useGetDeliveryAreaMutation } from "../../../features/deliveryArea/deliveryAreaApi";
import { useState } from "react";

const OrderCardPrompt = ({ order }) => {
  const [triggerGetDeliveryArea] = useGetDeliveryAreaMutation();
const [selectedDelivery, setSelectedDelivery] = useState(null); // Store selected one here
const [showPopup, setShowPopup] = useState(false);
const [deliveryOptions, setDeliveryOptions] = useState([]);
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
  

  // const handleOrderForPhy = async (e) => {
  //   e.preventDefault();

  //   if (!order) return;

  //   const deliveryCity = order?.deliveryAddress?.city
  //   const deliveryCountry = order?.deliveryAddress?.country

  //   const {getDeliveryArea} = useGetDeliveryAreaMutation({
  //     city:deliveryCity,
  //     country:deliveryCountry
  //   });
  
  //   // 1. Check the order's status first
  //   if (order.status === "approved") {
  //     // 2. If status is "approved", proceed to handle the digitalAsset logic
  //     const { digitalAsset } = order;
  
  //     switch (digitalAsset) {
  //       case "notClaimed":
  //         try {
  //           const orderId = order._id;
  
            // // Mark as claimed
            // const formData = {
            //   trackingLink: order.trackingLink,
            //   status: order.status,       // Keep the status the same (still "approved")
            //   digitalAsset: "claimed",
            // };
  
            // const response = await updateOrderStatus({
            //   id: orderId,
            //   data: formData,
            // }).unwrap();
  
  //           if (response.success) {
  //             Swal.fire({
  //               icon: "success",
  //               title: `Admin will contact you via ${order.contactType}`,
  //               text: "Your request for claiming the Physical Version has been sent.",
  //               showConfirmButton: false,
  //               timer: 3500,
  //             });
  //           }
  //         } catch (error) {
  //           Swal.fire({
  //             icon: "error",
  //             title: "Error",
  //             text: "Something went wrong while claiming the Physical Version.",
  //             showConfirmButton: false,
  //             timer: 3500,
  //           });
  //         }
  //         break;
  
  //       case "shipping":
  //         Swal.fire({
  //           icon: "info",
  //           title: "Shipping In Progress",
  //           text: "Your order is currently in transit.",
  //           showConfirmButton: false,
  //           timer: 3500,
  //         });
  //         break;
  
  //       case "claimed":
  //         Swal.fire({
  //           icon: "info",
  //           title: "You’ve already claimed a Physical Version.",
  //           text: "Your order is still in process.",
  //           showConfirmButton: false,
  //           timer: 3500,
  //         });
  //         break;
  
  //       case "received":
  //         Swal.fire({
  //           icon: "success",
  //           title: "Order Received",
  //           text: "Your order has already been delivered!",
  //           showConfirmButton: false,
  //           timer: 3500,
  //         });
  //         break;
  
  //       default:
  //         // Fallback or unknown digitalAsset
  //         Swal.fire({
  //           icon: "warning",
  //           title: "Unknown Order Status",
  //           text: "Please contact support for more details.",
  //           showConfirmButton: false,
  //           timer: 3500,
  //         });
  //         break;
  //     }
  //   } else if (order.status === "declined") {
  //     // 3. If status is "declined"
  //     Swal.fire({
  //       icon: "error",
  //       title: "Order Declined",
  //       text: "Your order has been declined. Please contact support for further details.",
  //       showConfirmButton: false,
  //       timer: 3500,
  //     });
  //   } else if (order.status === "pending") {
  //     // 4. If status is "pending"
  //     Swal.fire({
  //       icon: "info",
  //       title: "Order Pending",
  //       text: "Your order is not approved yet. Please wait for further updates or contact support.",
  //       showConfirmButton: false,
  //       timer: 3500,
  //     });
  //   }
  // };
 
  
  // const handleOrderForPhy = async (e) => {
  //   e.preventDefault();
  
  //   if (!order) return;
  
  //   const deliveryCity = order?.deliveryAddress?.city;
  //   const deliveryCountry = order?.deliveryAddress?.country;
  
  //   try {
  //     const { data, error } = await triggerGetDeliveryArea({
  //       city: deliveryCity,
  //       country: deliveryCountry,
  //     });
  
  //     if (error || !data || data.length === 0) {
  //       Swal.fire("Not Found", "No delivery area found for this location.", "warning");
  //       return;
  //     }
  
  //     setDeliveryOptions(data);
  //     setShowPopup(true); // Show popup with the delivery options
  //   } catch (err) {
  //     console.error("Fetch error", err);
  //     Swal.fire("Error", "Something went wrong while fetching delivery options.", "error");
  //   }
  // };
  
  const deliveryCity = order?.deliveryAddress?.city;
  const deliveryCountry = order?.deliveryAddress?.country;


  const handleOrderForPhy = async (e) => {
    e.preventDefault();

    if (!order) return;



    if (order.status === "approved") {
      const { digitalAsset } = order;

      switch (digitalAsset) {
        case "notClaimed":
          try {
            const { data, error } = await triggerGetDeliveryArea({
              city: deliveryCity,
              country: deliveryCountry,
            });

            if (error || !data || data.length === 0) {
              Swal.fire("Not Found", "No delivery area found for this location.", "warning");
              return;
            }

            setDeliveryOptions(data);
            setShowPopup(true);
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went wrong while fetching delivery options.",
              timer: 3000,
              showConfirmButton: false,
            });
          }
          break;

        case "shipping":
          Swal.fire("Shipping", "Your order is already in transit.", "info");
          break;

        case "claimed":
          Swal.fire("Already Claimed", "Your physical version is being processed.", "info");
          break;

        case "received":
          Swal.fire("Received", "You have already received your physical product.", "success");
          break;

        default:
          Swal.fire("Unknown", "Something went wrong", "warning");
          break;
      }
    } else if (order.status === "declined") {
      Swal.fire("Declined", "Your order was declined.", "error");
    } else if (order.status === "pending") {
      Swal.fire("Pending", "Your order is still pending approval.", "info");
    }
  };

  console.log(selectedDelivery);
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
      {showPopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Shipping Method
        </h2>
    
        <div className="mb-4 text-sm text-gray-600">
          <div className="mb-1 font-medium">Ship To</div>
          <div className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 6.25 7 13 7 13s7-6.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" /></svg>
           {deliveryCity} , {deliveryCountry}
          </div>
        </div>
    
        <div className="space-y-3">
          {deliveryOptions.map((option) => (
            <div
              key={option._id}
              onClick={() => setSelectedDelivery(option)}
              className={`border rounded-xl px-4 py-3 cursor-pointer transition-colors ${
                selectedDelivery?._id === option._id
                  ? "border-teal-500 bg-teal-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold text-gray-800">
                  Free Shipping
                </div>
                {selectedDelivery?._id === option._id && (
                  <div className="text-teal-600 font-semibold text-sm">
                    Selected
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                From Malaysia to {deliveryCountry} via <span className="font-bold">{option.deliveryType}</span>
              </div>
              <div className="text-sm mt-1 text-gray-700">
                Estimated delivery:{" "}
                <span className="font-medium">{option.deliveryDay} Days</span>
              </div>
              <div className="text-sm mt-1 text-gray-700">
                Delivery Cost:{" "}
                <span className="font-medium">$ {option.deliveryFee}</span>
              </div>
              {
                option?.featured?.length !== 0  &&

              <ul className="space-y-1">
             Features:{" "}
                {
                  option?.featured?.map((list,i)=>(
                    <li className="text-sm mt-1 text-green-600" key={i}>{list}</li>
                   
                  ))

                }
              </ul>
              }
            
            </div>
          ))}
        </div>
    
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={() => {
              setShowPopup(false);
              setSelectedDelivery(null);
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              if (!selectedDelivery) {
                Swal.fire("Select Option", "Please select a delivery type", "info");
                return;
              }
    
              try {
                const formData = {
                  trackingLink: order.trackingLink,
                  status: "approved",
                  digitalAsset: "claimed",
                  deliveryTypeInfo: selectedDelivery._id,
                };
    
                const response = await updateOrderStatus({
                  id: order._id,
                  data: formData,
                }).unwrap();
    
                if (response.success) {
                  setShowPopup(false);
                  setSelectedDelivery(null);
                  Swal.fire({
                    icon: "success",
                    title: "Delivery Option Selected",
                    text: `Admin will contact you via ${order.contactType}`,
                    showConfirmButton: false,
                    timer: 3000,
                  });
                }
              } catch (error) {
                console.error("Order update failed", error);
                Swal.fire("Error", "Failed to claim the physical version.", "error");
              }
            }}
            className="px-4 py-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
    
      )}
      {/* {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full relative">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Choose a Delivery Option
            </h2>
            <table className="w-full border-collapse mb-4 text-sm md:text-base">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-2">Type</th>
                  <th className="p-2">Fee</th>
                  <th className="p-2">Days</th>
                </tr>
              </thead>
              <tbody>
                {deliveryOptions.map((area) => (
                  <tr
                    key={area._id}
                    onClick={() => setSelectedDelivery(area)}
                    className={`cursor-pointer ${
                      selectedDelivery?._id === area._id
                        ? "bg-green-100"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <td className="p-2">{area.deliveryType}</td>
                    <td className="p-2">${area.deliveryFee}</td>
                    <td className="p-2">{area.deliveryDay}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowPopup(false);
                  setSelectedDelivery(null);
                }}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!selectedDelivery) {
                    Swal.fire("Select Option", "Please select a delivery type", "info");
                    return;
                  }

                  try {
                    const formData = {
                      trackingLink: order.trackingLink,
                      status: "approved",
                      digitalAsset: "claimed",
                      deliveryTypeInfo: selectedDelivery._id,
                    };

                    const response = await updateOrderStatus({
                      id: order._id,
                      data: formData,
                    }).unwrap();

                    if (response.success) {
                      setShowPopup(false);
                      setSelectedDelivery(null);
                      Swal.fire({
                        icon: "success",
                        title: "Delivery Option Selected",
                        text: `Admin will contact you via ${order.contactType}`,
                        showConfirmButton: false,
                        timer: 3000,
                      });
                    }
                  } catch (error) {
                    console.error("Order update failed", error);
                    Swal.fire("Error", "Failed to claim the physical version.", "error");
                  }
                }}
                className="px-4 py-2 rounded-md bg-teal-500 text-white  hover:bg-teal-600 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )} */}

    </div>
  );
};

export default OrderCardPrompt;
