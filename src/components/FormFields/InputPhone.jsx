import React from "react";
import clsx from "clsx";
import { handlePhoneChange } from "@utils/formUtils/handlePhoneChange";
import { WarningForm } from "@components/UI/Warnings/WarningForm/WarningForm";
import "./FormFields.css";

export const InputPhone = React.memo(function InputPhone(props) {
  const { id, phone, setPhone, phoneError, setPhoneError } = props;
  return (
    <div className="common-form__group-container">
      <div className="common-form__group">
        <input
          className={clsx("common-form__item", {
            "input-border--warning": phone.length > 0 && phone.length < 16,
          })}
          type="tel"
          name="phone"
          id={id}
          aria-label="номер телефона"
          placeholder=""
          value={phone}
          onChange={(e) =>
            handlePhoneChange(e, phoneError, setPhoneError, setPhone)
          }
        />
        <label className="common-form__label" htmlFor={id}>
          Телефон
        </label>
      </div>
      {phone.length > 0 && phone.length < 16 && (
        <WarningForm text="Убедитесь, что вы ввели номер полностью" />
      )}
    </div>
  );
});
