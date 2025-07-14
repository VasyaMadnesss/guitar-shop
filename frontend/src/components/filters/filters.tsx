import { GuitarType } from '@guitar-shop/shared';
import { ChangeEvent, SyntheticEvent } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import { URLSearchParams } from 'url';

type FiltersProps = {
  setSearchParams: SetURLSearchParams;
  urlParams: URLSearchParams;
};

export function Filters({ urlParams, setSearchParams }: FiltersProps) {
  const checkedGuitarTypes = (urlParams.get('guitarTypes')?.split(',') ||
    []) as GuitarType[];
  const checkedStringCounts =
    urlParams.get('stringCounts')?.split(',').map(Number) || [];

  const handleGuitarTypeCheckboxChange = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const guitarType = evt.currentTarget.name.toUpperCase() as GuitarType;
    if (evt.currentTarget.checked) {
      checkedGuitarTypes.push(guitarType);
    } else {
      checkedGuitarTypes.splice(checkedGuitarTypes.indexOf(guitarType), 1);
    }

    if (checkedGuitarTypes.length < 1) {
      urlParams.delete('guitarTypes');
      setSearchParams(urlParams);
    } else {
      urlParams.set('guitarTypes', checkedGuitarTypes.join(','));
      setSearchParams(urlParams);
    }
  };

  const handleStringsCountCheckboxChange = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const stringsCount = parseInt(evt.currentTarget.name, 10);
    if (evt.currentTarget.checked) {
      checkedStringCounts.push(stringsCount);
    } else {
      checkedStringCounts.splice(checkedStringCounts.indexOf(stringsCount), 1);
    }
    if (checkedStringCounts.length < 1) {
      urlParams.delete('stringCounts');
      setSearchParams(urlParams);
    } else {
      urlParams.set('stringCounts', checkedStringCounts.join(','));
      setSearchParams(urlParams);
    }
  };

  const handleResetButton = (evt: SyntheticEvent) => {
    evt.preventDefault();
    urlParams.delete('guitarTypes');
    urlParams.delete('stringsCounts');
    setSearchParams(urlParams);
  };

  return (
    <form className="catalog-filter" action="#" method="post">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name="acoustic"
            onChange={handleGuitarTypeCheckboxChange}
            checked={
              checkedGuitarTypes.includes(GuitarType.Acoustic) ? true : false
            }
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electro"
            onChange={handleGuitarTypeCheckboxChange}
            checked={
              checkedGuitarTypes.includes(GuitarType.Electro) ? true : false
            }
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            onChange={handleGuitarTypeCheckboxChange}
            checked={
              checkedGuitarTypes.includes(GuitarType.Ukulele) ? true : false
            }
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">
          Количество струн
        </legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="4-strings"
            name="4-strings"
            onChange={handleStringsCountCheckboxChange}
            checked={checkedStringCounts.includes(4) ? true : false}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            onChange={handleStringsCountCheckboxChange}
            checked={checkedStringCounts.includes(6) ? true : false}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            onChange={handleStringsCountCheckboxChange}
            checked={checkedStringCounts.includes(7) ? true : false}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            onChange={handleStringsCountCheckboxChange}
            checked={checkedStringCounts.includes(12) ? true : false}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button
        className="catalog-filter__reset-btn button button--black-border button--medium"
        type="reset"
        onClick={handleResetButton}
      >
        Очистить
      </button>
    </form>
  );
}
