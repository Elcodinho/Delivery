import { DeliveryMap } from "./DeliveryMap/DeliveryMap";
import { SCHEDULE } from "@constants/constants";
import "./DeliveryZones.css";

const deliveryInfo = [
  {
    id: "1",
    text: "Бесплатная доставка при заказе от 1000р с учетом бонусов. При меньшей сумме заказа стоимость доставки 200р. Время ожидания заказа от 60 мин.",
    color: "rgb(245, 237, 79)",
  },
  {
    id: "2",
    text: "Бесплатная доставка при заказе от 1000р с учетом бонусов. При меньшей сумме заказа стоимость доставки 200р. Время ожидания заказа от 60 мин.",
    color: "#009d57",
  },
  {
    id: "3",
    text: "Бесплатная доставка при заказе от 3000р. При меньшей сумме заказа стоимость доставки 500р. Время ожидания заказа до 60-180 мин.",
    cost: "500",
    color: "#db4436",
  },
  {
    id: "4",
    text: "Бесплатная доставка при заказе от 1500р. При меньшей сумме заказа стоимость доставки 400р. Время ожидания заказа до 60-120 мин..",
    cost: "400",
    color: "#93d7e8",
  },
  {
    id: "5",
    text: "Бесплатная доставка при заказе от 5000р. При меньшей сумме заказа стоимость доставки 600р. Время ожидания заказа до 90-180 мин.",
    cost: "600",
    color: "#ccc",
  },
];

export function DeliveryZones() {
  return (
    <div className="delivery-zones">
      <DeliveryMap />
      <div className="delivery-zones__info">
        <div className="delivery-zones__info-time">
          <p className="delivery-zones__info-time__title">Часы работы</p>
          <p>{SCHEDULE}</p>
        </div>
        <ul className="delivery-zones__info__list">
          {deliveryInfo.map((item) => (
            <li className="delivery-zones__info__item" key={item.id}>
              <p style={{ backgroundColor: item.color }}>
                Зона доставки №{item.id}
              </p>
              {item.cost && <span>- доставка {item.cost}руб.</span>}
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
