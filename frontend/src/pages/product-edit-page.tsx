export function EditProductPage() {
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
        </div>
      </div>
    </div>
  </header>
  <main className="page-content">
    <section className="edit-item">
      <div className="container">
        <h1 className="edit-item__title">СURT Z30 Plus</h1>
        <ul className="breadcrumbs">
          <li className="breadcrumbs__item">
            <a className="link" href="./main.html">
              Вход
            </a>
          </li>
          <li className="breadcrumbs__item">
            <a className="link">Товары</a>
          </li>
          <li className="breadcrumbs__item">
            <a className="link">СURT Z30 Plus</a>
          </li>
        </ul>
        <form className="edit-item__form" action="#" method="get">
          <div className="edit-item__form-left">
            <div className="edit-item-image edit-item__form-image">
              <div className="edit-item-image__image-wrap">
                <img
                  className="edit-item-image__image"
                  src="img/content/add-item-1.png"
                  srcSet="img/content/add-item-1@2x.png 2x"
                  width={133}
                  height={332}
                  alt="СURT Z30 Plus"
                />
              </div>
              <div className="edit-item-image__btn-wrap">
                <button className="button button--small button--black-border edit-item-image__btn">
                  Заменить
                </button>
                <button className="button button--small button--black-border edit-item-image__btn">
                  Удалить
                </button>
              </div>
            </div>
            <div className="input-radio edit-item__form-radio">
              <span>Тип товара</span>
              <input
                type="radio"
                id="guitar"
                name="item-type"
                defaultValue="guitar"
              />
              <label htmlFor="guitar">Акустическая гитара</label>
              <input
                type="radio"
                id="el-guitar"
                name="item-type"
                defaultValue="el-guitar"
                defaultChecked
              />
              <label htmlFor="el-guitar">Электрогитара</label>
              <input
                type="radio"
                id="ukulele"
                name="item-type"
                defaultValue="ukulele"
              />
              <label htmlFor="ukulele">Укулеле</label>
            </div>
            <div className="input-radio edit-item__form-radio">
              <span>Количество струн</span>
              <input
                type="radio"
                id="string-qty-4"
                name="string-qty"
                defaultValue={4}
                defaultChecked
              />
              <label htmlFor="string-qty-4">4</label>
              <input
                type="radio"
                id="string-qty-6"
                name="string-qty"
                defaultValue={6}
              />
              <label htmlFor="string-qty-6">6</label>
              <input
                type="radio"
                id="string-qty-7"
                name="string-qty"
                defaultValue={7}
              />
              <label htmlFor="string-qty-7">7</label>
              <input
                type="radio"
                id="string-qty-12"
                name="string-qty"
                defaultValue={12}
              />
              <label htmlFor="string-qty-12">12</label>
            </div>
          </div>
          <div className="edit-item__form-right">
            <div className="custom-input edit-item__form-input">
              <label>
                <span>Дата добавления товара</span>
                <input
                  type="text"
                  name="date"
                  defaultValue="19.09.2022"
                  placeholder="Дата в формате 00.00.0000"
                  readOnly
                />
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input edit-item__form-input">
              <label>
                <span>Наименование товара</span>
                <input
                  type="text"
                  name="title"
                  defaultValue="СURT Z30 Plus"
                  placeholder="Наименование"
                />
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input edit-item__form-input edit-item__form-input--price">
              <label>
                <span>Цена товара</span>
                <input
                  type="text"
                  name="price"
                  defaultValue="27 000"
                  placeholder="Цена в формате 00 000"
                />
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input edit-item__form-input">
              <label>
                <span>Артикул товара</span>
                <input
                  type="text"
                  name="sku"
                  defaultValue="SO757575"
                  placeholder="Артикул товара"
                />
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-textarea edit-item__form-textarea">
              <label>
                <span>Описание товара</span>
                <textarea
                  name="description"
                  placeholder=""
                  defaultValue={
                    "Гитара подходит как для старта обучения, так и для домашних занятий или использования в полевых условиях, например, в походах или для проведения уличных выступлений.\n Доступная стоимость, качество и надежная конструкция, а также приятный внешний вид, который сделает вас звездой вечеринки."
                  }
                />
              </label>
              <p>Заполните поле</p>
            </div>
          </div>
          <div className="edit-item__form-buttons-wrap">
            <button
              className="button button--small edit-item__form-button"
              type="submit"
            >
              Сохранить изменения
            </button>
            <button
              className="button button--small edit-item__form-button"
              type="button"
            >
              Вернуться к списку товаров
            </button>
          </div>
        </form>
      </div>
    </section>
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
          <h2 className="footer__nav-title footer__nav-title--about">О нас</h2>
          <p className="footer__nav-text footer__nav-text--about">
            Магазин гитар, музыкальных <br /> инструментов и&nbsp;гитарная
            мастерская в&nbsp;Санкт-Петербурге.
          </p>
          <p className="footer__nav-text footer__nav-text--about">
            Все инструменты проверены, отстроены и&nbsp;доведены до&nbsp;идеала!
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
