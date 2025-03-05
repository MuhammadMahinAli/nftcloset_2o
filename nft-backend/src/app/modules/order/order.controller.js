import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import { addOrderService, deleteOrderService, getAllOrderByMemberService, getAllOrderService, getApprovedOrdersByMemberService, getClaimedOrdersByMemberService, getDeclinedOrdersByMemberService, getOrderByIdService, getOrdersByStatusForAdminService, getOrdersByStatusService, getPendingOrdersByMemberService, getReceivedOrdersByMemberService, updateOrderDigitalAssetStatusService, updateOrderStatusService } from "./order.service.js";

//------create an order

export const addOrderController = catchAsync(async (req, res, next) => {
  const data = req.body;
  //console.log(data);
  const newOrder = await addOrderService(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order is created successfully!",
    data: newOrder,
  });
});

// --------- get all order

export const getAllOrderController = catchAsync (async (req,res)=>{

  const allOrders = await getAllOrderService();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Orders are retrieved successfully!",
    data: allOrders,
  });
});

// --------- get all order of a member

export const getAllOrderByMemberController = catchAsync (async (req,res)=>{

  const id  = req.params.id;

  const allOrders = await getAllOrderByMemberService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Orders of a Member are retrieved successfully!",
    data: allOrders,
  });
});


// --------- get order by id

export const getOrderByIdController = catchAsync(async (req, res) => {
  const id = req.params.id;

  const order = await getOrderByIdService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order By Id is retrieved successfully!",
    data: order,
  });
});



export const getOrdersByStatusController = async (req, res) => {
  try {
    const { status, id } = req.params; 
    const orders = await getOrdersByStatusService(status, id);
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};
export const getOrdersByStatusForAdminController = async (req, res) => {
  try {
    const { status } = req.params; 
    const orders = await getOrdersByStatusForAdminService(status);
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};


// ---------- get pending order

export const getPendingOrdersByMemberController = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const pendingOrders = await getPendingOrdersByMemberService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pending orders fetched successfully",
    data: pendingOrders,
  });
});
// ---------- get approved order

export const getApprovedOrdersByMemberController = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const approvedOrders = await getApprovedOrdersByMemberService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Approved orders fetched successfully",
    data: approvedOrders,
  });
});
// ---------- get declined order

export const getDeclinedOrdersByMemberController = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const declinedOrders = await getDeclinedOrdersByMemberService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Declined orders fetched successfully",
    data: declinedOrders,
  });
});
// ---------- get claimed order

export const getClaimedOrdersByMemberController = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const claimedOrders = await getClaimedOrdersByMemberService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Claimed orders fetched successfully",
    data: claimedOrders,
  });
});
// ---------- get received order

export const getReceivedOrdersByMemberController = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const receivedOrders = await getReceivedOrdersByMemberService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Received orders fetched successfully",
    data: receivedOrders,
  });
});

// ---- update order status

export const updateOrderStatusController = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const   data = req.body;
  const updatedOrder = await updateOrderStatusService(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order status updated successfully",
    data: updatedOrder,
  });
});
// ---- update order digital Asset status

export const updateOrderDigitalAssetStatusController = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const   data = req.body;
  const updatedOrder = await updateOrderDigitalAssetStatusService(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order digital asset status updated successfully",
    data: updatedOrder,
  });
});


 //----------------- delete Order

 export const deleteOrderController = catchAsync(async (req, res) => {
  const id = req.params.id;

  const order = await deleteOrderService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order is deleted successfully!",
    data: order,
  });
});