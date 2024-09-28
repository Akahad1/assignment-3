import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { SlotServices } from "./slot.servies";

const createSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.createSlotIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots created successfully",
    data: result,
  });
});

const getSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.getSlotFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots retrieved successfully",
    data: result,
  });
});
const getAllSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.getAllSlotFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get Allslots retrieved successfully",
    data: result,
  });
});
const getSpecificSlot = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await SlotServices.getSpecificSlotFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get Allslots retrieved successfully",
    data: result,
  });
});
const deleteSpecificSlot = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await SlotServices.deleteSlotFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot Delete successfully",
    data: result,
  });
});
const updateSpecificSlot = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const playload = {
    id,
    body,
  };
  const result = await SlotServices.updateSpecificSlotIntoDB(playload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots Update successfully",
    data: result,
  });
});

export const slotController = {
  createSlot,
  getSlot,
  getAllSlot,
  getSpecificSlot,
  deleteSpecificSlot,
  updateSpecificSlot,
};
