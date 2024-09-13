import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import jwt from "jsonwebtoken";
import config from "../../config";

const createUserIntoDB = async (playload: TUser) => {
  const result = await User.create(playload);

  return result;
};

const LoginUserFromDB = async (playload: {
  email: string;
  password: string;
}) => {
  const { email, password } = playload;
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "this user not found");
  }

  if (!(await User.isPasswordMatched(playload?.password, user?.password))) {
    throw new AppError(httpStatus.NOT_FOUND, "this user not found");
  }
  const jwtPlayload = {
    user: user._id,
    email: user.email,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPlayload, config.jwt_secret as string, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign(
    jwtPlayload,
    config.JWT_REFRSH_SECRET as string,
    {
      expiresIn: "30d",
    }
  );

  const { _id, name, phone, role, address } = user;
  return {
    accessToken,
    refreshToken,
    _id,
    name,
    email,
    phone,
    role,
    address,
  };
};
export const userServices = {
  createUserIntoDB,
  LoginUserFromDB,
};
