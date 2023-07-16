"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyService = void 0;
const faculty_model_1 = require("./faculty.model");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const faculty_constant_1 = require("./faculty.constant");
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const getFaculties = (filter, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filter, filterData = __rest(filter, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: faculty_constant_1.facultySearchableField.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    if (Object.keys(filterData).length) {
        andCondition.push({
            $and: Object.entries(filterData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginatioHelper.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = yield faculty_model_1.Faculty.find(whereCondition)
        .populate("academicDepartment")
        .populate("academicFaculty")
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield faculty_model_1.Faculty.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.Faculty.findById(id)
        .populate("academicDepartment")
        .populate("academicFaculty");
    return result;
});
const updateFaculty = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield faculty_model_1.Faculty.find({ id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Faculty not found");
    }
    const { name } = payload, facultyData = __rest(payload, ["name"]);
    const updatedFacultyData = Object.assign({}, facultyData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`; //name.firstName
            updatedFacultyData[nameKey] = name[key];
        });
    }
    const result = yield faculty_model_1.Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
        new: true,
    });
    return result;
});
const deleteFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_model_1.Faculty.findByIdAndDelete({ _id: id })
        .populate("academicDepartment")
        .populate("academicFaculty");
    return result;
});
exports.FacultyService = {
    getFaculties,
    getFaculty,
    updateFaculty,
    deleteFaculty,
};
