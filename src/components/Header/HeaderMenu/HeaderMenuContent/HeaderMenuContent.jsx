import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { selectCart } from "@store/cartSlice";
import { countCartTotalSum } from "@utils/countCartTotalSum";
import { SecondaryNav } from "@components/Navigations/SecondaryNav/SecondaryNav";
import { CartPopup } from "@components/UI/Popups/CartPopup/CartPopup";
import { BsCart4 } from "react-icons/bs";
import "./HeaderMenuContent.css";

export function HeaderMenuContent(props) {
  const { menuItems, showSecondaryNav, pizzaLinks, rolliLinks } = props;
  const cart = useSelector(selectCart);
  const isMobile = useMediaQuery("(max-width:580px)");

  // Считаем общую сумму всех товаров в корзине
  const sum = countCartTotalSum(cart);

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

        {!isMobile && (
          <div className="header-menu__cart">
            <Link to="/order" className="header-menu__cart-button">
              <BsCart4 className="header-menu__cart-icon" />
              <span className="header-menu__cart-divider"></span>
              <span className="header-menu__cart-price">
                {sum}
                <span className="header-menu_currency-symbol">₽</span>
              </span>
            </Link>
            <CartPopup />
          </div>
        )}
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
