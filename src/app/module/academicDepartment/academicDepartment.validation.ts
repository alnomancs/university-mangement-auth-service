import { z } from "zod";

const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "department_title is required" }),
    academicFaculty: z.string({
      required_error: "Academic faculty is required",
    }),
  }),
});

const updateAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "department_title is required" }),
  }),
});
// .refine(data => data.body.title || !data.body.title, {
//   message: "Either title should be provided or neither",
// });

export const AcademicDepartmentValidation = {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
};
