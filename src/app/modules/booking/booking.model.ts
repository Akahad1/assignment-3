import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchama = new Schema<TBooking>({
  room: {
    type: Schema.Types.ObjectId,
    required: [true, "Room id is required"],
    ref: "Rooms",
  },
  slots: [
    {
      type: Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "user is Required"],
    ref: "User",
  },
  date: {
    type: Date,
  },
  totalAmount: {
    type: Number,
  },
  isConfirmed: {
    type: String,
    enum: ["confirmed", "unconfirmed", "canceled"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Booking = model<TBooking>("Booking", bookingSchama);
