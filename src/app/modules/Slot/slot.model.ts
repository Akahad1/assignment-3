import { model, Schema } from "mongoose";
import { TSlot } from "./slot.interface";
import { string } from "zod";

const slotSchema = new Schema<TSlot>({
  room: {
    type: Schema.Types.ObjectId,
    required: [true, "Room id is required"],
    ref: "Rooms",
  },
  date: {
    type: Date,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

export const Slot = model<TSlot>("Slot", slotSchema);
