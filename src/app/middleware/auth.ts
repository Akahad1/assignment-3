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

    if (!token) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "You have no access to this route",
      });
    }
    // invalid token
    const decoded = jwt.verify(
      token,
      config.jwt_secret as string
    ) as JwtPayload;

    const { role, email, iat } = decoded;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "You have no access to this route",
      });
    }

    // role
    if (requiredRole && !requiredRole.includes(role)) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "You have no access to this route",
      });
    }
    req.user = decoded;
    next();
  });
};

export default auth;
