import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { selectCart } from "@store/cartSlice";
import menuImg from "@assets/images/mobile-nav/cloche.svg";
import contactsImg from "@assets/images/mobile-nav/pointer.svg";
import profileImg from "@assets/images/mobile-nav/profile.svg";
import cartImg from "@assets/images/mobile-nav/cart.svg";
import "./MobileNav.css";

const mobileNavItems = [
  { text: "Меню", path: "/menu/sushi-i-rolli", img: menuImg },
  { text: "Контакты", path: "/contacts", img: contactsImg },
  { text: "Профиль", path: "/cabinet", img: profileImg },
  { text: "Корзина", path: "/order", img: cartImg },
];

export function MobileNav() {
  const cart = useSelector(selectCart);
  const cartLength = cart.length;

  return (
    <nav className="mobile-nav">
      <ul className="mobile-nav__list">
        {mobileNavItems.map((item, index) => (
          <li className="mobile-nav__item" key={index}>
            <Link
              to={item.path}
              className={clsx("mobile-nav__link", {
                "mobile-nav__link--cart": item.text === "Корзина",
              })}
            >
              {item.text === "Корзина" && (
                <span className="mobile-nav__link-span">{cartLength}</span>
              )}
              <img className="mobile-nav__img" src={item.img} alt={item.text} />
              <p className="mobile-nav__text">{item.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
