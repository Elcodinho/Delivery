import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectCart } from "@store/cartSlice";
import { countCartTotalSum } from "@utils/countCartTotalSum";
import { EXPRESSDELIVERYCOST, TIPS } from "@constants/constants";
import { ToggleCheckbox } from "@components/UI/Toggles/ToggleCheckbox/ToggleCheckbox";
import { OrderPay } from "./OrderPay/OrderPay";
import { Button } from "@components/UI/Button/Button";
import { FaInfoCircle } from "react-icons/fa";
import "./OrderTotal.css";

export function OrderTotal() {
  const cart = useSelector(selectCart);
  const sum = countCartTotalSum(cart); // Сумма заказа
  const [checked, setChecked] = useState(true); // Состояние чекбока перезвонить
  const [showInfo, setShowInfo] = useState(false); // Состояние показа popup для экспресс доставки
  // Состояния для чаевых и доставки
  const [isTipsChecked, setIsTipsChecked] = useState(false);
  const [isExpressDeliveryChecked, setIsExpressDeliveryChecked] =
    useState(false);

  // Сумма всего заказа (товары + чай + доставка)
  const totalSum =
    sum +
    (isTipsChecked ? TIPS : 0) +
    (isExpressDeliveryChecked ? EXPRESSDELIVERYCOST : 0);

  // Переключение чекбокса Перезвонить
  function handleChange() {
    setChecked((prevChecked) => !prevChecked);
  }

  // Функция показа popup для экспресс доставки
  function handleInfoToggle() {
    setShowInfo((prevShow) => !prevShow);
  }

  return (
    <section className="order-total">
      <div className="container">
        <div className="order-total__wrapper">
          <div className="order-total__summary">
            {cart.length < 1 && (
              <p className="order-total__summary--empty">
                Корзина пуста. Добавьте что-нибудь.....
              </p>
            )}
            {cart.length > 0 && (
              <div className="order-total__summary--full">
                <div className="order-total__summary-total">
                  <span className="order-total__summary-span">
                    Итого к оплате:{" "}
                  </span>
                  <span className="order-total__summary-span--total">
                    {totalSum} ₽
                  </span>
                </div>
                <ul className="order-total__summary-list">
                  <li className="order-total__summary-item">
                    <span className="order-total__summary-span">
                      Сумма заказа:{" "}
                    </span>
                    <span className="order-total__summary-span--total">
                      {sum} ₽
                    </span>
                  </li>
                  <li className="order-total__summary-item">
                    <span className="order-total__summary-span">
                      Чаевые команде:{" "}
                    </span>
                    <span className="order-total__summary-span--total">
                      {isTipsChecked ? TIPS : 0} ₽
                    </span>
                  </li>
                  <li className="order-total__summary-item">
                    <span className="order-total__summary-span">
                      Экспресс-доставка:{" "}
                    </span>
                    <span className="order-total__summary-span--total">
                      {isExpressDeliveryChecked ? EXPRESSDELIVERYCOST : 0} ₽
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Total-Info */}
          <div className="order-total__info">
            <p
              className={clsx("order-total__info-pay-way", {
                "pay-way--empty": cart.length < 1,
              })}
            >
              Способ оплаты
            </p>
            <OrderPay />
            {cart.length < 1 && (
              <>
                <p className="order-total__info--empty-cart">Корзина пуста</p>
              </>
            )}
            <p className="order-total__info-text--call">
              Звонок для подтверждения заказа.
            </p>
            <ToggleCheckbox checked={checked} handleChange={handleChange} />

            <div className="order-total__checkbox-container">
              <input
                type="checkbox"
                id="tips-checkbox"
                checked={isTipsChecked}
                onChange={() => setIsTipsChecked((prev) => !prev)}
              />
              <label htmlFor="tips-checkbox">
                Чаевые команде{" "}
                <span className="order-total__checkbox-amount">{TIPS} ₽</span>
              </label>
            </div>

            <div className="order-total__checkbox-container">
              <input
                type="checkbox"
                id="tips-checkbox"
                checked={isExpressDeliveryChecked}
                onChange={() => setIsExpressDeliveryChecked((prev) => !prev)}
              />
              <label htmlFor="tips-checkbox">
                Экспресс доставка{" "}
                <span className="order-total__checkbox-amount">
                  {EXPRESSDELIVERYCOST} ₽
                </span>
              </label>
              <FaInfoCircle
                className="order__info-icon"
                onClick={handleInfoToggle}
              />
              <div
                className={clsx("order-total__info--express", {
                  visible: showInfo,
                })}
              >
                Мы доставим вашу еду еще быстрее.Выберите эту опцию и получите
                свои любимые блюда с максимальной скоростью
              </div>
            </div>
            <p className="order-total__policy">
              Оформляя заказ, Вы соглашаетесь с{" "}
              <Link to="/personaldata" className="order-total__policy-link">
                условиями обработки персональных данных
              </Link>
            </p>
            <div className="order-total__btn-container">
              <Button text="Оформить заказ" cssClass="order-total--style" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
