import { ILoginUser, ILoginUserResponse } from "./auth.interface";
import { User } from "../user/user.model";
import ApiError from "../../../error/ApiError";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelper } from "../../../helpers/jwtHelper";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  // const user = new User();
  // const isUserExist = await User.findOne(
  //   { id },
  //   { id: 1, password: 1, needPasswordChange: 1 }
  // ).lean();

  const isUserExist = await User.isUserExist(id); //static isUserExista
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // match password
  console.log(password, isUserExist.password);
  if (
    isUserExist.password &&
    (await !User.isPasswordExist(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password does not match");
  }

  //create access token
  const { id: userId, role, needPasswordChange } = isUserExist;
  const accessToken = jwtHelper.createToken(
    {
      userId,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expire_in as string
  );

  // create refresh token
  const refreshToken = jwtHelper.createToken(
    {
      userId,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  // first verify token
  // invalid token - synchronous
  let verifyToken = null;
  try {
    verifyToken = jwtHelper.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
    console.log(verifyToken);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh token");
  }

  const { userId, role } = verifyToken;
  console.log(userId, role);
};

export const AuthService = {
  loginUser,
  refreshToken,
};
