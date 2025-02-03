import express from "express";
import {
  addOrderController,
  deleteOrderController,
  getAllOrderByMemberController,
  getAllOrderController,
  getApprovedOrdersByMemberController,
  getClaimedOrdersByMemberController,
  getDeclinedOrdersByMemberController,
  getOrderByIdController,
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
// router.put('/updateUser/:id', updateMemberById);

export const OrderRoutes = router;
