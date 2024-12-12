import React from "react";
import clsx from "clsx";
import { getCssClass } from "@utils/getClasses/getCssClass";
import { WarningForm } from "@components/UI/Warnings/WarningForm/WarningForm";
import "./FormFields.css";

export const InputTitle = React.memo(function InputTitle(props) {
  const { id, title, setTitle, required = false } = props;

  return (
    <div className="common-form__group-container">
      <div className="common-form__group">
        <input
          className={getCssClass(
            null,
            "common-form__item",
            "input-border--warning",
            title,
            80
          )}
          type="text"
          id={id}
          aria-label="заголовок отзыва"
          placeholder=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required={required}
        />
        <label
          className={clsx("common-form__label", { required: required })}
          htmlFor={id}
        >
          Заголовок отзыва
        </label>
        {title.length > 80 && <WarningForm symbols="80" />}
      </div>
    </div>
  );
});
