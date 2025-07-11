/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import { AuthStatus, AppRoute } from '../../const.js';
import { useAppDispatch, useAppSelector } from '../../hooks/index.js';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { logoutAction } from '../../store/actions/api-actions.js';

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

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    };

    if (isPopupOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isPopupOpen]);

  const handleLogoutClick = (evt: SyntheticEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
    setIsPopupOpen(false);
  };

  const handleUserIconClick = (evt: SyntheticEvent) => {
    evt.preventDefault();
    if (authStatus === AuthStatus.Auth) {
      setIsPopupOpen(!isPopupOpen);
    }
  };

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
            <ul className="main-nav__list">{navItems}</ul>
          </nav>

          <div className="header__container">
            <span className="header__user-name">{userName}</span>

            <a
              className="header__link"
              href="%"
              aria-label="Перейти в личный кабинет"
              onClick={handleUserIconClick}
            >
              <svg
                className="header__link-icon"
                width={12}
                height={14}
                aria-hidden="true"
              >
                <use xlinkHref="#icon-account" />
              </svg>
            </a>

            {authStatus === AuthStatus.Auth && isPopupOpen && (
              <div ref={popupRef} className="user-menu-popup">
                <button
                  className="user-menu-popup__button"
                  onClick={handleLogoutClick}
                >
                  Выйти
                </button>
              </div>
            )}

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
