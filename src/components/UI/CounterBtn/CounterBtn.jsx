import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import "./CounterBtn.css";

export function CounterBtn(props) {
  const { price, counter, setCounter } = props;

  function handleMinus() {
    if (counter > 1) {
      setCounter((prevCounter) => prevCounter - 1);
    }
  }

  function handlePlus() {
    setCounter((prevCounter) => prevCounter + 1);
  }

  return (
    <div className="counter-btn-container">
      <button className="counter-btn counter-btn--minus" onClick={handleMinus}>
        <FaMinus className="counter-btn__icon counter-btn__icon--minus" />
      </button>
      <div className="counter-stepper">
        {counter} шт х {price} ₽
      </div>
      <button className="counter-btn counter-btn--plus" onClick={handlePlus}>
        <FaPlus className="counter-btn__icon counter-btn__icon--plus" />
      </button>
    </div>
  );
}
