import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import { addHomePageControlService, getAllHomePageControlService, updateHomePageControlInfoService } from "./homePageControl.service.js";



//------create a collection
export const addHomePageControlController = catchAsync(async (req, res, next) => {
    const data = req.body;
    //console.log(data);
    const homePageControl = await addHomePageControlService(data);
    //console.log(homePageControl);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Home Page Control is created successfully!",
      data: homePageControl,
    });
  });

  // --------- get all collection
  
  export const getAllHomePageControlController = catchAsync (async (req,res)=>{
  
    const allCollections = await getAllHomePageControlService();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All collections are retrieved successfully!",
      data: allCollections,
    });
  });

  //---------------- update updateHomePageControlInfo
    
    export const updateHomePageControlInfoController = catchAsync(async (req, res) => {
      const data = req.body;

      const updatedCollection = await updateHomePageControlInfoService(req.params.id, data);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "HomePage Content is updated successfully!",
        data: updatedCollection,
      });
    });
