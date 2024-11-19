import { useState, useEffect } from "react";
import clsx from "clsx";
import "./ProductSupplementsItem.css";

export function ProductSupplementsItem(props) {
  const {
    name,
    weight,
    price,
    img,
    updateTotalPrice,
    selectedCount,
    productWeight,
    resetCheck,
  } = props;
  const [isChecked, setIsChecked] = useState(false); // Состояние выбранных добавок

  const isDisabled = selectedCount >= 10 && !isChecked; // Блокируем добавление 11-й добавки

  function handleChange() {
    if (!isDisabled) {
      setIsChecked(!isChecked);
      updateTotalPrice({ name, price }, !isChecked);
    }
  }

  // Сброс отмеченных добавок при изменении размера или цены пиццы
  useEffect(() => {
    setIsChecked(false);
  }, [productWeight, resetCheck]);

  return (
    <li className="supplements__item">
      <label className={clsx("supplements__label", { checked: isChecked })}>
        <input
          className="supplements__input"
          type="checkbox"
          value={name}
          onChange={handleChange}
        />
        <img className="supplements__img" src={img} alt={name} />
        <p className="supplements__name">
          {name} {weight ? `${weight}гр` : ""}
        </p>
        <p className="supplements__price">+{price} ₽</p>
      </label>
    </li>
  );
}
