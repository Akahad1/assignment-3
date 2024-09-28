import express from "express";
import { slotController } from "./slot.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constan";
const router = express.Router();

router.post("/slots", auth(USER_ROLE.admin), slotController.createSlot);
router.get("/slots/availability", slotController.getSlot);
router.get("/slots", slotController.getAllSlot);
router.get("/slots/:id", slotController.getSpecificSlot);
router.delete("/slots/:id", slotController.deleteSpecificSlot);
router.put("/slots/:id", slotController.updateSpecificSlot);

export const slotRouter = router;
