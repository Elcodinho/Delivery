import { useState, useCallback, useRef } from "react";
import clsx from "clsx";
import { getCssClass } from "@utils/getClasses/getCssClass";
import { validateEmail } from "@utils/validateEmail";
import { validateOrderForm } from "@utils/formUtils/validateOrderForm";
import { handleChange } from "@utils/formUtils/handleChange";
import { handlePhoneChange } from "@utils/formUtils/handlePhoneChange";
import { handleEmailChange } from "@utils/formUtils/handleEmailChange";
import { OrderTotal } from "@components/Order/OrderTotal/OrderTotal";
import { OrderFormToggle } from "./OrderFormToggle/OrderFormToggle";
import { FormPickup } from "./FormPickup/FormPickup";
import { FormDelivery } from "./FormDelivery/FormDelivery";
import { WarningForm } from "@components/UI/Warnings/WarningForm/WarningForm";
import "./OrderForm.css";

export function OrderForm() {
  const formRef = useRef(null); // Референс на форму

  const [buildingType, setBuildingType] = useState("flat"); // Состояние типа дома (квартирный или частный)
  const [pickupPoint, setPickupPoint] = useState(""); // Состояния точки самовывоза
  const [name, setName] = useState(""); // Имя
  const [email, setEmail] = useState(""); // Email
  const [phone, setPhone] = useState(""); // Номер телефона
  const [street, setStreet] = useState(""); // Улица
  const [house, setHouse] = useState(""); // Номер дома
  const [flatNum, setFlatNum] = useState(""); // Номер квартиры
  const [entrance, setEntrance] = useState(""); // Подъезд
  const [floor, setFloor] = useState(""); // Этаж
  const [intercom, setIntercom] = useState(""); // Домофон
  const [comment, setComment] = useState(""); // Комментарий к заказу

  const [deliveryType, setDeliveryType] = useState("delivery"); // Состояние способа доставки

  // Состояния ошибок полей формы
  const [nameError, setNameError] = useState(null); // состояние ошибки валидации имени
  const [phoneError, setPhoneError] = useState(null); // Состояние ошибки номера телефона
  const [emailError, setEmailError] = useState(null); // состояние ошибки валидации email
  const [streetError, setStreetError] = useState(null); // Состояние ошибки улицы
  const [houseError, setHouseError] = useState(null); // Состояние ошибки номера дома
  const [pickupPointError, setPickupPointError] = useState(null); // Состояние ошибки улицы
  const [flatNumError, setFlatNumError] = useState(null); // Состояние ошибки номера квартиры
  const [entranceError, setEntranceError] = useState(null); // Состояние ошибки подъезда
  const [floorError, setFloorError] = useState(null); // Состояние ошибки этажа
  const [intercomError, setIntercomError] = useState(null); // Состояние ошибки домофона
  const [commentError, setCommentError] = useState(null); // Состояние ошибки комментария

  // Функция для сброса ошибок после отправки формы
  function resetFormErrors() {
    setNameError(null);
    setPhoneError(null);
    setEmailError(null);
    setStreetError(null);
    setHouseError(null);
    setPickupPointError(null);
    setFlatNumError(null);
    setEntranceError(null);
    setFloorError(null);
    setIntercomError(null);
    setCommentError(null);
  }

  // Функция для сброса состояний полей к начальным значениям
  function resetFormStates() {
    setBuildingType("flat");
    setPickupPoint("");
    setName("");
    setEmail("");
    setPhone("");
    setStreet("");
    setHouse("");
    setFlatNum("");
    setEntrance("");
    setFloor("");
    setIntercom("");
    setComment("");
    setDeliveryType("delivery");
  }

  // Функция полной очистки формы (поля и ошибки полей)
  function clearOrderForm() {
    resetFormErrors();
    resetFormStates();
  }

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

  // Проверка и получение данных с формы
  function sendForm() {
    return validateOrderForm({
      name,
      phone,
      email,
      comment,
      deliveryType,
      pickupPoint,
      street,
      house,
      buildingType,
      flatNum,
      entrance,
      floor,
      intercom,
      setNameError,
      setPhoneError,
      setEmailError,
      setStreetError,
      setHouseError,
      setFlatNumError,
      setPickupPointError,
      formRef,
    });
  }

  return (
    <section className="order-form" ref={formRef}>
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
                    className={clsx("form__item", {
                      "input-border--warning":
                        phone.length > 0 && phone.length < 16,
                    })}
                    type="tel"
                    name="phone"
                    id="phone"
                    aria-label="номер телефона"
                    placeholder=""
                    value={phone}
                    onChange={(e) =>
                      handlePhoneChange(e, phoneError, setPhoneError, setPhone)
                    }
                    required
                  />
                  <label className="form__label required" htmlFor="phone">
                    Телефон
                  </label>
                </div>
                {phone.length > 0 && phone.length < 16 && (
                  <WarningForm text="Убедитесь, что вы ввели номер полностью" />
                )}
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
            {deliveryType === "pickup" && (
              <FormPickup
                pickupPoint={pickupPoint}
                setPickupPoint={setPickupPoint}
                pickupPointError={pickupPointError}
                setPickupPointError={setPickupPointError}
              />
            )}
            {deliveryType === "delivery" && (
              <FormDelivery
                buildingType={buildingType}
                setBuildingType={setBuildingType}
                street={street}
                setStreet={setStreet}
                house={house}
                setHouse={setHouse}
                flatNum={flatNum}
                setFlatNum={setFlatNum}
                entrance={entrance}
                setEntrance={setEntrance}
                floor={floor}
                setFloor={setFloor}
                intercom={intercom}
                setIntercom={setIntercom}
                // Errors
                streetError={streetError}
                setStreetError={setStreetError}
                houseError={houseError}
                setHouseError={setHouseError}
                flatNumError={flatNumError}
                setFlatNumError={setFlatNumError}
                entranceError={entranceError}
                setEntranceError={setEntranceError}
                floorError={floorError}
                setFloorError={setFloorError}
                intercomError={intercomError}
                setIntercomError={setIntercomError}
              />
            )}
            {/* Order-Comment */}
            <div className="form__group-container comment-input__wrapper">
              <div className="form__group">
                <input
                  className={getCssClass(
                    commentError,
                    "form__item",
                    "input-border--warning ",
                    comment,
                    200
                  )}
                  type="text"
                  name="comment"
                  id="comment"
                  aria-label="Комментарий к заказу"
                  placeholder=""
                  value={comment}
                  onChange={(e) =>
                    handleChange(e, setComment, commentError, setCommentError)
                  }
                />
                <label className="form__label" htmlFor="comment">
                  Комментарий
                </label>
              </div>
              {(comment.length > 200 || commentError) && (
                <WarningForm text="Введите не более 200 символов" />
              )}
            </div>
            {/*  */}
          </form>
        </div>
      </div>
      <OrderTotal sendForm={sendForm} clearOrderForm={clearOrderForm} />
    </section>
  );
}
