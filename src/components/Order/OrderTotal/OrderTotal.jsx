import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { addOrder } from "@store/orderSlice";
import { selectCart, clearCart } from "@store/cartSlice";
import { countCartTotalSum } from "@utils/countCartTotalSum";
import { EXPRESSDELIVERYCOST, TIPS } from "@constants/constants";
import { ToggleCheckbox } from "@components/UI/Toggles/ToggleCheckbox/ToggleCheckbox";
import { OrderPay } from "./OrderPay/OrderPay";
import { Button } from "@components/UI/Button/Button";
import { FaInfoCircle } from "react-icons/fa";
import "./OrderTotal.css";

export function OrderTotal(props) {
  const { sendForm, clearOrderForm } = props;
  const cart = useSelector(selectCart); // Корзина
  const sum = countCartTotalSum(cart); // Сумма заказа
  const { status: orderStatus } = useSelector((state) => state.order); // Состояние статуса запроса отправки формы
  const dispatch = useDispatch();

  const [orderProducts, setOrderProducts] = useState([]); // Массив товаров для отправки заказа
  const [disabled, setDisabled] = useState(false); // Состояние disabled для кнопки отправки формы
  const [checked, setChecked] = useState(true); // Состояние чекбокса перезвонить
  const [showInfo, setShowInfo] = useState(false); // Состояние показа popup для экспресс доставки
  const [selectedOption, setSelectedOption] = useState("card_online"); // Состояние метода оплаты
  const [changeValue, setChangeValue] = useState(""); // Состояние суммы для сдачи при оплате наличными
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

  // Функция фильтрует каждый товар из корзины и оставляет только нужные его свойства для заказа
  function setProductsToOrder() {
    const filteredCart = cart.map((item) => {
      const { name, amount, size, supplements } = item;
      return {
        name,
        amount,
        ...(size && { size }),
        ...(supplements && { supplements }),
      };
    });
    return filteredCart;
  }

  // Добавляем товары из корзины только с нужными свойствами в массив товаров для заказа
  useEffect(() => {
    setOrderProducts(setProductsToOrder());
  }, [cart]);

  function resetOrder() {
    setOrderProducts([]);
    setDisabled(false); // Сброс состояния disabled кнопки
    setChecked(true); // Сброс состояния чекбокса "перезвонить"
    setShowInfo(false); // Сброс состояния показа popup
    setSelectedOption("card_online"); // Сброс метода оплаты
    setChangeValue(""); // Сброс суммы для сдачи при оплате наличными
    setIsTipsChecked(false); // Сброс состояния чаевых
    setIsExpressDeliveryChecked(false); // Сброс состояния экспресс-доставки

    clearOrderForm(); // Очистка формы
    dispatch(clearCart()); // Очитска корзины
  }

  // Отправка формы
  function handleSubmit(e) {
    e.preventDefault();
    if (!sendForm()) return;
    else {
      const currentDate = new Date();
      const time = format(currentDate, "d MMMM yyyy, HH:mm", {
        locale: ru,
      });
      const totalData = {
        time,
        order: { ...orderProducts },
        personalData: { ...sendForm() },
        sum,
        tips: isTipsChecked,
        express: isExpressDeliveryChecked,
        totalSum,
        recall: !checked,
        payMethod: selectedOption,
        ...(changeValue.trim() && { changeFromSum: changeValue.trim() }),
      };
      dispatch(addOrder(totalData));
    }
  }

  // Изменияем состояние disabled кнопки, в зависимости от наличия товаров в корзине
  useEffect(() => {
    setDisabled(cart.length === 0);
  }, [cart]);

  useEffect(() => {
    if (orderStatus === "resolved") {
      resetOrder();
    }
  }, [orderStatus]);

  return (
    <section className="order-total">
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
          <OrderPay
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            changeValue={changeValue}
            setChangeValue={setChangeValue}
          />
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
              id="express-checkbox"
              checked={isExpressDeliveryChecked}
              onChange={() => setIsExpressDeliveryChecked((prev) => !prev)}
            />
            <label htmlFor="express-checkbox">
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
            <Button
              text="Оформить заказ"
              type="submit"
              cssClass="order-total--style"
              handleClick={handleSubmit}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
