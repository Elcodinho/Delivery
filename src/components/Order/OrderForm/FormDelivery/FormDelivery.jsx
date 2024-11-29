import React from "react";
import clsx from "clsx";
import { getCssClass } from "@utils/getClasses/getCssClass";
import { handleChange } from "@utils/formUtils/handleChange";
import { WarningForm } from "@components/UI/Warnings/WarningForm/WarningForm";
import "./FormDelivery.css";

export const FormDelivery = React.memo(function FormDelivery(props) {
  const {
    buildingType,
    setBuildingType,
    street,
    setStreet,
    house,
    setHouse,
    flatNum,
    setFlatNum,
    entrance,
    setEntrance,
    floor,
    setFloor,
    intercom,
    setIntercom,
    streetError,
    setStreetError,
    houseError,
    setHouseError,
    flatNumError,
    setFlatNumError,
    entranceError,
    setEntranceError,
    floorError,
    setFloorError,
    intercomError,
    setIntercomError,
  } = props;

  // Массив для инпутов flat-info
  const flatInfo = [
    {
      name: "i-flat",
      value: flatNum,
      setValue: setFlatNum,
      error: flatNumError,
      setError: setFlatNumError,
      text: "Квартира",
      required: true,
    },
    {
      name: "i-entrance",
      value: entrance,
      setValue: setEntrance,
      error: entranceError,
      setError: setEntranceError,
      text: "Подъезд",
      required: false,
    },
    {
      name: "i-floor",
      value: floor,
      setValue: setFloor,
      error: floorError,
      setError: setFloorError,
      text: "Этаж",
      required: false,
    },
    {
      name: "i-intercom",
      value: intercom,
      setValue: setIntercom,
      error: intercomError,
      setError: setIntercomError,
      text: "Домофон",
      required: false,
    },
  ];

  function handleHouseChange(e) {
    setBuildingType(e.target.value);
  }

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
          {(street.length > 40 || streetError) && <WarningForm symbols="40" />}
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
                10
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
          {(house.length > 10 || houseError) && <WarningForm symbols="10" />}
        </div>
        {/*  */}
      </div>
      {/* Building-type */}
      <div className="form-delivery__building">
        {/* Radio-buttons */}
        <div className="form-delivery__radio-wrapper">
          <div className="form-delivery__radio">
            <input
              type="radio"
              name="building"
              id="flat"
              checked={buildingType === "flat"}
              value="flat"
              onChange={handleHouseChange}
            />
            <label htmlFor="flat">Квартирный дом</label>
          </div>
          <div className="form-delivery__radio">
            <input
              type="radio"
              name="building"
              id="house-radio"
              checked={buildingType === "house"}
              value="house"
              onChange={handleHouseChange}
            />
            <label htmlFor="house-radio">Частный дом</label>
          </div>
        </div>
        {/* Flat Info */}
        {buildingType === "flat" && (
          <div className="flat-info">
            <p className="flat-info__title">Дополнительная информация</p>
            <div className="flat-info__wrapper">
              {flatInfo.map((item, index) => (
                <div
                  className="form__group-container flat-input__wrapper"
                  key={index}
                >
                  <div className="form__group">
                    <input
                      className={getCssClass(
                        item.error,
                        "form__item",
                        "input-border--warning ",
                        item.name,
                        10
                      )}
                      type="text"
                      name={item.name}
                      id={item.name}
                      aria-label={item.text}
                      placeholder=""
                      value={item.value}
                      onChange={(e) =>
                        handleChange(
                          e,
                          item.setValue,
                          item.error,
                          item.setError
                        )
                      }
                      required={item.required}
                    />
                    <label
                      className={clsx("form__label", {
                        required: item.required,
                      })}
                      htmlFor={item.name}
                    >
                      {item.text}
                    </label>
                  </div>
                  {(item.value.length > 10 || item.error) && (
                    <WarningForm
                      {...(item.required
                        ? { symbols: "10" }
                        : { text: "Введите не более 10 символов" })}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
