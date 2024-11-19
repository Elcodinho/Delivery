import clsx from "clsx";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import "./CounterBtn.css";

export function CounterBtn(props) {
  const {
    price,
    amount,
    handleIncrease,
    handleDecrease,
    countData = `${amount} шт х ${price} ₽`,
    cssClass = {},
  } = props;

  const { btnsWidth, btnBlock } = cssClass;

  return (
    <div className={clsx("counter-btn-container", btnBlock)}>
      <button
        className={clsx("counter-btn counter-btn--minus", btnsWidth)}
        type="button"
        aria-label="Удалить единицу товара"
        onClick={handleDecrease}
      >
        <FaMinus className="counter-btn__icon counter-btn__icon--minus" />
      </button>
      <div className={clsx("counter-stepper", btnsWidth)}>{countData}</div>
      <button
        className={clsx("counter-btn counter-btn--plus", btnsWidth)}
        type="button"
        aria-label="Добавить единицу товара"
        onClick={handleIncrease}
      >
        <FaPlus className="counter-btn__icon counter-btn__icon--plus" />
      </button>
    </div>
  );
}
