import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";
import { applicationSlice } from "./redux/application";
import { adminApi } from "./services/adminApi.ts";
import { cartApi } from "./services/cartApi.ts";
import { orderApi } from "./services/orderApi.ts";
import { productApi } from "./services/productApi";
import { stocktApi } from "./services/stockApi.ts";
import { userApi } from "./services/userApi";
import { itemApi } from "./services/itemApi.ts";
import { todoApi } from "./services/todoApi.ts";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [stocktApi.reducerPath]: stocktApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [itemApi.reducerPath]: itemApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
    application: applicationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      productApi.middleware,
      cartApi.middleware,
      adminApi.middleware,
      stocktApi.middleware,
      orderApi.middleware,
      itemApi.middleware,
      todoApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
