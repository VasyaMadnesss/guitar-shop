import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state.js';
import { declareUserName, loadProducts, requestAuthorization } from '../actions/index.js';
import { saveToken, dropToken } from '../token.js';
import { ApiRoute, AuthStatus } from '../../const.js';
import {
  User,
  AuthData,
  RegisterData,
  GuitarProduct,
  TokenResponse,
} from '@guitar-shop/shared';
import { generateProducts } from '@guitar-shop/mocks';

export const fetchProductsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchProducts', async (_arg, { dispatch, extra: api }) => {
  // const { data } = await api.get<GuitarProduct[]>(ApiRoute.Products);
  const data = generateProducts();
  dispatch(loadProducts(data));
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const {data: { name } } = await api.get<TokenResponse>(ApiRoute.Login);
    dispatch(declareUserName(name))
    dispatch(requestAuthorization(AuthStatus.Auth));
  } catch {
    dispatch(requestAuthorization(AuthStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token, name },
    } = await api.post<TokenResponse>(ApiRoute.Login, { email, password });
    saveToken(token);
    dispatch(declareUserName(name))
    dispatch(requestAuthorization(AuthStatus.Auth));
  }
);

export const registerAction = createAsyncThunk<
  void,
  RegisterData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/register',
  async ({ login: email, password, name }, { dispatch, extra: api }) => {
    const {
      data: { token, name: userName},
    } = await api.post<TokenResponse>(ApiRoute.Register, { email, password, name });
    saveToken(token);
    dispatch(declareUserName(userName))
    dispatch(requestAuthorization(AuthStatus.Auth));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  // await api.delete(ApiRoute.Logout);
  dropToken();
  dispatch(requestAuthorization(AuthStatus.NoAuth));
});
