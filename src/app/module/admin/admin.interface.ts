import { Model, Types } from "mongoose";
import { IManagementDepartment } from "../management-department/managementDepartment.interface";

export type IAdminFilter = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emargencyContactNo?: string;
};

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type IAdmin = {
  id: string;
  name: UserName; //embedded object
  gender: "male" | "female";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  designation: string;
  managementDepartment: Types.ObjectId | IManagementDepartment; // reference _id
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;
