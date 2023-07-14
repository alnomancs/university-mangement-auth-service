import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(UserValidation.createStudentZodSchema),
  UserController.createStudent
);

router.post(
  "/create-faculty",
  validateRequest(UserValidation.createFacultyZodSchema),
  UserController.createFaculty
);

export const UserRouter = router;
