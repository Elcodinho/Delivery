import React from "react";
import { getCssClass } from "@utils/getClasses/getCssClass";
import { handleChange } from "@utils/formUtils/handleChange";
import { WarningForm } from "@components/UI/Warnings/WarningForm/WarningForm";
import "./FormFields.css";

export const InputName = React.memo(function InputName(props) {
  const { id, name, setName, setNameError, nameError } = props;

  return (
    <div className="common-form__group-container">
      <div className="common-form__group">
        <input
          className={getCssClass(
            nameError,
            "common-form__item",
            "input-border--warning",
            name,
            60
          )}
          type="text"
          name="name"
          id={id}
          aria-label="Имя"
          placeholder=""
          value={name}
          onChange={(e) => handleChange(e, setName, nameError, setNameError)}
          required
        />
        <label className="common-form__label required" htmlFor={id}>
          Имя
        </label>
      </div>
      {(name.length > 60 || nameError) && <WarningForm symbols="60" />}
    </div>
  );
});
