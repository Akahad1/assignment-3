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

export const SlotServices = {
  createSlotIntoDB,
};
