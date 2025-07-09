import { createReducer } from '@reduxjs/toolkit';
import {
  loadProducts,
  requestAuthorization,
  setLoadingStatus,
  switchAuth,
} from '../actions/index.js';
import { AuthStatus } from '../../const.js';
import { GuitarProduct, User } from '@guitar-shop/shared';

type InitalState = {
  guitarProducts: GuitarProduct[];
  token: string | null;
  user: Omit<User, 'password'> | null;
  authorizationStatus: AuthStatus;
  isLoading: boolean;
  errorMessage: string;
};

const initialState: InitalState = {
  guitarProducts: [],
  authorizationStatus: AuthStatus.Unknown,
  isLoading: false,
  user: null,
  token: '',
  errorMessage: '',
};

const mainReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(requestAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadProducts, (state, action) => {
      state.guitarProducts = action.payload;
    })
    .addCase(switchAuth, (state, action) => {
      state.authorizationStatus = state.authorizationStatus === AuthStatus.Auth
        ? AuthStatus.NoAuth
        : AuthStatus.Auth;
    });
});

export { mainReducer };
