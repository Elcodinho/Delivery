import "./DeliveryItem.css";

export function DeliveryItem(props) {
  const { title, text, img } = props;
  return (
    <li className="delivery-method__item">
      <img className="delivery-method__item-img" src={img} alt={title} />
      <div>
        <p className="delivery-method__item-title">{title}</p>
        <p className="delivery-method__item-text">{text}</p>
      </div>
    </li>
  );
}
