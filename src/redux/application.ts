import { createSlice } from "@reduxjs/toolkit";
import { IUserInfoRedux } from "../services/types/UserInterface.tsx";
import { IApplication, IPreviewRow, ISnackbarStatus } from "./type.ts";

const initialState: IApplication = {
  productCurrentPage: 1,
  snackbarMessage: null,
  snackbarStatus: "error",
  deleteProductId: null,
  deleteUserId: null,
  deleteStockId: null,
  user: null,
  previewRow: null,
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    dispatchPreviewRow: (
      state,
      { payload }: { payload: IPreviewRow | null },
    ) => {
      state.previewRow = payload;
    },
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
    dispatchDeleteStockId: (state, { payload }: { payload: number }) => {
      state.deleteStockId = payload;
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
    clearDeleteStockId: (state) => {
      state.deleteStockId = null;
    },
    clearDeleteUserId: (state) => {
      state.deleteUserId = null;
    },
  },
});

export const {
  dispatchPreviewRow,
  dispatchDeleteStockId,
  clearDeleteStockId,
  clearDeleteUserId,
  dispatchDeleteUserId,
  dispatchUserInfo,
  dispatchDeleteProductId,
  dispatchProductCurrentPage,
  dispatchSnackbar,
  clearDeleteProductId,
} = applicationSlice.actions;

export default applicationSlice.reducer;
