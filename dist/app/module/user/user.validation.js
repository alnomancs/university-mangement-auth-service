"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const student_constant_1 = require("../student/student.constant");
const createStudentZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    // role: z.string({
    //   required_error: "role is required",
    // }),
    password: zod_1.z.string({}).optional(),
    student: zod_1.z.object({
      name: zod_1.z.object({
        firstName: zod_1.z.string({
          required_error: "First name is required",
        }),
        middleName: zod_1.z
          .string({
            required_error: "Middle name is required",
          })
          .optional(),
        lastName: zod_1.z.string({
          required_error: "Last name is required",
        }),
      }),
      dateOfBirth: zod_1.z.string({
        required_error: "Date of Birth is required",
      }),
      email: zod_1.z.string({
        required_error: "Email is required",
      }),
      contactNo: zod_1.z.string({
        required_error: "Contact No is required",
      }),
      gender: zod_1.z.enum(["male", "female"], {
        required_error: "Date of Birth is required",
      }),
      bloodGroup: zod_1.z
        .enum([...student_constant_1.bloodGroup], {
          required_error: "Date of Birth is required",
        })
        .optional(),
      presentAddress: zod_1.z.string({
        required_error: "Present Address is required",
      }),
      permanentAddress: zod_1.z.string({
        required_error: "Permanent Address is required",
      }),
      academicFaculty: zod_1.z.string({
        required_error: "Academic Faculty is required",
      }),
      academicDepartment: zod_1.z.string({
        required_error: "Academic Department is required",
      }),
      academicSemester: zod_1.z.string({
        required_error: "Academic Semester is required",
      }),
      guardian: zod_1.z.object({
        fatherName: zod_1.z.string({
          required_error: "Father Name is required",
        }),
        fatherOccupation: zod_1.z.string({
          required_error: "Father Occupation is required",
        }),
        fatherContactNo: zod_1.z.string({
          required_error: "Father Contact No is required",
        }),
        motherName: zod_1.z.string({
          required_error: "Mother Name is required",
        }),
        motherOccupation: zod_1.z.string({
          required_error: "Mother Occupation is required",
        }),
        motherContactNo: zod_1.z.string({
          required_error: "Mother Contact No is required",
        }),
        address: zod_1.z.string({
          required_error: "Address is required",
        }),
      }),
      localGuardian: zod_1.z.object({
        name: zod_1.z.string({
          required_error: "Local Guardian Name is required",
        }),
        occupation: zod_1.z.string({
          required_error: "Local Guardian Occupation is required",
        }),
        contactNo: zod_1.z.string({
          required_error: "Local Gurdian Contact No is required",
        }),
        address: zod_1.z.string({
          required_error: "Local Gurdian Address is required",
        }),
      }),
    }),
  }),
});
const createFacultyZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    password: zod_1.z.string({}).optional(),
    faculty: zod_1.z.object({
      name: zod_1.z.object({
        firstName: zod_1.z.string({
          required_error: "First name is required",
        }),
        middleName: zod_1.z
          .string({
            required_error: "Middle name is required",
          })
          .optional(),
        lastName: zod_1.z.string({
          required_error: "Last name is required",
        }),
      }),
      dateOfBirth: zod_1.z.string({
        required_error: "Date of Birth is required",
      }),
      gender: zod_1.z.enum(["male", "female"], {
        required_error: "Gender is required",
      }),
      bloodGroup: zod_1.z
        .enum([...student_constant_1.bloodGroup], {
          required_error: "Date of Birth is required",
        })
        .optional(),
      email: zod_1.z.string({
        required_error: "Email is required",
      }),
      contactNo: zod_1.z.string({
        required_error: "Contact No is required",
      }),
      emergencyContactNo: zod_1.z.string({
        required_error: "Emergency Contact No is required",
      }),
      designation: zod_1.z.string({
        required_error: "Designation No is required",
      }),
      presentAddress: zod_1.z.string({
        required_error: "Present Address is required",
      }),
      permanentAddress: zod_1.z.string({
        required_error: "Permanent Address is required",
      }),
      academicFaculty: zod_1.z.string({
        required_error: "Academic Faculty is required",
      }),
      academicDepartment: zod_1.z.string({
        required_error: "Academic Department is required",
      }),
    }),
  }),
});
const createAdminZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    password: zod_1.z.string({}).optional(),
    admin: zod_1.z.object({
      name: zod_1.z.object({
        firstName: zod_1.z.string({
          required_error: "First name is required",
        }),
        middleName: zod_1.z
          .string({
            required_error: "Middle name is required",
          })
          .optional(),
        lastName: zod_1.z.string({
          required_error: "Last name is required",
        }),
      }),
      dateOfBirth: zod_1.z.string({
        required_error: "Date of Birth is required",
      }),
      gender: zod_1.z.enum(["male", "female"], {
        required_error: "Gender is required",
      }),
      bloodGroup: zod_1.z
        .enum([...student_constant_1.bloodGroup], {
          required_error: "Date of Birth is required",
        })
        .optional(),
      email: zod_1.z.string({
        required_error: "Email is required",
      }),
      contactNo: zod_1.z.string({
        required_error: "Contact No is required",
      }),
      emergencyContactNo: zod_1.z.string({
        required_error: "Emergency Contact No is required",
      }),
      designation: zod_1.z.string({
        required_error: "Designation No is required",
      }),
      presentAddress: zod_1.z.string({
        required_error: "Present Address is required",
      }),
      permanentAddress: zod_1.z.string({
        required_error: "Permanent Address is required",
      }),
      managementDepartment: zod_1.z.string({
        required_error: "Academic Faculty is required",
      }),
    }),
  }),
});
exports.UserValidation = {
  createStudentZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema,
};
// await createUserZodSchema.parseAsync(req);
