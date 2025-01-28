import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProductCreatePayload } from "./types/ProductInterface";
import { IUser, IUserGetAllPayload, IUserResponse } from "./types/UserInterface";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4001/admin" }),
  tagTypes: ["Admin", "User"],
  endpoints: (builder) => ({
    /** Get all products */
    getAllUsers: builder.query<IUser, IUserGetAllPayload>({
      query: ({ limit = 10, page = 1 }) => ({
        url: "/users",
        method: "GET",
        params: { limit, page },
      }),
      providesTags: (result) =>
        result ? result.data.map(({ id }) => ({ type: "Admin", id })) : [],
    }),

    createUser: builder.mutation<IUserResponse, IProductCreatePayload>({
          query: (body) => ({
            url: "/create-products",
            method: "POST",
            body,
          }),
          // Using `onQueryStarted` to update the cache manually without a refetch
          onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
            try {
              const queryParams = new URLSearchParams(window.location.search);
              const queryObject = {};
              queryParams.forEach((value, key) => {
                queryObject[key] = value;
              });
              const { page = 1, limit = 20 } = queryObject as Record<string, any>;
              const { data } = await queryFulfilled;
            //   dispatch(
            //     adminApi.util.updateQueryData(
            //       "getAllProducts",
            //       {
            //         limit: Number(limit),
            //         page: Number(page),
            //       },
            //       (draft) => {
            //         // Filter out the deleted post from the cached posts
            //         return {
            //           meta: {
            //             ...draft.meta,
            //             totalItems: draft.meta.totalItems + 1,
            //           },
            //           data: [data, ...draft.data],
            //         };
            //       },
            //     ),
            //   );
            } catch (error) {
              // Handle error (if any)
              console.error("Failed to delete the product:", error);
            }
          },
        }),
  }),
});

export const { useGetAllUsersQuery, useCreateUserMutation } = adminApi;
