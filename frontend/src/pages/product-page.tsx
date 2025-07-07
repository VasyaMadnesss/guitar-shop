// import { useParams } from 'react-router-dom';
// import { useAppDispatch } from '../hooks/index.js';
// import { testStore } from '../store/actions/index.js';

export function ProductPage() {
  // const params = useParams();
  // const dispatch = useAppDispatch();
  // if (params.id) {
  //   dispatch(testStore(params.id));
  // }
  return (
    <div className="wrapper">
      <header className="header--admin header" id="header">
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
                  <a className="link main-nav__link" href="main">
                    Каталог
                  </a>
                </li>
                <li className="main-nav__item">
                  <a className="link main-nav__link" href="#">
                    Список товаров
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
              {/*<a class="header__cart-link" href="cart.html" aria-label="Перейти в корзину">
          <svg class="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlink:href="#icon-basket"></use>*/}
              <span className="header__cart-count">2</span>
            </div>
          </div>
        </div>
      </header>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Товар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <a className="link" href="./main.html">
                Главная
              </a>
            </li>
            <li className="breadcrumbs__item">
              <a className="link" href="./main.html">
                Каталог
              </a>
            </li>
            <li className="breadcrumbs__item">
              <a className="link">Товар</a>
            </li>
          </ul>
          <div className="product-container">
            <img
              className="product-container__img"
              src="img/content/catalog-product-1.png"
              srcSet="img/content/catalog-product-1@2x.png 2x"
              width={90}
              height={235}
              alt=""
            />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">
                СURT Z30 Plus
              </h2>
              <br />
              <br />
              <div className="tabs">
                <a
                  className="button button--medium tabs__button"
                  href="#characteristics"
                >
                  Характеристики
                </a>
                <a
                  className="button button--black-border button--medium tabs__button"
                  href="#description"
                >
                  Описание
                </a>
                <div className="tabs__content" id="characteristics">
                  <table className="tabs__table">
                    <tbody>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Артикул:</td>
                        <td className="tabs__value">SO754565</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Тип:</td>
                        <td className="tabs__value">Электрогитара</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Количество струн:</td>
                        <td className="tabs__value">6 струнная</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="tabs__product-description hidden">
                    Гитара подходит как для старта обучения, так и для домашних
                    занятий или использования в полевых условиях, например, в
                    походах или для проведения уличных выступлений. Доступная
                    стоимость, качество и надежная конструкция, а также приятный
                    внешний вид, который сделает вас звездой вечеринки.
                  </p>
                </div>
              </div>
            </div>
          </div>
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
