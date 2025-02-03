//--------------- update product info

import httpStatus from "http-status";
import { Product } from "../product.model.js";
import { ApiError } from "../../../../handleError/apiError.js";

export const updateProductInfoService = async (id, data) => {
  //console.log(id,data);
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    }

    const updatedData = {
        productName: data.productName,
        productDescription: data.productDescription,
        displayImage: data.displayImage,
        colors: data.colors,
        price: data.price,
        stock: data.stock,
        buyingLink: data.buyingLink,
        extraVideos: data.extraVideos,
        extraImages: data.extraImages,
        digitalAssets: data.digitalAssets,
        tokenDetails: data.tokenDetails,
        sizeChart: data.sizeChart,
        sizeWithMaterial: data.sizeWithMaterial,
   
    };

  


    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedProduct) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Failed to update user information"
      );
    }

    return updatedProduct;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};