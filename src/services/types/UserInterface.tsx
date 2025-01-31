import { IMeta } from "./ProductInterface.tsx";

export interface IUserLoginPayload {
  email: string;
  password: string;
}

export interface IUserInfo {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profile: string;
}

export interface IUserGetAllPayload {
  limit?: number;
  page?: number;
}

export interface IUserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profile: string;
  publicId: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreatePayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  profile: string;
  publicId: string;
}

export interface IUserUpdatePayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profile: string;
  publicId: string;
}

export interface IUserDataGrid {
  id: number;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPhone: string;
  userProfile: string;
  userPublicId: string;
  userUsername: string;
  userCreatedDate: Date;
  userUpdatedDate: Date;
}

export interface IUserInfoRedux extends IUserInfo {
  access_token: string;
  refresh_token: string;
  roles: string[];
}

export interface IUser {
  data: IUserResponse[];
  meta: IMeta;
}
