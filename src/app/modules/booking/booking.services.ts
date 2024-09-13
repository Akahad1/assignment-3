import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
import { Rooms } from "../room/room.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { User } from "../user/user.model";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import config from "../../config";

const createBookingIntoDB = async (playload: TBooking) => {
  const { room, slots, user, date, isDeleted } = playload;
  const specificRoom = await Rooms.findById(room);
  const authecticUser = await User.findById(user);
  if (!authecticUser) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not exists");
  }
  if (!specificRoom) {
    throw new AppError(httpStatus.NOT_FOUND, "This room is no exists");
  }

  const { pricePerSlot } = specificRoom;
  const totalAmount = pricePerSlot * slots.length;

  const bookings = {
    room: room,
    slots: slots,
    user: user,
    date: date,
    totalAmount: totalAmount,
    isConfirmed: "unconfirmed",
    isDeleted: isDeleted,
  };

  // const totalAmount

  const result = await Booking.create(bookings);
  return result;
};
const getAllBookingFromDB = async () => {
  const result = await Booking.find()
    .populate("user")
    .populate("room")
    .populate(["slots"]);
  return result;
};
const updateSpcificBookingFromDB = async (
  id: string,
  playload: { isConfirmed: string }
) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isConfirmed: playload },
    {
      new: true,
    }
  );
  return result;
};
const deleteSpcificBookingFromDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};
const getAllMYBookingFromDB = async (token: string) => {
  const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;

  const { role, user } = decoded;
  console.log(role, user);
  const result = await Booking.find({ user })
    .populate("user")
    .populate("room")
    .populate(["slots"]);
  return result;
};
export const bookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  updateSpcificBookingFromDB,
  deleteSpcificBookingFromDB,
  getAllMYBookingFromDB,
};
