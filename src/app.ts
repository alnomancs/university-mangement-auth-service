import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import router from "./app/routes";
import httpStatus from "http-status";

const app: Application = express();

//middleware
app.use(cors());

//parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router
app.use("/api/v1", router);

//global error handler
app.use(globalErrorHandler);

// handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessage: [
      {
        path: req.originalUrl,
        message: "Api Not Found",
      },
    ],
  });
  next();
});

// const academicSemester: IAcademicSemester = {
//   code: "01",
//   year: "2016",
// };
// const testidF = async () => {
//   const testid = generateFacultyId();
//   console.log(testid);
// };
// testidF();

export default app;
