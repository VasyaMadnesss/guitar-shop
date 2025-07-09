import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/index.js';
import { fetchProductsAction } from '../store/actions/api-actions.js';
import { GuitarProduct } from '@guitar-shop/shared';
import { ProductCard } from '../components/product-card/product-card.js';
import { Filters } from '../components/filters/filters.js';
import { ProductsPageUsingCase } from '../const.js';


function renderProductCards(
  products: GuitarProduct[],
  usingCase: ProductsPageUsingCase
) {
  return products.map((value) => {
    return <ProductCard product={value} usingCase={usingCase} />;
  });
}

function getUsingCase(mode: string) {
  let usingCase: ProductsPageUsingCase = ProductsPageUsingCase.Unknown;

  if (mode === ProductsPageUsingCase.Browse) {
    usingCase = ProductsPageUsingCase.Browse;
  }

  if (mode === ProductsPageUsingCase.Manage) {
    usingCase = ProductsPageUsingCase.Manage;
  }
  return usingCase;
}

export function ProductsPage() {
  const { mode } = useParams();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProductsAction());
  }, [dispatch]);

  const products = useAppSelector((store) => store.guitarProducts);


  let usingCase = ProductsPageUsingCase.Unknown;
  if (mode) {
    usingCase = getUsingCase(mode);
  }
  return (
    <main className="page-content">
      <section className="product-list">
        <div className="container">
          <h1 className="product-list__title">Список товаров</h1>
          <ul className="breadcrumbs">
            <li className="breadcrumbs__item">
              <a className="link" href="./main.html">
                Вход
              </a>
            </li>
            <li className="breadcrumbs__item">
              <a className="link">Товары</a>
            </li>
          </ul>
          <div className="catalog">
            <Filters />
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                <button
                  className="catalog-sort__type-button catalog-sort__type-button--active"
                  aria-label="по цене"
                >
                  по дате
                </button>
                <button
                  className="catalog-sort__type-button"
                  aria-label="по цене"
                >
                  по цене
                </button>
              </div>
              <div className="catalog-sort__order">
                <button
                  className="catalog-sort__order-button catalog-sort__order-button--up"
                  aria-label="По возрастанию"
                />
                <button
                  className="catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active"
                  aria-label="По убыванию"
                />
              </div>
            </div>
            <div className="catalog-cards">
              <ul className="catalog-cards__list">
                {renderProductCards(products, usingCase)}
              </ul>
            </div>
          </div>
          {usingCase === ProductsPageUsingCase.Manage ? (
            <button className="button product-list__button button--red button--big">
              Добавить новый товар
            </button>
          ) : (
            ''
          )}
          <div className="pagination product-list__pagination">
            <ul className="pagination__list">
              <li className="pagination__page pagination__page--active">
                <a className="link pagination__page-link" href={'1'}>
                  1
                </a>
              </li>
              <li className="pagination__page">
                <a className="link pagination__page-link" href={'2'}>
                  2
                </a>
              </li>
              <li className="pagination__page">
                <a className="link pagination__page-link" href={'3'}>
                  3
                </a>
              </li>
              <li className="pagination__page pagination__page--next" id="next">
                <a className="link pagination__page-link" href={'2'}>
                  Далее
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
