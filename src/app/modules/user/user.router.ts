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

export const userRoute = router;
