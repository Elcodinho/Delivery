import clsx from "clsx";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import "./CounterBtn.css";

export function CounterBtn(props) {
  const {
    price,
    counter,
    setCounter,
    countData = `${counter} шт х ${price} ₽`,
    cssClass = {},
  } = props;

  const { btnsWidth, btnBlock } = cssClass;

  function handleMinus() {
    if (counter > 1) {
      setCounter((prevCounter) => prevCounter - 1);
    }
  }

  function handlePlus() {
    setCounter((prevCounter) => prevCounter + 1);
  }

  return (
    <div className={clsx("counter-btn-container", btnBlock)}>
      <button
        className={clsx("counter-btn counter-btn--minus", btnsWidth)}
        type="button"
        aria-label="Удалить единицу товара"
        onClick={handleMinus}
      >
        <FaMinus className="counter-btn__icon counter-btn__icon--minus" />
      </button>
      <div className={clsx("counter-stepper", btnsWidth)}>{countData}</div>
      <button
        className={clsx("counter-btn counter-btn--plus", btnsWidth)}
        type="button"
        aria-label="Добавить единицу товара"
        onClick={handlePlus}
      >
        <FaPlus className="counter-btn__icon counter-btn__icon--plus" />
      </button>
    </div>
  );
}
