import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./auth.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import config from "../../../config";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  console.log(result);

  const { refreshToken, ...data } = result;

  const cookieOption = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOption);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User successfully logged in",
    data: data,
  });
});

export const AuthController = {
  loginUser,
};
