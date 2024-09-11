import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { roomServices } from "./room.services";

const createRooms = catchAsync(async (req, res) => {
  const result = await roomServices.createRoomsIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room added successfully",
    data: result,
  });
});
const getRooms = catchAsync(async (req, res) => {
  const result = await roomServices.getRoomInToDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rooms retrieved successfully",
    data: result,
  });
});
const getSpecificRooms = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await roomServices.getSpecificRoomInToDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rooms retrieved successfully",
    data: result,
  });
});
const upadateSpecificRooms = catchAsync(async (req, res) => {
  const { id } = req.params;
  const playload = req.body;
  const result = await roomServices.upadateSpecificRoomInToDB(id, playload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room updated successfully",
    data: result,
  });
});
const deleteSpecificRooms = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await roomServices.deleteSpecificRoomsInToDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room deleted successfully",
    data: result,
  });
});
export const roomController = {
  createRooms,
  getRooms,
  getSpecificRooms,
  upadateSpecificRooms,
  deleteSpecificRooms,
};
