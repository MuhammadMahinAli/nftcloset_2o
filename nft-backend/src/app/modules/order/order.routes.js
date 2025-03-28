import express from "express";
import {
  addOrderController,
  confirmReceiptController,
  deleteOrderController,
  getAllOrderByMemberController,
  getAllOrderController,
  getApprovedOrdersByMemberController,
  getClaimedOrdersByMemberController,
  getDeclinedOrdersByMemberController,
  getOrderByIdController,
  getOrdersByStatusController,
  getOrdersByStatusForAdminController,
  getPendingOrdersByMemberController,
  getReceivedOrdersByMemberController,
  updateOrderDigitalAssetStatusController,
  updateOrderStatusController,
} from "./order.controller.js";
const router = express.Router();

router.post("/add-new", addOrderController);
router.get("/getOrderById/:id", getOrderByIdController);
router.get("/getAll", getAllOrderController);
router.get("/getAllOrderByMember/:id", getAllOrderByMemberController);
router.get("/getPendingOrder/:id", getPendingOrdersByMemberController);
router.get("/getApprovedOrder/:id", getApprovedOrdersByMemberController);
router.get("/getDeclinedOrder/:id", getDeclinedOrdersByMemberController);
router.get("/getClaimedOrder/:id", getClaimedOrdersByMemberController);
router.put('/updateStatus/:id', updateOrderStatusController);
router.put('/updatedigitalAssetStatus/:id', updateOrderDigitalAssetStatusController);
router.get("/getReceivedOrder/:id", getReceivedOrdersByMemberController);
router.delete("/deleteOrder/:id", deleteOrderController);
router.put("/confirmReceipt/:orderId", confirmReceiptController);




// Route: GET /getOrderStatus/:status/:id
// Example: /getOrderStatus/pending/63fa052d33b8560012345678
router.get("/getOrderStatus/:status/:id", getOrdersByStatusController);
router.get("/getOrderStatusForAdmin/:status", getOrdersByStatusForAdminController);



export const OrderRoutes = router;
