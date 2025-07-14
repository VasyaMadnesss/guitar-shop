import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import { checkAuthAction } from './store/actions/api-actions.js';
import ErrorMessage from './components/error-message/error-message.js';

store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App />
    </Provider>
  </StrictMode>
);
