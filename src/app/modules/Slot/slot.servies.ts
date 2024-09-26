import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
import { Rooms } from "../room/room.model";
import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";

const createSlotIntoDB = async (playload: TSlot) => {
  const convertToMT = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const convertToHHMM = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  };

  const { room, date, startTime, endTime } = playload;
  const rooms = await Rooms.findById(room);
  if (!rooms) {
    throw new AppError(httpStatus.NOT_FOUND, "this room is no Exist");
  }

  try {
    const slotDuration = 60;

    const startMinutes = convertToMT(startTime);
    const endMinutes = convertToMT(endTime);

    const totalDuration = endMinutes - startMinutes;

    const numberOfSlots = totalDuration / slotDuration;

    const slots = [];

    for (let i = 0; i < numberOfSlots; i++) {
      const slotStartTime = startMinutes + i * slotDuration;
      const slotEndTime = slotStartTime + slotDuration;

      const slot = new Slot({
        room,
        date,
        startTime: convertToHHMM(slotStartTime),
        endTime: convertToHHMM(slotEndTime),
        isBooked: false,
      });

      slots.push(slot);
    }

    // Save slots to the database
    const result = await Slot.insertMany(slots);

    return result;
  } catch (error) {
    return error;
  }
};

const getSlotFromDB = async (querya: any) => {
  const { roomId, date } = querya;
  const query: any = { isBooked: false };

  if (date) {
    const startDate = new Date(date as string);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);

    query.date = {
      $gte: startDate.toISOString(),
      $lt: endDate.toISOString(),
    };
  }

  if (roomId) {
    query.room = roomId;
  }

  // Find available slots
  const result = await Slot.find(query)
    .populate({
      path: "room",
      match: { isDeleted: false },
    })
    .lean();
  return result;
};
const getAllSlotFromDB = async () => {
  // Find available slots
  const result = await Slot.find()
    .populate({
      path: "room",
      match: { isDeleted: false },
    })
    .lean();
  return result;
};
const getSpecificSlotFromDB = async (id: string) => {
  // Find available slots
  const result = await Slot.findById(id)
    .populate({
      path: "room",
      match: { isDeleted: false },
    })
    .lean();
  return result;
};
const deleteSlotFromDB = async (id: string) => {
  // Find available slots
  const result = await Slot.findByIdAndDelete(id);

  return result;
};

export const SlotServices = {
  createSlotIntoDB,
  getSlotFromDB,
  getAllSlotFromDB,
  getSpecificSlotFromDB,
  deleteSlotFromDB,
};
