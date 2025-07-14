import { GuitarProduct } from '@guitar-shop/shared';
import dayjs from 'dayjs';
import { AppRoute, ProductsPageUsingCase } from '../../const.js';
import { Link } from 'react-router-dom';
import { SyntheticEvent } from 'react';
import { useAppDispatch } from '../../hooks/index.js';
import { deleteOneProduct } from '../../store/actions/api-actions.js';

type ProductCardProps = {
  product: GuitarProduct;
  usingCase: ProductsPageUsingCase;
};

export function ProductCard({ product, usingCase }: ProductCardProps) {
  const { addedDate, name, photo, price, id } = product;
  const dispatch = useAppDispatch();
  const showButtons: boolean = usingCase === ProductsPageUsingCase.Manage;
  const handleDeleteButtonClick = (evt: SyntheticEvent) => {
    dispatch(deleteOneProduct(id));
  }
  return (
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img
          src={`http://localhost:3000/upload/${photo}`}
          width={36}
          height={93}
          alt="Картинка гитары"
        />
        <div className="catalog-item__data-wrapper">
          <Link className="link" to={`${AppRoute.Product}/show/${id}`}>
            <p className="catalog-item__data-title">{name}</p>
          </Link>
          <br />
          <p className="catalog-item__data-date">{`Дата добавления ${dayjs(
            addedDate
          ).format('DD.MM.YYYY')}`}</p>
          <p className="catalog-item__data-price">{`${price} ₽`}</p>
        </div>
      </div>
      {showButtons && (
        <div className="catalog-item__buttons">
          <Link
            className="button button--small button--black-border"
            to={`${AppRoute.Product}/edit/${id}`}
            aria-label="Редактировать товар"
          >
            Редактировать
          </Link>
          <button
            className="button button--small button--black-border"
            type="submit"
            aria-label="Удалить товар"
            onClick={handleDeleteButtonClick}
          >
            Удалить
          </button>
        </div>
      )}
    </li>
  );
}
