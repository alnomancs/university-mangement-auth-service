import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
// Create a new Model type that knows about IUserMethods...

// 2. Create a Schema corresponding to the document interface for instance method.
// const userSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
//   {
//     id: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     role: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       select: 0,
//     },
//     needPasswordChange: {
//       type: Boolean,
//       default: true,
//     },
//     student: {
//       type: Schema.Types.ObjectId,
//       ref: "Student",
//     },
//     faculty: {
//       type: Schema.Types.ObjectId,
//       ref: "Faculty",
//     },
//     admin: {
//       type: Schema.Types.ObjectId,
//       ref: "Admin",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// 2. Create a Schema corresponding to the document interface for static  method.

const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

// satics methode
userSchema.statics.isUserExist = async function (
  id: string
): Promise<Pick<
  IUser,
  "id" | "password" | "needPasswordChange" | "role"
> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needPasswordChange: 1 }
  ).lean();
};

userSchema.statics.isPasswordExist = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// instance methods
// userSchema.methods.isUserExist = async function (id: string): Promise<Partial<IUser> | null> {
//   const user = await User.findOne(
//     { id },
//     { id: 1, password: 1, needPasswordChange: 1 }
//   ).lean();
//   return user;
// };

// userSchema.methods.isPasswordExist = async function (
//   givenPassword: string,
//   savedPassword: string
// ): Promise<boolean> {
//   return await bcrypt.compare(givenPassword, savedPassword);
// };

//User.create() // static method
//user.save() // instance method

userSchema.pre("save", async function (next) {
  console.log(this);
  next();
});

export const User = model<IUser, UserModel>("User", userSchema);
