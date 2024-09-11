import { Router } from "express";
import { userRoute } from "../modules/user/user.router";

const router = Router();

const moduleRoute = [
  {
    path: "/",
    route: userRoute,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));
export default router;
