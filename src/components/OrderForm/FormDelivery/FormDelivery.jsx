import { useState } from "react";
import { getCssClass } from "@utils/getClasses/getCssClass";
import { handleChange } from "@utils/formUtils/handleChange";
import { WarningForm } from "@components/UI/Warnings/WarningForm/WarningForm";
import "./FormDelivery.css";

export function FormDelivery(props) {
  const { street, setStreet, house, setHouse } = props;
  const [streetError, setStreetError] = useState(null); // Ошибка улицы
  const [houseError, setHouseError] = useState(null); // Ошибка дома
  return (
    <div className="form-delivery">
      <div className="form-delivery__main-adress">
        <div className="form__group-container form__group-container--street">
          <div className="form__group">
            <input
              className={getCssClass(
                streetError,
                "form__item",
                "input-border--warning ",
                street,
                60
              )}
              type="text"
              name="street"
              id="street"
              aria-label="Улица"
              placeholder=""
              value={street}
              onChange={(e) =>
                handleChange(e, setStreet, streetError, setStreetError)
              }
              required
            />
            <label className="form__label required" htmlFor="street">
              Улица
            </label>
          </div>
          {(street.length > 60 || streetError) && <WarningForm symbols="60" />}
        </div>
        {/*  */}
        <div className="form__group-container form__group-container--house">
          <div className="form__group">
            <input
              className={getCssClass(
                houseError,
                "form__item",
                "input-border--warning ",
                house,
                60
              )}
              type="text"
              name="house"
              id="house"
              aria-label="Номер дома"
              placeholder=""
              value={house}
              onChange={(e) =>
                handleChange(e, setHouse, houseError, setHouseError)
              }
              required
            />
            <label className="form__label required" htmlFor="house">
              Дом
            </label>
          </div>
          {(street.length > 60 || streetError) && <WarningForm symbols="60" />}
        </div>
        {/*  */}
      </div>
    </div>
  );
}
