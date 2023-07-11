import { Model } from "mongoose";

export type IAcademicFacultyFilter = {
  searchTerm?: string;
};

export type IAcademicFaculty = {
  title: string;
};

export type AcamedicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>;
