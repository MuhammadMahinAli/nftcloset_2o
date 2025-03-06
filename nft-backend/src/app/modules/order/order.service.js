import httpStatus from "http-status";
import { ApiError } from "../../../handleError/apiError.js";
import { Order } from "./order.model.js";

export const generateOrderId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit number
};

// ----- add order

export const addOrderService = async (orderInfo) => {
  try {
    orderInfo.orderID = generateOrderId();
    orderInfo.isConfirmRecipt = false;
    const result = await Order.create(orderInfo);
    if (!result) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to add order."
      );
    }
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

//----- get all order
export const getAllOrderService = async () => {
  const orders = await Order.find({})
    .populate("productID", "productName displayImage")
    .populate("orderedBy")
    .sort({ createdAt: -1 });
  return orders;
};

//----- get all order of a user
export const getAllOrderByMemberService = async (id) => {
  const orders = await Order.find({ orderedBy: id })
    .populate("productID")
    .populate("orderedBy")
    .sort({ createdAt: -1 });
  return orders;
};

//----- get order by id
export const getOrderByIdService = async (id) => {
  const order = await Order.findOne({ _id: id })
    .populate("productID")
    .populate("orderedBy")
    .sort({ createdAt: -1 });
  return order;
};

export const getOrdersByStatusService = async (status, userId) => {
  try {
    // Build a query object
    const query = { orderedBy: userId };

    // Decide if we use `status` or `digitalAsset` in the query
    switch (status) {
      case "pending":
      case "approved":
      case "declined":
        query.status = status;
        break;
      case "claimed":
      case "notClaimed":
      case "received":
        query.digitalAsset = status;
        break;
      default:
        throw new Error("Invalid status. Must be pending, approved, declined, claimed, or received.");
    }

    // Fetch matching orders
    const orders = await Order.find(query)
      .populate("productID")
      .populate("orderedBy")
      .sort({ createdAt: -1 });

    return orders;
  } catch (error) {
    throw new Error(`Error fetching "${status}" orders for user ${userId}: ${error.message}`);
  }
};
export const getOrdersByStatusForAdminService = async (status) => {
  try {
    const query = {};
    
    switch (status) {
      case "pending":
      case "approved":
      case "declined":
        query.status = status;
        break;
      case "claimed":
      case "notClaimed":
      case "received":
        query.digitalAsset = status;
        break;
      default:
        throw new Error("Invalid status.");
    }

    console.log("Running Query:", query); // Debugging
    const orders = await Order.find(query)
      .populate("productID")
      .populate("orderedBy")
      .sort({ createdAt: -1 });

    console.log("Orders found:", orders.length); // Debugging
    return orders;
  } catch (error) {
    console.error(error);
    throw new Error(`Error fetching "${status}" orders: ${error.message}`);
  }
};


// ---------- get pending order

export const getPendingOrdersByMemberService = async (id) => {
  console.log(id);
  try {
    const pendingOrders = await Order.find({
      status: "pending",
      orderedBy: id,
    })
      .populate("productID")
      .populate("orderedBy")
      .sort({ createdAt: -1 });
    return pendingOrders;
  } catch (error) {
    throw new Error(
      `Error fetching pending orders for member: ${error.message}`
    );
  }
};
// ---------- get approved order

export const getApprovedOrdersByMemberService = async (id) => {
  try {
    const approvedOrders = await Order.find({
      status: "approved",
      orderedBy: id,
    })
      .populate("productID", "productName displayImage")
      .populate("orderedBy")
      .sort({ createdAt: -1 });
    return approvedOrders;
  } catch (error) {
    throw new Error(
      `Error fetching approved orders for member: ${error.message}`
    );
  }
};
// ---------- get declined order

export const getDeclinedOrdersByMemberService = async (id) => {
  try {
    const declinedOrders = await Order.find({
      status: "declined",
      orderedBy: id,
    })
      .populate("productID")
      .populate("orderedBy")
      .sort({ createdAt: -1 });
    return declinedOrders;
  } catch (error) {
    throw new Error(
      `Error fetching declined orders for member: ${error.message}`
    );
  }
};
// ---------- get claimed order

export const getClaimedOrdersByMemberService = async (id) => {
  try {
    const claimedOrders = await Order.find({
      digitalAsset: "claimed",
      orderedBy: id,
    })
      .populate("productID")
      .populate("orderedBy")
      .sort({ createdAt: -1 });
    return claimedOrders;
  } catch (error) {
    throw new Error(
      `Error fetching claimed orders for member: ${error.message}`
    );
  }
};
// ---------- get received order

export const getReceivedOrdersByMemberService = async (id) => {
  try {
    const receivedOrders = await Order.find({
      digitalAsset: "received",
      orderedBy: id,
    })
      .populate("productID")
      .populate("orderedBy")
      .sort({ createdAt: -1 });
    return receivedOrders;
  } catch (error) {
    throw new Error(
      `Error fetching received orders for member: ${error.message}`
    );
  }
};

// ---- update order status
export const updateOrderStatusService = async (id, data) => {
  console.log(id, data);
  try {
    const product = await Order.findById(id);
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    }

    const updatedData = {
      trackingLink: data.trackingLink,
      status: data.status,
      digitalAsset: data.digitalAsset
    };

    const updatedProduct = await Order.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedProduct) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Failed to update user information"
      );
    }

    return updatedProduct;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};
// ---- update order digital Asset status
export const updateOrderDigitalAssetStatusService = async (id, data) => {
  console.log(id, data);
  try {
    const product = await Order.findById(id);
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    }

    const updatedData = {
      digitalAsset : data.status,
    };

    const updatedProduct = await Order.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedProduct) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Failed to update user information"
      );
    }

    return updatedProduct;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};


//----------------- delete order

export const deleteOrderService = async (id) => {
  const result = await Order.findByIdAndDelete({ _id: id });
  return result;
};

export const confirmReceiptService = async (orderId) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { isConfirmRecipt: true },
    { new: true }
  );
  return updatedOrder;
};
