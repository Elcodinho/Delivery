import { useState } from "react";
import clsx from "clsx";
import { handleEmailChange } from "@utils/formUtils/handleEmailChange";
import { validateEmail } from "@utils/formUtils/validateEmail";
import { Button } from "@components/UI/Button/Button";
import { WarningForm } from "@components/UI/Warnings/WarningForm/WarningForm";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./AuthForm.css";

export function AuthForm(props) {
  const {
    setShowLogin,
    email,
    setEmail,
    emailError,
    pass,
    setPass,
    passError,
    authType,
    formTitle,
    formText,
    btnText,
    authTypeToggle,
    handleSubmit,
  } = props;

  const [showPassword, setShowPassword] = useState(false); // Состтяние для управления показом пароля

  // Функция переключения класса ошибки для email
  function getCssClassEmail(baseClass, errorClass) {
    return clsx(baseClass, {
      [errorClass]: emailError || (email.length > 0 && !validateEmail(email)),
    });
  }

  // Функция переключает видимость пароля
  const PasswordVisibilityToggle = () => {
    setShowPassword((prev) => !prev); // Переключаем видимость пароля
  };

  return (
    <div className="auth__wrapper">
      {/* Крестик для закрытия формы */}
      <button
        type="button"
        className="auth__close-btn"
        onClick={() => setShowLogin(false)}
      >
        &#10005;
      </button>
      <p className="auth__title">{formTitle}</p>
      <p className="auth__text">{formText}</p>
      <form className="auth__form" onSubmit={handleSubmit}>
        {/*  Email*/}
        <div className="feedback-form__group-container auth__form__group-container">
          <div className="feedback-form__group">
            <input
              className={getCssClassEmail(
                "feedback-form__item auth-form__item",
                "input-border--warning"
              )}
              type="email"
              id="email"
              aria-label="Электронная почта"
              placeholder=""
              value={email}
              onChange={(e) => handleEmailChange(e, setEmail)}
            />
            <label className="feedback-form__label" htmlFor="email">
              Эл. почта
            </label>
          </div>
          {email.length > 0 && !validateEmail(email) && (
            <WarningForm text="Пожалуйста, введите корректный адрес электронной почты" />
          )}
        </div>

        {/* Password */}
        <div className="feedback-form__group-container auth__form__group-container">
          <div className="feedback-form__group">
            <input
              className={clsx(
                "feedback-form__item auth-form__item auth--pass",
                {
                  "input-border--warning": passError,
                }
              )}
              type={showPassword ? "text" : "password"} // Меняем тип в зависимости от состояния показа пароля
              id="password"
              aria-label="Пароль"
              placeholder=""
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <label className="feedback-form__label" htmlFor="password">
              Пароль
            </label>
            {!showPassword && (
              <FaRegEye
                className="eye-icon"
                onClick={PasswordVisibilityToggle}
              />
            )}
            {showPassword && (
              <FaRegEyeSlash
                className="eye-icon"
                onClick={PasswordVisibilityToggle}
              />
            )}
          </div>
          {passError && <WarningForm text={passError} />}
        </div>
        {/*  */}

        <div className="auth__form-btn-container">
          <Button type="submit" text={btnText} cssClass="order-total--style" />
        </div>
      </form>
      <p className="auth-type__text">
        {authType === "login" ? "Нет аккаунта?" : "Уже есть аккаунт?"}
        <button
          className="auth-type__button"
          type="button"
          onClick={authTypeToggle}
        >
          {authType === "login" ? "Регистрация" : "Войти"}
        </button>
      </p>
    </div>
  );
}
