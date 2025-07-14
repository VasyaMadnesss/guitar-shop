import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { SyntheticEvent, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/index.js';
import { fetchProductsPageDataAction } from '../store/actions/api-actions.js';
import { GuitarProduct } from '@guitar-shop/shared';
import { ProductCard } from '../components/product-card/product-card.js';
import { Filters } from '../components/filters/filters.js';
import {
  ApiRoute,
  AppRoute,
  ProductsPageUsingCase,
  SortBy,
  SortOrder,
} from '../const.js';
import { Sorting } from '../components/sorting/sorting.js';
import { Pagination } from '../components/pagination/pagination.js';

function renderProductCards(
  products: GuitarProduct[],
  usingCase: ProductsPageUsingCase
) {
  return products.map((value) => (
    <ProductCard key={value.id} product={value} usingCase={usingCase} />
  ));
}

function getUsingCase(mode: string) {
  if (mode === ProductsPageUsingCase.Browse) {
    return ProductsPageUsingCase.Browse;
  }
  if (mode === ProductsPageUsingCase.Manage) {
    return ProductsPageUsingCase.Manage;
  }
  return ProductsPageUsingCase.Unknown;
}

export function ProductsPage() {
  const { mode } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const products = useAppSelector((store) => store.productsPageData.products);
  const totalItems = useAppSelector((store) => store.productsPageData.totalItems);

  const limit = Number(searchParams.get('limit') || 7);
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = Number(searchParams.get('page') || 1);

  useEffect(() => {
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '7';
    const sortBy = searchParams.get('sortBy') || SortBy.AddedDate;
    const sortOrder = searchParams.get('sortOrder') || SortOrder.Desc;
    const guitarTypes = searchParams.get('guitarTypes') || '';
    const stringCounts = searchParams.get('stringCounts') || '';
    const params = {
      page,
      limit,
      sortBy,
      sortOrder,
      guitarTypes,
      stringCounts,
    };
    console.log('Я редюсер вызываю фетч')
    dispatch(
      fetchProductsPageDataAction(
        `${ApiRoute.Products}?${new URLSearchParams(params)}`
      )
    );
  }, [dispatch, searchParams]);

  const handlePageChange = useCallback((newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', String(newPage));
    setSearchParams(newSearchParams);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams, setSearchParams]);

  const handleCreateNewProductButton = (evt: SyntheticEvent) => {
    navigate(`${AppRoute.Product}/add`);
  }

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
              <a className="link" href='#' aria-disabled>
                Вход
              </a>
            </li>
            <li className="breadcrumbs__item">
              <a className="link">Товары</a>
            </li>
          </ul>
          <div className="catalog">
            <Filters
              setSearchParams={setSearchParams}
              urlParams={searchParams}
            />
            <Sorting
              setSearchParams={setSearchParams}
              urlParams={searchParams}
            />
            <div className="catalog-cards">
              {products.length > 0 ? (
                <ul className="catalog-cards__list">
                  {renderProductCards(products, usingCase)}
                </ul>
              ) : (
                <div className="catalog-cards__empty">
                  <p>Товары не найдены</p>
                </div>
              )}
            </div>
          </div>
          {usingCase === ProductsPageUsingCase.Manage && (
            <button
              className="button product-list__button button--red button--big"
              onClick={handleCreateNewProductButton}
            >
              Добавить новый товар
            </button>
          )}

          {totalPages > 1 && (
            <div className="pagination product-list__pagination">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
