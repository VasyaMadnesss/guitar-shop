import { createAPI } from './api/api.js';
import { configureStore } from '@reduxjs/toolkit';
import { mainReducer } from './reducers/main-reducer.js';

export const api = createAPI();

export const store = configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
