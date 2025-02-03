import express from "express";
import {
  addProductController,
  deleteProductController,
  getAllProductController,
  getProductByIdController,
  updateProductInfoController,
} from "./product.controller.js";
const router = express.Router();

router.post("/add-new", addProductController);
router.get("/getAll", getAllProductController);
router.get("/getProductById/:id", getProductByIdController);
router.put("/updateProductInfo/:id", updateProductInfoController);
router.delete("/deleteProduct/:id", deleteProductController);

export const ProductRoutes = router;
