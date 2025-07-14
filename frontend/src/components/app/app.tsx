import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const.js';
import { AddProductPage } from '../../pages/product-add-page.js';
import { EditProductPage } from '../../pages/product-edit-page.js';
import { ProductPage } from '../../pages/product-page.js';
import { ProductsPage } from '../../pages/products-page.js';
import { NotFoundPage } from '../../pages/not-found-page.js';
import { MainPage } from '../../pages/main-page.js';
import { useAppSelector } from '../../hooks/index.js';

import { AuthPage } from '../../pages/auth-page.js';
import LoadingScreen from '../../pages/loading-page.js';

export function App() {
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );

  if (authorizationStatus === AuthStatus.Unknown) {
    return <LoadingScreen />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage />}>
          <Route path={AppRoute.Products}>
            <Route index element={<NotFoundPage />} />
            <Route path=":mode" element={<ProductsPage />} />
          </Route>

          <Route path={AppRoute.Loading} element={<LoadingScreen />} />

          <Route
            path={AppRoute.Login}
            element={<AuthPage usingCase={AppRoute.Login} />}
          />
          <Route
            path={AppRoute.Registration}
            element={<AuthPage usingCase={AppRoute.Registration} />}
          />

          <Route path={AppRoute.Product}>
            <Route index element={<NotFoundPage />} />
            <Route path="show/:id" element={<ProductPage />} />
            <Route path="edit/:id" element={<EditProductPage />} />
            <Route path="add" element={<AddProductPage />} />
          </Route>

          <Route path={AppRoute.Any} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
