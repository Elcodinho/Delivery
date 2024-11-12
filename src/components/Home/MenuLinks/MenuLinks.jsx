import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import pizzaBig from "@assets/images/menuPictures/pizza363.avif";
import rolliBig from "@assets/images/menuPictures/rolli363.avif";
import burgerBig from "@assets/images/menuPictures/burger363.avif";
import pizza from "@assets/images/menuPictures/pizza248.avif";
import rolli from "@assets/images/menuPictures/rolli248.avif";
import burger from "@assets/images/menuPictures/burger263.avif";
import "./MenuLinks.css";

const menuLinks = [
  {
    title: "Роллы",
    imgBig: rolliBig,
    imgSmall: rolli,
    path: "/menu/sushi-i-rolli",
  },
  { title: "Пицца", imgBig: pizzaBig, imgSmall: pizza, path: "/menu/pizza" },
  {
    title: "Бургеры",
    imgBig: burgerBig,
    imgSmall: burger,
    path: "/menu/burgeri",
  },
];
export function MenuLinks() {
  const [isTargetScreen, setIsTargetScreen] = useState(
    window.innerWidth >= 980 && window.innerWidth <= 1200
  ); // Состояние отображает наличие нужного размера экрана

  useEffect(() => {
    const handleResize = () => {
      setIsTargetScreen(window.innerWidth >= 980 && window.innerWidth <= 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <section className="menu-links">
        <div className="container">
          <ul className="menu-links__list">
            {menuLinks.map((item, index) => (
              <li
                className="menu-links__item"
                key={index}
                style={{
                  "--image-url": `url(${
                    isTargetScreen ? item.imgBig : item.imgSmall
                  })`,
                }}
              >
                <Link to={item.path} className="menu-links__item-link">
                  <h4 className="menu-links__item-title">{item.title}</h4>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
