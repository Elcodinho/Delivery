import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getInitialSize } from "@utils/getInitialSize";
import { Toggle } from "@components/Card/Toggle/Toggle";
import { Button } from "@components/UI/Button/Button";
import "./Card.css";

export const Card = React.memo(function Card(props) {
  const { name, description, img, price, category, subCat, type, slug, size } =
    props;
  // Устанавливаем начальное значение размера в зависимости от категории
  const initialSize = useMemo(
    () => getInitialSize(category, subCat, size, type),
    [category, subCat, size, type]
  );

  const [selectedAmount, setSelectedAmount] = useState(initialSize); // Состояние для выбранного количества товара
  const [productPrice, setProductPrice] = useState(
    typeof price === "object" ? price.large : price // Используем цену сразу, если это число
  );

  // Переменная для управления показа toggle
  const toggleShow =
    subCat === "rolli" || (category === "pizza" && type !== "rimskaya");

  // Обработчик изменения радиокнопки
  function handleToggleChange(event) {
    const selectedValue = parseFloat(event.target.value); // value из radio переводим в число для сравнения
    setSelectedAmount(selectedValue); // Устанавливаем выбранное количество
  }

  // Определение цены в зависимости от выбранного количества
  useEffect(() => {
    // Если price это не число, а объект с ценами (зависит от категории товара), то устанавливаем его в цену
    if (typeof price === "object") {
      setProductPrice(
        selectedAmount === size.small ? price.small : price.large
      );
    }
  }, [selectedAmount, price, size]);
  return (
    <li className="card">
      <img className="card__img" src={img} alt={name} />
      <div className="card__text-block">
        <Link
          className="card__link"
          to={`/product/${slug}`}
          aria-label={`Перейти к описанию блюда ${name}`}
        >
          <h4 className="card__title">{name}</h4>
        </Link>
        <p className="card__compound">Состав: {description}</p>
        <div className="toggle-btn__wrapper">
          {toggleShow && (
            <Toggle
              size={size}
              subCat={subCat}
              selectedAmount={selectedAmount}
              handleChange={handleToggleChange}
            />
          )}
          <div className="card__total-btn__wrapper">
            <p className="card__total">
              <span>{productPrice}</span>₽
            </p>
            <Button text="В корзину" />
          </div>
        </div>
      </div>
    </li>
  );
});
