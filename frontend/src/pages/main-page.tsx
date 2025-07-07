import { PropsWithChildren, useEffect } from 'react';
import { AppRoute, AuthStatus } from '../const.js';
import { useNavigate } from 'react-router-dom';
import { NotFoundPage } from './not-found-page.js';

type MainPageProps = PropsWithChildren<{
  authStatus: AuthStatus;
}>;

export function MainPage(props: MainPageProps) {
  const { authStatus } = props;
  const navigate = useNavigate();
  useEffect(() => {
    authStatus === AuthStatus.NoAuth ? navigate(AppRoute.Login) : navigate(AppRoute.Products);
  });

  return <NotFoundPage />;
}
