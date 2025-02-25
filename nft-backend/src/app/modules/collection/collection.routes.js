import express from "express";
import { addCollectionController, deleteCollectionController, getAllCollectionController, getCollectionByIdController, updateCollectionInfoController } from "./collection.controller.js";
const router = express.Router();

router.post("/add-new", addCollectionController);
router.get('/getAll', getAllCollectionController);
router.get("/getCollectionById/:id", getCollectionByIdController);
router.put('/updateCollectionInfo/:id', updateCollectionInfoController);
router.delete("/deleteCollection/:id", deleteCollectionController);

  

export const CollectionRoutes = router;
