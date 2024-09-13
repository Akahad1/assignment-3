import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import { User } from "../modules/user/user.model";

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;
    const token = (bearerToken as string).split(" ")[1];
    console.log("token", token);
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Your are Unauthorize!");
    }
    // invalid token
    const decoded = jwt.verify(
      token,
      config.jwt_secret as string
    ) as JwtPayload;

    const { role, email, iat } = decoded;
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "this user not found");
    }

    // role
    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Your are Unauthorize!");
    }
    req.user = decoded;
    next();
  });
};

export default auth;
