import { createReducer } from '@reduxjs/toolkit';
import {
  declareUserName,
  deleteSingleProduct,
  getProductData,
  getProductsPageData,
  requestAuthorization,
  setError,
  setLoadingStatus,
} from '../actions/index.js';
import { AuthStatus, ProductsPageApiResponse } from '../../const.js';
import { GuitarProduct, GuitarType, User } from '@guitar-shop/shared';

type InitalState = {
  productsPageData: ProductsPageApiResponse;
  activeProduct: GuitarProduct;
  token: string | null;
  user: Omit<User, 'password'>;
  authorizationStatus: AuthStatus;
  isLoading: boolean;
  errorMessage: string | null;
};

const initialState: InitalState = {
  productsPageData: {
    products: [],
    currentPage: 1,
    itemsPerPage: 7,
    totalItems: 0,
    totalPages: 1,
  },
  activeProduct: {
    name: '',
    description: '',
    addedDate: '',
    photo: '',
    guitarType: GuitarType.Acoustic,
    stringCount: 6,
    price: 0,
    article: '',
    id: '',
  },
  authorizationStatus: AuthStatus.Unknown,
  isLoading: false,
  user: { email: '', name: '', token: '' },
  token: '',
  errorMessage: null,
};

const mainReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requestAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(declareUserName, (state, action) => {
      state.user.name = action.payload;
    })
    .addCase(getProductsPageData, (state, action) => {
      state.productsPageData = action.payload;
    })
    .addCase(setLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(getProductData, (state, action) => {
      state.activeProduct = action.payload;
    })
    .addCase(deleteSingleProduct, (state, action) => {
      const id = action.payload;
      state.productsPageData.products = state.productsPageData.products.filter(
        (item) => item.id !== id
      );
    })
    .addCase(setError, (state, action) => {
      state.errorMessage = action.payload;
    });
});

export { mainReducer };
