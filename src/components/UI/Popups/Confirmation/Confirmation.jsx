import { useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { Button } from "@components/UI/Button/Button";
import "./Confirmation.css";

export function Confirmation(props) {
  const { title, text, setShowConfirm, handleClear } = props;
  const [isDisappearing, setIsDisappearing] = useState(false);

  // Закрытие с анимацией
  function handleAnimate() {
    setIsDisappearing(true);
    setTimeout(() => {
      setShowConfirm(false);
      setIsDisappearing(false); // сброс состояния
    }, 250); // Длительность анимации совпадает с disappearance
  }

  // Закрытие с анимацией исчезновения
  function handleCloseModal() {
    handleAnimate();
  }
  return createPortal(
    <div
      className={clsx("confirmation-mask", {
        "confirmation-mask--disappear": isDisappearing,
      })}
      onClick={handleCloseModal}
    >
      <div
        className={clsx("confirmation-modal", {
          "confirmation-modal--disappear": isDisappearing,
        })}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirmation-modal__wrapper">
          <p className="confirmation-modal__sub">{title}</p>
          <p className="confirmation-modal__text">{text}</p>
        </div>
        <div className="confirmation-modal__btn-wrapper">
          <Button
            text="Продолжить"
            handleClick={() => {
              handleAnimate();
              handleClear();
            }}
          />
          <Button
            text="Отмена"
            cssClass="confirmation-btn--style"
            handleClick={handleCloseModal}
          />
        </div>
        <button
          type="button"
          className="confirmation-modal__close-btn"
          onClick={handleCloseModal}
        >
          &#10005;
        </button>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
}
