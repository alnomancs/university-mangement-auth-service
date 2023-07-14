import { IFaculty, IFacultyFilter } from "./faculty.interface";
import { Faculty } from "./faculty.model";
import { IGenericResponse } from "../../../interface/common";
import { IPaginationOptions } from "../../../interface/pagination";
import { paginatioHelper } from "../../../helpers/paginationHelpers";
import { facultySearchableField } from "./faculty.constant";
import { SortOrder } from "mongoose";
import ApiError from "../../../error/ApiError";
import httpStatus from "http-status";

const getFaculties = async (
  filter: IFacultyFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filterData } = filter;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: facultySearchableField.map(field => ({
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

  const { page, limit, skip, sortBy, sortOrder } =
    paginatioHelper.calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Faculty.find(whereCondition)

    .populate("academicDepartment")
    .populate("academicFaculty")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id)

    .populate("academicDepartment")
    .populate("academicFaculty");
  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await Faculty.find({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Faculty not found");
  }

  const { name, ...facultyData } = payload;

  const updatedFacultyData: Partial<IFaculty> = { ...facultyData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>; //name.firstName
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  });
  return result;
};

const deleteFaculty = async (id: string) => {
  const result = await Faculty.findByIdAndDelete({ _id: id })
    .populate("academicDepartment")
    .populate("academicFaculty");
  return result;
};

export const FacultyService = {
  getFaculties,
  getFaculty,
  updateFaculty,
  deleteFaculty,
};
