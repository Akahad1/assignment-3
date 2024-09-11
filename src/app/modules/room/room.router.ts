import express from "express";
import validateRequest from "../../middleware/validationRequest";
import { roomValidation } from "./room.validation";
import { roomController } from "./room.controller";

const router = express.Router();

router.post(
  "/rooms",
  validateRequest(roomValidation.roomSchemaZod),
  roomController.createRooms
);

router.get("/rooms", roomController.getRooms);
router.get("/rooms/:id", roomController.getSpecificRooms);
router.put("/rooms/:id", roomController.upadateSpecificRooms);
router.delete("/rooms/:id", roomController.deleteSpecificRooms);

export const roomRouter = router;
