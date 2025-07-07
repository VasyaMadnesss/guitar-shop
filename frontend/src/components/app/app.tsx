import { Route, Routes, Link } from 'react-router-dom';
import { AppRoute } from '../../const.js';

export function App() {
  return (
  <Routes>
    <Route path={AppRoute.Root}>
      <Route index element={<>каталог товаров</>}></Route>

      <Route path={AppRoute.Login} element={<>авторизация</>}></Route>
      <Route path={AppRoute.Register} element={<>регистрация</>}></Route>

      <Route path={AppRoute.Product}>
        <Route index element={<>404</>}></Route>
        <Route path=':id' element={<>товар</>}></Route>
      </Route>

      <Route path={AppRoute.Any} element={<>404</>}></Route>
    </Route>
  </Routes>
  );
}

export default App;
