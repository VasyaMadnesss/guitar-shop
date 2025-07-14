import { Link } from 'react-router-dom';
import { FormEvent, useState, SyntheticEvent } from 'react';
import { AppRoute } from '../const.js';
import { useAppDispatch } from '../hooks/index.js';
import { loginAction, registerAction } from '../store/actions/api-actions.js';

type AuthType = AppRoute.Login | AppRoute.Registration;

type AuthPageProps = {
  usingCase: AuthType;
};

export function AuthPage({ usingCase }: AuthPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const dispatch = useAppDispatch();

  const isLoginPage = usingCase === AppRoute.Login;
  const title = isLoginPage ? 'Войти' : 'Регистрация';
  const buttonText = isLoginPage ? 'Войти' : 'Зарегистрироваться';
  const passwordPlaceholder = isLoginPage
    ? '• • • • • • • • • • • •'
    : 'Придумайте пароль';

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setErrors((prev) => ({
      ...prev,
      [name]: !value,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      name: !isLoginPage && !formData.name,
      email: !formData.email,
      password: !formData.password,
    };

    setErrors(newErrors);

    return !newErrors.name && !newErrors.email && !newErrors.password;
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (validateForm()) {
      if (isLoginPage) {
        dispatch(
          loginAction({
            login: formData.email,
            password: formData.password,
          })
        );
      } else {
        dispatch(
          registerAction({
            login: formData.email,
            password: formData.password,
            name: formData.name,
          })
        )
      }
    }
  };

  const handleShowPassword = (evt: SyntheticEvent) => {
    setIsPasswordShown((prevState) => !prevState);
  }

  return (
    <main className="page-content">
      <div className="container">
        <section className="login">
          <h1 className="login__title">{title}</h1>

          <p className="login__text">
            {isLoginPage ? 'Hовый пользователь? ' : 'Уже зарегистрированы? '}
            <Link
              className="login__link"
              to={isLoginPage ? AppRoute.Registration : AppRoute.Login}
            >
              {isLoginPage ? 'Зарегистрируйтесь' : 'Войдите'}
            </Link>{' '}
            прямо сейчас
          </p>

          <form method="post" action="/" onSubmit={handleSubmit}>
            {!isLoginPage && (
              <div className="input-login">
                <label htmlFor="name">Введите имя</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="off"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && (
                  <p className="input-login__error">Заполните поле</p>
                )}
              </div>
            )}

            <div className="input-login">
              <label htmlFor="email">Введите e-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                required
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && (
                <p className="input-login__error">Заполните поле</p>
              )}
            </div>

            <div className="input-login">
              <label htmlFor="password">
                {isLoginPage ? 'Введите пароль' : 'Придумайте пароль'}
              </label>
              <span>
                <input
                  type={!isPasswordShown ? 'password' : 'text'}
                  placeholder={passwordPlaceholder}
                  id="password"
                  name="password"
                  autoComplete="off"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button className="input-login__button-eye" type="button" onClick={handleShowPassword}>
                  <svg width={14} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-eye" />
                  </svg>
                </button>
              </span>
              {errors.password && (
                <p className="input-login__error">Заполните поле</p>
              )}
            </div>

            <button
              className="button login__button button--medium"
              type="submit"
            >
              {buttonText}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
