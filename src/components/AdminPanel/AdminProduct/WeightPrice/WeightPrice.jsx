import React from "react";
import { AdminProductInput } from "../AdminProductInput/AdminProductInput";
import "./WeightPrice.css";

export const WeightPrice = React.memo(function WeightPrice(props) {
  const {
    idPrice,
    idWeight,
    weight,
    setWeight,
    price,
    setPrice,
    weightError,
    setWeightError,
    priceError,
    setPriceError,
    title = "",
    extraLabel,
  } = props;

  return (
    <div className="weight-price__container">
      {title && <p className="weight-price__title">{title}</p>}
      <div className="weight-price">
        <AdminProductInput
          id={idWeight}
          value={weight}
          setValue={setWeight}
          valueError={weightError}
          setValueError={setWeightError}
          type="number"
          label={`Вес ${extraLabel}`}
          ariaLabel={`Вес ${extraLabel}`}
          valueLength={5}
          info={`Укажите вес ${extraLabel} в граммах (только числа)`}
        />
        <AdminProductInput
          id={idPrice}
          value={price}
          setValue={setPrice}
          valueError={priceError}
          setValueError={setPriceError}
          type="number"
          label={`Цена ${extraLabel}`}
          ariaLabel={`Цена ${extraLabel}`}
          valueLength={5}
          info={`Укажите цену ${extraLabel} в рублях (только числа)`}
        />
      </div>
    </div>
  );
});
