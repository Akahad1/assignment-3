import { Router } from "express";
import { userRoute } from "../modules/user/user.router";
import { roomRouter } from "../modules/room/room.router";
import { slotRouter } from "../modules/Slot/slot.router";
import { bookingRoute } from "../modules/booking/booking.router";

const router = Router();

const moduleRoute = [
  {
    path: "/",
    route: userRoute,
  },
  {
    path: "/",
    route: roomRouter,
  },
  {
    path: "/",
    route: slotRouter,
  },
  {
    path: "/",
    route: bookingRoute,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));
export default router;
