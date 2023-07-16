"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../module/user/user.route");
const academicSemester_router_1 = require("../module/academicSemister/academicSemester.router");
const academicFaculty_router_1 = require("../module/academicFaculty/academicFaculty.router");
const academicDepartment_router_1 = require("../module/academicDepartment/academicDepartment.router");
const student_route_1 = require("../module/student/student.route");
const faculty_route_1 = require("../module/faculty/faculty.route");
const admin_router_1 = require("../module/admin/admin.router");
const managementDepartment_router_1 = require("../module/management-department/managementDepartment.router");
const router = express_1.default.Router();
const moduleRoutes = [
  { path: "/users", route: user_route_1.UserRouter },
  { path: "/student", route: student_route_1.StudentRouter },
  { path: "/faculty", route: faculty_route_1.FacultyRouter },
  { path: "/admin", route: admin_router_1.AdminRouter },
  {
    path: "/academic-semester",
    route: academicSemester_router_1.AcademicSemesterRouter,
  },
  {
    path: "/academic-faculty",
    route: academicFaculty_router_1.AcademicFacultyRouter,
  },
  {
    path: "/academic-department",
    route: academicDepartment_router_1.AcademicDepartmentRouter,
  },
  {
    path: "/management-departments",
    route: managementDepartment_router_1.ManagementDepartmentRouter,
  }, //academic faculty routes
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
// router.use("/users/", UserRouter);
// router.use("/academic-semester/", AcademicSemesterRouter);
exports.default = router;
