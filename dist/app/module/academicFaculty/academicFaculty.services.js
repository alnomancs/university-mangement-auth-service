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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyService = void 0;
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const academicFaculty_constrant_1 = require("./academicFaculty.constrant");
const academicFaculty_model_1 = require("./academicFaculty.model");
const createFaculty = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.create(
      payload
    );
    return result;
  });
const getFaculty = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_model_1.AcademicFaculty.findById(id);
    return result;
  });
const getFaculties = (filter, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filter,
      filterData = __rest(filter, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
      andCondition.push({
        $or: academicFaculty_constrant_1.academicFacultySearchableField.map(
          field => ({
            [field]: {
              $regex: searchTerm,
              $options: "i",
            },
          })
        ),
      });
    }
    if (Object.keys(filterData).length) {
      andCondition.push({
        $and: Object.entries(filterData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
    // const andCondition = [
    //   {
    //     $or: [
    //       {
    //         title: {
    //           $regex: searchTerm,
    //           $options: "i",
    //         },
    //       },
    //       {
    //         code: {
    //           $regex: searchTerm,
    //           $options: "i",
    //         },
    //       },
    //       {
    //         year: {
    //           $regex: searchTerm,
    //           $options: "i",
    //         },
    //       },
    //     ],
    //   },
    // ];
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers_1.paginatioHelper.calculatePagination(
        paginationOptions
      );
    const sortConditions = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    const whereCondition =
      andCondition.length > 0 ? { $and: andCondition } : {};
    const result = yield academicFaculty_model_1.AcademicFaculty.find(
      whereCondition
    )
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    const total = yield academicFaculty_model_1.AcademicFaculty.count();
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
const updateFaculty = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield academicFaculty_model_1.AcademicFaculty.findOneAndUpdate(
        { _id: id },
        payload,
        {
          new: true,
        }
      );
    return result;
  });
const deleteFaculty = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield academicFaculty_model_1.AcademicFaculty.findByIdAndDelete({
        _id: id,
      });
    return result;
  });
exports.AcademicFacultyService = {
  createFaculty,
  getFaculties,
  getFaculty,
  updateFaculty,
  deleteFaculty,
};
