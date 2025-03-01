import express from "express";
import { addHomePageControlController, getAllHomePageControlController } from "./homePageControl.controller.js";
const router = express.Router();

router.post("/add-new", addHomePageControlController);
router.get('/getAll', getAllHomePageControlController);
//router.put('/updateCollectionInfo/:id', updateCollectionInfoController);

  

export const HomePageControlRoutes = router;
