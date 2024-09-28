import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "./user.services";
import config from "../../config";

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
  const { accessToken, refreshToken, _id, name, email, phone, role, address } =
    result;
  // res.cookie("refreshToken", refreshToken, {
  //   secure: config.node_env === "production",
  //   httpOnly: true,
  // });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    token: accessToken,
    data: {
      _id,
      name,
      email,
      phone,
      role,
      address,
    },
  });
});
const getSpacaficUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.getSpacaficUserFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rooms retrieved successfully",
    data: result,
  });
});
export const userController = {
  createUser,
  loginUser,
  getSpacaficUser,
};
