http://localhost:5001/api/v1/auth/login

create student
http://localhost:5001/api/v1/users/create-student

sample data
{
  "student": {
    "name": {
      "firstName": "Abdullah",
      "lastName": "Al",
      "middleName": "Noman"
    },
    "gender": "male",
    "dateOfBirth": "14-01-1995",
    "email": "alnoman1.cs@gmail.com",
    "contactNo": "9201656941",
    "emergencyContactNo": "000",
    "bloodGroup": "B+",
    "presentAddress": "CTG",
    "permanentAddress": "CTG",
    "guardian": {
      "fatherName": "Ahasan Ullah",
      "fatherOccupation": "Retired Teacher",
      "fatherContactNo": "01600000000",
      "motherName": "Jahanara Ahasan",
      "motherOccupation": "Housewife",
      "motherContactNo": "01600000000",
      "address": "CTG"
    },
    "localGuardian": {
      "name": "Shamsun Nahar",
      "occupation": "Service Holder",
      "contactNo": "01600000000",
      "address": "CTG"
    },
    "academicFaculty": "64ad2a6104364e570e882f9e",
    "academicDepartment": "64ad2aa804364e570e882fa5",
    "academicSemester": "64a5de99b3be8691057fe3cc"
  }
}