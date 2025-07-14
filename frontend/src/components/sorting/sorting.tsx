import { SyntheticEvent } from 'react';
import { SetURLSearchParams } from 'react-router-dom';

type SortingProps = {
  setSearchParams: SetURLSearchParams;
  urlParams: URLSearchParams;
};

export function Sorting({ urlParams, setSearchParams }: SortingProps) {
  const chosenSortBy = urlParams.get('sortBy') || 'addedDate';
  const chosenSortOrder = urlParams.get('sortOrder') || 'desc';

  const handleSortButtonClick = (evt: SyntheticEvent) => {
    const buttonType = evt.currentTarget.ariaLabel === 'по дате' ? 'addedDate' : 'price';
    if(chosenSortBy === buttonType) {
      return;
    }
    urlParams.set('sortBy', buttonType);
    setSearchParams(urlParams);
  }

  const handleSortOrderButtonClick = (evt: SyntheticEvent) => {
    const buttonType = evt.currentTarget.ariaLabel === 'по убыванию' ? 'desc' : 'asc';
    if(chosenSortOrder === buttonType) {
      return;
    }
    urlParams.set('sortOrder', buttonType);
    setSearchParams(urlParams);
  }


  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button ${
            chosenSortBy === 'addedDate'
              ? 'catalog-sort__type-button--active'
              : ''
          }`}
          aria-label="по дате"
          onClick={handleSortButtonClick}
        >
          по дате
        </button>
        <button
          className={`catalog-sort__type-button ${
            chosenSortBy === 'price' ? 'catalog-sort__type-button--active' : ''
          }`}
          aria-label="по цене"
          onClick={handleSortButtonClick}
        >
          по цене
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up ${chosenSortOrder === 'asc' ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="по возрастанию"
          onClick={handleSortOrderButtonClick}
        />
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${chosenSortOrder === 'desc' ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="по убыванию"
          onClick={handleSortOrderButtonClick}
        />
      </div>
    </div>
  );
}
