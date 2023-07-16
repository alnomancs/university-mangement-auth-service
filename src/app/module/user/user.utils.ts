import { IAcademicSemester } from "../academicSemister/academicSemester.interface";
import { User } from "./user.model";

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastUser = await User.findOne({ role: "student" }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastUser?.id.substring(4);
};

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: "faculty" }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id.substring(2);
};

export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: "admin" }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id.substring(2);
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, "0");
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  incrementedId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedId}`;

  console.log(incrementedId);

  return incrementedId;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, "0");
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  incrementedId = `F-${incrementedId}`;

  console.log(incrementedId);

  return incrementedId;
};
export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, "0");
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  incrementedId = `A-${incrementedId}`;

  console.log(incrementedId);

  return incrementedId;
};
