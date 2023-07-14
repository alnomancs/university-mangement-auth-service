import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { StudentService } from "./student.services";
import { IStudent } from "./student.interface";
import { paginationFields } from "../../../Constant/pagination";
import pick from "../../../shared/pick";
import { studentFilterableField } from "./student.constant";

const getStudents = catchAsync(async (req: Request, res: Response) => {
  // const paginationOptions = {
  //   page: Number(req.query.page),
  //   limit: Number(req.query.limit),
  //   sortBy: Number(req.query.sortBy),
  //   sortOrder: Number(req.query.sortOrder),
  // };

  const filters = pick(req.query, studentFilterableField);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await StudentService.getStudents(filters, paginationOptions);

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All student retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await StudentService.getStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student retrieved successfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await StudentService.updateStudent(id, updateData);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student Profile update successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.deleteStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student Profile delete successfully",
    data: result,
  });
});

export const StudentController = {
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};
