import { IMeta } from "./ProductInterface.tsx";
import { IUserResponse } from "./UserInterface.tsx";

export interface IItemResponse {
  client: IUserResponse;
  profile: IUserResponse;
  clientId: number;
  createdAt: string;
  isInStock: boolean;
  itemId: string;
  name: string;
  price: string;
  discount: string;
  productCode: string;
  productUrl: string;
  profileId: number;
  quantity: number;
  sku: string;
  stockUrl: string;
  subtotal: string;
  tax: string;
  totalPrice: string;
  updatedAt: string;
  variant: Record<string, string>;
}

export interface IItem {
  data: IItemResponse[];
  meta: IMeta;
}

export interface IItemGetAllPayload {
  limit?: number;
  page?: number;
}

export interface IItemDataGrid {
  id: string;
  clientId: number;
  itemId: string;
  profileId: number;
  client: IUserResponse;
  profile: IUserResponse;
  isInStock: boolean;
  productCode: string;
  productUrl: string;
  stockUrl: string;
  stockSkuCode: string;
  variant: Record<string, string>;
  itemDiscount: string;
  itemName: string;
  itemPrice: string;
  itemQuantity: number;
  itemSubtotal: string;
  itemTax: string;
  itemTotalPrice: string;
  itemCreatedDate: string;
  itemUpdatedDate: string;
}
