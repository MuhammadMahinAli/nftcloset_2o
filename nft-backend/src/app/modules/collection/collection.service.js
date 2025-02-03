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
    .populate("products.product")
    .sort({ createdAt: -1 });
  return collections;
};

//---------- update collection
export const updateCollectionInfoService = async (id, data) => {
  //console.log(id,data);
  try {
    const collection = await Collection.findById(id);
    if (!collection) {
      throw new ApiError(httpStatus.NOT_FOUND, "Collection not found");
    }

    const updatedData = {
      collectionName: data.collectionName,
      collectionDescription: data.collectionDescription,
      publishType: data.publishType,
      publishDate: data.publishDate,
      fromDate: data.fromDate,
      toDate: data.toDate,
      displayImage: data.displayImage,
      discount: data.discount,
      products: data.products,
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

//----------------- delete collection

export const deleteCollectionService = async (id) => {
  const result = await Collection.findByIdAndDelete({ _id: id });
  return result;
};