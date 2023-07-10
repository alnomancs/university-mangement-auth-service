import express from "express";
import { AcademicSemesterValidation } from "./academicSemeter.validation";
import validateRequest from "../../middleware/validateRequest";
import { AcademicSemesterController } from "./academicSemester.controller";

const router = express.Router();

router.post(
  "/create-semester",
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);
router.get("/:id", AcademicSemesterController.getSemester);
router.get("/", AcademicSemesterController.getSemesters);

router.patch(
  "/:id",
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
);

router.delete("/:id", AcademicSemesterController.deleteSemester);

export const AcademicSemesterRouter = router;
