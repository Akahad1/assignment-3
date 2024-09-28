import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
import { Rooms } from "../room/room.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { User } from "../user/user.model";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import config from "../../config";
import { Slot } from "../Slot/slot.model";

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
  const [firstSlotId, secondSlotId] = slots;
  const firstSlot = await Slot.findById(firstSlotId);

  const firstSlotDate = firstSlot?.date.toISOString().split("T")[0] as
    | string
    | Date;

  console.log(firstSlotDate);
  if (firstSlotDate !== date) {
    throw new AppError(httpStatus.NOT_FOUND, "This date slot is not available");
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
  const updatedSlot = await Slot.findByIdAndUpdate(firstSlotId, {
    isBooked: true,
  });
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
  const result = await Booking.findByIdAndDelete(id, {
    new: true,
  });
  return result;
};
const getSpecificAllBookingFromDB = async (id: string) => {
  const result = await Booking.findById(id);
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
  getSpecificAllBookingFromDB,
};
