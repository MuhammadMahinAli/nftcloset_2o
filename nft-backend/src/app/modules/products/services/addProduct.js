import httpStatus from "http-status";
import { ApiError } from "../../../../handleError/apiError.js";
import { Product } from "../product.model.js";

export const addProductService = async (productInfo) => {
  try {
    productInfo.isFeatured = false;
    productInfo.isBestProduct = false;
    const result = await Product.create(productInfo);
    if (!result) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to add product."
      );
    }
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};
