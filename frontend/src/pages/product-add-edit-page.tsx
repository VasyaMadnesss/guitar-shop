import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/index.js';
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  createProduct,
  fetchOneProduct,
  updateProduct,
} from '../store/actions/api-actions.js';
import { NotFoundPage } from './not-found-page.js';
import { AppRoute, ProductsPageUsingCase, updateFormData } from '../const.js';
import { GuitarType, StringCount } from '@guitar-shop/shared';
import dayjs from 'dayjs';

type FormMode = 'create' | 'edit';

interface CreateEditProductPageProps {
  mode: FormMode;
}

export function CreateEditProductPage({ mode }: CreateEditProductPageProps) {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.activeProduct);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEditMode = mode === 'edit';

  const [formData, setFormData] = useState({
    name: '',
    article: '',
    description: '',
    guitarType: GuitarType.Electro,
    photo: '',
    price: 0,
    stringCount: 4 as StringCount,
  });

  useEffect(() => {
    if (isEditMode && params.id) {
      dispatch(fetchOneProduct(params.id));
    }
  }, [dispatch, params.id, isEditMode]);

  useEffect(() => {
    if (isEditMode && product) {
      setFormData({
        name: product.name ?? '',
        article: product.article ?? '',
        description: product.description ?? '',
        guitarType: product.guitarType ?? GuitarType.Acoustic,
        photo: product.photo ?? '',
        price: product.price ?? 0,
        stringCount: product.stringCount ?? 6,
      });
    }
  }, [product, isEditMode]);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  const handleSubmit = (data: Omit<updateFormData, 'id'>) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('article', data.article);
    formData.append('description', data.description);
    formData.append('guitarType', data.guitarType);
    formData.append('price', String(data.price));
    formData.append('stringCount', String(data.stringCount));

    if (data.photoString && !selectedFile) {
      formData.append('photoString', data.photoString);
    }

    if (selectedFile) {
      formData.append('photo', selectedFile);
    }

    if (isEditMode && product?.id) {
      formData.append('id', product.id);
      dispatch(updateProduct(formData));
    } else {
      formData.append('addedDate', new Date().toISOString());
      formData.delete('photoString');
      dispatch(createProduct(formData));
    }
  };

  const handleChangeButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteButtonClick = () => {
    setSelectedFile(null);
  };

  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files && evt.target.files[0]) {
      setSelectedFile(evt.target.files[0]);
    }
  };

  const handleInputChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = Number(evt.currentTarget.value);
    if (!isNaN(value)) {
      setFormData(prev => ({ ...prev, price: value }));
    }
  };

  const handleGuitarTypeChange = (type: GuitarType) => {
    setFormData(prev => ({ ...prev, guitarType: type }));
  };

  const handleStringCountChange = (count: StringCount) => {
    setFormData(prev => ({ ...prev, stringCount: count }));
  };

  const handleGoBack = () => {
    navigate(`${AppRoute.Products}/${ProductsPageUsingCase.Manage}`);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    handleSubmit({
      ...formData,
      photoString: formData.photo,
      photo: selectedFile ?? undefined,
    });
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.article.trim() !== '' &&
      formData.description.trim() !== '' &&
      formData.price > 0
    );
  };

  if (isEditMode) {
    if (!params.id) return <NotFoundPage />;
    if (!product) return <div>Loading...</div>;
  }

  return (
    <section className={isEditMode ? "edit-item" : "add-item"}>
      <div className="container">
        <h1 className={`${isEditMode ? 'edit-item__title' : 'add-item__title'}`}>
          {isEditMode ? product.name : 'Новый товар'}
        </h1>

        <ul className="breadcrumbs">
          <li className="breadcrumbs__item">
            <Link className="link" to='' >Вход</Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="link" to={`${AppRoute.Products}/${ProductsPageUsingCase.Manage}`}>Товары</Link>
          </li>
          <li className="breadcrumbs__item">
            <Link to={isEditMode ? `${AppRoute.Product}/${params?.id}` : ''} className="link" >
              {isEditMode ? 'Товар' : 'Новый товар'}
            </Link>
          </li>
        </ul>

        <form
          className={`${isEditMode ? 'edit-item__form' : 'add-item__form'}`}
          onSubmit={handleFormSubmit}
        >
          <div className={`${isEditMode ? 'edit-item__form-left' : 'add-item__form-left'}`}>
            <div className={`edit-item-image ${isEditMode ? '' : 'add-item__form-image'}`}>
              <div className="edit-item-image__image-wrap">
                {previewUrl ? (
                  <img
                    className="edit-item-image__image"
                    src={previewUrl}
                    width={133}
                    height={332}
                    alt="Товар"
                  />
                ) : formData.photo ? (
                  <img
                    className="edit-item-image__image"
                    src={`http://localhost:3000/upload/${formData.photo}`}
                    width={133}
                    height={332}
                    alt="Товар"
                  />
                ) : (
                  <div className="edit-item-image__empty">Нет изображения</div>
                )}
              </div>

              <div className="edit-item-image__btn-wrap">
                <button
                  type="button"
                  className="button button--small button--black-border edit-item-image__btn"
                  onClick={handleChangeButtonClick}
                >
                  {formData.photo || previewUrl ? 'Заменить' : 'Добавить'}
                  <input
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    type="file"
                    name="photo"
                    accept="image/jpeg, image/png"
                    hidden
                  />
                </button>

                {(formData.photo || previewUrl) && (
                  <button
                    type="button"
                    className="button button--small button--black-border edit-item-image__btn"
                    onClick={handleDeleteButtonClick}
                  >
                    Удалить
                  </button>
                )}
              </div>
            </div>

            <div className={`input-radio ${isEditMode ? 'edit-item__form-radio' : 'add-item__form-radio'}`}>
              <span>{isEditMode ? 'Тип товара' : 'Выберите тип товара'}</span>
              {Object.values(GuitarType).map((type) => (
                <div key={type}>
                  <input
                    type="radio"
                    id={type}
                    name="guitarType"
                    checked={formData.guitarType === type}
                    onChange={() => handleGuitarTypeChange(type)}
                  />
                  <label htmlFor={type}>
                    {type === GuitarType.Acoustic && 'Акустическая гитара'}
                    {type === GuitarType.Electro && 'Электрогитара'}
                    {type === GuitarType.Ukulele && 'Укулеле'}
                  </label>
                </div>
              ))}
            </div>

            <div className={`input-radio ${isEditMode ? 'edit-item__form-radio' : 'add-item__form-radio'}`}>
              <span>Количество струн</span>
              {[4, 6, 7, 12].map((count) => (
                <div key={count}>
                  <input
                    type="radio"
                    id={`string-qty-${count}`}
                    name="stringCount"
                    value={count}
                    checked={formData.stringCount === count}
                    onChange={() => handleStringCountChange(count as StringCount)}
                  />
                  <label htmlFor={`string-qty-${count}`}>{count}</label>
                </div>
              ))}
            </div>
          </div>

          <div className={`${isEditMode ? 'edit-item__form-right' : 'add-item__form-right'}`}>
            {isEditMode && (
              <div className="custom-input edit-item__form-input">
                <label>
                  <span>Дата добавления товара</span>
                  <input
                    type="text"
                    name="date"
                    value={dayjs(product?.addedDate).format('DD.MM.YYYY')}
                    placeholder="Дата в формате 00.00.0000"
                    readOnly
                  />
                </label>
              </div>
            )}

            <div className={`custom-input ${isEditMode ? 'edit-item__form-input' : 'add-item__form-input'}`}>
              <label>
                <span>{isEditMode ? 'Наименование товара' : 'Введите наименование товара'}</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Наименование"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              {!formData.name && <p>Заполните поле</p>}
            </div>

            <div className={`custom-input ${isEditMode ? 'edit-item__form-input edit-item__form-input--price' : 'add-item__form-input add-item__form-input--price'}`}>
              <label>
                <span>{isEditMode ? 'Цена товара' : 'Введите цену товара'}</span>
                <input
                  type="number"
                  name="price"
                  placeholder="Цена"
                  value={formData.price || ''}
                  onChange={handlePriceChange}
                  min="0"
                  required
                />
              </label>
              {(formData.price <= 0 || isNaN(formData.price)) && <p>Введите корректную цену</p>}
            </div>

            <div className={`custom-input ${isEditMode ? 'edit-item__form-input' : 'add-item__form-input'}`}>
              <label>
                <span>{isEditMode ? 'Артикул товара' : 'Введите артикул товара'}</span>
                <input
                  type="text"
                  name="article"
                  placeholder="Артикул товара"
                  value={formData.article}
                  onChange={handleInputChange}
                  required
                />
              </label>
              {!formData.article && <p>Заполните поле</p>}
            </div>

            <div className={`${isEditMode ? 'custom-textarea edit-item__form-textarea' : 'custom-textarea add-item__form-textarea'}`}>
              <label>
                <span>{isEditMode ? 'Описание товара' : 'Введите описание товара'}</span>
                <textarea
                  name="description"
                  placeholder="Описание"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </label>
              {!formData.description && <p>Заполните поле</p>}
            </div>
          </div>

          <div className={`${isEditMode ? 'edit-item__form-buttons-wrap' : 'add-item__form-buttons-wrap'}`}>
            <button
              className={`button button--small ${isEditMode ? 'edit-item__form-button' : 'add-item__form-button'}`}
              type="submit"
              disabled={!isFormValid()}
            >
              {isEditMode ? 'Сохранить изменения' : 'Добавить товар'}
            </button>
            <button
              className={`button button--small ${isEditMode ? 'edit-item__form-button' : 'add-item__form-button'}`}
              type="button"
              onClick={handleGoBack}
            >
              Вернуться к списку товаров
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
