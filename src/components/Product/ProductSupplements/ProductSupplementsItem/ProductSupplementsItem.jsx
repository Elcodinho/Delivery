import { useState, useEffect } from "react";
import clsx from "clsx";
import tomatoImg from "@assets/images/tomato.webp";
import "./ProductSupplementsItem.css";

export function ProductSupplementsItem(props) {
  const { name, price, img, updateTotalPrice, selectedCount, resetCheck } =
    props;
  const [isChecked, setIsChecked] = useState(false);

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
  }, [resetCheck]);

  return (
    <li className="supplements__item">
      <label className={clsx("supplements__label", { checked: isChecked })}>
        <input
          className="supplements__input"
          type="checkbox"
          value={name}
          onChange={handleChange}
        />
        <img className="supplements__img" src={tomatoImg} alt={name} />
        <p className="supplements__name">{name}</p>
        <p className="supplements__price">+{price} ₽</p>
      </label>
    </li>
  );
}
