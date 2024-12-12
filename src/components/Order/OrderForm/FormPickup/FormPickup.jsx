import React from "react";
import { handleChange } from "@utils/formUtils/handleChange";
import { getCssClass } from "@utils/getClasses/getCssClass";
import { POINTSADRESS } from "@constants/constants";
import { WarningForm } from "@components/UI/Warnings/WarningForm/WarningForm";
import "./FormPickup.css";

export const FormPickup = React.memo(function FormPickup(props) {
  const { pickupPoint, setPickupPoint, pickupPointError, setPickupPointError } =
    props;
  return (
    <div className="order-form__pickup">
      <select
        className={getCssClass(
          pickupPointError,
          "order-form__select",
          "input-border--warning ",
          pickupPoint
        )}
        defaultValue={pickupPoint}
        onChange={(e) =>
          handleChange(e, setPickupPoint, pickupPointError, setPickupPointError)
        }
        required
      >
        <option value="" disabled>
          Выберите пункт получения заказа
        </option>
        {POINTSADRESS.map((item, index) => (
          <option key={index} value={item.adress}>
            {item.adress}
          </option>
        ))}
      </select>
      {pickupPointError && <WarningForm text="Выберете пунк выдачи заказа" />}
    </div>
  );
});
