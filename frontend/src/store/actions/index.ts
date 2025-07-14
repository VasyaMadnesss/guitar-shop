import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthStatus, ProductsPageApiResponse } from '../../const.js';
import { GuitarProduct, User } from '@guitar-shop/shared';
import { create } from 'domain';

export const getProductsPageData = createAction<ProductsPageApiResponse>('data/getProductsPageProperties');

export const getProductData = createAction<GuitarProduct>('data/getProduct');

export const setLoadingStatus = createAction<boolean>('app/setLoadingStatus');

export const requestAuthorization = createAction<AuthStatus>(
  'user/requestAuthorization'
);

export const setError = createAction<string | null>('app/setError');

export const deleteSingleProduct = createAction<string>('data/deleteProduct');

export const declareUserName = createAction<User['name']>('user/declareName');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

