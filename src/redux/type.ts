import { IUserInfoRedux } from "../services/types/UserInterface.tsx";
import { GridValidRowModel } from "@mui/x-data-grid";

export interface IApplication {
  deleteProductId: number | null;
  deleteUserId: number | null;
  productCurrentPage: number;
  user: IUserInfoRedux | null;
  previewRow: IPreviewRow | null;
  snackbarMessage: string | null;
  snackbarStatus: ISnackbarStatus;
}

export type ISnackbarStatus = "error" | "success" | "info" | "warning";

export interface IErrorConnection {
  error: string;
  status: "FETCH_ERROR";
}

export interface IErrorType {
  data: any;
  status: number;
}

export interface IPreviewRow extends GridValidRowModel {
  type: string;
}
