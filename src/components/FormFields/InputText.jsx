import React from "react";
import { handleChange } from "@utils/formUtils/handleChange";
import { getCssClass } from "@utils/getClasses/getCssClass";
import { WarningForm } from "@components/UI/Warnings/WarningForm/WarningForm";
import "./FormFields.css";

export const InputText = React.memo(function InputText(props) {
  const { id, text, setText, textError, setTextError } = props;

  // Функция, автоматически изменяющая высоту textarea
  function autoResize(textarea) {
    textarea.style.height = "auto"; // Сбросить высоту
    textarea.style.height = `${textarea.scrollHeight}px`; // Установить высоту в зависимости от содержимого
  }

  return (
    <div className="common-form__group common-form__group--textarea">
      <textarea
        className={getCssClass(
          textError,
          "common-form__item common-form__text-area",
          "input-border--warning ",
          text,
          500
        )}
        name="feedback-text"
        id={id}
        placeholder=""
        required
        value={text}
        onChange={(e) => handleChange(e, setText, textError, setTextError)}
        onInput={(e) => autoResize(e.target)}
      ></textarea>
      <label
        className="common-form__label common-form__label--textarea required"
        htmlFor={id}
      >
        Текст отзыва
      </label>
      {(text.length > 500 || textError) && <WarningForm symbols="500" />}
    </div>
  );
});
