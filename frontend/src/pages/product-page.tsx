import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/index.js';
import { fetchOneProduct } from '../store/actions/api-actions.js';
import { NotFoundPage } from './not-found-page.js';
import { SyntheticEvent, useEffect, useState } from 'react';
import { GuitarType } from '@guitar-shop/shared';
import { AppRoute, ProductsPageUsingCase } from '../const.js';

function getGuitarType(type: GuitarType) {
  switch (type) {
    case GuitarType.Acoustic:
      return 'Акустическая';
    case GuitarType.Electro:
      return 'Электрогитара';
    case GuitarType.Ukulele:
      return 'Укулеле';
  }
}

export function ProductPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const productData = useAppSelector((state) => state.activeProduct);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchOneProduct(params.id));
    }
  }, [dispatch, params.id]);

  if (!params.id) {
    return <NotFoundPage />;
  }

  const handleTabClick = (evt: SyntheticEvent) => {
    evt.preventDefault();
    setShowDescription((prev) => !prev);
  };

  const { article, description, guitarType, name, photo, stringCount } =
    productData;

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Товар</h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item">
            <Link className="link" to=''>
              Главная
            </Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="link" to={`${AppRoute.Products}/${ProductsPageUsingCase.Manage}`}>
              Товары
            </Link>
          </li>
          <li className="breadcrumbs__item">
            <Link to='' className="link">Товар</Link>
          </li>
        </ul>
        <div className="product-container">
          <img
            className="product-container__img"
            src={`http://localhost:3000/upload/${photo}`}
            width={90}
            height={235}
            alt=""
          />
          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">
              {name}
            </h2>
            <br />
            <br />
            <div className="tabs">
              <a
                className={`button button--medium tabs__button ${
                  showDescription ? 'button--black-border' : ''
                }`}
                href="#characteristics"
                onClick={handleTabClick}
              >
                Характеристики
              </a>
              <a
                className={`button button--medium tabs__button ${
                  !showDescription ? 'button--black-border' : ''
                }`}
                href="#description"
                onClick={handleTabClick}
              >
                Описание
              </a>
              <div className="tabs__content" id="characteristics">
                {!showDescription && (
                  <table className="tabs__table">
                    <tbody>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Артикул:</td>
                        <td className="tabs__value">{article}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Тип:</td>
                        <td className="tabs__value">
                          {getGuitarType(guitarType)}
                        </td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Количество струн:</td>
                        <td className="tabs__value">{stringCount} струнная</td>
                      </tr>
                    </tbody>
                  </table>
                )}
                <p
                  className={`tabs__product-description ${
                    !showDescription ? 'hidden' : ''
                  }`}
                >
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
