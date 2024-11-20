import React from "react";
import { useDispatch } from "react-redux";
import { updateProductAmount, removeFromCart } from "@store/cartSlice";
import { CounterBtn } from "@components/UI/CounterBtn/CounterBtn";
import "./CartPopupItem.css";

export const CartPopupItem = React.memo(function CartPopupItem(props) {
  const {
    name,
    amount,
    price,
    weight,
    size,
    image,
    cartId,
    subCat,
    isClassicPizza,
  } = props;
  const dispatch = useDispatch();

  // Увеличение кол-ва товара
  const handleIncrease = () => {
    dispatch(updateProductAmount({ cartId, amount: amount + 1 }));
  };

  // Уменьшение кол-ва товара
  const handleDecrease = () => {
    dispatch(updateProductAmount({ cartId, amount: amount - 1 }));
  };

  return (
    <li className="cart-popup__item">
      <img className="cart-popup__item-img" src={image} alt={name} />
      <div className="cart-popup__item-content">
        <div className="cart-popup__item-content__title-wrapper">
          <p className="cart-popup__item-content__title">{name}</p>
          <button
            className="cart-popup__item-delete"
            type="button"
            aria-label="Удалить товар из корзины"
            onClick={() => dispatch(removeFromCart(cartId))}
          >
            ×
          </button>
        </div>
        {subCat === "rolli" && (
          <p className="cart-popup__item-content__amount">
            Количество: {size} шт
          </p>
        )}
        {isClassicPizza && (
          <p className="cart-popup__item-content__amount">Диаметр: {size} см</p>
        )}
        <p className="cart-popup__item-content__weight">{weight} гр</p>
        <div className="cart-popup__item-content__price-wrapper">
          <p className="cart-popup__item-content__price">{price} ₽</p>
          <CounterBtn
            countData={amount}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
            cssClass="cart-popup__width"
          />
        </div>
      </div>
    </li>
  );
});
