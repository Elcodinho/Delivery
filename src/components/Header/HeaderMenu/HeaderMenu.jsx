import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import clsx from "clsx";
import { SecondaryNav } from "@components/Navigations/SecondaryNav/SecondaryNav";
import { CartPopup } from "@components/UI/Popups/CartPopup/CartPopup";
import { BsCart4 } from "react-icons/bs";
import "./HeaderMenu.css";

const menuItems = [
  { name: "Суши и роллы", path: "/menu/sushi-i-rolli" },
  { name: "Пицца", path: "/menu/pizza" },
  { name: "Бургеры", path: "/menu/burgeri" },
];
const rolliLinks = [
  { name: "Все", path: "/menu/sushi-i-rolli" },
  { name: "Классические", path: "/menu/sushi-i-rolli/classic" },
  { name: "Горячие", path: "/menu/sushi-i-rolli/hot" },
  { name: "Суши", path: "/menu/sushi-i-rolli/sushi" },
];

const pizzaLinks = [
  { name: "Все", path: "/menu/pizza" },
  { name: "Классическая", path: "/menu/pizza/classic" },
  { name: "Римская", path: "/menu/pizza/rimskaya" },
];

export function HeaderMenu() {
  const [isFixed, setIsFixed] = useState(false); // Состояние контролирует позицию компонента(fixed или нет)
  const [showSecondaryNav, setShowSecondaryNav] = useState(null);
  const { category } = useParams();

  // Проверяем категорию
  useEffect(() => {
    if (category === "sushi-i-rolli") setShowSecondaryNav("sushi-i-rolli");
    else if (category === "pizza") setShowSecondaryNav("pizza");
    else setShowSecondaryNav(null);
  }, [category]);

  // Фиксируем меню из шапки при скролле
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //"header-menu"
  return (
    <section
      className={clsx("header-menu", { "header-menu--fixed ": isFixed })}
    >
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
    </section>
  );
}
