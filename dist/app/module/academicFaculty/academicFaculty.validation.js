"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyValidation = void 0;
const zod_1 = require("zod");
const createAcademicFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "faculty_title is required" }),
    }),
});
const updateAcademicFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "faculty_title is required" }),
    }),
});
// .refine(data => data.body.title || !data.body.title, {
//   message: "Either title should be provided or neither",
// });
exports.AcademicFacultyValidation = {
    createAcademicFacultyZodSchema,
    updateAcademicFacultyZodSchema,
};
