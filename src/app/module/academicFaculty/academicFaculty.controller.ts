import { Request, Response } from "express";
import { AcademicFacultyService } from "./academicFaculty.services";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IAcademicFaculty } from "./academicFaculty.interface";
import { academicFacultyFilterableField } from "./academicFaculty.constrant";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../Constant/pagination";

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyService.createFaculty(
    academicFacultyData
  );

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty creates successfully",
    data: result,
  });
});

const getFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicFacultyService.getFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty retrieved successfully",
    data: result,
  });
});

const getFaculties = catchAsync(async (req: Request, res: Response) => {
  console.log(req.headers.authorization, "authorization");
  console.log(req.user, "user");
  const filters = pick(req.query, academicFacultyFilterableField);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicFacultyService.getFaculties(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic-Faculty retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await AcademicFacultyService.updateFaculty(id, updateData);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic-faculty update successfully",
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.deleteFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic-faculty delete successfully",
    data: result,
  });
});

export const AcademicFacultyController = {
  createFaculty,
  getFaculties,
  getFaculty,
  updateFaculty,
  deleteFaculty,
};
