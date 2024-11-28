import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import "./Success.css";

export function Success(props) {
  const { text, clearStatus, setShowForm = () => {} } = props;
  const dispatch = useDispatch();

  // Закрываем модалку сбросив статус запроса
  function handleCloseModal() {
    dispatch(clearStatus());
    setShowForm(false);
  }

  return createPortal(
    <div className="success-mask" onClick={handleCloseModal}>
      <div className="success-modal" onClick={(e) => e.stopPropagation()}>
        <div className="success-modal__wrapper">
          <p className="success-modal__sub">Успешно</p>
          <p className="success-modal__text">{text}</p>
          <button
            className="success-modal__btn"
            type="button"
            onClick={handleCloseModal}
          >
            Продолжить
          </button>
        </div>
        <button
          type="button"
          className="success-modal__close-btn"
          onClick={handleCloseModal}
        >
          &#10005;
        </button>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
}
