import express from "express";
import { StudentController } from "./student.controller";
import validateRequest from "../../middleware/validateRequest";
import { StudentValidation } from "./student.validation";

const router = express.Router();

router.get("/:id", StudentController.getStudent);
router.get("/", StudentController.getStudents);
router.patch(
  "/:id",
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent
);
router.delete("/id", StudentController.deleteStudent);

export const StudentRouter = router;
