import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IProduct,
  IProductGetAllPayload,
  IProductResponse,
} from "./types/ProductInterface.tsx";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/products" }),
  endpoints: (builder) => ({
    /** Get all products */
    getAllProducts: builder.query<IProduct, IProductGetAllPayload>({
      query: ({ limit = 10, page = 1 }) => ({
        url: "/",
        method: "GET",
        params: { limit, page },
      }),
    }),

    /** Get product by ID **/
    getProductById: builder.query<IProductResponse, { id: number }>({
      query: ({ id }) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),

    /** Upload image */
    uploadImage: builder.mutation<string, { form: FormData }>({
      query: ({ form }) => ({
        url: "/upload/image",
        method: "POST",
        body: form,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useUploadImageMutation,
} = productApi;
