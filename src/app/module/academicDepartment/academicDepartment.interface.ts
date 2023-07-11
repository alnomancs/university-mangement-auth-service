import { Model, Types } from "mongoose";
import { IAcademicFaculty } from "../academicFaculty/academicFaculty.interface";

export type IAcademicDepartmentFilter = {
  searchTerm?: string;
};

export type IAcademicDepartment = {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};

export type AcamedicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>;
