import { useState } from "react";
import { CounterBtn } from "@components/UI/CounterBtn/CounterBtn";

import "./CartItem.css";

export function CartItem(props) {
  const {
    subCat,
    isClassicPizza,
    name,
    description,
    amount,
    price,
    size,
    image,
    supplements,
  } = props;

  const [counter, setCounter] = useState(amount); // Состояние счетчика кол-ва товара
  const totalPrice = price * counter; // Общая сумма за товар

  const isRolli = subCat === "rolli";
  const isPizza = isClassicPizza;

  const counterCss = {
    btnsWidth: "counter-width--cart",
    btnBlock: "counter-block--cart",
  };

  // Объединяем элементы supplements в строку, если они есть
  const supplementNames = supplements ? supplements.join(", ") : null;
  return (
    <li className="cart__item">
      <div className="cart__description">
        <div className="cart__img-wrapper">
          <img className="cart__img" src={image} alt={name} />
        </div>
        <div className="cart__description-text">
          <h5 className="cart__title">{name}</h5>
          {isRolli && (
            <p>
              <span className="cart__text--capture">Количество: </span>
              {size} шт
            </p>
          )}
          {isPizza && (
            <p>
              <span className="cart__text--capture">Диаметр: </span>
              {size} см
            </p>
          )}
          <p>
            <span className="cart__text--capture">Состав: </span>
            {description}
          </p>
          {isPizza && supplementNames && (
            <div className="cart__supplements">
              <p>
                <span className="cart__text--capture">
                  Дополнительные ингредиенты:{" "}
                </span>
                {supplementNames}
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Cart-Count */}
      <div className="cart-count">
        <div className="cart-count__price">{price} ₽</div>
        <div className="cart-count__counter">
          <CounterBtn
            price={price}
            counter={counter}
            setCounter={setCounter}
            countData={counter}
            cssClass={counterCss}
          />
        </div>
        <div className="cart-count__price cart-count__price--total">
          {totalPrice}
        </div>
      </div>
      <button className="cart__item-delete" type="button">
        ×
      </button>
    </li>
  );
}
