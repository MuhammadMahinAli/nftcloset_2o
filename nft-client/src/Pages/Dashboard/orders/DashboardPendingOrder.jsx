import { useContext } from "react";
import {  useGetOrderStatusAndAssetsQuery } from "../../../features/order/orderApi";
import Cube from "../../../icons/NFTIcon/Cube";
import { AuthContext } from "../../../Context/UserContext";

const DashboardPendingOrder = ({ handlePendingOrder, handleSendAssetsByEmail, formatIsoDateToHumanReadable }) => {
    const {userId} = useContext(AuthContext);
    const { data: getAllOrder , isLoading } = useGetOrderStatusAndAssetsQuery({
        status: "pending",
        id: userId,
      });
      if (isLoading) return <p>Orders is Loading...</p>;
      if(getAllOrder?.length === 0) return <p className="text-xl font-semibold">No order available.</p>;
    return (
        <div>
            {
                getAllOrder?.map((order,i)=>(
                    <div key={i} className="p-4 xs:p-6 rounded-2xl bg-[#f4f4f4] transition-colors duration-200 mt-6 md:mt-10">
                    <div className="flex justify-between items-center  py-5">
                      {/* left */}
                      <div className="flex items-center gap-2 xl:gap-6">
                        <div className="px-3 py-1 bg-primary/10 text-primary text-sm dark:bg-primary/20">
                          <Cube />
                        </div>
                        <div>
                          <p className="text-lg xl:text-xl font-semibold  text-gray-900">
                            Pending
                          </p>
                          <p className="text-sm xl:text-base  text-gray-700">
                  {formatIsoDateToHumanReadable(order?.updatedAt)}
                </p>
                        </div>
                      </div>
            
                      {/* right */}
                      <div className="flex justify-between items-center space-x-5">
                        <button className=" hidden md:block px-3 py-2 rounded-md text-sm xl:text-lg  text-white bg-[#2CBA7A] hover:text-primary/80">
                          Confirm Reciept
                        </button>
            
                        <p 
                      //  onClick={()=>setIsOpenModal(true)} 
                        className="text-sm xl:text-xl  text-gray-700">Track</p>
                      </div>
                    </div>
            
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
                            <h3 className="text-lg xl:text-2xl font-semibold text-foreground">
                            {order?.productID?.productName}
                            </h3>
                            <p className="text-sm xl:text-lg text-gray-500 -foreground mt-1">
                              Lorem ipsum dolor icing elit. Quod, at!
                            </p>
                            <p className="text-sm xl:text-lg text-gray-500 -foreground mt-1">
                             Metarial: {order?.productInfo?.metarial}
                            </p>
                            <p className="text-sm xl:text-lg text-gray-500 -foreground mt-1">
                              Size: {order?.productInfo?.size}
                            </p>
                          </div>
                        </div>
            
                        <div className="w-full md:w-4/12 xl:w-5/12 flex flex-col gap-3">
                          <button onClick={
  order?.status === "approved"
    ? (e) =>
        handleSendAssetsByEmail(
          e,
          order?.orderedBy?.email,
          order?.orderID,
          order?.productID?.digitalAssets
        ) 
    : handlePendingOrder
} className="py-2 xl:py-4 rounded-md text-[11px] xs:text-sm xl:text-xl font-medium bg-black text-white text-primary-foreground hover:bg-primary/90">
                            Claim Your Digital Assets
                          </button>
                          <button className="py-2 xl:py-4 rounded-md text-[11px] xs:text-sm xl:text-xl font-medium text-black border border-black text-primary-foreground hover:bg-primary/90">
                          Claim Your Physical Version
                          </button>
                        </div>
                      </div>
                      <hr />
                      <p className="text-sm xl:text-lg pt-5 text-gray-500 text-muted-foreground">
                        The return/exchange window for this item is closed.
                      </p>
                    </div>
                  </div>

                ))
            }
        </div>
    );
};

export default DashboardPendingOrder;