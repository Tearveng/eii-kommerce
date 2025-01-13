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

export interface IProductResponse {
  id: number;
  name: string;
  description: string;
  code: string;
  skuCode: string;
  price: number;
  quantity: number;
  thumbnail: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IProductGetAllPayload {
  limit: number;
  page: number;
}
