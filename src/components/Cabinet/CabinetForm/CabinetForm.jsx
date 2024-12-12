import clsx from "clsx";
import { getCssClass } from "@utils/getClasses/getCssClass";
import { handleChange } from "@utils/formUtils/handleChange";
import { handlePhoneChange } from "@utils/formUtils/handlePhoneChange";
import { WarningForm } from "@components/UI/Warnings/WarningForm/WarningForm";
import { Button } from "@components/UI/Button/Button";
import "./CabinetForm.css";

export function CabinetForm(props) {
  const {
    name,
    setName,
    nameError,
    setNameError,
    phone,
    setPhone,
    phoneError,
    setPhoneError,
    gender,
    setGender,
    date,
    setDate,
    setShowForm,
    handleSubmit,
  } = props;

  // Переключения радиокнопок
  function handleGenderChange(e) {
    setGender(e.target.value);
  }

  // Функция установки даты рождения
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div className="cabinet-form__mask" onClick={() => setShowForm(false)}>
      <div
        className="cabinet-form__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cabinet-form__wrapper">
          {/* Крестик для закрытия формы */}
          <button
            type="button"
            className="cabinet-form__close-btn"
            aria-label="Закрыть форму"
            onClick={() => setShowForm(false)}
          >
            &#10005;
          </button>
          <p className="cabinet-form__title">Редатирование профиля</p>

          <form className="cabinet-form" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="common-form__group-container  cabinet-form__group-container">
              <div className="common-form__group">
                <input
                  className={getCssClass(
                    nameError,
                    "common-form__item",
                    "input-border--warning",
                    name,
                    60
                  )}
                  type="text"
                  name="name"
                  id="name-cab"
                  aria-label="Имя"
                  placeholder=""
                  value={name}
                  onChange={(e) =>
                    handleChange(e, setName, nameError, setNameError)
                  }
                  required
                />
                <label
                  className="common-form__label required"
                  htmlFor="name-cab"
                >
                  Имя
                </label>
              </div>
              {(name.length > 60 || nameError) && <WarningForm symbols="60" />}
            </div>

            {/* Phone */}
            <div className="common-form__group-container cabinet-form__group-container">
              <div className="common-form__group">
                <input
                  className={clsx("common-form__item", {
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
                />
                <label className="common-form__label" htmlFor="phone">
                  Телефон
                </label>
              </div>
              {phone.length > 0 && phone.length < 16 && (
                <WarningForm text="Убедитесь, что вы ввели номер полностью" />
              )}
            </div>
            {/* Radio-gender */}
            <div className="cabinet-form__radio-wrapper">
              <div className="cabinet-form__radio">
                <input
                  type="radio"
                  name="gender"
                  id="man"
                  checked={gender === "man"}
                  value="man"
                  onChange={handleGenderChange}
                />
                <label htmlFor="man">Мужской</label>
              </div>
              <div className="cabinet-form__radio">
                <input
                  type="radio"
                  name="gender"
                  id="wooman"
                  checked={gender === "wooman"}
                  value="wooman"
                  onChange={handleGenderChange}
                />
                <label htmlFor="wooman">Женский</label>
              </div>
            </div>

            {/* Birthdate */}
            <div className="cabinet-form__date-container">
              <label htmlFor="birthdate" className="cabinet-form__label">
                Дата рождения
              </label>
              <div className="cabinet-form__input-wrapper">
                <input
                  type="date"
                  id="birthdate"
                  value={date}
                  onChange={handleDateChange}
                  className="cabinet-form__input"
                />
              </div>
            </div>

            <div className="cabinet-form__btn-container">
              <Button
                type="submit"
                text="Сохранить"
                cssClass="order-total--style"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
