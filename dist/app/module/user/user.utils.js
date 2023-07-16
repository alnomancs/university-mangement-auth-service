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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAdminId = exports.generateFacultyId = exports.generateStudentId = exports.findLastAdminId = exports.findLastFacultyId = exports.findLastStudentId = void 0;
const user_model_1 = require("./user.model");
const findLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield user_model_1.User.findOne({ role: "student" }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return lastUser === null || lastUser === void 0 ? void 0 : lastUser.id.substring(4);
});
exports.findLastStudentId = findLastStudentId;
const findLastFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield user_model_1.User.findOne({ role: "faculty" }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id.substring(2);
});
exports.findLastFacultyId = findLastFacultyId;
const findLastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield user_model_1.User.findOne({ role: "admin" }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id.substring(2);
});
exports.findLastAdminId = findLastAdminId;
const generateStudentId = (academicSemester) => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastStudentId)()) || (0).toString().padStart(5, "0");
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
    incrementedId = `${academicSemester.year.substring(2)}${academicSemester.code}${incrementedId}`;
    console.log(incrementedId);
    return incrementedId;
});
exports.generateStudentId = generateStudentId;
const generateFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastFacultyId)()) || (0).toString().padStart(5, "0");
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
    incrementedId = `F-${incrementedId}`;
    console.log(incrementedId);
    return incrementedId;
});
exports.generateFacultyId = generateFacultyId;
const generateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastAdminId)()) || (0).toString().padStart(5, "0");
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
    incrementedId = `A-${incrementedId}`;
    console.log(incrementedId);
    return incrementedId;
});
exports.generateAdminId = generateAdminId;
