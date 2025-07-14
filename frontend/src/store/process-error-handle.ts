import {store} from '../store';
import { setError } from './actions/index.js';
import { clearErrorAction } from './actions/api-actions.js';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};
