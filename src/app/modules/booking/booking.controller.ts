import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { bookingServices } from "./booking.services";

const createBooking = catchAsync(async (req, res) => {
  const result = await bookingServices.createBookingIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});
const getAllBooking = catchAsync(async (req, res) => {
  const result = await bookingServices.getAllBookingFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings retrieved successfully",
    data: result,
  });
});

const updateSpcificBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { isConfirmed } = req.body;
  const result = await bookingServices.updateSpcificBookingFromDB(
    id,
    isConfirmed
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking updated successfully",
    data: result,
  });
});
const deleteSpcificBooking = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await bookingServices.deleteSpcificBookingFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking deleted  successfully",
    data: result,
  });
});
const getSpecificAllBooking = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await bookingServices.getSpecificAllBookingFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get Booking   successfully",
    data: result,
  });
});

const getMyAllBooking = catchAsync(async (req, res) => {
  const bearerToken = req.headers.authorization;
  const token = (bearerToken as string).split(" ")[1];
  const result = await bookingServices.getAllMYBookingFromDB(token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User bookings retrieved successfully",
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getAllBooking,
  updateSpcificBooking,
  deleteSpcificBooking,
  getMyAllBooking,
  getSpecificAllBooking,
};
