import React from "react";
import useAdminCheck from "@hooks/useAdminCheck";
import { ADMINEMAIL } from "@constants/constants";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import "./FeedbackItem.css";

export const FeedbackItem = React.memo(function FeedbackItem(props) {
  const { id, title, stars, date, author, body, setShowConfirm, setIdDelete } =
    props;
  const isAdmin = useAdminCheck(ADMINEMAIL);

  return (
    <li className="feedback__item">
      <div className="feedback__stars">
        {Array.from({ length: 5 }, (_, i) =>
          i < stars ? (
            <FaStar key={i} className="star--filled" />
          ) : (
            <FaRegStar key={i} className="star--filled" />
          )
        )}
      </div>
      <h6 className="feedback__item-title">{title}</h6>
      <div className="feedback__item-date-author">
        <span>{date}</span>
        <span>написал(а) {author}</span>
      </div>
      <p className="feedback__item-body">{body}</p>
      {isAdmin && (
        <button
          type="button"
          className="feedback__item--remove"
          onClick={() => {
            setIdDelete(id);
            setShowConfirm(true);
          }}
        >
          Удалить
        </button>
      )}
    </li>
  );
});
