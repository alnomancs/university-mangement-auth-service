import { z } from "zod";

const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "faculty_title is required" }),
  }),
});

const updateAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "faculty_title is required" }),
  }),
});
// .refine(data => data.body.title || !data.body.title, {
//   message: "Either title should be provided or neither",
// });

export const AcademicFacultyValidation = {
  createAcademicFacultyZodSchema,
  updateAcademicFacultyZodSchema,
};
