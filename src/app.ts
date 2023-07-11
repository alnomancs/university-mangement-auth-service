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

export default app;

// import cors from "cors";
// import express, { Application } from "express";
// import globalErrorHandler from "./app/middleware/globalErrorHandler";
// import routes from "./app/routes";

// const app: Application = express();

// app.use(cors());

// //parser
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // app.use('/api/v1/users/', UserRoutes);
// // app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);
// app.use("/api/v1", routes);

// //global error handler
// app.use(globalErrorHandler);

// //Testing
// // app.get('/', async (req: Request, res: Response, next: NextFunction) => {
// //   throw new Error('Testing Error logger')
// // })

// //handle not found
// // app.use((req: Request, res: Response, next: NextFunction) => {
// //   res.status(httpStatus.NOT_FOUND).json({
// //     success: false,
// //     message: "Not Found",
// //     errorMessages: [
// //       {
// //         path: req.originalUrl,
// //         message: "API Not Found",
// //       },
// //     ],
// //   });
// //   next();
// // });

// export default app;
