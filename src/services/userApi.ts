import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IUser,
  IUserGetAllPayload,
  IUserLoginPayload,
} from "./types/UserInterface";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4001/users" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<any, IUserLoginPayload>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    /** Get all products */
    getAllUsers: builder.query<IUser, IUserGetAllPayload>({
      query: ({ limit = 10, page = 1 }) => ({
        url: "/",
        method: "GET",
        params: { limit, page },
      }),
      providesTags: (result) =>
        result ? result.data.map(({ id }) => ({ type: "User", id })) : [],
    }),
  }),
});

export const { useLoginMutation, useGetAllUsersQuery } = userApi;
