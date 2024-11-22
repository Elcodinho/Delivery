import { useState, useCallback } from "react";
import clsx from "clsx";
import { getCssClass } from "@utils/getClasses/getCssClass";
import { validateEmail } from "@utils/validateEmail";
import { handleChange } from "@utils/formUtils/handleChange";
import { handleEmailChange } from "@utils/formUtils/handleEmailChange";
import { OrderFormToggle } from "./OrderFormToggle/OrderFormToggle";
import { FormPickup } from "./FormPickup/FormPickup";
import { FormDelivery } from "./FormDelivery/FormDelivery";
import { WarningForm } from "@components/UI/Warnings/WarningForm/WarningForm";
import { WarningError } from "@components/UI/Warnings/WarningError/WarningError";
import "./OrderForm.css";

export function OrderForm() {
  const [name, setName] = useState(""); // Имя
  const [email, setEmail] = useState(""); // Email
  const [phone, setPhone] = useState(""); // Номер телефона
  const [street, setStreet] = useState(""); // Улица
  const [house, setHouse] = useState(""); // Номер дом
  const [deliveryType, setDeliveryType] = useState("delivery"); // Состояние способа доставки

  const [nameError, setNameError] = useState(null); // состояние ошибки валидации имени
  const [emailError, setEmailError] = useState(null); // состояние ошибки валидации email

  // Обработчик изменения радиокнопки
  const handleToggleChange = useCallback((event) => {
    setDeliveryType(event.target.value); // Устанавливаем выбранное количество
  });

  // Функция переключения класса ошибки для email
  function getCssClassEmail(baseClass, errorClass) {
    return clsx(baseClass, {
      [errorClass]: emailError || (email.length > 0 && !validateEmail(email)),
    });
  }

  return (
    <section className="order-form">
      <div className="container">
        <div className="form__wrapper">
          <form className="form">
            <p className="form-block__subtitile">Персональная информация</p>
            <div className="form__user-inputs">
              <div className="form__group-container">
                <div className="form__group">
                  <input
                    className={getCssClass(
                      nameError,
                      "form__item",
                      "input-border--warning ",
                      name,
                      60
                    )}
                    type="text"
                    name="name"
                    id="name"
                    aria-label="Имя"
                    placeholder=""
                    value={name}
                    onChange={(e) =>
                      handleChange(e, setName, nameError, setNameError)
                    }
                    required
                  />
                  <label className="form__label required" htmlFor="name">
                    Имя
                  </label>
                </div>
                {(name.length > 60 || nameError) && (
                  <WarningForm symbols="60" />
                )}
              </div>
              {/*  */}
              <div className="form__group-container">
                <div className="form__group">
                  <input
                    className="form__item"
                    type="tel"
                    name="phone"
                    id="phone"
                    aria-label="номер телефона"
                    placeholder=""
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <label className="form__label required" htmlFor="phone">
                    Телефон
                  </label>
                </div>
              </div>
              {/*  */}
              <div className="form__group-container">
                <div className="form__group">
                  <input
                    className={getCssClassEmail(
                      "form__item",
                      "input-border--warning "
                    )}
                    type="email"
                    id="email"
                    aria-label="электронная почта"
                    placeholder=""
                    value={email}
                    onChange={(e) => handleEmailChange(e, setEmail)}
                  />
                  <label className="form__label" htmlFor="email">
                    Эл. почта
                  </label>
                </div>
                {email.length > 0 && !validateEmail(email) && (
                  <WarningForm text="Пожалуйста, введите корректный адрес электронной почты" />
                )}
              </div>
              {/*  */}
            </div>
            <p className="form-block__subtitile">Способ получения заказа</p>
            <OrderFormToggle
              deliveryType={deliveryType}
              handleChange={handleToggleChange}
            />
            {deliveryType === "pickup" && <FormPickup />}
            {deliveryType === "delivery" && (
              <FormDelivery
                street={street}
                setStreet={setStreet}
                house={house}
                setHouse={setHouse}
              />
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
