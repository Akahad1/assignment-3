import express from "express";
import { slotController } from "./slot.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constan";
const router = express.Router();

router.post("/slots", auth(USER_ROLE.admin), slotController.createSlot);
router.get("/slots/availability", slotController.getSlot);

export const slotRouter = router;
