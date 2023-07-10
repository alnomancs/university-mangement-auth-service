import express from "express";
import { AcademicFacultyController } from "./academicFaculty.controller";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.post(
  "/create-faculty",
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createFaculty
);

router.get("/:id", AcademicFacultyController.getFaculty);

router.get("/", AcademicFacultyController.getFaculties);

router.patch(
  "/:id",
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  AcademicFacultyController.updateFaculty
);

router.delete("/:id", AcademicFacultyController.deleteFaculty);

export const AcademicFacultyRouter = router;
