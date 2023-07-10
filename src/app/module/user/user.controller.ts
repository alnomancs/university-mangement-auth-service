import { Request, Response } from "express";
import { UserService } from "./user.services";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body;
  const result = await UserService.createUser(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User create successfully",
    data: result,
  });

  // res.status(200).json({
  //   success: true,
  //   message: "User create successfully",
  //   user: result,
  // });
});

export const UserController = { createUser };