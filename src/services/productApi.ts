import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IProduct,
  IProductCreatePayload,
  IProductGetAllPayload,
  IProductResponse,
  IUploadImageResponse,
} from "./types/ProductInterface.tsx";
import { store } from "../redux.ts";
import { useSearchParams } from "react-router-dom";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/products" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    /** Get all products */
    getAllProducts: builder.query<IProduct, IProductGetAllPayload>({
      query: ({ limit = 10, page = 1 }) => ({
        url: "/",
        method: "GET",
        params: { limit, page },
      }),
      providesTags: (result) =>
        result ? result.data.map(({ id }) => ({ type: "Product", id })) : [],
    }),

    /** Get product */
    createProduct: builder.mutation<IProduct, IProductCreatePayload>({
      query: (body) => ({
        url: "/create-products",
        method: "POST",
        body,
      }),
      // Invalidate the 'Post' tag after a new post is added, causing a refetch
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    /** Update product */
    updateProduct: builder.mutation<
      IProduct,
      IProductCreatePayload & { id: number }
    >({
      query: ({ id, ...rest }) => ({
        url: `/update-products/${id}`,
        method: "PUT",
        body: rest,
      }),
      // Invalidate the 'Post' tag after a new post is added, causing a refetch
      // invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    /** Get product */
    deleteProduct: builder.mutation<IProduct, { id: number }>({
      query: ({ id }) => ({
        url: `/delete-products/${id}`,
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
            productApi.util.updateQueryData(
              "getAllProducts",
              {
                limit: Number(limit),
                page: Number(page),
              },
              (draft) => {
                // Filter out the deleted post from the cached posts
                return {
                  ...draft,
                  data: draft.data.filter((product) => product.id !== id),
                };
              },
            ),
          );
        } catch (error) {
          // Handle error (if any)
          console.error("Failed to delete the product:", error);
        }
      },
      // Invalidate the tag of the deleted post and the 'LIST'
      // invalidatesTags: (_result, _error, { id }) => [{ type: "Product", id }],
    }),

    /** Get product by ID **/
    getProductById: builder.query<IProductResponse, { id: number }>({
      query: ({ id }) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),

    /** Upload image */
    uploadImage: builder.mutation<IUploadImageResponse, { form: FormData }>({
      query: ({ form }) => ({
        url: "/upload/image",
        method: "POST",
        body: form,
      }),
    }),

    /** delete image */
    deleteImage: builder.mutation<IUploadImageResponse, { publicId: string }>({
      query: ({ publicId }) => ({
        url: `/upload/image/${publicId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useUploadImageMutation,
  useDeleteImageMutation,
  useDeleteProductMutation,
  useCreateProductMutation,
  useLazyGetProductByIdQuery,
  useUpdateProductMutation,
} = productApi;
