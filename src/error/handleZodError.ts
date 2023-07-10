import { ZodError, ZodIssue } from "zod";
import { IGenericErrorResponse } from "../interface/common";
import { IGenericErrorMessage } from "../interface/error";

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const statusCode = 400;

  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  return {
    statusCode,
    message: "Zod Error",
    errorMessages: errors,
  };
};
export default handleZodError;
