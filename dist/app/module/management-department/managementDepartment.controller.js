"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementDepartmentController = void 0;
const managementDepartment_services_1 = require("./managementDepartment.services");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../../Constant/pagination");
const management_constrant_1 = require("./management.constrant");
const createManagementDepartment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const academicDepartmentData = __rest(req.body, []);
    const result =
      yield managementDepartment_services_1.ManagementDepartmentService.createManagementDepartment(
        academicDepartmentData
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: "Management Department creates successfully",
      data: result,
    });
    // res.status(200).json({
    //   success: true,
    //   message: "Management Semester creates successfully",
    //   data: result,
    // });
  })
);
const getManagementDepartment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result =
      yield managementDepartment_services_1.ManagementDepartmentService.getManagementDepartment(
        id
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: "Department retrieved successfully",
      data: result,
    });
  })
);
const getManagementDepartments = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: Number(req.query.sortBy),
    //   sortOrder: Number(req.query.sortOrder),
    // };
    const filters = (0, pick_1.default)(
      req.query,
      management_constrant_1.academicDepartmentFilterableField
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      pagination_1.paginationFields
    );
    const result =
      yield managementDepartment_services_1.ManagementDepartmentService.getManagementDepartments(
        filters,
        paginationOptions
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: "Department retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  })
);
const updateManagementDepartment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateData = req.body;
    const result =
      yield managementDepartment_services_1.ManagementDepartmentService.updateManagementDepartment(
        id,
        updateData
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: "Management Department update successfully",
      data: result,
    });
  })
);
const deleteManagementDepartment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result =
      yield managementDepartment_services_1.ManagementDepartmentService.deleteManagementDepartment(
        id
      );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: "Management Department delete successfully",
      data: result,
    });
    // res.status(200).json({
    //   success: true,
    //   message: "Management Semester creates successfully",
    //   data: result,
    // });
  })
);
exports.ManagementDepartmentController = {
  createManagementDepartment,
  getManagementDepartments,
  getManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
};
