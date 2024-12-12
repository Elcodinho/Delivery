import React from "react";
import clsx from "clsx";
import { FaStar } from "react-icons/fa";
import "./FormFields.css";

export const FormStars = React.memo(function FormStars(props) {
  const { rating, setRating } = props;

  // Обновляем рейтинг
  const handleStarClick = (newIndex) => {
    setRating(newIndex + 1);
  };

  return (
    <div className="common-form__stars">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={clsx("common-form__star", { filled: index < rating })}
          onClick={() => handleStarClick(index)}
        />
      ))}
    </div>
  );
});
