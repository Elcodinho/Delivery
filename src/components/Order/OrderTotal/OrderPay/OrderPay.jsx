import { useState } from "react";
import clsx from "clsx";
import onlineImg from "@assets/images/order-pay/card_online.svg";
import onDeliveryImg from "@assets/images/order-pay/card_on_delivery.svg";
import cashImg from "@assets/images/order-pay/cash.svg";
import "./OrderPay.css";

const options = [
  {
    value: "card_online",
    label: "Картой на сайте",
    icon: onlineImg,
  },
  {
    value: "card_on_delivery",
    label: "Картой при получении",
    icon: onDeliveryImg,
  },

  {
    value: "cash",
    label: "Наличными курьеру",
    icon: cashImg,
  },
];

export function OrderPay() {
  const [selectedOption, setSelectedOption] = useState("card_online");
  const [changeValue, setChangeValue] = useState("");

  // Убираем все кроме цифр из инпута
  function handleInput(e) {
    setChangeValue(e.target.value.replace(/\D/g, ""));
  }

  return (
    <div className="order-pay__block">
      {options.map((option) => (
        <label
          key={option.value}
          className={`order-pay__radio ${
            selectedOption === option.value ? "order-pay__radio--selected" : ""
          }`}
        >
          <input
            type="radio"
            name="payment"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={() => setSelectedOption(option.value)}
          />
          <img
            src={option.icon}
            alt={option.label}
            className="order-pay__radio__icon"
          />
          <span className="order-pay__radio__label">{option.label}</span>
        </label>
      ))}
      <div
        className={clsx("change-block", { visible: selectedOption === "cash" })}
      >
        <label htmlFor="change">Нужна сдача с: </label>
        <input
          className="input-change"
          type="text"
          name="change"
          id="change"
          value={changeValue}
          onChange={handleInput}
          inputMode="numeric"
        />
        <span>₽</span>
      </div>
    </div>
  );
}
