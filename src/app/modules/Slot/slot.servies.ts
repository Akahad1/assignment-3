import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";

const createSlotIntoDB = async (playload: TSlot) => {
  const convertToMT = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Helper function to convert minutes to HH:MM
  const convertToHHMM = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  };

  const { room, date, startTime, endTime } = playload;

  try {
    const slotDuration = 60; // Slot duration in minutes

    // Convert startTime and endTime to minutes
    const startMinutes = convertToMT(startTime);
    const endMinutes = convertToMT(endTime);

    // Calculate total duration
    const totalDuration = endMinutes - startMinutes;

    // Calculate number of slots
    const numberOfSlots = totalDuration / slotDuration;

    const slots = [];

    // Generate slots
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
