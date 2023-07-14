import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

import { IFaculty } from "./faculty.interface";
import { paginationFields } from "../../../Constant/pagination";
import pick from "../../../shared/pick";
import { facultyFilterableField } from "./faculty.constant";
import { FacultyService } from "./faculty.services";

const getFaculties = catchAsync(async (req: Request, res: Response) => {
  // const paginationOptions = {
  //   page: Number(req.query.page),
  //   limit: Number(req.query.limit),
  //   sortBy: Number(req.query.sortBy),
  //   sortOrder: Number(req.query.sortOrder),
  // };

  const filters = pick(req.query, facultyFilterableField);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await FacultyService.getFaculties(filters, paginationOptions);

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All faculty retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FacultyService.getFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty retrieved successfully",
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await FacultyService.updateFaculty(id, updateData);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty Profile update successfully",
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.deleteFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty Profile delete successfully",
    data: result,
  });
});

export const FacultyController = {
  getFaculties,
  getFaculty,
  updateFaculty,
  deleteFaculty,
};
