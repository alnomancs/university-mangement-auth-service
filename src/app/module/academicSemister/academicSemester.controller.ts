import { Request, Response } from "express";
import { AcademicSemesterService } from "./academicSemester.services";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IAcademicSemester } from "./academicSemester.interface";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../Constant/pagination";
import { academicSemesterFilterableField } from "./academicSemester.constrant";

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body;
  const result = await AcademicSemesterService.createSemester(
    academicSemesterData
  );

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester creates successfully",
    data: result,
  });
});

const getSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemesterService.getSemester(id);

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester retrieved successfully",
    data: result,
  });
});

const getSemesters = catchAsync(async (req: Request, res: Response) => {
  // const paginationOptions = {
  //   page: Number(req.query.page),
  //   limit: Number(req.query.limit),
  //   sortBy: Number(req.query.sortBy),
  //   sortOrder: Number(req.query.sortOrder),
  // };

  const filters = pick(req.query, academicSemesterFilterableField);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemesterService.getSemesters(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await AcademicSemesterService.updateSemester(id, updateData);

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester update successfully",
    data: result,
  });

  // res.status(200).json({
  //   success: true,
  //   message: "Academic Semester creates successfully",
  //   data: result,
  // });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.deleteSemester(id);

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester delete successfully",
    data: result,
  });

  // res.status(200).json({
  //   success: true,
  //   message: "Academic Semester creates successfully",
  //   data: result,
  // });
});

export const AcademicSemesterController = {
  createSemester,
  getSemesters,
  getSemester,
  updateSemester,
  deleteSemester,
};
