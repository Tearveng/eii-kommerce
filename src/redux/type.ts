import { IUserInfoRedux } from "../services/types/UserInterface.tsx";

export interface IApplication {
  deleteProductId: number | null;
  productCurrentPage: number;
  user: IUserInfoRedux | null;
}
