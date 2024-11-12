import { useState, useEffect } from "react";
import clsx from "clsx";
import { Button } from "../Button/Button";
import "./Pagination.css";

export function Pagination(props) {
  const { reviewsPerPage, totalReviews, paginate, currentPage } = props;
  const [active, setActive] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalReviews / reviewsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    // Синхронизируем активную страницу с currentPage, если он изменится извне
    setActive(currentPage);
  }, [currentPage]);

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {pageNumbers.map((number) => (
          <li key={number} className="pagination__item">
            <Button
              text={number}
              cssClass={clsx("pagination-btn", {
                "active--p": active === number,
              })}
              handleClick={() => {
                paginate(number);
                setActive(number);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
