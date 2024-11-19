import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { HeaderMenuContent } from "./HeaderMenuContent/HeaderMenuContent";
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

  return (
    <section
      className={clsx("header-menu", { "header-menu--fixed ": isFixed })}
    >
      {isFixed && (
        <div className="container">
          <HeaderMenuContent
            menuItems={menuItems}
            showSecondaryNav={showSecondaryNav}
            pizzaLinks={pizzaLinks}
            rolliLinks={rolliLinks}
          />
        </div>
      )}
      {!isFixed && (
        <HeaderMenuContent
          menuItems={menuItems}
          showSecondaryNav={showSecondaryNav}
          pizzaLinks={pizzaLinks}
          rolliLinks={rolliLinks}
        />
      )}
    </section>
  );
}
