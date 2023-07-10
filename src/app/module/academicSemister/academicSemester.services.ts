import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
import {
  academicSemesterSearchableField,
  academicSemesterTitleCodeMap,
} from "./academicSemester.constrant";
import {
  IAcademicSemester,
  IAcademicSemesterFilter,
} from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import { IPaginationOptions } from "../../../interface/pagination";
import { IGenericResponse } from "../../../interface/common";
import { paginatioHelper } from "../../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMap[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Semester Code");
  }
  const result = await AcademicSemester.create(payload);

  return result;
};

const getSemester = async (id: string): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);

  return result;
};

const getSemesters = async (
  filter: IAcademicSemesterFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...filterData } = filter;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: academicSemesterSearchableField.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // const andCondition = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: "i",
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: "i",
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: "i",
  //         },
  //       },
  //     ],
  //   },
  // ];

  const { page, limit, skip, sortBy, sortOrder } =
    paginatioHelper.calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await AcademicSemester.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
) => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMap[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Semester Code");
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteSemester = async (id: string) => {
  const result = await AcademicSemester.findByIdAndDelete({ _id: id });
  return result;
};

export const AcademicSemesterService = {
  createSemester,
  getSemesters,
  getSemester,
  updateSemester,
  deleteSemester,
};
