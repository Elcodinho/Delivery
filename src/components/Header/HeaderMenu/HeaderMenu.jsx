import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { CartPopup } from "@components/UI/Popups/CartPopup/CartPopup";
import { BsCart4 } from "react-icons/bs";
import "./HeaderMenu.css";

const menuItems = [
  { name: "Суши и роллы", path: "/menu/sushi-i-rolli" },
  { name: "Пицца", path: "/menu/pizza" },
  { name: "Бургеры", path: "/menu/burgeri" },
];

export function HeaderMenu() {
  const [isFixed, setIsFixed] = useState(false); // Состояние контролирует позицию компонента(fixed или нет)

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
    </section>
  );
}
