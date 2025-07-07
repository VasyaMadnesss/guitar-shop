import { createReducer } from '@reduxjs/toolkit';
import { loadData, requireAuthorization, setDataLoadingStatus, testStore } from '../actions/index.js';
import { AuthStatus } from '../../const.js';

type InitalState = {
  data: unknown[];
  authorizationStatus: AuthStatus;
  isDataLoading: boolean;
  test: string;
};

const initialState: InitalState = {
  test: '',
  data: [],
  authorizationStatus: AuthStatus.Unknown,
  isDataLoading: false,
};

const mainReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadData, (state, action) => {
      state.data = action.payload;
    })
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(testStore, (state, action) => {
      state.test = action.payload;
    });
});

export { mainReducer };
