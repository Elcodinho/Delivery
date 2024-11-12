import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Toggle } from "@components/Card/Toggle/Toggle";
import { Button } from "@components/UI/Button/Button";
import "./Card.css";

export const Card = React.memo(function Card(props) {
  const { name, description, img, price, category, subCat, slug } = props;
  const [selectedAmount, setSelectedAmount] = useState("large"); // Состояние для выбранного количества
  const [productPrice, setProductPrice] = useState(
    typeof price === "object" ? price.large : price // Используем цену сразу, если это число
  );
  const toggleShow =
    subCat === "rolli" || (category === "pizza" && type !== rimskaya); // Переменная для управления показа toggle

  // Обработчик изменения переключателя
  function handleToggleChange() {
    setSelectedAmount((prevAmount) =>
      prevAmount === "small" ? "large" : "small"
    );
  }

  // Определение цены в зависимости от выбранного количества
  useEffect(() => {
    // Если price это не число, а объект с ценами (зависит от категории товара), то устанавливаем его в цену
    if (typeof price === "object") {
      setProductPrice(selectedAmount === "small" ? price.small : price.large);
    }
  }, [selectedAmount, price]);

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
          {toggleShow && <Toggle handleChange={() => handleToggleChange(id)} />}
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
