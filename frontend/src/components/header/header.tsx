import { Link } from 'react-router-dom';
import { AuthStatus, AppRoute } from '../../const.js';
import { useAppDispatch, useAppSelector } from '../../hooks/index.js';
import { SyntheticEvent } from 'react';
import { switchAuth } from '../../store/actions/index.js';

const getHeaderClass = (authStatus: AuthStatus): string => {
  let additionalClass = '';

  switch (true) {
    case authStatus === AuthStatus.Auth:
      additionalClass = 'header--admin';
      break;
  }

  const className = `header ${additionalClass}`.trim();

  return className;
};

export function Header() {
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const userName = useAppSelector((state) => state.user?.name);
  const dispatch = useAppDispatch();
  const cartCount = 0;
  const showCart = false;

  const handleSwitchAuthClick = (evt: SyntheticEvent) => {
    evt.preventDefault();
    dispatch(switchAuth());
  }

  const headerClass = getHeaderClass(authStatus);
  const navItems =
    authStatus === AuthStatus.Auth ? ( // список своих товаров vs где купить ?
      <>
        <li className="main-nav__item">
          <Link
            className="link main-nav__link"
            to={`${AppRoute.Products}/browse`}
          >
            Каталог
          </Link>
        </li>
        <li className="main-nav__item">
          <Link
            className="link main-nav__link"
            to={`${AppRoute.Products}/manage`}
          >
            Список товаров
          </Link>
        </li>
      </>
    ) : (
      <>
        <li className="main-nav__item">
          <Link
            className="link main-nav__link"
            to={`${AppRoute.Products}/browse`}
          >
            Каталог
          </Link>
        </li>
        <li className="main-nav__item">
          <a className="link main-nav__link" href="#">
            Где купить?
          </a>
        </li>
        <li className="main-nav__item">
          <a className="link main-nav__link" href="#">
            О компании
          </a>
        </li>
      </>
    );

  return (
    <header className={headerClass} id="header">
      <div className="container">
        <div className="header__wrapper">
          <Link className="header__logo logo" to={AppRoute.Root}>
            <img
              className="logo__img"
              width={70}
              height={70}
              src="/img/svg/logo.svg"
              alt="Логотип"
            />
          </Link>

          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <a className="link main-nav__link" href={'#'} onClick={handleSwitchAuthClick}>
                  Switch Auth
                </a>
              </li>
              {navItems}
            </ul>
          </nav>

          <div className="header__container">
            <span className="header__user-name">{userName}</span>

            <a
              className="header__link"
              href="login.html"
              aria-label="Перейти в личный кабинет"
            >
              <svg
                className="header__link-icon"
                width={12}
                height={14}
                aria-hidden="true"
              >
                <use xlinkHref="#icon-account" />
              </svg>
              <span className="header__link-text">Вход</span>
            </a>

            {showCart ?? (
              <a
                className="header__cart-link"
                href="cart.html"
                aria-label="Перейти в корзину"
              >
                <svg
                  className="header__cart-icon"
                  width={14}
                  height={14}
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-basket" />
                </svg>
                {cartCount > 0 && (
                  <span className="header__cart-count">{cartCount}</span>
                )}
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
