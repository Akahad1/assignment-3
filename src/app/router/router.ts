import { Router } from "express";
import { userRoute } from "../modules/user/user.router";
import { roomRouter } from "../modules/room/room.router";

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
];

moduleRoute.forEach((route) => router.use(route.path, route.route));
export default router;
