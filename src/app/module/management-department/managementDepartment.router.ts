import express from "express";
import { ManagementDepartmentController } from "./managementDepartment.controller";
import validateRequest from "../../middleware/validateRequest";
import { ManagementDepartmentValidation } from "./managementDepartment.validation";

const router = express.Router();

router.post(
  "/create-management",
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createManagementDepartment
);
router.get("/:id", ManagementDepartmentController.getManagementDepartment);
router.get("/", ManagementDepartmentController.getManagementDepartments);

router.patch(
  "/:id",
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateManagementDepartment
);

router.delete(
  "/:id",
  ManagementDepartmentController.deleteManagementDepartment
);

export const ManagementDepartmentRouter = router;
