import { Route, Routes} from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const.js';
import { LoginPage } from '../../pages/login-page.js';
import { RegistrationPage } from '../../pages/registration-page.js';
import { AddProductPage } from '../../pages/product-add-page.js';
import { EditProductPage } from '../../pages/product-edit-page.js';
import { ProductPage } from '../../pages/product-page.js';
import { ProductsPage } from '../../pages/products-page.js';
import { NotFoundPage } from '../../pages/not-found-page.js';
import { MainPage } from '../../pages/main-page.js';

export function App() {
  return (
    <Routes>
      <Route path={AppRoute.Root}>
        <Route index element={<MainPage authStatus={AuthStatus.NoAuth} />}></Route>

        <Route path={AppRoute.Login} element={<LoginPage />}></Route>
        <Route path={AppRoute.Registration} element={<RegistrationPage />}></Route>

        <Route path={AppRoute.Products} element={<ProductsPage />}></Route>

        <Route path={AppRoute.Product}>
          <Route index element={<NotFoundPage />}></Route>
          <Route path="add" element={<AddProductPage />}></Route>

          <Route path=":id" element={<ProductPage />}>
            <Route path="edit" element={<EditProductPage />}></Route>
          </Route>
        </Route>

        <Route path={AppRoute.Any} element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
