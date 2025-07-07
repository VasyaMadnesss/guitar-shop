import {createAction} from '@reduxjs/toolkit';
import { AppRoute, AuthStatus } from '../../const.js';

type Data = unknown[];

export const testStore = createAction<string>('data/testStore');

export const loadData = createAction<Data>('data/loadData');

export const setDataLoadingStatus = createAction<boolean>('data/setQuestionsDataLoadingStatus');

export const requireAuthorization = createAction<AuthStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('shop/redirectToRoute');
