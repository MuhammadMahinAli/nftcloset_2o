import { Link } from "react-router-dom";
import {
  useGetAllOrderQuery,
  useUpdateOrderDigitalAssetStatusMutation,
  useUpdateOrderStatusMutation,
} from "../../../features/order/orderApi";
import Swal from "sweetalert2";

const Order = () => {
  const { data: getAllOrder } = useGetAllOrderQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [updateOrderDigitalAssetStatus] =
    useUpdateOrderDigitalAssetStatusMutation();
  const allOrder = getAllOrder?.data;

  // Function to handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    console.log(orderId, newStatus);
    const updatedData = {
      status: newStatus,
    };
    // try {
    //   await updateOrderStatus({ id: orderId, data: updatedData }); // Call API to update status
    // } 
    try {
      const response = await updateOrderStatus({ id: orderId, data: updatedData }).unwrap();
      console.log(response);
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Hurry !",
          text: "You've updated status !",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      }
    }
    catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  const handleDigitalAssetStatusChange = async (orderId, newStatus) => {
    console.log(orderId, newStatus);
    const updatedData = {
      status: newStatus,
    };
    // try {
    //   await updateOrderStatus({ id: orderId, data: updatedData }); // Call API to update status
    // } 
     try {
          const response = await updateOrderDigitalAssetStatus({ id: orderId, data: updatedData }).unwrap();
          console.log(response);
          if (response.success) {
            Swal.fire({
              icon: "success",
              title: "Hurry !",
              text: "You've updated status !",
            });
            // setTimeout(() => {
            //   window.location.reload();
            // }, 2500);
          }
        }
    catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div>
      <Link to="/order">
        <button className="px-3 py-3 bg-green-500 text-white rounded-xl m-6">
          Go Back
        </button>
      </Link>

      <ul className="bg-gray-100 p-5 space-y-9">
        <li className="flex justify-between">
          <p className="text-2xl font-bold">Order ID</p>
          <p className="text-2xl font-bold">Status</p>
          <p className="text-2xl font-bold">Digital Assets</p>
        </li>

        {allOrder?.map((order, i) => (
          <li className="flex justify-between" key={i}>
            <p>
              {i + 1}. ID {order?.orderID}
            </p>
            {/* Status Dropdown */}
            <select
              className="border rounded p-1"
              value={order.status} // Set current status
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="declined">Declined</option>
            </select>
            {/* digital Asset Dropdown */}
            <select
              className="border rounded p-1"
              value={order.digitalAsset} // Set current status
              onChange={(e) => handleDigitalAssetStatusChange(order._id, e.target.value)}
            >
              <option value="notClaimed">Not Claimed</option>
              <option value="claimed">Claimed</option>
              <option value="received">Received</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Order;
