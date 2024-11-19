import { Link } from "react-router-dom";
import { PageLink } from "@components/UI/Link/PageLink";
import "./CartPopup.css";

export function CartPopup() {
  let count = 0;
  return (
    <div className="cart-popup">
      <p className="cart-popup__amount">
        Товаров в корзине:
        <span className="cart-popup__amount-count">{count}</span>
      </p>
      <h2 className="cart-popup__title">Корзина пуста</h2>
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
    </div>
  );
}
