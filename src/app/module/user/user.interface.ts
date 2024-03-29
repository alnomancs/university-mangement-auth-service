/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { IStudent } from "../student/student.interface";
import { IFaculty } from "../faculty/faculty.interface";
import { IAdmin } from "../admin/admin.interface";

// 1. Create an interface representing a document in MongoDB.
export type IUser = {
  id: string;
  role: string;
  password: string;
  needPasswordChange: true | false;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, "id" | "password" | "role" | "needPasswordChange">>;
  isPasswordExist(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

//instances methods
// export type IUserMethods = {
//   isUserExist(id: string): Promise<Partial<IUser> | null>;
//   isPasswordExist(
//     givenPassword: string,
//     savedPassword: string
//   ): Promise<boolean>;
// };
// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
