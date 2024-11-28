import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, clearCart } from "@store/cartSlice";
import { CartItem } from "./CartItem/CartItem";
import { PageLink } from "@components/UI/Link/PageLink";
import { Confirmation } from "@components/UI/Popups/Confirmation/Confirmation";
import "./Cart.css";

export function Cart() {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  // Функция полной очистки корзины
  function handleClear() {
    dispatch(clearCart());
  }

  return (
    <section className="cart">
      <div className="container">
        <div className="cart__wrapper">
          {showConfirm && (
            <Confirmation
              title="Внимание"
              text="Вы хотите полностью очистить корзину?"
              setShowConfirm={setShowConfirm}
              handleClear={handleClear}
            />
          )}
          {cart.length < 1 && (
            <div className="cart--empty">
              <h2 className="title--2 cart__title--empty">
                В корзине пока ничего нет
              </h2>
              <PageLink
                text="Вернуться в меню"
                cssClass="button-cart--empty"
                adress="/menu/sushi-i-rolli"
              />
            </div>
          )}
          {cart.length > 0 && (
            <div>
              <div className="cart__button-container">
                <button
                  className="cart__button--clear"
                  type="button"
                  onClick={() => setShowConfirm(true)}
                >
                  Очистить корзину
                </button>
              </div>
              <ul className="cart__list">
                {cart.map((item, index) => (
                  <CartItem
                    key={index}
                    cartId={item.cartId}
                    subCat={item.subCat}
                    isClassicPizza={item.isClassicPizza}
                    name={item.name}
                    description={item.description}
                    amount={item.amount}
                    price={item.price}
                    size={item.size}
                    image={item.image}
                    supplements={item.supplements}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
