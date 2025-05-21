import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITodoCreatePayload, ITodoResponse } from "./types/TodoInterface.ts";
import { RootState } from "../redux.ts";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${import.meta.env.VITE_HOST}:4001/todos`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).application.user?.access_token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    /** get all items */
    getAllTodos: builder.query<ITodoResponse[], void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: "Todo", id })) : [],
    }),

    /** create todo */
    createTodo: builder.mutation<ITodoResponse, ITodoCreatePayload>({
      query: (body) => ({
        url: "/create-todos",
        method: "POST",
        body,
      }),
      // Using `onQueryStarted` to update the cache manually without a refetch
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            todoApi.util.updateQueryData("getAllTodos", undefined, (draft) => {
              // Filter out the deleted post from the cached posts
              draft.push(data);
            }),
          );
        } catch (error) {
          // Handle error (if any)
          console.error("Failed to delete the product:", error);
        }
      },
    }),

    /** update todo */
    updateTodo: builder.mutation<
      ITodoResponse,
      { body: ITodoCreatePayload; id: number }
    >({
      query: ({ body, id }) => ({
        url: `/update-todos/${id}`,
        method: "PUT",
        body,
      }),
      // Using `onQueryStarted` to update the cache manually without a refetch
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            todoApi.util.updateQueryData("getAllTodos", undefined, (draft) => {
              const cpData = [...draft];
              // Filter out the deleted post from the cached posts
              const tempIndex = draft.findIndex((item) => item.id === id);
              cpData[tempIndex] = data;
              // Filter out the deleted post from the cached posts
              return cpData;
            }),
          );
        } catch (error) {
          // Handle error (if any)
          console.error("Failed to delete the product:", error);
        }
      },
    }),

    /** update todo order */
    updateOrderTodo: builder.mutation<
      { success: boolean },
      { orderedTodoIds: number[] }
    >({
      query: ({ orderedTodoIds }) => ({
        url: "/reorder",
        method: "PUT",
        body: { orderedTodoIds },
      }),
      // Using `onQueryStarted` to update the cache manually without a refetch
      // onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
      //   try {
      //     const { data } = await queryFulfilled;
      //     dispatch(
      //       todoApi.util.updateQueryData("getAllTodos", undefined, (draft) => {
      //         const cpData = [...draft];
      //         // Filter out the deleted post from the cached posts
      //         const tempIndex = draft.findIndex((item) => item.id === id);
      //         cpData[tempIndex] = data;
      //         // Filter out the deleted post from the cached posts
      //         return cpData;
      //       }),
      //     );
      //   } catch (error) {
      //     // Handle error (if any)
      //     console.error("Failed to delete the product:", error);
      //   }
      // },
    }),

    /** delete todo */
    deleteTodo: builder.mutation<ITodoResponse, { id: number }>({
      query: ({ id }) => ({
        url: `/delete-todos/${id}`,
        method: "DELETE",
      }),
      // Using `onQueryStarted` to update the cache manually without a refetch
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        try {
          // Wait for the delete mutation to be successful
          await queryFulfilled;
          dispatch(
            todoApi.util.updateQueryData("getAllTodos", undefined, (draft) => {
              // Filter out the deleted post from the cached posts
              return draft.filter((u) => u.id !== id);
            }),
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
  useGetAllTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useUpdateOrderTodoMutation,
} = todoApi;
