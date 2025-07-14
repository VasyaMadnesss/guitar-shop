import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const.js';
import { AddProductPage } from '../../pages/product-add-page.js';
import { EditProductPage } from '../../pages/product-edit-page.js';
import { ProductPage } from '../../pages/product-page.js';
import { ProductsPage } from '../../pages/products-page.js';
import { NotFoundPage } from '../../pages/not-found-page.js';
import { MainPage } from '../../pages/main-page.js';
import { useAppDispatch } from '../../hooks/index.js';
import { checkAuthAction } from '../../store/actions/api-actions.js';
import { useEffect } from 'react';
import { AuthPage } from '../../pages/auth-page.js';
import LoadingScreen from '../../pages/loading-page.js';

export function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);
  return (
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
  );
}

export default App;
