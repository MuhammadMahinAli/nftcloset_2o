import Swal from "sweetalert2";
import { useSendDigitalAssetsEmailMutation } from "../../../features/auth/authApi";
import { useSelector } from "react-redux";

const OrderCardPrompt = ({ order }) => {
  const [sendDigitalAssetsEmail] = useSendDigitalAssetsEmailMutation();
  const { user } = useSelector((state) => state.auth);
  const handleSendAssetsByEmail = async (e, email, orderID, digitalAssets) => {
    e.preventDefault();
    try {
      const result = await sendDigitalAssetsEmail({
        email,
        orderID,
        digitalAssets,
      }).unwrap();
      alert(result.message);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };
  const handlePendingOrder = () => {
    Swal.fire({
      icon: "info",
      title: "Mission Failed!",
      text: "Your Order is not approved yet.",
      showConfirmButton: false,
      timer: 1500,
    });
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
            <p className="text-sm xl:text-lg text-gray-500 -foreground mt-1">
              Lorem ipsum dolor icing elit. Quod, at!
            </p>
            <p className="text-sm xl:text-lg text-gray-500 -foreground mt-1 capitalize">
              Metarial: {order?.productInfo?.metarial}
            </p>
            <p className="text-sm xl:text-lg text-gray-500 -foreground mt-1">
              Size: {order?.productInfo?.size}
            </p>
          </div>
        </div>
        {user?.email !== "arrr@gmail.com" && (
          <div className="w-full md:w-4/12 xl:w-5/12 flex flex-col gap-3">
            <button
              onClick={
                order?.status === "approved"
                  ? (e) =>
                      handleSendAssetsByEmail(
                        e,
                        order?.orderedBy?.email,
                        order?.orderID,
                        order?.productID?.digitalAssets
                      )
                  : handlePendingOrder
              }
              className="py-2 xl:py-4 rounded-md text-[11px] xs:text-sm xl:text-xl font-medium bg-black text-white text-primary-foreground hover:bg-primary/90"
            >
              Claim Your Digital Assets
            </button>
            <button className="py-2 xl:py-4 rounded-md text-[11px] xs:text-sm xl:text-xl font-medium text-black border border-black text-primary-foreground hover:bg-primary/90">
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
