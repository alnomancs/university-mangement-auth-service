import { NextFunction, Request, Response } from "express";
import ApiError from "../../error/ApiError";
import httpStatus from "http-status";
import { jwtHelper } from "../../helpers/jwtHelper";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const auth =
  (...requiredRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get authorization
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "you are not authorized");
      }

      //verify token
      let verifiedUser = null;
      verifiedUser = jwtHelper.verifyToken(token, config.jwt.secret as Secret);
      console.log(verifiedUser, "verified user");
      req.user = verifiedUser;

      if (requiredRole.length && !requiredRole.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "FORBIDDEN access denied");
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
