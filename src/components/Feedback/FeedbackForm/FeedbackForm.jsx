import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import clsx from "clsx";
import { addProposition, clearError } from "@store/propositionsSlice";
import { validateEmail } from "@utils/formUtils/validateEmail";
import { getCssClass } from "@utils/getClasses/getCssClass";
import { handleChange } from "@utils/formUtils/handleChange";
import { handlePhoneChange } from "@utils/formUtils/handlePhoneChange";
import { handleEmailChange } from "@utils/formUtils/handleEmailChange";
import { Button } from "@components/UI/Button/Button";
import { WarningForm } from "@components/UI/Warnings/WarningForm/WarningForm";
import { WarningError } from "@components/UI/Warnings/WarningError/WarningError";
import { Loader } from "@components/UI/Loader/Loader";
import { FaStar } from "react-icons/fa";
import "./FeedbackForm.css";

export function FeedbackForm(props) {
  const {
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    title,
    setTitle,
    text,
    setText,
    feedbackAbout,
    setFeedbackAbout,
    feedbackCity,
    setFeedbackCity,
    setShowForm,
  } = props;
  const [nameError, setNameError] = useState(null); // состояние ошибки имени
  const [emailError, setEmailError] = useState(null); // состояние ошибки валидации email
  const [phoneError, setPhoneError] = useState(null); // состояние ошибки валидации номера телефона
  const [textError, setTextError] = useState(null); // состояние ошибки текста отзыва
  const [rating, setRating] = useState(1); // Состояние рейтинга
  const { status: proposStatus, error: proposError } = useSelector(
    (state) => state.propositions
  ); // Состояние статуса и ошибки запроса при отправке отзыва(addProposition)
  const dispatch = useDispatch();

  // Функция, автоматически изменяющая высоту textarea
  function autoResize(textarea) {
    textarea.style.height = "auto"; // Сбросить высоту
    textarea.style.height = `${textarea.scrollHeight}px`; // Установить высоту в зависимости от содержимого
  }

  // Обновляем рейтинг
  const handleStarClick = (newIndex) => {
    setRating(newIndex + 1);
  };

  // Отправка формы
  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim() === "") setNameError(true);
    if (text.trim() === "") setTextError(true);
    if (phone.length > 0 && phone.length < 16) {
      setPhoneError(true);
      return;
    }
    if (email.trim() !== "" && !validateEmail(email)) {
      setEmailError(true);
      return;
    } else if (
      phone.length < 1 ||
      (phone.length > 15 &&
        (email.trim() === "" || validateEmail(email)) &&
        name.trim() !== "" &&
        text.trim() !== "")
    ) {
      const formattedDate = format(new Date(), "EEE, d MMM yyyy 'г.', HH:mm", {
        locale: ru,
      });
      const data = {
        id: new Date().toISOString(),
        date: formattedDate,
        name: name.trim(),
        phone,
        email: email.trim(),
        title: title.trim(),
        feedbackAbout,
        feedbackCity,
        rating: rating,
        text: text.trim(),
      };
      dispatch(addProposition(data));
    }
  }

  // Функция переключения класса ошибки для email
  function getCssClassEmail(baseClass, errorClass) {
    return clsx(baseClass, {
      [errorClass]: emailError || (email.length > 0 && !validateEmail(email)),
    });
  }

  // Функция очистки формы
  function clearForm() {
    setName("");
    setPhone("");
    setEmail("");
    setTitle("");
    setText("");
    setNameError(null);
    setEmailError(null);
    setTextError(null);
    setRating(1);
  }

  // Очистка формы после успешной отправки
  useEffect(() => {
    if (proposStatus === "resolved") {
      setShowForm(false); // Закрываем форму
      clearForm(); // Очищаем форму
    }
  }, [proposStatus]);

  // Сброс ошибки запроса через 8 секунд
  useEffect(() => {
    if (proposError) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 8000);

      return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента
    }
  }, [proposError, dispatch]);

  return (
    <div className="feedback-form__mask" onClick={() => setShowForm(false)}>
      <div
        className="feedback-form__container"
        onClick={(e) => e.stopPropagation()}
      >
        {proposStatus === "loading" && <Loader />}
        {proposError && <WarningError warning={proposError} />}
        <div className="feedback-form__wrapper">
          {/* Крестик для закрытия формы */}
          <button
            type="button"
            className="feedback-form__close-btn"
            onClick={() => setShowForm(false)}
          >
            &#10005;
          </button>

          <h5 className="feedback-form__title">
            Есть предложения или замечания?
          </h5>
          <p className="feedback-form__text">
            Напишите нам. Мы обязательно рассмотрим ваше обращение.
          </p>
          <form className="feedback-form" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="feedback-form__group-container">
              <div className="feedback-form__group">
                <input
                  className={getCssClass(
                    nameError,
                    "feedback-form__item",
                    "input-border--warning",
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
                <label className="feedback-form__label required" htmlFor="name">
                  Имя
                </label>
              </div>
              {(name.length > 60 || nameError) && <WarningForm symbols="60" />}
            </div>
            {/* Phone */}
            <div className="feedback-form__group-container">
              <div className="feedback-form__group">
                <input
                  className={clsx("feedback-form__item", {
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
                <label className="feedback-form__label" htmlFor="phone">
                  Телефон
                </label>
              </div>
              {phone.length > 0 && phone.length < 16 && (
                <WarningForm text="Убедитесь, что вы ввели номер полностью" />
              )}
            </div>
            {/*  Email*/}
            <div className="feedback-form__group-container login__form__group-container">
              <div className="feedback-form__group">
                <input
                  className={getCssClassEmail(
                    "feedback-form__item",
                    "input-border--warning"
                  )}
                  type="email"
                  id="email"
                  aria-label="электронная почта"
                  placeholder=""
                  value={email}
                  onChange={(e) => handleEmailChange(e, setEmail)}
                />
                <label className="feedback-form__label" htmlFor="email">
                  Эл. почта
                </label>
              </div>
              {email.length > 0 && !validateEmail(email) && (
                <WarningForm text="Пожалуйста, введите корректный адрес электронной почты" />
              )}
            </div>
            {/* Title */}
            <div className="feedback-form__group-container">
              <div className="feedback-form__group">
                <input
                  className={getCssClass(
                    null,
                    "feedback-form__item",
                    "input-border--warning",
                    title,
                    80
                  )}
                  type="text"
                  id="feedback-form__title"
                  aria-label="заголовок отзыва"
                  placeholder=""
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label
                  className="feedback-form__label"
                  htmlFor="feedback-form__title"
                >
                  Заголовок отзыва
                </label>
                {title.length > 80 && <WarningForm symbols="80" />}
              </div>
            </div>
            {/* About select */}
            <div className="feedback-form__group-container">
              <div className="feedback-form__group">
                <select
                  className="feedback-form__item feedback-form__item--select"
                  name="feedback-about"
                  id="feedback-about"
                  value={feedbackAbout}
                  onChange={(e) => setFeedbackAbout(e.target.value)}
                  required
                >
                  <option value="О Ресторане">О Ресторане</option>
                  <option value="О службе доставки">О службе доставки</option>
                </select>
                <label
                  className="feedback-form__label feedback-form__label--select required"
                  htmlFor="feedback-about"
                >
                  Тема
                </label>
              </div>
            </div>
            {/* City select */}
            <div className="feedback-form__group-container">
              <div className="feedback-form__group">
                <select
                  className="feedback-form__item feedback-form__item--select"
                  name="feedback-city"
                  id="feedback-city"
                  value={feedbackCity}
                  onChange={(e) => setFeedbackCity(e.target.value)}
                  required
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <label
                  className="feedback-form__label feedback-form__label--select required"
                  htmlFor="feedback-city"
                >
                  Город
                </label>
              </div>
            </div>
            {/* Stars */}
            <div className="feedback-form__stars">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={clsx("form__star", { filled: index < rating })}
                  onClick={() => handleStarClick(index)}
                />
              ))}
            </div>
            {/* Form text */}
            <div className="feedback-form__group feedback-form__group--textarea">
              <textarea
                className={getCssClass(
                  textError,
                  "feedback-form__item feedback-form__text-area",
                  "input-border--warning ",
                  text,
                  500
                )}
                name="feedback-text"
                id="feedback-text"
                placeholder=""
                required
                value={text}
                onChange={(e) =>
                  handleChange(e, setText, textError, setTextError)
                }
                onInput={(e) => autoResize(e.target)}
              ></textarea>
              <label
                className="feedback-form__label feedback-form__label--textarea required"
                htmlFor="feedback-text"
              >
                Текст отзыва
              </label>
              {(text.length > 500 || textError) && (
                <WarningForm symbols="500" />
              )}
            </div>
            {/*  */}
            <p className="policy">
              Предоставляя свои персональные данные, Вы соглашаетесь с{" "}
              <Link className="policy-link" to="/personaldata">
                условиями обработки персональных данных
              </Link>
            </p>
            <div className="feedback-form__btn-wrapper">
              <Button
                text="Отправить"
                cssClass="button--fedback-form-send"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
