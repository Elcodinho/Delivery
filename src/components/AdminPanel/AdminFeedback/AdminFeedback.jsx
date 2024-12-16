import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { addFeedback } from "@store/feedbackSlice";
import { clearFeedbackStatus, clearFeedbackError } from "@store/feedbackSlice";
import { InputName } from "@components/FormFields/InputName";
import { InputTitle } from "@components/FormFields/InputTitle";
import { FormStars } from "@components/FormFields/FormStars";
import { InputText } from "@components/FormFields/InputText";
import { Button } from "@components/UI/Button/Button";
import { Loader } from "@components/UI/Loader/Loader";
import { Success } from "@components/UI/Popups/Success/Success";
import { WarningError } from "@components/UI/Warnings/WarningError/WarningError";
import "./AdminFeedback.css";

export function AdminFeedback() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(1); // Состояние рейтинга

  const dispatch = useDispatch();
  const { status: feedbackSendStatus, error: feedbackSendError } = useSelector(
    (state) => state.feedback
  );

  const [nameError, setNameError] = useState(null); // состояние ошибки имени
  const [textError, setTextError] = useState(null); // состояние ошибки текста отзыва

  // Функция отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim() === "" || title.trim() === "" || text.trim() === "") {
      return;
    } else {
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
        date: formattedDate,
        author: name.trim().toLowerCase(),
        title: title.trim().toLowerCase(),
        body: text.trim().toLowerCase(),
        stars: rating,
      };
      dispatch(addFeedback(data));
    }
  }

  // Функция очистки формы
  function clearForm() {
    setName("");
    setTitle("");
    setText("");
    setNameError(null);
    setTextError(null);
    setRating(1);
  }

  // Очистка формы после успешной отправки
  useEffect(() => {
    if (feedbackSendStatus === "resolved") {
      clearForm(); // Очищаем форму
    }
  }, [feedbackSendStatus]);

  // Сброс ошибки запроса через 6 секунд
  useEffect(() => {
    if (feedbackSendError) {
      const timer = setTimeout(() => {
        dispatch(clearFeedbackError());
      }, 6000);

      return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента
    }
  }, [feedbackSendError, dispatch]);

  // Очистка статуса запроса отправки отзыва
  function clearStatus() {
    dispatch(clearFeedbackStatus());
  }

  return (
    <>
      <h3 className="admin__main-title title--3">Добавить отзыв</h3>
      <div
        className="admin-form__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-form__wrapper">
          {feedbackSendStatus === "loading" && <Loader />}
          {feedbackSendStatus === "resolved" && (
            <Success text="Отзыв успешно добавлен" clearStatus={clearStatus} />
          )}
          {feedbackSendError && <WarningError warning={feedbackSendError} />}
          <p className="admin-form__text">
            Форма для добавления отзывов на странице
          </p>
          <form className="admin-form" onSubmit={handleSubmit}>
            {/* Name */}
            <InputName
              id="name"
              name={name}
              setName={setName}
              nameError={nameError}
              setNameError={setNameError}
            />
            {/* Title */}
            <InputTitle
              id="admin-form__title"
              title={title}
              setTitle={setTitle}
              required={true}
            />
            {/* Form text */}
            <InputText
              id="admin-text"
              text={text}
              setText={setText}
              textError={textError}
              setTextError={setTextError}
            />
            {/* Stars */}
            <FormStars rating={rating} setRating={setRating} />
            {/*  */}

            <div className="admin-form__btn-wrapper">
              <Button
                text="Добавить"
                cssClass="button--fedback-form-send"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
