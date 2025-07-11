import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthStatus } from '../../const.js';
import { GuitarProduct, User } from '@guitar-shop/shared';

export const loadProducts = createAction<GuitarProduct[]>('data/loadProducts');

export const setLoadingStatus = createAction<boolean>('app/setLoadingStatus');

export const requestAuthorization = createAction<AuthStatus>(
  'user/requestAuthorization'
);

export const declareUserName = createAction<User['name']>('user/declareName');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

