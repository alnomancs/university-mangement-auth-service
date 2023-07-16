"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentValidation = void 0;
const zod_1 = require("zod");
const createAcademicDepartmentZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string({ required_error: "department_title is required" }),
    academicFaculty: zod_1.z.string({
      required_error: "Academic faculty is required",
    }),
  }),
});
const updateAcademicDepartmentZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.string({ required_error: "department_title is required" }),
  }),
});
// .refine(data => data.body.title || !data.body.title, {
//   message: "Either title should be provided or neither",
// });
exports.AcademicDepartmentValidation = {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
};
