import { IMeta } from "./ProductInterface.tsx";
import { IUserInfo } from "./UserInterface.tsx";

export interface ICartGetAllPayload {
  limit?: number;
  page?: number;
}

export interface ICartResponse {
  cartId: number;
  user: IUserInfo;
  subtotal: number;
  tax: number;
  shippingCost: number;
  totalPrice: number;
  currency: string;
  couponCode: string;
  discountsApplied: number;
  isSavedForLater: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartDataGrid {
  id: number;
  user: string;
  cartSubtotal: number;
  cartTax: number;
  cartShippingCost: number;
  cartTotalPrice: number;
  cartCurrency: string;
  cartCouponCode: string;
  cartDiscountApplied: number;
  cartIsSavedForLater: boolean;
  cartCreatedDate: Date;
  cartUpdatedDate: Date;
}

export interface ICart {
  data: ICartResponse[];
  meta: IMeta;
}
