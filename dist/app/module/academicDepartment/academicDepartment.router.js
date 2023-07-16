"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRouter = void 0;
const express_1 = __importDefault(require("express"));
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const router = express_1.default.Router();
router.post("/create-department", (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.createAcademicDepartmentZodSchema), academicDepartment_controller_1.AcademicDepartmentController.createDepartment);
router.get("/:id", academicDepartment_controller_1.AcademicDepartmentController.getDepartment);
router.get("/", academicDepartment_controller_1.AcademicDepartmentController.getDepartments);
router.patch("/:id", (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.updateAcademicDepartmentZodSchema), academicDepartment_controller_1.AcademicDepartmentController.updateDepartment);
router.delete("/:id", academicDepartment_controller_1.AcademicDepartmentController.deleteDepartment);
exports.AcademicDepartmentRouter = router;
