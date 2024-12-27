import { createPortal } from "react-dom";
import { FaArrowUp } from "react-icons/fa6";
import "./UpButton.css";

export function UpButton() {
  // Функция скрола вверх
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return createPortal(
    <button className="up-btn" type="button" onClick={scrollToTop}>
      <FaArrowUp />
      Наверх
    </button>,
    document.getElementById("portal-root")
  );
}
