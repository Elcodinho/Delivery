import React from "react";
import { handleChange } from "@utils/formUtils/handleChange";
import { getCssClass } from "@utils/getClasses/getCssClass";
import { WarningForm } from "@components/UI/Warnings/WarningForm/WarningForm";
import "./AdminProductInput.css";

export const AdminProductInput = React.memo(function AdminProductInput(props) {
  const {
    id,
    value,
    setValue,
    valueError,
    setValueError,
    type,
    label,
    ariaLabel,
    valueLength,
    info,
    handleInputChange = handleChange,
  } = props;

  return (
    <div className="common-form__group-container admin__input-group">
      <div className="common-form__group">
        <input
          className={getCssClass(
            valueError,
            "common-form__item admin__input",
            "input-border--warning",
            value,
            valueLength
          )}
          type={type}
          name="name"
          id={id}
          aria-label={ariaLabel}
          placeholder=""
          value={value}
          onChange={(e) =>
            handleInputChange(e, setValue, valueError, setValueError)
          }
          required
        />
        <label className="common-form__label required" htmlFor={id}>
          {label}
        </label>
        <p className="admin__input-info">{info}</p>
      </div>
      {(value.length > valueLength || valueError) && (
        <WarningForm symbols={valueLength} />
      )}
    </div>
  );
});
