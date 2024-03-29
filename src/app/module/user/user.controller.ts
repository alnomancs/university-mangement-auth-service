import { Request, Response } from "express";
import { UserService } from "./user.services";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createStudent = catchAsync(async (req: Request, res: Response) => {
  console.log(req.cookies, "cookies");

  const { student, ...userData } = req.body;
  const result = await UserService.createStudent(student, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "student create successfully",
    data: result,
  });
});

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...facultyData } = req.body;
  const result = await UserService.createFaculty(faculty, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty create successfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...adminData } = req.body;
  const result = await UserService.createAdmin(admin, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin create successfully",
    data: result,
  });
});

export const UserController = { createStudent, createFaculty, createAdmin };
