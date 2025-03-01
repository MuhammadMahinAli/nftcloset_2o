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
  const homePageControl = await HomePageControl.find({})
    .populate("products.productId", "productName displayImage price buyingLink")
    .sort({ createdAt: -1 });
  return homePageControl;
};

//---------- update HomePageControl



// updateHomePageControlInfoService function
// export const updateHomePageControlInfoService = async (id, data) => {
//   try {
//     const collection = await HomePageControl.findById(id);
//     if (!collection) {
//       throw new ApiError(httpStatus.NOT_FOUND, "Collection not found");
//     }

//     // Format products array to match the schema
//     const formattedProducts = data.products.map(product => ({
//       productId: product.productId._id // Just the ObjectId reference
//     }));

//     const updatedData = {
//       collectionName: data.collectionName,
//       collectionDescription: data.collectionDescription,
//       publishType: data.publishType,
//       publishDate: data.publishDate,
//       fromDate: data.fromDate,
//       toDate: data.toDate,
//       displayImage: data.displayImage,
//       discount: data.discount,
//       products: formattedProducts,
//       storyLink: data.storyLink,
//     };

//     const updatedCollection = await Collection.findByIdAndUpdate(
//       id,
//       { $set: updatedData },
//       { new: true }
//     );

//     if (!updatedCollection) {
//       throw new ApiError(
//         httpStatus.BAD_REQUEST,
//         "Failed to update collection information"
//       );
//     }

//     return updatedCollection;
//   } catch (error) {
//     throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
//   }
// };


