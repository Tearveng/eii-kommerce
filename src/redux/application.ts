import { createSlice } from "@reduxjs/toolkit";
import { IApplication } from "./type.ts";

const initialState: IApplication = {
  deleteProductId: null,
  productCurrentPage: 1,
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
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
  dispatchDeleteProductId,
  dispatchProductCurrentPage,
  clearDeleteProductId,
} = applicationSlice.actions;

export default applicationSlice.reducer;
