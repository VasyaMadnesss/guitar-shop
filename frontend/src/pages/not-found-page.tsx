export function NotFoundPage() {
  return (
    <div className="wrapper">
      <header className="header" id="header">
        <div className="container">
          <div className="header__wrapper">
            <a className="header__logo logo" href="main.html">
              <img
                className="logo__img"
                width={70}
                height={70}
                src="./img/svg/logo.svg"
                alt="Логотип"
              />
            </a>
            <nav className="main-nav">
              <ul className="main-nav__list">
                <li className="main-nav__item">
                  <a className="link main-nav__link" href="#">
                    Каталог
                  </a>
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
              </ul>
            </nav>
            <div className="header__container">
              <span className="header__user-name">Имя</span>
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
            </div>
          </div>
        </div>
      </header>
      <main className="page-content">
        <div className="container">
          <section className="error">
            <h1 className="error__title">404</h1>
            <span className="error__subtitle">Страница не найдена.</span>
            <p className="error__text">
              {' '}
              Возможно, страница была удалена или
              <br />
              её вовсе не существовало.
            </p>
            <button className="button button__error button--small button--black-border">
              Продолжить покупки
            </button>
          </section>
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer__container">
            <div className="footer__logo-wrapper">
              <a className="footer__logo logo" href="main.html">
                <img
                  className="logo__img"
                  width={70}
                  height={70}
                  src="./img/svg/logo.svg"
                  alt="Логотип"
                />
              </a>
              <div className="socials footer__socials">
                <ul className="socials__list">
                  <li className="socials-item">
                    <a
                      className="socials__link"
                      href="https://www.skype.com/"
                      aria-label="Мы в skype"
                    >
                      <svg
                        className="socials__icon"
                        width={24}
                        height={24}
                        aria-hidden="true"
                      >
                        <use xlinkHref="#icon-skype" />
                      </svg>
                    </a>
                  </li>
                  <li className="socials-item">
                    <a
                      className="socials__link"
                      href="https://www.vsco.co/"
                      aria-label="Мы в vsco"
                    >
                      <svg
                        className="socials__icon"
                        width={24}
                        height={24}
                        aria-hidden="true"
                      >
                        <use xlinkHref="#icon-vsco" />
                      </svg>
                    </a>
                  </li>
                  <li className="socials-item">
                    <a
                      className="socials__link"
                      href="https://www.pinterest.com/"
                      aria-label="Мы в pinterest"
                    >
                      <svg
                        className="socials__icon"
                        width={24}
                        height={24}
                        aria-hidden="true"
                      >
                        <use xlinkHref="#icon-pinterest" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <section className="footer__nav-section footer__nav-section--about">
              <h2 className="footer__nav-title footer__nav-title--about">
                О нас
              </h2>
              <p className="footer__nav-text footer__nav-text--about">
                Магазин гитар, музыкальных <br /> инструментов и&nbsp;гитарная
                мастерская в&nbsp;Санкт-Петербурге.
              </p>
              <p className="footer__nav-text footer__nav-text--about">
                Все инструменты проверены, отстроены и&nbsp;доведены
                до&nbsp;идеала!
              </p>
            </section>
            <section className="footer__nav-section footer__nav-section--links">
              <h2 className="footer__nav-title footer__nav-title--links">
                Информация
              </h2>
              <ul className="footer__nav-list">
                <li className="footer__nav-list-item">
                  <a className="link footer__nav-link" href="#top">
                    Где купить?
                  </a>
                </li>
                <li className="footer__nav-list-item">
                  <a className="link footer__nav-link" href="#top">
                    Блог
                  </a>
                </li>
                <li className="footer__nav-list-item">
                  <a className="link footer__nav-link" href="#top">
                    Вопрос - ответ
                  </a>
                </li>
                <li className="footer__nav-list-item">
                  <a className="link footer__nav-link" href="#top">
                    Возврат
                  </a>
                </li>
                <li className="footer__nav-list-item">
                  <a className="link footer__nav-link" href="#top">
                    Сервис-центры
                  </a>
                </li>
              </ul>
            </section>
            <section className="footer__nav-section footer__nav-section--contacts">
              <h2 className="footer__nav-title footer__nav-title--contacts">
                Контакты
              </h2>
              <p className="footer__nav-text footer__nav-text--address">
                г. Санкт-Петербург,
                <br /> м. Невский проспект, ул. Казанская 6.
              </p>
              <a
                className="link footer__nav-link footer__nav-link--phone"
                href="tel:88125005050"
              >
                8-812-500-50-50
              </a>
              <p className="footer__nav-text footer__nav-text--work-hours-title">
                Режим работы:
                <span className="footer__nav-text footer__nav-text--work-hours">
                  с 11:00 до 20:00
                </span>
              </p>
              <p className="footer__nav-text footer__nav-text--weekends">
                без выходных
              </p>
            </section>
          </div>
        </div>
      </footer>
    </div>
  );
}
