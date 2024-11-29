import { phoneFormatter } from "@utils/formatters/phoneFormatter";
import { PHONE, EMAIL, SCHEDULE } from "@constants/constants";
import "./ContactsItem.css";

export function ContactsItem(props) {
  const { adress, schedule, email, phone } = props;
  return (
    <li className="contacts__item">
      <div className="contacts__item-adress">
        <h4 className="contacts__item-adress__title">Еда54</h4>
        <address>
          <p className="contacts__item-adress__text">{adress}</p>
        </address>
      </div>
      <div className="contacts__item-info">
        <p>{schedule}</p>
        <p>
          <a href={`mailto:${email}`}>{email}</a>
        </p>
        <p>
          <a href={`tel:${phone}`}>{phoneFormatter(phone)}</a>
        </p>
      </div>
    </li>
  );
}
