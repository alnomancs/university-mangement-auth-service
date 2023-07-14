import {
  IManagementDepartment,
  IManagementDepartmentFilter,
} from "./managementDepartment.interface";
import { ManagementDepartment } from "./managementDepartment.model";
import { IPaginationOptions } from "../../../interface/pagination";
import { IGenericResponse } from "../../../interface/common";
import { paginatioHelper } from "../../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { academicDepartmentSearchableField } from "./management.constrant";

const createManagementDepartment = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment> => {
  const result = await ManagementDepartment.create(payload);
  return result;
};

const getManagementDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(id);
  return result;
};

const getManagementDepartments = async (
  filter: IManagementDepartmentFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IManagementDepartment[]>> => {
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

  const result = await ManagementDepartment.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await ManagementDepartment.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateManagementDepartment = async (
  id: string,
  payload: Partial<IManagementDepartment>
) => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};

const deleteManagementDepartment = async (id: string) => {
  const result = await ManagementDepartment.findByIdAndDelete({ _id: id });
  return result;
};

export const ManagementDepartmentService = {
  createManagementDepartment,
  getManagementDepartments,
  getManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
};
