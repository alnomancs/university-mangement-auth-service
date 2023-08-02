import { Model } from "mongoose";
export type ILoginUser = {
  id: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needPasswordChange: boolean;
};

export type AuthModel = Model<ILoginUser, Record<string, unknown>>;
