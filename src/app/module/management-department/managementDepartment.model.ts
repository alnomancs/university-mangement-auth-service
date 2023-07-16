import { Schema, model } from "mongoose";
import ApiError from "../../../error/ApiError";
import httpStatus from "http-status";
import { IManagementDepartment } from "./managementDepartment.interface";

const managementDepartmentSchema = new Schema<IManagementDepartment>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

//pre hook
managementDepartmentSchema.pre("save", async function (next) {
  const isExist = await ManagementDepartment.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Management Department Already exists !"
    );
  }
  next();
});

// export const ManagementSemester = model<IManagementSemester, AcamedicSemesterModel>(
//   "ManagementSemester",
//   academicSemesterSchema
// );
export const ManagementDepartment = model<IManagementDepartment>(
  "ManagementDepartment",
  managementDepartmentSchema
);
