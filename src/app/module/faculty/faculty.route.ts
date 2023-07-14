import express from "express";
import { FacultyController } from "./faculty.controller";
import validateRequest from "../../middleware/validateRequest";
import { FacultyValidation } from "./faculty.validation";

const router = express.Router();

router.get("/:id", FacultyController.getFaculty);
router.patch(
  "/:id",
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);
// router.delete("/id", FacultyController.deleteFaculty);
router.get("/", FacultyController.getFaculties);

export const FacultyRouter = router;
