import { useContext } from "react";
import { MobileMenuContext } from "@context/MobileMenuContext";
import { phoneFormatter } from "@utils/formatters/phoneFormatter";
import { PHONE, ADRESS, SCHEDULE } from "@constants/constants";
import { Nav } from "@components/Navigations/Nav/Nav";
import { AppBlock } from "@components/AppBlock/AppBlock";
import logo from "@assets/images/logo.png";
import { FiMapPin } from "react-icons/fi";
import "./MobileMenu.css";

export function MobileMenu() {
  const { setShowMobileMenu } = useContext(MobileMenuContext);

  return (
    <div className="mobile-mask" onClick={() => setShowMobileMenu(false)}>
      <div className="mobile-menu">
        <div className="mobile-menu__wrapper">
          <img className="mobile-menu__img" src={logo} alt="Логотип доставки" />
          {/* Contacts */}
          <address className="header-info__contacts mobile-info__contacts">
            <p className="header-info__contacts-item">
              <button type="button" className="header-info__contacts-button">
                <span className="header-info__contacts-span">Симферополь</span>
                <span className="header-info__contacts--span header-info__contacts-span--decor">
                  {ADRESS}
                </span>
              </button>
            </p>
            <p className="header-info__contacts-item">
              <a href={`tel:${PHONE}`} className="header-info__contacts-phone">
                {phoneFormatter(PHONE)}
              </a>
            </p>
            <p className="header-info__contacts-item header-info__contacts-span--decor">
              {SCHEDULE}
            </p>
            <span className="header-info__contacts-icon">
              <FiMapPin />
            </span>
          </address>
          {/* MobileNav */}
          <Nav socText=" Наши соц. сети:" />
          <AppBlock />
        </div>
      </div>
    </div>
  );
}
