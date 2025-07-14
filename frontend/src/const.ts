import { GuitarProduct, GuitarType } from '@guitar-shop/shared'

export enum AppRoute {
  Root = '/',
  Loading = '/loading',
  Any = '/*',
  Login = '/login',
  Registration = '/registration',
  Product = '/product',
  Products = '/products',
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum ApiRoute {
  Products = 'api/products',
  Login = 'api/auth/login',
  Logout = '/logout',
  Register = 'api/auth/register',
}

export type updateFormData = {
  id: string,
  name: string,
  article: string,
  description: string,
  guitarType: GuitarType,
  photoString?: string,
  photo?: File,
  price: number,
  stringCount: number,
}

export enum ProductsPageUsingCase {
  Browse = 'browse',
  Manage = 'manage',
  Unknown = 'unknown',
}

export type ProductsPageApiResponse = {
  products: GuitarProduct[],
  currentPage: number,
  totalPages: number,
  itemsPerPage: number,
  totalItems: number,
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export enum SortBy {
  AddedDate = 'addedDate',
  Price = 'price',
}
