export interface IMeta {
  currentPage: string;
  itemCount: number;
  itemsPerPage: string;
  totalItems: number;
  totalPages: number;
}

export interface IProduct {
  data: IProductResponse[];
  meta: IMeta;
}

export interface IProductDataGrid {
  id: number;
  productName: string;
  productCode: string;
  productSkuCode: string;
  productPrice: number;
  productQuantity: number;
  productThumbnail: string | null;
  productCreatedDate: string;
  productUpdatedDate: string;
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

export interface IUploadImageResponse {
  message: string;
  imageUrl: string;
  public_id: string;
  originalFile: File | null;
}
