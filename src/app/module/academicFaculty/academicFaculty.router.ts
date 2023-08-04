import express from "express";
import { AcademicFacultyController } from "./academicFaculty.controller";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../../enums/user";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/create-faculty",
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  AcademicFacultyController.createFaculty
);

router.get(
  "/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.FACULTY, USER_ROLE.STUDENT),
  AcademicFacultyController.getFaculty
);

router.get(
  "/",
  auth(
    USER_ROLE.ADMIN,
    USER_ROLE.SUPER_ADMIN,
    USER_ROLE.FACULTY,
    USER_ROLE.STUDENT
  ),
  AcademicFacultyController.getFaculties
);

router.patch(
  "/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.FACULTY),
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  AcademicFacultyController.updateFaculty
);

router.delete(
  "/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  AcademicFacultyController.deleteFaculty
);

export const AcademicFacultyRouter = router;
