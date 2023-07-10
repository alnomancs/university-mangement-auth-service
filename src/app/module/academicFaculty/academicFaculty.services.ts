import { SortOrder } from "mongoose";
import { paginatioHelper } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interface/common";
import { IPaginationOptions } from "../../../interface/pagination";
import { academicFacultySearchableField } from "./academicFaculty.constrant";
import {
  IAcademicFaculty,
  IAcademicFacultyFilter,
} from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload);

  return result;
};

const getFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const getFaculties = async (
  filter: IAcademicFacultyFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { searchTerm, ...filterData } = filter;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: academicFacultySearchableField.map(field => ({
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

  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteFaculty = async (id: string) => {
  const result = await AcademicFaculty.findByIdAndDelete({ _id: id });
  return result;
};

export const AcademicFacultyService = {
  createFaculty,
  getFaculties,
  getFaculty,
  updateFaculty,
  deleteFaculty,
};
