import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IUser,
  IUserGetAllPayload,
  IUserLoginPayload,
  IUserResponse,
} from "./types/UserInterface";
import { adminApi } from "./adminApi.ts";

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

    /** Get user by ID **/
    getUserById: builder.query<IUserResponse, { id: number }>({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserByIdQuery } = userApi;
