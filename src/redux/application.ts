import { createSlice } from "@reduxjs/toolkit";
import { IUserInfoRedux } from "../services/types/UserInterface.tsx";
import { IApplication, ISnackbarStatus } from "./type.ts";

const initialState: IApplication = {
  productCurrentPage: 1,
  snackbarMessage: null,
  snackbarStatus: "error",
  deleteProductId: null,
  deleteUserId: null,
  user: null,
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    dispatchSnackbar: (
      state,
      {
        payload,
      }: { payload: { message: string | null; status: ISnackbarStatus } },
    ) => {
      state.snackbarMessage = payload.message;
      state.snackbarStatus = payload.status;
    },
    dispatchUserInfo: (
      state,
      { payload }: { payload: IUserInfoRedux | null },
    ) => {
      state.user = payload;
    },
    dispatchDeleteUserId: (state, { payload }: { payload: number }) => {
      state.deleteUserId = payload;
    },
    dispatchDeleteProductId: (state, { payload }: { payload: number }) => {
      state.deleteProductId = payload;
    },
    dispatchProductCurrentPage: (state, { payload }: { payload: number }) => {
      state.productCurrentPage = payload;
    },
    clearDeleteProductId: (state) => {
      state.deleteProductId = null;
    },
    clearDeleteUserId: (state) => {
      state.deleteUserId = null;
    },
  },
});

export const {
  clearDeleteUserId,
  dispatchDeleteUserId,
  dispatchUserInfo,
  dispatchDeleteProductId,
  dispatchProductCurrentPage,
  dispatchSnackbar,
  clearDeleteProductId,
} = applicationSlice.actions;

export default applicationSlice.reducer;
