import { NavLink } from "react-router-dom";
import { SecondaryNav } from "@components/Navigations/SecondaryNav/SecondaryNav";
import { CartPopup } from "@components/UI/Popups/CartPopup/CartPopup";
import { BsCart4 } from "react-icons/bs";
import "./HeaderMenuContent.css";

export function HeaderMenuContent(props) {
  const { menuItems, showSecondaryNav, pizzaLinks, rolliLinks } = props;
  return (
    <div className="header-menu__wrapper">
      <div className="header-menu__content">
        <ul className="header-menu__list">
          {menuItems.map((item, index) => (
            <li className="header-menu__item" key={index}>
              <NavLink to={item.path}>{item.name}</NavLink>
            </li>
          ))}
        </ul>

        <div className="header-menu__cart">
          <div className="header-menu__cart-button">
            <BsCart4 className="header-menu__cart-icon" />
            <span className="header-menu__cart-divider"></span>
            <span className="header-menu__cart-price">
              0<span className="header-menu_currency-symbol">₽</span>
            </span>
          </div>
          <CartPopup />
        </div>
      </div>
      {showSecondaryNav === "sushi-i-rolli" && (
        <SecondaryNav
          buttons={rolliLinks}
          linkClass="secondary__nav-link-menu"
          activeClass="secondary__nav-link-menu--active"
        />
      )}
      {showSecondaryNav === "pizza" && (
        <SecondaryNav
          buttons={pizzaLinks}
          linkClass="secondary__nav-link-menu"
          activeClass="secondary__nav-link-menu--active"
        />
      )}
    </div>
  );
}
