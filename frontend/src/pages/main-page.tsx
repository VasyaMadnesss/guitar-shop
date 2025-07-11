import { AppRoute, AuthStatus } from '../const.js';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/index.js';
import { Header } from '../components/header/header.js';
import { Footer } from '../components/footer/footer.js';
import { useEffect } from 'react';

export function MainPage() {
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const navigate = useNavigate();
  useEffect(() => {
    navigate(
      authStatus === AuthStatus.Auth
        ? `${AppRoute.Products}/browse`
        : AppRoute.Login
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
