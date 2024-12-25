import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFeedback, deleteFeedback } from "@store/feedbackSlice";
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter";
import { FeedbackItem } from "./FeedbackItem/FeedbackItem";
import { Confirmation } from "@components/UI/Popups/Confirmation/Confirmation";
import "./FeedbackList.css";

export function FeedbackList(props) {
  const { currentPage, reviewsPerPage } = props;
  const dispatch = useDispatch();

  const [currentReviews, setCurrentReviews] = useState([]);
  const feedbackData = useSelector(selectFeedback); // Список отзывов
  const [showConfirm, setShowConfirm] = useState(false);
  const [idDelete, setIdDelete] = useState(""); // id отзыва для удаления

  // Используем useMemo для вычисления перевернутого списка
  const reversedFeedbackData = useMemo(() => {
    return [...feedbackData].reverse(); // Переворачиваем список только при изменении feedbackData
  }, [feedbackData]);

  useEffect(() => {
    // Логика для получения отзывов на текущей странице
    const indexOfLastReview = currentPage * reviewsPerPage; // Индекс последнего отзыва
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage; // Индекс первого отзыва
    setCurrentReviews(
      reversedFeedbackData.slice(indexOfFirstReview, indexOfLastReview)
    );
  }, [feedbackData, currentPage]);

  // Функция удаления отзыва
  function handleRemove() {
    dispatch(deleteFeedback(idDelete));
  }

  return (
    <ul className="feedback__list">
      {showConfirm && (
        <Confirmation
          title="Внимание"
          text="Вы действительно хотите удалить отзыв?"
          setShowConfirm={setShowConfirm}
          handleClear={handleRemove}
        />
      )}
      {currentReviews.map((item) => (
        <FeedbackItem
          key={item.id}
          id={item.id}
          title={capitalizeFirstLetter(item.title)}
          stars={item.stars}
          date={item.date}
          author={capitalizeFirstLetter(item.author)}
          body={capitalizeFirstLetter(item.body)}
          setShowConfirm={setShowConfirm}
          setIdDelete={setIdDelete}
        />
      ))}
    </ul>
  );
}
