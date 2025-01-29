import { createSlice } from "@reduxjs/toolkit";
import { IApplication } from "./type.ts";
import { IUserInfoRedux } from "../services/types/UserInterface.tsx";

const initialState: IApplication = {
  deleteProductId: null,
  productCurrentPage: 1,
  user: null,
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    dispatchUserInfo: (
      state,
      { payload }: { payload: IUserInfoRedux | null },
    ) => {
      state.user = payload;
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
  },
});

export const {
  dispatchUserInfo,
  dispatchDeleteProductId,
  dispatchProductCurrentPage,
  clearDeleteProductId,
} = applicationSlice.actions;

export default applicationSlice.reducer;
