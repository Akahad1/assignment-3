import { TRoom } from "./room.interface";
import { Rooms } from "./room.model";

const createRoomsIntoDB = async (playload: TRoom) => {
  const result = await Rooms.create(playload);
  return result;
};
const getRoomInToDB = async (query: any) => {
  const { Search, capacity, minPrice, maxPrice, sort } = query;

  const filter: any = {};

  // Search by room name or keyword
  if (Search) {
    filter.$or = [
      { name: { $regex: Search, $options: "i" } },
      { keywords: { $regex: Search, $options: "i" } },
    ];
  }

  // Filter by capacity
  if (capacity) {
    filter.capacity = { $gte: Number(capacity) };
  }

  // Filter by price range
  if (minPrice || maxPrice) {
    filter.pricePerSlot = {
      ...(minPrice && { $gte: Number(minPrice) }),
      ...(maxPrice && { $lte: Number(maxPrice) }),
    };
  }

  // Sorting
  const sortOption: any = {};
  if (sort === "asc") {
    sortOption.pricePerSlot = 1;
  } else if (sort === "desc") {
    sortOption.pricePerSlot = -1;
  }
  const result = await Rooms.find(filter).sort(sortOption);
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
  const result = await Rooms.findByIdAndDelete(
    id,

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
