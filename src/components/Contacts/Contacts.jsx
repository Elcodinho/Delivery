import { SECONDARYNAV } from "@constants/constants";
import { ContactsItem } from "./ContactsItem/ContactsItem";
import { SecondaryNav } from "@components/Navigations/SecondaryNav/SecondaryNav";
import { POINTSADRESS } from "@constants/constants";
import "./Contacts.css";

export function Contacts() {
  return (
    <section className="contacts">
      <div className="container">
        <div className="contacts__wrapper">
          <SecondaryNav buttons={SECONDARYNAV.aboutContactsNav} />
          <h2 className="title--2">Наши рестораны</h2>
          <ul className="contacts__list">
            {POINTSADRESS.map((item, index) => (
              <ContactsItem
                key={index}
                adress={item.adress}
                schedule={item.schedule}
                email={item.email}
                phone={item.phone}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
