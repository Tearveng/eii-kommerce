import { IUserInfoRedux } from "../services/types/UserInterface.tsx";

export interface IApplication {
  deleteProductId: number | null;
  deleteUserId: number | null;
  productCurrentPage: number;
  user: IUserInfoRedux | null;
}
