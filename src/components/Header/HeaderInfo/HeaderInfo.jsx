import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PHONE, ADRESS, SCHEDULE } from "@constants/constants";
import { phoneFormatter } from "@utils/formatters/phoneFormatter";
import logo from "@assets/images/logo54.webp";
import { FiMapPin } from "react-icons/fi";
import { IoEnterOutline } from "react-icons/io5";
import { Auth } from "@components/Auth/AuthBlock/Auth";
import userImg from "@assets/images/user-icon.svg";
import "./HeaderInfo.css";

export function HeaderInfo() {
  const [showLogin, setShowLogin] = useState(false); // Состояния показа формы логина
  const [selectedOption, setSelectedOption] = useState("delivery"); // Состояние для отслеживания выбранной опции доставки
  const [toggleText, setToggleText] = useState("Время доставки ~"); // Состояние для установки текста при переключении радиокнопки
  const [toggleTime, setToggleTime] = useState("60"); // Состояние для установки времени при переключении радиокнопки

  const user = useSelector((state) => state.user.email);

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
          <p className="header-info__contacts-item">
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
        {user && (
          <div>
            <Link className="header-info__icon-link" to="/cabinet">
              <div>
                <img
                  className="header-info__icon"
                  src={userImg}
                  alt="Пользователь"
                />
              </div>
              {user}
            </Link>
          </div>
        )}
        {!user && (
          <button
            className="header-info__login-btn"
            onClick={() => setShowLogin(true)}
          >
            <IoEnterOutline className="header-info__login-icon" />
            Войти
          </button>
        )}
      </div>
      {showLogin && <Auth setShowLogin={setShowLogin} />}
    </section>
  );
}
