import { Schema, model } from "mongoose";
import ApiError from "../../../error/ApiError";
import httpStatus from "http-status";
import { IAcademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new Schema<IAcademicFaculty>(
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
academicFacultySchema.pre("save", async function (next) {
  const isExist = await AcademicFaculty.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Academic Faculty Already exists !"
    );
    next();
  }
});
export const AcademicFaculty = model<IAcademicFaculty>(
  "AcademicFaculty",
  academicFacultySchema
);
