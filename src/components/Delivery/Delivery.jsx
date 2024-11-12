import { DeliveryZones } from "./DeliveryZones/DeliveryZones";
import { DeliveryItem } from "./DeliveryItem/DeliveryItem";
import cardCourier from "@assets/images/delivery/card-courier.avif";
import cashCourier from "@assets/images/delivery/cash-courier.avif";
import courier from "@assets/images/delivery/courier.avif";
import pickup from "@assets/images/delivery/pickup.avif";
import "./Delivery.css";

const deliveryPayMethods = [
  {
    title: "Оплата картой курьеру",
    text: "Курьер привезёт с собой мобильный платёжный терминал. Принимаются карты MasterCard, Maestro и Visa.",
    img: cardCourier,
  },
  {
    title: "Оплата наличными курьеру",
    text: "Вы можете оплатить заказ наличными нашему курьеру. Не забудьте указать с какой суммы вам нужна сдача.",
    img: cashCourier,
  },
];

const deliveryMethods = [
  {
    title: "Доставка курьером",
    text: "Везём БЕСПЛАТНО. Вы оплачиваете только стоимость блюд.",
    img: courier,
  },
  {
    title: "Самовывоз",
    text: "Вы можете получить заказ в ближайшем пункте самовывоза «Еда54» в любое удобное для Вас время.",
    img: pickup,
  },
];

export function Delivery() {
  return (
    <section className="delivery">
      <div className="container">
        <div className="delivery__wrapper">
          <div className="title--2">Условия доставки и оплаты</div>
          <DeliveryZones />
          <div className="delivery-method">
            <div>
              <h6 className="delivery-method__title">Способ оплаты</h6>
              <ul className="delivery-method__list">
                {deliveryPayMethods.map((item, index) => (
                  <DeliveryItem
                    key={index}
                    title={item.title}
                    text={item.text}
                    img={item.img}
                  />
                ))}
              </ul>
            </div>
            <div>
              <h6 className="delivery-method__title">Способо доставки</h6>
              <ul className="delivery-method__list">
                {deliveryMethods.map((item, index) => (
                  <DeliveryItem
                    key={index}
                    title={item.title}
                    text={item.text}
                    img={item.img}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
