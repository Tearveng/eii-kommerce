import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUserLoginPayload } from "./types/UserInterface";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    login: builder.mutation<any, IUserLoginPayload>({
      query: (body) => ({
        url: "/login",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = userApi;
