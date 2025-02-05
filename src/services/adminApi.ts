import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUploadImageResponse } from "./types/ProductInterface";
import {
  IUser,
  IUserCreatePayload,
  IUserGetAllPayload,
  IUserResponse,
  IUserUpdatePayload,
} from "./types/UserInterface";
import { store } from "../redux.ts";

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

    /** Upload image */
    uploadImage: builder.mutation<IUploadImageResponse, { form: FormData }>({
      query: ({ form }) => ({
        url: "/upload/image/profile",
        method: "POST",
        body: form,
      }),
    }),

    /** delete image */
    deleteImage: builder.mutation<IUploadImageResponse, { publicId: string }>({
      query: ({ publicId }) => ({
        url: `/upload/image/profile/${publicId}`,
        method: "DELETE",
      }),
    }),

    /** get user info */
    getUserInfo: builder.query<IUser, void>({
      query: () => ({
        url: "/user-info",
        method: "GET",
        headers: {
          authorization: `bearer ${store.getState().application.user.access_token}`,
        },
      }),
      // providesTags: (result) =>
      //   result ? result.data.map(({ id }) => ({ type: "Admin", id })) : [],
    }),

    /** Update user */
    updateUser: builder.mutation<
      IUserResponse,
      IUserUpdatePayload & { id: number }
    >({
      query: ({ id, ...rest }) => ({
        url: `/update-users/${id}`,
        method: "PUT",
        body: rest,
      }),
      // Using `onQueryStarted` to update the cache manually without a refetch
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        try {
          const queryParams = new URLSearchParams(window.location.search);
          const queryObject = {};
          queryParams.forEach((value, key) => {
            queryObject[key] = value;
          });
          const { page, limit } = queryObject as Record<string, any>;
          // Wait for the delete mutation to be successful
          const { data } = await queryFulfilled;
          dispatch(
            adminApi.util.updateQueryData(
              "getAllUsers",
              {
                limit: Number(limit),
                page: Number(page),
              },
              (draft) => {
                const cpData = [...draft.data];
                // Filter out the deleted post from the cached posts
                const tempIndex = draft.data.findIndex(
                  (item) => item.id === id,
                );
                cpData[tempIndex] = data;
                return {
                  ...draft,
                  data: cpData,
                };
              },
            ),
          );
        } catch (error) {
          // Handle error (if any)
          console.error("Failed to delete the product:", error);
        }
      },
    }),

    /** Create user */
    createUser: builder.mutation<IUserResponse, IUserCreatePayload>({
      query: (body) => ({
        url: "/create-user",
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
          dispatch(
            adminApi.util.updateQueryData(
              "getAllUsers",
              {
                limit: Number(limit),
                page: Number(page),
              },
              (draft) => {
                // Filter out the deleted post from the cached posts
                return {
                  meta: {
                    ...draft.meta,
                    totalItems: draft.meta.totalItems + 1,
                  },
                  data: [data, ...draft.data],
                };
              },
            ),
          );
        } catch (error) {
          // Handle error (if any)
          console.error("Failed to delete the product:", error);
        }
      },
    }),

    /** Delete user */
    deleteUser: builder.mutation<IUserResponse, { id: number }>({
      query: ({ id }) => ({
        url: `/delete-users/${id}`,
        method: "DELETE",
      }),
      // Using `onQueryStarted` to update the cache manually without a refetch
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        try {
          const queryParams = new URLSearchParams(window.location.search);
          const queryObject = {};
          queryParams.forEach((value, key) => {
            queryObject[key] = value;
          });
          const { page, limit } = queryObject as Record<string, any>;
          // Wait for the delete mutation to be successful
          await queryFulfilled;
          dispatch(
            adminApi.util.updateQueryData(
              "getAllUsers",
              {
                limit: Number(limit),
                page: Number(page),
              },
              (draft) => {
                // Filter out the deleted post from the cached posts
                return {
                  meta: {
                    ...draft.meta,
                    totalItems: draft.meta.totalItems - 1,
                  },
                  data: draft.data.filter((u) => u.id !== id),
                };
              },
            ),
          );
        } catch (error) {
          // Handle error (if any)
          console.error("Failed to delete the user:", error);
        }
      },
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useGetAllUsersQuery,
  useCreateUserMutation,
  useUploadImageMutation,
  useDeleteImageMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = adminApi;
