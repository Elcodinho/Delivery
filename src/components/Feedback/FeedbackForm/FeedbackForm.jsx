import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { addProposition, clearError } from "@store/propositionsSlice";
import { validateEmail } from "@utils/formUtils/validateEmail";
import { useClearError } from "@hooks/useClearError";
import { Button } from "@components/UI/Button/Button";
import { WarningError } from "@components/UI/Warnings/WarningError/WarningError";
import { Loader } from "@components/UI/Loader/Loader";
import "./FeedbackForm.css";
//
import { InputName } from "../../FormFields/InputName";
import { InputPhone } from "../../FormFields/InputPhone";
import { InputEmail } from "../../FormFields/InputEmail";
import { InputTitle } from "../../FormFields/InputTitle";
import { AboutSelect } from "../../FormFields/AboutSelect";
import { CitySelect } from "../../FormFields/CitySelect";
import { FormStars } from "../../FormFields/FormStars";
import { InputText } from "../../FormFields/InputText";

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
      let formattedDate = format(new Date(), "EEE, d MMM yyyy 'г.', HH:mm", {
        locale: ru,
      });
      // Проверяем, начинаются ли первые три буквы даты с "суб"
      if (!formattedDate.toLowerCase().startsWith("суб")) {
        // Сокращаем день недели до первых двух букв, если это не "суб"
        formattedDate = formattedDate.replace(/^[а-я]{3}/, (match) =>
          match.slice(0, 2)
        );
      }
      const data = {
        id: new Date().toISOString(),
        date: formattedDate,
        name: name.trim().toLowerCase(),
        phone: phone.replace(/\s+/g, "").trim(),
        email: email.trim().toLowerCase(),
        title: title.trim().toLowerCase(),
        feedbackAbout,
        feedbackCity,
        rating: rating,
        text: text.trim().toLowerCase(),
      };
      dispatch(addProposition(data));
    }
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

  // Сброс ошибки запроса через время
  useClearError(proposError, clearError, 6000);

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
            aria-label="Закрыть форму"
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
            <InputName
              id="name"
              name={name}
              setName={setName}
              nameError={nameError}
              setNameError={setNameError}
            />
            {/* Phone */}
            <InputPhone
              id="phone"
              phone={phone}
              setPhone={setPhone}
              phoneError={phoneError}
              setPhoneError={setPhoneError}
            />
            {/*  Email*/}
            <InputEmail
              id="email"
              email={email}
              setEmail={setEmail}
              emailError={emailError}
            />
            {/* Title */}
            <InputTitle
              id="feedback-form__title"
              title={title}
              setTitle={setTitle}
            />

            {/* About select */}
            <AboutSelect
              id="feedback-about"
              feedbackAbout={feedbackAbout}
              setFeedbackAbout={setFeedbackAbout}
            />
            {/* City select */}
            <CitySelect
              id="feedback-city"
              feedbackCity={feedbackCity}
              setFeedbackCity={setFeedbackCity}
            />
            {/* Stars */}
            <FormStars rating={rating} setRating={setRating} />
            {/* Form text */}
            <InputText
              id="feedback-text"
              text={text}
              setText={setText}
              textError={textError}
              setTextError={setTextError}
            />
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
