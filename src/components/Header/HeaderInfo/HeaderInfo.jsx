import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { PHONE, ADRESS, SCHEDULE } from "@constants/constants";
import { phoneFormatter } from "@utils/phoneFormatter";
import logo from "@assets/images/logo54.webp";
import { FiMapPin } from "react-icons/fi";
import { IoEnterOutline } from "react-icons/io5";
//
import { ExampleModal } from "@components/TestModal/TestModal";

//
import "./HeaderInfo.css";

export function HeaderInfo() {
  const [show, setShow] = useState(false); // Состояние для управления отображения карты с адресом
  const [selectedOption, setSelectedOption] = useState("delivery"); // Состояние для отслеживания выбранной опции доставки
  const [toggleText, setToggleText] = useState("Время доставки ~"); // Состояние для установки текста при переключении радиокнопки
  const [toggleTime, setToggleTime] = useState("60"); // Состояние для установки времени при переключении радиокнопки

  // Функция переключения радиокнопок доставки
  function handleChangeOption(e) {
    setSelectedOption(e.target.id);
  }

  // Изменения текста в блоке toggle при переключении опций
  useEffect(() => {
    if (selectedOption === "delivery") {
      setToggleText("Время доставки~");
      setToggleTime("60");
    } else if (selectedOption === "pickup") {
      setToggleText("Время приготовления~");
      setToggleTime("20");
    }
  }, [selectedOption]);

  return (
    <section className="header-info">
      <div className="header-info__wrapper">
        <div className="header-info__logo">
          <NavLink to="/" className="header-info__logo-link">
            <img
              src={logo}
              alt="Логотип главной страницы"
              className="header-info__logo-img"
            />
          </NavLink>
        </div>
        {/* Contacts */}
        <address className="header-info__contacts">
          <p
            className="header-info__contacts-item"
            onClick={() => setShow(true)}
          >
            <button type="button" className="header-info__contacts-button">
              <span className="header-info__contacts-span">Симферополь</span>
              <span className="header-info__contacts--span header-info__contacts-span--decor">
                {ADRESS}
              </span>
            </button>
          </p>
          <p className="header-info__contacts-item">
            <a href={`tel:${PHONE}`} className="header-info__contacts-phone">
              {phoneFormatter(PHONE)}
            </a>
          </p>
          <p className="header-info__contacts-item header-info__contacts-span--decor">
            {SCHEDULE}
          </p>
          <span className="header-info__contacts-icon">
            <FiMapPin />
          </span>
        </address>
        {/* delivery */}
        <section className="header-info__delivery">
          <div className="header-info__delivery-toggle">
            <input
              className="header-info__delivery-input"
              type="radio"
              id="delivery"
              name="toggle"
              checked={selectedOption === "delivery"}
              onChange={handleChangeOption}
            />
            <label className="header-info__delivery-label" htmlFor="delivery">
              Доставка курьером
            </label>

            <input
              className="header-info__delivery-input"
              type="radio"
              id="pickup"
              name="toggle"
              checked={selectedOption === "pickup"}
              onChange={handleChangeOption}
            />
            <label className="header-info__delivery-label" htmlFor="pickup">
              Самовывоз
            </label>
          </div>
          <p className="header-info__delivery-time">
            {toggleText} <strong>{toggleTime} мин</strong>
          </p>
        </section>

        {/* Login button */}
        <button className="header-info__login-btn">
          <IoEnterOutline className="header-info__login-icon" />
          Войти
        </button>
      </div>
      {show && <ExampleModal show={show} setShow={setShow} />}
    </section>
  );
}
