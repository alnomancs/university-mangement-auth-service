import { IAdmin, IAdminFilter } from "./admin.interface";
import { Admin } from "./admin.model";
import { IPaginationOptions } from "../../../interface/pagination";
import { IGenericResponse } from "../../../interface/common";
import { paginatioHelper } from "../../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { adminSearchableField } from "./admin.constrant";

const getAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id).populate("managementDepartment");
  return result;
};

const getAdmins = async (
  filter: IAdminFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTerm, ...filterData } = filter;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: adminSearchableField.map(field => ({
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

  const result = await Admin.find(whereCondition)
    .populate("managementDepartment")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Admin.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateAdmin = async (id: string, payload: Partial<IAdmin>) => {
  const result = await Admin.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate("managementDepartment");
  return result;
};

const deleteAdmin = async (id: string) => {
  const result = await Admin.findByIdAndDelete({ _id: id });
  return result;
};

export const AdminService = {
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
};
