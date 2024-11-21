import React from "react";
import { useDispatch } from "react-redux";
import { updateProductAmount, removeFromCart } from "@store/cartSlice";
import { CounterBtn } from "@components/UI/CounterBtn/CounterBtn";

import "./CartItem.css";

export const CartItem = React.memo(function CartItem(props) {
  const {
    cartId,
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
  const dispatch = useDispatch();

  const totalPrice = price * amount; // Общая сумма за товар

  const isRolli = subCat === "rolli";
  const isPizza = isClassicPizza;

  // Объединяем элементы supplements в строку, если они есть
  const supplementNames = supplements ? supplements.join(", ") : null;

  // Увеличение кол-ва товара
  const handleIncrease = () => {
    dispatch(updateProductAmount({ cartId, amount: amount + 1 }));
  };

  // Уменьшение кол-ва товара
  const handleDecrease = () => {
    dispatch(updateProductAmount({ cartId, amount: amount - 1 }));
  };

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
        <div className="cart-count__price">
          <span className="cart-count__inform-span">Цена за шт</span>
          <p>{price} ₽</p>
        </div>
        <div className="cart-count__counter">
          <span className="cart-count__inform-span">Кол-во</span>
          <CounterBtn
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
            countData={amount}
          />
        </div>
        <div className="cart-count__price cart-count__price--total">
          <span className="cart-count__inform-span">Итого</span>
          <p>{totalPrice} ₽</p>
        </div>
      </div>
      <button
        className="cart__item-delete"
        type="button"
        aria-label="Удалить товар из корзины"
        onClick={() => dispatch(removeFromCart(cartId))}
      >
        ×
      </button>
    </li>
  );
});
