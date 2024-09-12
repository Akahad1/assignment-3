import { TRoom } from "./room.interface";
import { Rooms } from "./room.model";

const createRoomsIntoDB = async (playload: TRoom) => {
  const result = await Rooms.create(playload);
  return result;
};
const getRoomInToDB = async () => {
  const result = await Rooms.find();
  return result;
};
const getSpecificRoomInToDB = async (id: string) => {
  const result = await Rooms.findById(id);
  return result;
};
const upadateSpecificRoomInToDB = async (id: string, playload: TRoom) => {
  const result = await Rooms.findByIdAndUpdate(id, playload, {
    new: true,
  });
  return result;
};
const deleteSpecificRoomsInToDB = async (id: string) => {
  const result = await Rooms.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  console.log(result);
  return result;
};
export const roomServices = {
  createRoomsIntoDB,
  getRoomInToDB,
  getSpecificRoomInToDB,
  upadateSpecificRoomInToDB,
  deleteSpecificRoomsInToDB,
};
