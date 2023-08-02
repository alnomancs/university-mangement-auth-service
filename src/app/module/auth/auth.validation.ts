import { z } from "zod";

const loginZodSchema = z.object({
  body: z.object({
    id: z.string({ required_error: "Id id required" }),
    password: z.string({ required_error: "password is required" }),
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

export const AuthValidation = {
  loginZodSchema,
  updateAdminZodSchema,
};
