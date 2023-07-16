"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const admin_constrant_1 = require("./admin.constrant");
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "department_title is required" }),
        academicFaculty: zod_1.z.string({
            required_error: "Academic faculty is required",
        }),
    }),
});
const updateAdminZodSchema = zod_1.z.object({
    name: zod_1.z
        .object({
        firstName: zod_1.z.string().optional(),
        middleName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
    })
        .optional(),
    dateOfBirth: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    gender: zod_1.z.enum(["male", "female"]).optional(),
    bloodGroup: zod_1.z.enum([...admin_constrant_1.bloodGroup]).optional(),
    contactNo: zod_1.z.string().optional(),
    emergencyContactNo: zod_1.z.string().optional(),
    presentAddress: zod_1.z.string().optional(),
    permanentAddress: zod_1.z.string().optional(),
    designation: zod_1.z.string().optional(),
    managementDepartment: zod_1.z
        .object({
        title: zod_1.z.string().optional(),
    })
        .optional(),
});
// .refine(data => data.body.title || !data.body.title, {
//   message: "Either title should be provided or neither",
// });
exports.AdminValidation = {
    createAdminZodSchema,
    updateAdminZodSchema,
};
