import express from "express";
import { addHomePageControlController, getAllHomePageControlController, updateHomePageControlInfoController } from "./homePageControl.controller.js";
const router = express.Router();

router.post("/add-new", addHomePageControlController);
router.get('/getAll', getAllHomePageControlController);
router.put('/updateHomePageContent/:id', updateHomePageControlInfoController);

  

export const HomePageControlRoutes = router;
