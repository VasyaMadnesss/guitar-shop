import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state.js';
import {
  declareUserName,
  deleteSingleProduct,
  getProductData,
  getProductsPageData,
  requestAuthorization,
  setError,
} from '../actions/index.js';
import { saveToken, dropToken } from '../token.js';
import { ApiRoute, AuthStatus, ProductsPageApiResponse } from '../../const.js';
import {
  AuthData,
  GuitarProduct,
  RegisterData,
  TokenResponse,
} from '@guitar-shop/shared';
import { store } from '../index.js';

export const deleteOneProduct = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/deleteProduct', async (id, { getState, dispatch, extra: api }) => {
  await api.delete(`${ApiRoute.Products}/${id}`);
  dispatch(deleteSingleProduct(id))
});

export const fetchOneProduct = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchProduct', async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<GuitarProduct>(`${ApiRoute.Products}/${id}`);
  dispatch(getProductData(data));
});

export const updateProduct = createAsyncThunk<
  void,
  FormData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/updateProduct', async (formData, { dispatch, extra: api }) => {
  await api.patch(ApiRoute.Products, formData);
});

export const createProduct = createAsyncThunk<
  void,
  FormData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/createProduct', async (formData, { dispatch, extra: api }) => {
  await api.post(ApiRoute.Products, formData);
});

export const fetchProductsPageDataAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchProducts', async (route, { getState, dispatch, extra: api }) => {
  const { data } = await api.get<ProductsPageApiResponse>(route);
  dispatch(getProductsPageData(data));
});

export const clearErrorAction = createAsyncThunk(
  'game/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      2000,
    );
  },
);

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
    const {
      data: { name },
    } = await api.get<TokenResponse>(ApiRoute.Login);
    dispatch(declareUserName(name));
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
    dispatch(declareUserName(name));
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
      data: { token, name: userName },
    } = await api.post<TokenResponse>(ApiRoute.Register, {
      email,
      password,
      name,
    });
    saveToken(token);
    dispatch(declareUserName(userName));
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
  dropToken();
  dispatch(requestAuthorization(AuthStatus.NoAuth));
});
