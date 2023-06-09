import {
  IAcademicSemesterCodes,
  IAcademicSemesterMonths,
  IAcademicSemesterTitles,
} from "./academicSemester.interface";

export const academicSemesterTitles: IAcademicSemesterTitles[] = [
  "Autumn",
  "Summer",
  "Fall",
];

export const academicSemesterCodes: IAcademicSemesterCodes[] = [
  "01",
  "02",
  "03",
];

export const academicSemesterMonths: IAcademicSemesterMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const academicSemesterTitleCodeMap: { [key: string]: string } = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};

export const academicSemesterSearchableField = ["title", "code", "year"];
export const academicSemesterFilterableField = [
  "searchTerm",
  "title",
  "code",
  "year",
];
