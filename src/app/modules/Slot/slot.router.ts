import express from "express";
import { slotController } from "./slot.controller";
const router = express.Router();

router.post("/slots", slotController.createSlot);
router.get("/slots/availability", slotController.getSlot);

export const slotRouter = router;
