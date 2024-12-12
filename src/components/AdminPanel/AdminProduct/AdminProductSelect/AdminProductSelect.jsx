import React from "react";
import { handleChange } from "@utils/formUtils/handleChange";
import { getCssClass } from "@utils/getClasses/getCssClass";
import { WarningForm } from "@components/UI/Warnings/WarningForm/WarningForm";
import "./AdminProductSelect.css";

export const AdminProductSelect = React.memo(function AdminProductSelect(
  props
) {
  const {
    value,
    setValue,
    valueError,
    setValueError,
    dataValues,
    selectText,
    warning,
  } = props;

  return (
    <div className="admin-product__select-wrapper">
      <select
        className={getCssClass(
          valueError,
          "admin-product__select",
          "input-border--warning ",
          value
        )}
        value={value}
        onChange={(e) => handleChange(e, setValue, valueError, setValueError)}
        required
      >
        <option value="" disabled>
          {selectText}
        </option>
        {dataValues.map((item, index) => (
          <option key={index} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
      {valueError && <WarningForm text={warning} />}
    </div>
  );
});
