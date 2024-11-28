import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedback } from "@store/feedbackSlice";
import { selectFeedback } from "@store/feedbackSlice";
import { clearStatus } from "@store/propositionsSlice";
import { Button } from "@components/UI/Button/Button";
import { FeedbackList } from "./FeedBackList/FeedbackList";
import { FeedbackForm } from "./FeedbackForm/FeedbackForm";
import { Loader } from "@components/UI/Loader/Loader";
import { Success } from "@components/UI/Popups/Success/Success";
import { Pagination } from "@components/UI/Pagination/Pagination";
import "./Feedback.css";

export function Feedback() {
  const [showForm, setShowForm] = useState(false); // Состояние показа формы
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница
  const reviewsPerPage = 16; // Количество отзывов на странице
  // Состояние данных из инпутов формы
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [feedbackAbout, setFeedbackAbout] = useState("О Ресторане");
  const [feedbackCity, setFeedbackCity] = useState("1");

  const dispatch = useDispatch();

  const feedbackData = useSelector(selectFeedback); // Список отзывов
  const { status: feedbackStatus, error: feedbackError } = useSelector(
    (state) => state.feedback
  ); // Состояние статуса и ошибки запроса на получение отзывов
  const { status: proposStatus, error: proposError } = useSelector(
    (state) => state.propositions
  ); // Состояние статуса и ошибки запроса при отправке отзыва(addProposition)

  // Получаем посты
  useEffect(() => {
    dispatch(getFeedback());
  }, [dispatch]);

  // Логика для перехода на следующую/предыдущую страницу
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="feedback">
      <div className="container">
        <div className="feedback__wrapper">
          {proposStatus === "resolved" && !proposError && (
            <Success
              text="Отзыв успешно отправлен"
              setShowForm={setShowForm}
              clearStatus={clearStatus}
            />
          )}
          <div className="feedback-title-btn__wrapper">
            <h2 className="title--2">Почитайте отзывы о нас</h2>
            <Button
              text="Оставить отзыв"
              handleClick={() => setShowForm(true)}
            />
            {showForm && (
              <FeedbackForm
                name={name}
                setName={setName}
                phone={phone}
                setPhone={setPhone}
                email={email}
                setEmail={setEmail}
                title={title}
                setTitle={setTitle}
                text={text}
                setText={setText}
                feedbackAbout={feedbackAbout}
                setFeedbackAbout={setFeedbackAbout}
                feedbackCity={feedbackCity}
                setFeedbackCity={setFeedbackCity}
                setShowForm={setShowForm}
              />
            )}
          </div>
          {feedbackStatus === "loading" && <Loader />}
          {feedbackError && <h2>{feedbackError}</h2>}
          {/* Рендрим список постов только при удачном выполнении запросов */}
          {!feedbackError && feedbackStatus === "resolved" && (
            <>
              <FeedbackList
                currentPage={currentPage}
                reviewsPerPage={reviewsPerPage}
              />
              <Pagination
                reviewsPerPage={reviewsPerPage}
                totalReviews={feedbackData.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
