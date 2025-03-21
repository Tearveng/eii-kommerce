import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IItem, IItemGetAllPayload } from "./types/ItemInterface.tsx";

export const itemApi = createApi({
  reducerPath: "itemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${import.meta.env.VITE_HOST}:4002/items`,
  }),
  tagTypes: ["Item"],
  endpoints: (builder) => ({
    /** get all items */
    getAllItems: builder.query<IItem, IItemGetAllPayload>({
      query: ({ limit = 10, page = 1 }) => ({
        url: "/",
        method: "GET",
        params: { limit, page },
      }),
      providesTags: (result) =>
        result
          ? result.data.map(({ itemId }) => ({ type: "Item", itemId }))
          : [],
    }),
  }),
});

export const { useGetAllItemsQuery } = itemApi;
