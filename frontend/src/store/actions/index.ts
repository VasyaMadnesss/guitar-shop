import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthStatus } from '../../const.js';
import { GuitarProduct } from '@guitar-shop/shared';

export const loadProducts = createAction<GuitarProduct[]>('data/loadProducts');

export const setLoadingStatus = createAction<boolean>('app/setLoadingStatus');

export const requestAuthorization = createAction<AuthStatus>(
  'user/requestAuthorization'
);

export const redirectToRoute = createAction<AppRoute>('shop/redirectToRoute');

export const switchAuth = createAction('switchAuth');
