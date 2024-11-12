import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectFeedback } from "@store/feedbackSlice";
import { FeedbackItem } from "./FeedbackItem/FeedbackItem";
import "./FeedbackList.css";

export function FeedbackList(props) {
  const { currentPage, reviewsPerPage } = props;
  const [currentReviews, setCurrentReviews] = useState([]);
  const feedbackData = useSelector(selectFeedback); // Список отзывов

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

  return (
    <ul className="feedback__list">
      {currentReviews.map((item) => (
        <FeedbackItem
          key={item.id}
          id={item.id}
          title={item.title}
          stars={item.stars}
          date={item.date}
          author={item.author}
          body={item.body}
        />
      ))}
    </ul>
  );
}
