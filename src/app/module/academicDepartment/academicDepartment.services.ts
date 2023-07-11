import {
  IAcademicDepartment,
  IAcademicDepartmentFilter,
} from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";
import { IPaginationOptions } from "../../../interface/pagination";
import { IGenericResponse } from "../../../interface/common";
import { paginatioHelper } from "../../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { academicDepartmentSearchableField } from "./academicDepartment.constrant";

const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    "academicFaculty"
  );
  return result;
};

const getDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    "academicFaculty"
  );

  return result;
};

const getDepartments = async (
  filter: IAcademicDepartmentFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { searchTerm, ...filterData } = filter;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: academicDepartmentSearchableField.map(field => ({
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

  const result = await AcademicDepartment.find(whereCondition)
    .populate("academicFaculty")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDepartment.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  ).populate("academicFaculty");
  return result;
};

const deleteDepartment = async (id: string) => {
  const result = await AcademicDepartment.findByIdAndDelete({ _id: id });
  return result;
};

export const AcademicDepartmentService = {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
