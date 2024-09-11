import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (playload: TUser) => {
  const result = await User.create(playload);
  return result;
};

export const userServices = {
  createUserIntoDB,
};
