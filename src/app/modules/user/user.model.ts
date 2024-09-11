import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser, UserModel>({
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

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(this.password, Number(12));
  next();
});
userSchema.post("save", function (doc, next) {
  // console.log(this, " post hook : we  saved our data");
  doc.password = "";
  next();
});
userSchema.statics.isPasswordMatched = async function (
  plineTextPassword,
  hashPassword
) {
  return await bcrypt.compare(plineTextPassword, hashPassword);
};
export const User = model<TUser, UserModel>("User", userSchema);
