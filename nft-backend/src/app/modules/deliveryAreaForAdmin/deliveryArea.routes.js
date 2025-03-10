import express from "express";
import { createDeliveryAreaController, deleteDeliveryAreaController, getDeliveryAreasController, updateDeliveryAreaController } from "./deliveryArea.controller.js";
const router = express.Router();


router.get("/getAll", getDeliveryAreasController);
router.post("/add-new", createDeliveryAreaController);
router.put("/updateInfo/:deliveryAreaId", updateDeliveryAreaController);
router.delete("/delete/:deliveryAreaId", deleteDeliveryAreaController);




export const  DeliveryAreaRoutes = router;
