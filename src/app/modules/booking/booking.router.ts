import express from "express";
import { bookingController } from "./booking.controller";

const route = express.Router();

route.post("/bookings", bookingController.createBooking);
route.get("/bookings", bookingController.getAllBooking);
route.put("/bookings/:id", bookingController.updateSpcificBooking);
route.delete("/bookings/:id", bookingController.deleteSpcificBooking);

export const bookingRoute = route;
