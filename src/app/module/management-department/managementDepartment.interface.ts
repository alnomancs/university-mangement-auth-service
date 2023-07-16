import { Model } from "mongoose";

export type IManagementDepartmentFilter = {
  searchTerm?: string;
};

export type IManagementDepartment = {
  title: string;
};

export type ManagementDepartmentModel = Model<
  IManagementDepartment,
  Record<string, unknown>
>;
