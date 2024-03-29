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
router.post(
  "/create-admin",
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin
);

export const UserRouter = router;
