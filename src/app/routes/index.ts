import express from "express";
import { UserRouter } from "../module/user/user.route";
import { AcademicSemesterRouter } from "../module/academicSemister/academicSemester.router";
import { AcademicFacultyRouter } from "../module/academicFaculty/academicFaculty.router";
import { AcademicDepartmentRouter } from "../module/academicDepartment/academicDepartment.router";
import { StudentRouter } from "../module/student/student.route";
import { FacultyRouter } from "../module/faculty/faculty.route";
import { AdminRouter } from "../module/admin/admin.router";
import { ManagementDepartmentRouter } from "../module/management-department/managementDepartment.router";
import { AuthRouter } from "../module/auth/auth.route";

const router = express.Router();

const moduleRoutes = [
  { path: "/auth", route: AuthRouter }, //user routes
  { path: "/users", route: UserRouter }, //user routes
  { path: "/student", route: StudentRouter }, //student routes
  { path: "/faculty", route: FacultyRouter }, //faculty routes
  { path: "/admin", route: AdminRouter }, //faculty routes
  { path: "/academic-semester", route: AcademicSemesterRouter }, //academic semester routes
  { path: "/academic-faculty", route: AcademicFacultyRouter }, //academic faculty routes
  { path: "/academic-department", route: AcademicDepartmentRouter }, //academic faculty routes
  { path: "/management-departments", route: ManagementDepartmentRouter }, //academic faculty routes
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

// router.use("/users/", UserRouter);
// router.use("/academic-semester/", AcademicSemesterRouter);

export default router;
