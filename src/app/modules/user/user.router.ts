import express from "express";
import validateRequest from "../../middleware/validationRequest";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";

const router = express.Router();

router.post(
  "/auth/signup",
  validateRequest(userValidation.userValidationSchema),
  userController.createUser
);
router.post("/auth/login", userController.loginUser);
export const userRoute = router;
