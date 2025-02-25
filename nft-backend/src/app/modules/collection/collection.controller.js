import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync.js";
import { addCollectionService, deleteCollectionService, getAllCollectionService, getCollectionByIdService, updateCollectionInfoService } from "./collection.service.js";
import { sendResponse } from "../../../utils/sendResponse.js";



//------create a collection
export const addCollectionController = catchAsync(async (req, res, next) => {
    const data = req.body;
    //console.log(data);
    const newCollection = await addCollectionService(data);
    //console.log(newCollection);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Collection is created successfully!",
      data: newCollection,
    });
  });

  // --------- get all collection
  
  export const getAllCollectionController = catchAsync (async (req,res)=>{
  
    const allCollections = await getAllCollectionService();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All collections are retrieved successfully!",
      data: allCollections,
    });
  });

  //---------------- update collection
    
    export const updateCollectionInfoController = catchAsync(async (req, res) => {
      const data = req.body;

      const updatedCollection = await updateCollectionInfoService(req.params.id, data);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Collection information updated successfully!",
        data: updatedCollection,
      });
    });

    //-----
    export const getCollectionByIdController = catchAsync(async(req,res)=>{
      const id = req.params.id;
      const collection = await getCollectionByIdService(id);
    
      sendResponse(res, {
        statusCode:httpStatus.OK,
        success:true,
        message:"Collection's details retrived successfully",
        data: collection
      })
    })
  

   //----------------- delete Collection

export const deleteCollectionController = catchAsync(async (req, res) => {
  const id = req.params.id;

  const collection = await deleteCollectionService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Collection is deleted successfully!",
    data: collection,
  });
});