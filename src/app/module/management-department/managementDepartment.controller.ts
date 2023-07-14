import { Request, Response } from "express";
import { ManagementDepartmentService } from "./managementDepartment.services";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../Constant/pagination";
import { IManagementDepartment } from "./managementDepartment.interface";
import { academicDepartmentFilterableField } from "./management.constrant";

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicDepartmentData } = req.body;
    const result = await ManagementDepartmentService.createManagementDepartment(
      academicDepartmentData
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Management Department creates successfully",
      data: result,
    });

    // res.status(200).json({
    //   success: true,
    //   message: "Management Semester creates successfully",
    //   data: result,
    // });
  }
);

const getManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await ManagementDepartmentService.getManagementDepartment(
      id
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Department retrieved successfully",
      data: result,
    });
  }
);

const getManagementDepartments = catchAsync(
  async (req: Request, res: Response) => {
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: Number(req.query.sortBy),
    //   sortOrder: Number(req.query.sortOrder),
    // };

    const filters = pick(req.query, academicDepartmentFilterableField);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await ManagementDepartmentService.getManagementDepartments(
      filters,
      paginationOptions
    );

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Department retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateData = req.body;
    const result = await ManagementDepartmentService.updateManagementDepartment(
      id,
      updateData
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Management Department update successfully",
      data: result,
    });
  }
);

const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await ManagementDepartmentService.deleteManagementDepartment(
      id
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Management Department delete successfully",
      data: result,
    });

    // res.status(200).json({
    //   success: true,
    //   message: "Management Semester creates successfully",
    //   data: result,
    // });
  }
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getManagementDepartments,
  getManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
};
