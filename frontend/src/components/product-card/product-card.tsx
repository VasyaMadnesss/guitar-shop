import { GuitarProduct } from '@guitar-shop/shared';
import dayjs from 'dayjs';
import { ProductsPageUsingCase } from '../../const.js';

type ProductCardProps = {
  product: GuitarProduct;
  usingCase: ProductsPageUsingCase;
};

export function ProductCard({ product, usingCase }: ProductCardProps) {
  const {
    addedDate,
    name,
    photo,
    price,
  } = product;

  const showButtons: boolean =
    usingCase === ProductsPageUsingCase.Manage ? true : false;
  return (
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img src={photo} width={36} height={93} alt="Картинка гитары" />
        <div className="catalog-item__data-wrapper">
          <a className="link" href="./product.html">
            <p className="catalog-item__data-title">{name}</p>
          </a>
          <br />
          <p className="catalog-item__data-date">{`Дата добавления ${dayjs(
            addedDate
          ).format('DD.MM.YYYY')}`}</p>
          <p className="catalog-item__data-price">{`${price} ₽`}</p>
        </div>
      </div>
      {showButtons && (
        <div className="catalog-item__buttons">
          <a
            className="button button--small button--black-border"
            href="edit-item.html"
            aria-label="Редактировать товар"
          >
            Редактировать
          </a>
          <button
            className="button button--small button--black-border"
            type="submit"
            aria-label="Удалить товар"
          >
            Удалить
          </button>
        </div>
      )}
    </li>
  );
}
