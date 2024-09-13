import express from "express";
import validateRequest from "../../middleware/validationRequest";
import { roomValidation } from "./room.validation";
import { roomController } from "./room.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constan";

const router = express.Router();

router.post(
  "/rooms",
  validateRequest(roomValidation.roomSchemaZod),
  auth(USER_ROLE.admin),
  roomController.createRooms
);

router.get(
  "/rooms",

  roomController.getRooms
);
router.get(
  "/rooms/:id",

  roomController.getSpecificRooms
);
router.put(
  "/rooms/:id",
  auth(USER_ROLE.admin),
  roomController.upadateSpecificRooms
);
router.delete(
  "/rooms/:id",
  auth(USER_ROLE.admin),
  roomController.deleteSpecificRooms
);

export const roomRouter = router;
