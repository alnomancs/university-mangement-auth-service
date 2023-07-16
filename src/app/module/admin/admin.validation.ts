import { z } from "zod";
import { bloodGroup } from "./admin.constrant";

const createAdminZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "department_title is required" }),
    academicFaculty: z.string({
      required_error: "Academic faculty is required",
    }),
  }),
});

const updateAdminZodSchema = z.object({
  name: z
    .object({
      firstName: z.string().optional(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
    })
    .optional(),
  dateOfBirth: z.string().optional(),
  email: z.string().optional(),
  gender: z.enum(["male", "female"]).optional(),
  bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  designation: z.string().optional(),
  managementDepartment: z
    .object({
      title: z.string().optional(),
    })
    .optional(),
});
// .refine(data => data.body.title || !data.body.title, {
//   message: "Either title should be provided or neither",
// });

export const AdminValidation = {
  createAdminZodSchema,
  updateAdminZodSchema,
};
