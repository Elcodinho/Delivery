import clsx from "clsx";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import "./CounterBtn.css";

export function CounterBtn(props) {
  const {
    handleIncrease,
    handleDecrease,
    countData = 0,
    cssClass = "",
  } = props;

  return (
    <div className={clsx("counter-btn-container", cssClass)}>
      <button
        className="counter-btn counter-btn--minus"
        type="button"
        aria-label="Удалить единицу товара"
        onClick={handleDecrease}
      >
        <FaMinus className="counter-btn__icon counter-btn__icon--minus" />
      </button>
      <div className="counter-stepper">{countData}</div>
      <button
        className="counter-btn counter-btn--plus"
        type="button"
        aria-label="Добавить единицу товара"
        onClick={handleIncrease}
      >
        <FaPlus className="counter-btn__icon counter-btn__icon--plus" />
      </button>
    </div>
  );
}
