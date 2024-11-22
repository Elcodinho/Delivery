import clsx from "clsx";
import "./OrderFormToggle.css";

export function OrderFormToggle(props) {
  const { deliveryType, handleChange } = props;
  return (
    <div className="form__toggle-container">
      <label className="form__toggle">
        {/* Радиокнопка*/}
        <input
          type="radio"
          name="delivery"
          value="delivery"
          checked={deliveryType === "delivery"}
          onChange={handleChange}
          className="form__toggle-input"
        />
        <span className="form__toggle-label">Доставка курьером</span>
      </label>

      {/* Переключатель */}
      <span
        className={clsx("form__toggle-switch", {
          right: deliveryType === "pickup",
        })}
      ></span>

      {/* Радиокнопка*/}
      <label className="form__toggle">
        <input
          type="radio"
          name="pickup"
          value="pickup"
          checked={deliveryType === "pickup"}
          onChange={handleChange}
          className="form__toggle-input"
        />
        <span className="form__toggle-label">Самовывоз</span>
      </label>
    </div>
  );
}
