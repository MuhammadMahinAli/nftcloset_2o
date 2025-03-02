import httpStatus from "http-status";
import { ApiError } from "../../../handleError/apiError.js";
import { HomePageControl } from "./homePageControl.model.js";

export const addHomePageControlService = async (homePageControlInfo) => {
  try {
    homePageControlInfo.isPromoted = false;
    const result = await HomePageControl.create(homePageControlInfo);
    if (!result) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to add home Page Control."
      );
    }
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};



//----- get all HomePageControl
export const getAllHomePageControlService = async () => {
  const homePageControl = await HomePageControl.findOne({})
    .populate("BannerCollection.collection", "collectionName displayImage")
    .populate("newArrivalProducts.product", "productName displayImage price buyingLink")
    .populate("bestProducts.product", "productName displayImage price buyingLink")
    .sort({ createdAt: -1 });
  return homePageControl;
};

//---------- update HomePageControl



// updateHomePageControlInfoService function
export const updateHomePageControlInfoService = async (id, data) => {
  try {
    const homePageControl = await HomePageControl.findById(id);
    if (!homePageControl) {
      throw new ApiError(httpStatus.NOT_FOUND, "homePageControl not found");
    }

    // Format products array to match the schema
    const formattedCollection = data.BannerCollection.map(pt => ({
      collection: pt.collection._id // Just the ObjectId reference
    }));

    // Format products array to match the schema
    const formattedBestProducts = data.bestProducts.map(pt => ({
      product: pt.product._id // Just the ObjectId reference
    }));
    // Format products array to match the schema
    const formattedNewProducts = data.newArrivalProducts.map(pt => ({
      product: pt.product._id // Just the ObjectId reference
    }));

    const updatedData = {
      BannerCollection: formattedCollection,
      newArrivalProducts: formattedNewProducts,
      bestProducts: formattedBestProducts,
      fofLabLink: data.fofLabLink,
    };

    const updatedHomePage = await HomePageControl.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedHomePage) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Failed to update HomePage information"
      );
    }

    return updatedHomePage;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};


