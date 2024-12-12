import React from "react";
import { AdminProductInput } from "../AdminProductInput/AdminProductInput";
import "./WeightPrice.css";

export const WeightPrice = React.memo(function WeightPrice(props) {
  const {
    weight,
    setWeight,
    price,
    setPrice,
    weightError,
    setWeightError,
    priceError,
    setPriceError,
    title = "",
  } = props;

  return (
    <div className="weight-price__container">
      {title && <p className="weight-price__title">{title}</p>}
      <div className="weight-price">
        <AdminProductInput
          id="admin-weight"
          value={weight}
          setValue={setWeight}
          valueError={weightError}
          setValueError={setWeightError}
          type="number"
          label="Вес товара"
          ariaLabel="Вес товара"
          valueLength={5}
          info="Укажите вес товара в граммах (только числа)"
        />
        <AdminProductInput
          id="admin-price"
          value={price}
          setValue={setPrice}
          valueError={priceError}
          setValueError={setPriceError}
          type="number"
          label="Цена товара"
          ariaLabel="Цена товара"
          valueLength={5}
          info="Укажите цену товара в рублях (только числа)"
        />
      </div>
    </div>
  );
});
