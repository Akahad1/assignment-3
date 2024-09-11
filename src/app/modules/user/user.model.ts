import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
  },
  address: {
    type: String,
    required: true,
  },
});
userSchema.post("save", function (doc, next) {
  // console.log(this, " post hook : we  saved our data");
  doc.password = "";
  next();
});
export const User = model<TUser>("User", userSchema);
