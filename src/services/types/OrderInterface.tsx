import { IMeta } from "./ProductInterface";

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
  refererCode: string;
  discount: number;
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
  couponCode: string;
  currency: string;
  discount: number;
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
