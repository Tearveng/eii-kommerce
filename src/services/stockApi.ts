import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StockType } from "../utils/constant.ts";
import {
  IStock,
  IStockCreatePayload,
  IStockGetAllPayload,
  IStockResponse,
} from "./types/ProductInterface.tsx";

export const stocktApi = createApi({
  reducerPath: "stockApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${import.meta.env.VITE_HOST}:4000/stocks`,
  }),
  tagTypes: ["Stock"],
  endpoints: (builder) => ({
    /** Get all stocks */
    getAllStocks: builder.query<IStock, IStockGetAllPayload>({
      query: ({ limit = 10, page = 1, type = StockType.STOCK }) => ({
        url: "/",
        method: "GET",
        params: { limit, page, type },
      }),
      providesTags: (result) =>
        result ? result.data.map(({ id }) => ({ type: "Stock", id })) : [],
    }),

    /** Get product */
    createStock: builder.mutation<IStockResponse, IStockCreatePayload>({
      query: (body) => ({
        url: "/create-stocks",
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
          const {
            page = 1,
            limit = 20,
            type = StockType.STOCK,
          } = queryObject as Record<string, any>;
          const { data } = await queryFulfilled;
          dispatch(
            stocktApi.util.updateQueryData(
              "getAllStocks",
              {
                limit: Number(limit),
                page: Number(page),
                type,
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
              }
            )
          );
        } catch (error) {
          // Handle error (if any)
          console.error("Failed to delete the product:", error);
        }
      },
    }),

    /** Update product */
    updateStock: builder.mutation<
      IStockResponse,
      IStockCreatePayload & { id: number }
    >({
      query: ({ id, ...rest }) => ({
        url: `/update-stocks/${id}`,
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
          const {
            page = 1,
            limit = 20,
            type = StockType.STOCK,
          } = queryObject as Record<string, any>;
          // Wait for the delete mutation to be successful
          const { data } = await queryFulfilled;
          dispatch(
            stocktApi.util.updateQueryData(
              "getAllStocks",
              {
                limit: Number(limit),
                page: Number(page),
                type,
              },
              (draft) => {
                const cpData = [...draft.data];
                // Filter out the deleted post from the cached posts
                const tempIndex = draft.data.findIndex(
                  (item) => item.id === id
                );
                cpData[tempIndex] = data;
                return {
                  ...draft,
                  data: cpData,
                };
              }
            )
          );
        } catch (error) {
          // Handle error (if any)
          console.error("Failed to update the stock:", error);
        }
      },
    }),

    /** delete stock */
    deleteStock: builder.mutation<IStock, { id: number }>({
      query: ({ id }) => ({
        url: `/delete-stocks/${id}`,
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
          const {
            page = 1,
            limit = 20,
            type = StockType.STOCK,
          } = queryObject as Record<string, any>;
          // Wait for the delete mutation to be successful
          await queryFulfilled;
          dispatch(
            stocktApi.util.updateQueryData(
              "getAllStocks",
              {
                limit: Number(limit),
                page: Number(page),
                type,
              },
              (draft) => {
                // Filter out the deleted post from the cached posts
                return {
                  meta: {
                    ...draft.meta,
                    totalItems: draft.meta.totalItems - 1,
                  },
                  data: draft.data.filter((product) => product.id !== id),
                };
              }
            )
          );
        } catch (error) {
          // Handle error (if any)
          console.error("Failed to delete the stock:", error);
        }
      },
      // Invalidate the tag of the deleted post and the 'LIST'
      // invalidatesTags: (_result, _error, { id }) => [{ type: "Product", id }],
    }),

    /** Search stock by name / code / sku code base on type **/
    searchStocks: builder.query<IStock, { search: string; type: string }>({
      query: ({ search, type }) => ({
        url: "/search-stocks",
        method: "GET",
        params: { search, type },
      }),
    }),

    // /** Search product by name / code / sku code **/
    // searchProducts: builder.query<IProduct, { search: string }>({
    //   query: ({ search }) => ({
    //     url: "/search-products",
    //     method: "GET",
    //     params: { search },
    //   }),
    // }),

    /** Get stock by ID **/
    getStockById: builder.query<IStockResponse, { id: number }>({
      query: ({ id }) => ({
        url: `/stock/${id}`,
        method: "GET",
      }),
    }),

    // /** Upload image */
    // uploadImage: builder.mutation<IUploadImageResponse, { form: FormData }>({
    //   query: ({ form }) => ({
    //     url: "/upload/image",
    //     method: "POST",
    //     body: form,
    //   }),
    // }),

    // /** delete image */
    // deleteImage: builder.mutation<IUploadImageResponse, { publicId: string }>({
    //   query: ({ publicId }) => ({
    //     url: `/upload/image/${publicId}`,
    //     method: "DELETE",
    //   }),
    // }),
  }),
});

export const {
  // useSearchProductsQuery,
  useGetAllStocksQuery,
  useGetStockByIdQuery,
  useUpdateStockMutation,
  useDeleteStockMutation,
  useSearchStocksQuery,
  // useGetProductByIdQuery,
  // useUploadImageMutation,
  // useDeleteImageMutation,
  // useDeleteProductMutation,
  useCreateStockMutation,
  // useLazyGetProductByIdQuery,
  // useUpdateProductMutation,
} = stocktApi;
