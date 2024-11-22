import { POINTSADRESS } from "@constants/constants";
import "./FormPickup.css";

export function FormPickup() {
  return (
    <div className="order-form__pickup">
      <select className="order-form__select" defaultValue="">
        <option value="" disabled>
          Выберите пункт получения заказа
        </option>
        {POINTSADRESS.map((item, index) => (
          <option key={index} value={item.adress}>
            {item.adress}
          </option>
        ))}
      </select>
    </div>
  );
}
