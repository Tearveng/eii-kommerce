import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IUserInfoRedux,
  IUserLoginPayload,
  IUserResponse,
} from "./types/UserInterface";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://${import.meta.env.VITE_HOST}:4001/users` }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<IUserInfoRedux, IUserLoginPayload>({
      query: (body) => ({
        url: "http://localhost:4001/auth/login",
        method: "POST",
        body,
      }),
    }),
    /** Get access_token / refresh_token by refresh_token */
    refreshToken: builder.mutation<IUserInfoRedux, { refreshToken: string }>({
      query: (body) => ({
        url: "http://localhost:4001/auth/refresh-token",
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

export const {
  useLoginMutation,
  useGetUserByIdQuery,
  useRefreshTokenMutation,
} = userApi;
