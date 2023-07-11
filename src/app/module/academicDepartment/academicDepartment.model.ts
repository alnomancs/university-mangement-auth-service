import { Schema, model } from "mongoose";
import ApiError from "../../../error/ApiError";
import httpStatus from "http-status";
import { IAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
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
academicDepartmentSchema.pre("save", async function (next) {
  const isExist = await AcademicDepartment.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Academic Department Already exists !"
    );
  }
  next();
});

// export const AcademicSemester = model<IAcademicSemester, AcamedicSemesterModel>(
//   "AcademicSemester",
//   academicSemesterSchema
// );
export const AcademicDepartment = model<IAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema
);
