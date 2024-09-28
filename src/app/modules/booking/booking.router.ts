import express from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constan";

const route = express.Router();

route.post("/bookings", auth(USER_ROLE.user), bookingController.createBooking);
route.get("/bookings", auth(USER_ROLE.admin), bookingController.getAllBooking);

route.get(
  "/my-bookings",
  auth(USER_ROLE.user),
  bookingController.getMyAllBooking
);
route.put(
  "/bookings/:id",
  auth(USER_ROLE.admin),
  bookingController.updateSpcificBooking
);
route.delete(
  "/bookings/:id",
  auth(USER_ROLE.admin),
  bookingController.deleteSpcificBooking
);

export const bookingRoute = route;
