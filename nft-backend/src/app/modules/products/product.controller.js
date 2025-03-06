import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync.js";
import { sendResponse } from "../../../utils/sendResponse.js";
import { addProductService } from "./services/addProduct.js";
import { getAllProductService } from "./services/getAllProduct.js";
import { getProductByIdService } from "./services/getProductById.js";
import { updateProductInfoService } from "./services/UpdateProduct.js";
import { deleteProductService } from "./services/deleteProduct.js";

//------create a product

export const addProductController = catchAsync(async (req, res, next) => {
    const data = req.body;
    //console.log(data);
    const newProduct = await addProductService(data);
    //console.log(newProduct);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product is created successfully!",
      data: newProduct,
    });
  });

// -------- get all product
  export const getAllProductController = catchAsync (async (req,res)=>{

    const products = await getAllProductService();
  
    sendResponse(res,{
      statusCode: httpStatus.OK,
      success: true,
      message: "Product retrieved successfully!",
      data: products,
    });
  });

  // --------- get product by id
  
  export const getProductByIdController = catchAsync(async (req, res) => {
    const id = req.params.id;
  
    const user = await getProductByIdService(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product By Id is retrieved successfully!",
      data: user,
    });
  });

  // ------------- update product info
  
  export const updateProductInfoController = catchAsync(async (req, res) => {
    const data = req.body;
   // console.log(data);  
    const updatedProduct = await updateProductInfoService(req.params.id, data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product information updated successfully!",
      data: updatedProduct,
    });
  });

   //----------------- delete Product

export const deleteProductController = catchAsync(async (req, res) => {
  const id = req.params.id;

  const product = await deleteProductService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is deleted successfully!",
    data: product,
  });
});


