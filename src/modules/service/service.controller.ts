import httpStatus from "http-status";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import { serviceService } from "./service.service";

const createService = catchAsync(async (req, res) => {
  const serviceData = req.body;

  const response = await serviceService.createService(serviceData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Service created successfully",
    data: response,
  });
});

const getAllServices = catchAsync(async (req, res) => {
  const response = await serviceService.getAllServices();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Services retrieved successfully",
    data: response,
  });
});

const getServiceById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const response = await serviceService.getServiceById(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Service retrieved successfully",
    data: response,
  });
});

const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new Error("Service ID is required");

  const serviceData = req.body;

  const response = await serviceService.updateService(
    id as string,
    serviceData,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Service updated successfully",
    data: response,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new Error("Service ID is required");

  const response = await serviceService.deleteService(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Service deleted successfully",
    data: response,
  });
});

export const serviceController = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
