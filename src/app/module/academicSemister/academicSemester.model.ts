import { Schema, model } from "mongoose";
import { IAcademicSemester } from "./academicSemester.interface";
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from "./academicSemester.constrant";
import ApiError from "../../../error/ApiError";

import httpStatus from "http-status";

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
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
academicSemesterSchema.pre("save", async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Academic Semester Already exists !"
    );
    next();
  }
});

// export const AcademicSemester = model<IAcademicSemester, AcamedicSemesterModel>(
//   "AcademicSemester",
//   academicSemesterSchema
// );
export const AcademicSemester = model<IAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
