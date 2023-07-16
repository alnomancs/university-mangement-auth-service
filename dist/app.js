"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const http_status_1 = __importDefault(require("http-status"));
const app = (0, express_1.default)();
//middleware
app.use((0, cors_1.default)());
//parsers
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//router
app.use("/api/v1", routes_1.default);
//global error handler
app.use(globalErrorHandler_1.default);
// handle not found
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
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
exports.default = app;
