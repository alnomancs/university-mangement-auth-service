import { z } from "zod";
import { bloodGroup } from "../student/student.constant";

const createStudentZodSchema = z.object({
  body: z.object({
    // role: z.string({
    //   required_error: "role is required",
    // }),
    password: z.string({}).optional(),

    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: "First name is required",
        }),
        middleName: z
          .string({
            required_error: "Middle name is required",
          })
          .optional(),
        lastName: z.string({
          required_error: "Last name is required",
        }),
      }),
      dateOfBirth: z.string({
        required_error: "Date of Birth is required",
      }),
      email: z.string({
        required_error: "Email is required",
      }),
      contactNo: z.string({
        required_error: "Contact No is required",
      }),
      gender: z.enum(["male", "female"], {
        required_error: "Date of Birth is required",
      }),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: "Date of Birth is required",
        })
        .optional(),

      presentAddress: z.string({
        required_error: "Present Address is required",
      }),

      permanentAddress: z.string({
        required_error: "Permanent Address is required",
      }),

      academicFaculty: z.string({
        required_error: "Academic Faculty is required",
      }),

      academicDepartment: z.string({
        required_error: "Academic Department is required",
      }),

      academicSemester: z.string({
        required_error: "Academic Semester is required",
      }),

      guardian: z.object({
        fatherName: z.string({
          required_error: "Father Name is required",
        }),
        fatherOccupation: z.string({
          required_error: "Father Occupation is required",
        }),
        fatherContactNo: z.string({
          required_error: "Father Contact No is required",
        }),
        motherName: z.string({
          required_error: "Mother Name is required",
        }),
        motherOccupation: z.string({
          required_error: "Mother Occupation is required",
        }),
        motherContactNo: z.string({
          required_error: "Mother Contact No is required",
        }),
        address: z.string({
          required_error: "Address is required",
        }),
      }),

      localGuardian: z.object({
        name: z.string({
          required_error: "Local Guardian Name is required",
        }),
        occupation: z.string({
          required_error: "Local Guardian Occupation is required",
        }),
        contactNo: z.string({
          required_error: "Local Gurdian Contact No is required",
        }),
        address: z.string({
          required_error: "Local Gurdian Address is required",
        }),
      }),
    }),
  }),
});

const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string({}).optional(),

    faculty: z.object({
      name: z.object({
        firstName: z.string({
          required_error: "First name is required",
        }),
        middleName: z
          .string({
            required_error: "Middle name is required",
          })
          .optional(),
        lastName: z.string({
          required_error: "Last name is required",
        }),
      }),
      dateOfBirth: z.string({
        required_error: "Date of Birth is required",
      }),
      gender: z.enum(["male", "female"], {
        required_error: "Gender is required",
      }),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: "Date of Birth is required",
        })
        .optional(),

      email: z.string({
        required_error: "Email is required",
      }),

      contactNo: z.string({
        required_error: "Contact No is required",
      }),

      emergencyContactNo: z.string({
        required_error: "Emergency Contact No is required",
      }),

      designation: z.string({
        required_error: "Designation No is required",
      }),

      presentAddress: z.string({
        required_error: "Present Address is required",
      }),

      permanentAddress: z.string({
        required_error: "Permanent Address is required",
      }),

      academicFaculty: z.string({
        required_error: "Academic Faculty is required",
      }),

      academicDepartment: z.string({
        required_error: "Academic Department is required",
      }),
    }),
  }),
});
const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string({}).optional(),

    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: "First name is required",
        }),
        middleName: z
          .string({
            required_error: "Middle name is required",
          })
          .optional(),
        lastName: z.string({
          required_error: "Last name is required",
        }),
      }),
      dateOfBirth: z.string({
        required_error: "Date of Birth is required",
      }),
      gender: z.enum(["male", "female"], {
        required_error: "Gender is required",
      }),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: "Date of Birth is required",
        })
        .optional(),

      email: z.string({
        required_error: "Email is required",
      }),

      contactNo: z.string({
        required_error: "Contact No is required",
      }),

      emergencyContactNo: z.string({
        required_error: "Emergency Contact No is required",
      }),

      designation: z.string({
        required_error: "Designation No is required",
      }),

      presentAddress: z.string({
        required_error: "Present Address is required",
      }),

      permanentAddress: z.string({
        required_error: "Permanent Address is required",
      }),

      managementDepartment: z.string({
        required_error: "Academic Faculty is required",
      }),
    }),
  }),
});

export const UserValidation = {
  createStudentZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema,
};

// await createUserZodSchema.parseAsync(req);
