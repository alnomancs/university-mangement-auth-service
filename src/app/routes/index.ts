import express from "express";
import { UserRouter } from "../module/user/user.route";
import { AcademicSemesterRouter } from "../module/academicSemister/academicSemester.router";
import { AcademicFacultyRouter } from "../module/academicFaculty/academicFaculty.router";
import { AcademicDepartmentRouter } from "../module/academicDepartment/academicDepartment.router";

const router = express.Router();

const moduleRoutes = [
  { path: "/users", route: UserRouter }, //user routes
  { path: "/academic-semester", route: AcademicSemesterRouter }, //academic semester routes
  { path: "/academic-faculty", route: AcademicFacultyRouter }, //academic faculty routes
  { path: "/academic-department", route: AcademicDepartmentRouter }, //academic faculty routes
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

// router.use("/users/", UserRouter);
// router.use("/academic-semester/", AcademicSemesterRouter);

export default router;
