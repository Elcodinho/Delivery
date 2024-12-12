import React from "react";
import clsx from "clsx";
import { handleEmailChange } from "@utils/formUtils/handleEmailChange";
import { validateEmail } from "@utils/formUtils/validateEmail";
import { WarningForm } from "@components/UI/Warnings/WarningForm/WarningForm";
import "./FormFields.css";

export const InputEmail = React.memo(function InputEmail(props) {
  const { id, email, setEmail, emailError } = props;

  // Функция переключения класса ошибки для email
  function getCssClassEmail(baseClass, errorClass) {
    return clsx(baseClass, {
      [errorClass]: emailError || (email.length > 0 && !validateEmail(email)),
    });
  }

  return (
    <div className="common-form__group-container login__common-form__group-container">
      <div className="common-form__group">
        <input
          className={getCssClassEmail(
            "common-form__item",
            "input-border--warning"
          )}
          type="email"
          id={id}
          aria-label="электронная почта"
          placeholder=""
          value={email}
          onChange={(e) => handleEmailChange(e, setEmail)}
        />
        <label className="common-form__label" htmlFor={id}>
          Эл. почта
        </label>
      </div>
      {email.length > 0 && !validateEmail(email) && (
        <WarningForm text="Пожалуйста, введите корректный адрес электронной почты" />
      )}
    </div>
  );
});
