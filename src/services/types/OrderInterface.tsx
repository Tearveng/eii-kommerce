import { IMeta } from "./ProductInterface";
import { ORDER_STATUS } from "../../utils/constant.ts";
import { IUserResponse } from "./UserInterface.tsx";

export interface IPayloadItems {
  id: number;
  code: string;
  skuCode: string;
  quantity: number;
  discount: number;
}

export interface IOrderCreatePayload {
  items: IPayloadItems[];
  clientId: number;
  profileId: number;
  address: string;
}

export interface IOrderGetAllPayload {
  limit?: number;
  page?: number;
}

export interface IOrderResponse {
  id: number;
  profileId: number;
  clientId: number;
  client: IUserResponse;
  profile: IUserResponse;
  refererCode: string;
  discount: number;
  status: ORDER_STATUS;
  total: number;
  subtotal: number;
  totalPrice: number;
  currency: string;
  couponCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDataGrid {
  id: number;
  clientId: number;
  profileId: number;
  client: IUserResponse;
  profile: IUserResponse;
  couponCode: string;
  currency: string;
  discount: number;
  status: ORDER_STATUS;
  refererCode: string;
  orderSubtotal: number;
  orderTotal: number;
  orderTotalPrice: number;
  orderCreatedDate: string;
  orderUpdatedDate: string;
}

export interface IOrder {
  data: IOrderResponse[];
  meta: IMeta;
}
