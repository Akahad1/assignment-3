import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "./user.services";

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await userServices.createUserIntoDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
const loginUser = catchAsync(async (req, res) => {
  const result = await userServices.LoginUserFromDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});
export const userController = {
  createUser,
  loginUser,
};
