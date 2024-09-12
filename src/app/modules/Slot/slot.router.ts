import express from "express";
import { slotController } from "./slot.controller";
const router = express.Router();

router.post("/slots", slotController.createSlot);

export const slotRouter = router;
