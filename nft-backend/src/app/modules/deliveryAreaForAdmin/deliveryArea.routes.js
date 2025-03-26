import express from "express";
import { createDeliveryAreaController, findDeliveryAreasController,deleteDeliveryAreaController, getDeliveryAreasController, updateDeliveryAreaController } from "./deliveryArea.controller.js";
const router = express.Router();


router.get("/getAll", getDeliveryAreasController);
router.post("/add-new", createDeliveryAreaController);
router.put("/updateInfo/:deliveryAreaId", updateDeliveryAreaController);
router.delete("/delete/:deliveryAreaId", deleteDeliveryAreaController);
router.get("/:country/:city", findDeliveryAreasController);



export const  DeliveryAreaRoutes = router;
