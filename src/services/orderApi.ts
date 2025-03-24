import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IOrder,
  IOrderCreatePayload,
  IOrderGetAllPayload,
  IOrderSummary,
} from "./types/OrderInterface";
import { IUserInfoRedux } from "./types/UserInterface";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${import.meta.env.VITE_HOST}:4002/orders`,
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    /** get all orders */
    getAllOrders: builder.query<IOrder, IOrderGetAllPayload>({
      query: ({ limit = 10, page = 1 }) => ({
        url: "/",
        method: "GET",
        params: { limit, page },
      }),
      providesTags: (result) =>
        result ? result.data.map(({ id }) => ({ type: "Order", id })) : [],
    }),

    /** get orders summary */
    getOrdersSummary: builder.query<IOrderSummary, void>({
      query: () => ({
        url: "/order-summary",
        method: "GET",
      }),
      // providesTags: (result) =>
      //   result ? result.data.map(({ id }) => ({ type: "Order", id })) : [],
    }),

    /** create order */
    createOrder: builder.mutation<IUserInfoRedux, IOrderCreatePayload>({
      query: (body) => ({
        url: "/create-orders",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetOrdersSummaryQuery,
  useGetAllOrdersQuery,
  useCreateOrderMutation,
} = orderApi;
