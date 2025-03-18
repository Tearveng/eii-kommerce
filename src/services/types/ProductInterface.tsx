import { StockType } from "../../utils/constant";

export interface IMeta {
  currentPage: string;
  itemCount: number;
  itemsPerPage: string;
  totalItems: number;
  totalPages: number;
  totalThirtyDays: number;
}

export interface IProduct {
  data: IProductResponse[];
  meta: IMeta;
}

export interface IStock {
  data: IStockResponse[];
  meta: IMeta;
}

export interface IProductDataGrid {
  id: number;
  productName: string;
  productDescription: string;
  productCode: string;
  productSkuCode: string;
  productPrice: number;
  productQuantity: number;
  productThumbnail: string | null;
  productCreatedDate: string;
  productUpdatedDate: string;
}


export interface IStockDataGrid extends IProductDataGrid {
  productType: StockType
}

export interface IProductResponse {
  id: number;
  name: string;
  description: string;
  code: string;
  skuCode: string;
  price: number;
  quantity: number;
  publicId: string | null;
  thumbnail: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IStockResponse extends IProductResponse {
  type: StockType
}

export interface IStockCreatePayload extends IProductCreatePayload {
  type: StockType;
}

export interface IProductCreatePayload {
  name: string;
  description: string;
  code: string;
  skuCode: string;
  price: number;
  quantity: number;
  publicId: string | null;
  thumbnail: string | null;
}

export interface IProductGetAllPayload {
  limit?: number;
  page?: number;
}

export interface IStockGetAllPayload extends IProductGetAllPayload {
  type?: StockType
}

export interface IUploadImageResponse {
  message: string;
  imageUrl: string;
  public_id: string;
  originalFile: File | null;
}
