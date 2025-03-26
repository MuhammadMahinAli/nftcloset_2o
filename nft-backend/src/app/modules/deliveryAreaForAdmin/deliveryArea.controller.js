import httpStatus from "http-status";
import { sendResponse } from "../../../utils/sendResponse.js";
import { catchAsync } from "../../../utils/catchAsync.js";
import { createDeliveryAreaService, findDeliveryAreasService,deleteDeliveryAreaService, getDeliveryAreasService, updateDeliveryAreaService } from "./deliveryArea.service.js";



// GET Delivery Areas (with filters & pagination)
export const getDeliveryAreasController = catchAsync(async (req, res) => {
    const { country, city, page, limit } = req.query;
  
    const result = await getDeliveryAreasService({ country, city, page, limit });
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Delivery areas retrieved successfully!",
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
      },
      data: result.data,
    });
  });

// Create a new DeliveryArea
export const createDeliveryAreaController = catchAsync(async (req, res) => {
  const deliveryAreaData = req.body;

  const newArea = await createDeliveryAreaService(deliveryAreaData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delivery area added successfully!",
    data: newArea,
  });
});

// Update an existing DeliveryArea by its ID
export const updateDeliveryAreaController = catchAsync(async (req, res) => {
  const { deliveryAreaId } = req.params; // e.g., PUT /delivery-areas/:deliveryAreaId
  const updateData = req.body;

  const updatedArea = await updateDeliveryAreaService(deliveryAreaId, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delivery area updated successfully!",
    data: updatedArea,
  });
});

// Delete a DeliveryArea by its ID
export const deleteDeliveryAreaController = catchAsync(async (req, res) => {
  const { deliveryAreaId } = req.params; // e.g., DELETE /delivery-areas/:deliveryAreaId

  const result = await deleteDeliveryAreaService(deliveryAreaId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delivery area deleted successfully!",
    data: result,
  });
});

// get area by country & city
export const findDeliveryAreasController = async (req, res) => {

    try {
      const { country, city } = req.params;
      const areas = await findDeliveryAreasService(country, city);
      res.status(200).json(areas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  