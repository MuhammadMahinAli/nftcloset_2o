import httpStatus from "http-status";
import {DeliveryArea} from "./deliveryArea.model.js";
import { ApiError } from "../../../handleError/apiError.js";



export const getDeliveryAreasService = async (queryObject) => {
  const { country, city, page = 1, limit = 4} = queryObject;

  const filter = {};
  if (country) {

    filter.country = country;
  }
  if (city) {
    filter.city = city;
  }

  // Convert page & limit to numbers
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 4;

  // Calculate how many documents to skip
  const skip = (pageNum - 1) * limitNum;

  // Get total number of matching docs
  const total = await DeliveryArea.countDocuments(filter);

  // Get the actual data
  const data = await DeliveryArea.find(filter)
    .skip(skip)
    .limit(limitNum).sort({ createdAt: -1 });;

  // Return structured result
  return {
    data,
    total,
    page: pageNum,
    limit: limitNum,
  };
};


export const updateDeliveryAreaService = async (deliveryAreaId, data) => {
  try {
    const updatedDeliveryArea = await DeliveryArea.findByIdAndUpdate(
      deliveryAreaId,
      { ...data },
      { new: true }
    );

    if (!updatedDeliveryArea) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to update delivery area");
    }

    return updatedDeliveryArea;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};


export const createDeliveryAreaService = async (data) => {
  try {
    const newArea = new DeliveryArea({ ...data });
    const savedArea = await newArea.save();

    if (!savedArea) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create delivery area");
    }

    return savedArea;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};


export const deleteDeliveryAreaService = async (deliveryAreaId) => {
  try {
    const deletedArea = await DeliveryArea.findByIdAndDelete(deliveryAreaId);

    if (!deletedArea) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to delete delivery area");
    }

    return deletedArea;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

// get area by country & city// 🔍 Get delivery areas by country & city (case-insensitive)
export const findDeliveryAreasService = async (country, city) => {
  const filter = {};

  if (country?.trim()) {
    filter.country = { $regex: new RegExp(`^${country.trim()}$`, "i") };
  }

  if (city?.trim()) {
    filter.city = { $regex: new RegExp(`^${city.trim()}$`, "i") };
  }

  return await DeliveryArea.find(filter);
};