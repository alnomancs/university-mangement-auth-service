import { NextFunction, Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";

// const catchAsync2 = (fn: RequestHandler) => {
//   return async function name(req: Request, res: Response, next: NextFunction) {
//     try {
//       fn(req, res, next);
//     } catch (error) {
//       next(error);
//     }
//   };
// };

const catchAsync =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default catchAsync;
