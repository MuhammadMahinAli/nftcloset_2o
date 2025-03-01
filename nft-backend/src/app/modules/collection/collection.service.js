import httpStatus from "http-status";
import { ApiError } from "../../../handleError/apiError.js";
import { Collection } from "./collection.model.js";

export const addCollectionService = async (collectionInfo) => {
  try {
    collectionInfo.isPromoted = false;
    const result = await Collection.create(collectionInfo);
    if (!result) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to add collection."
      );
    }
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};



//----- get all collection
export const getAllCollectionService = async () => {
  const collections = await Collection.find({})
    .populate("products.productId", "productName displayImage price buyingLink")
    .sort({ createdAt: -1 });
  return collections;
};

//---------- update collection



// updateCollectionInfoService function
export const updateCollectionInfoService = async (id, data) => {
  try {
    const collection = await Collection.findById(id);
    if (!collection) {
      throw new ApiError(httpStatus.NOT_FOUND, "Collection not found");
    }

    // Format products array to match the schema
    const formattedProducts = data.products.map(product => ({
      productId: product.productId._id // Just the ObjectId reference
    }));

    const updatedData = {
      collectionName: data.collectionName,
      collectionDescription: data.collectionDescription,
      publishType: data.publishType,
      publishDate: data.publishDate,
      fromDate: data.fromDate,
      toDate: data.toDate,
      displayImage: data.displayImage,
      discount: data.discount,
      products: formattedProducts,
      storyLink: data.storyLink,
    };

    const updatedCollection = await Collection.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedCollection) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Failed to update collection information"
      );
    }

    return updatedCollection;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

//-------------- get by id
export const getCollectionByIdService = async (id) => {
  const collectionById = await Collection.findOne({ _id: id })
  .populate("products.productId", "productName displayImage price buyingLink")
  .sort({ createdAt: -1 });
  return collectionById;
};

//----------------- delete collection

export const deleteCollectionService = async (id) => {
  const result = await Collection.findByIdAndDelete({ _id: id });
  return result;
};