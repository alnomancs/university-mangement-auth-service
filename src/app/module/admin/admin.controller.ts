import { Request, Response } from "express";
import { AdminService } from "./admin.services";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../Constant/pagination";
import { IAdmin } from "./admin.interface";
import { adminFilterableField } from "./admin.constrant";

const getAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AdminService.getAdmin(id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin retrieved successfully",
    data: result,
  });
});

const getAdmins = catchAsync(async (req: Request, res: Response) => {
  // const paginationOptions = {
  //   page: Number(req.query.page),
  //   limit: Number(req.query.limit),
  //   sortBy: Number(req.query.sortBy),
  //   sortOrder: Number(req.query.sortOrder),
  // };

  const filters = pick(req.query, adminFilterableField);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AdminService.getAdmins(filters, paginationOptions);

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await AdminService.updateAdmin(id, updateData);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Admin update successfully",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.deleteAdmin(id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Admin delete successfully",
    data: result,
  });

  // res.status(200).json({
  //   success: true,
  //   message: "Academic Semester creates successfully",
  //   data: result,
  // });
});

export const AdminController = {
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
};
