import { Request, Response } from "express";
import { AcademicDepartmentService } from "./academicDepartment.services";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../Constant/pagination";
import { IAcademicDepartment } from "./academicDepartment.interface";
import { academicDepartmentFilterableField } from "./academicDepartment.constrant";

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body;
  const result = await AcademicDepartmentService.createDepartment(
    academicDepartmentData
  );

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department creates successfully",
    data: result,
  });

  // res.status(200).json({
  //   success: true,
  //   message: "Academic Semester creates successfully",
  //   data: result,
  // });
});

const getDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicDepartmentService.getDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Department retrieved successfully",
    data: result,
  });
});

const getDepartments = catchAsync(async (req: Request, res: Response) => {
  // const paginationOptions = {
  //   page: Number(req.query.page),
  //   limit: Number(req.query.limit),
  //   sortBy: Number(req.query.sortBy),
  //   sortOrder: Number(req.query.sortOrder),
  // };

  const filters = pick(req.query, academicDepartmentFilterableField);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicDepartmentService.getDepartments(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Department retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await AcademicDepartmentService.updateDepartment(
    id,
    updateData
  );

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department update successfully",
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDepartmentService.deleteDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department delete successfully",
    data: result,
  });

  // res.status(200).json({
  //   success: true,
  //   message: "Academic Semester creates successfully",
  //   data: result,
  // });
});

export const AcademicDepartmentController = {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
