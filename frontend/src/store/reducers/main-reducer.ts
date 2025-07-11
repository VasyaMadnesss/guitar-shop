import { createReducer } from '@reduxjs/toolkit';
import {
  declareUserName,
  loadProducts,
  requestAuthorization,
  setLoadingStatus,
} from '../actions/index.js';
import { AuthStatus } from '../../const.js';
import { GuitarProduct, User } from '@guitar-shop/shared';

type InitalState = {
  guitarProducts: GuitarProduct[];
  token: string | null;
  user: Omit<User, 'password'>;
  authorizationStatus: AuthStatus;
  isLoading: boolean;
  errorMessage: string;
};

const initialState: InitalState = {
  guitarProducts: [],
  authorizationStatus: AuthStatus.Unknown,
  isLoading: false,
  user: { email: '', name: '', token: '' },
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
    .addCase(declareUserName, (state, action) => {
      state.user.name = action.payload;
    });
});

export { mainReducer };
