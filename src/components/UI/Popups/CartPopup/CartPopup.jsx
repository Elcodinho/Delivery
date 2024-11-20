import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCart } from "@store/cartSlice";
import { countCartTotalSum } from "@utils/countCartTotalSum";
import { PageLink } from "@components/UI/Link/PageLink";
import { CartPopupItem } from "./CartPopupItem/CartPopupItem";
import "./CartPopup.css";

export function CartPopup() {
  const cart = useSelector(selectCart);
  const itemsCounter = cart.length;
  const sum = countCartTotalSum(cart);
  return (
    <div className="cart-popup">
      <p className="cart-popup__amount">
        Товаров в корзине:
        <span className="cart-popup__amount-count">{itemsCounter}</span>
      </p>
      {itemsCounter < 1 && (
        <>
          <h3 className="cart-popup__title">Корзина пуста</h3>
          <p className="cart-popup__text">
            Выберите блюдо из меню или повторите понравившийся заказ в{" "}
            <Link to="#" className="cart-popup__link">
              личном кабинете
            </Link>
          </p>
          <div className="cart-popup__button-block">
            <PageLink
              text="Перейти в меню"
              cssClass="link--font"
              adress="/menu/sushi-i-rolli"
            />
          </div>
        </>
      )}
      {itemsCounter > 0 && (
        <div>
          <div className="test-list-scroll">
            <ul className="cart-popup__list">
              {cart.map((item) => (
                <CartPopupItem
                  key={item.cartId}
                  name={item.name}
                  amount={item.amount}
                  price={item.price}
                  weight={item.weight}
                  size={item.size}
                  image={item.image}
                  cartId={item.cartId}
                  subCat={item.subCat}
                  isClassicPizza={item.isClassicPizza}
                />
              ))}
            </ul>
          </div>
          <div className="cart-popup__total-container">
            <p>
              <span>Итого: </span>
              {sum} ₽
            </p>
            <PageLink
              text="В корзину"
              cssClass="cart-popup-style"
              adress="/order"
            />
          </div>
        </div>
      )}
    </div>
  );
}
