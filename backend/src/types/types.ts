import { Product as ProductPrisma } from '@guitar-shop/prisma';

export type AuthUserDb = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
};

export enum GuitarType {
  Electro = 'ELECTRO',
  Acoustic = 'ACOUSTIC',
  Ukulele = 'UKULELE',
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export enum SortBy {
  AddedDate = 'addedDate',
  Price = 'price',
}

export type ProductDb = ProductPrisma;

export type Product = Omit<
  ProductDb,
  'createdAt' | 'updatedAt' | 'price' | 'addedDate'
> & {
  price: number;
  addedDate: string;
};

export type UserDb = Omit<AuthUserDb, 'passwordHash'>;

export type AuthUser = Omit<AuthUserDb, 'createdAt' | 'updatedAt'>;

export type User = Omit<UserDb, 'createdAt' | 'updatedAt'>;

export type JwtPayload = {
  email: string;
  sub: string;
};
