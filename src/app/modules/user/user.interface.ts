import { Model } from "mongoose";
import { USER_ROLE } from "./user.constan";

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  address: string;
}
export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
export type TUserRole = keyof typeof USER_ROLE;
