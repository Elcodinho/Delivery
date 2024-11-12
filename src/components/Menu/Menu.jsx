import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "@store/menuSlice";
import { selectMenu } from "@store/menuSlice";
import { Card } from "@components/Card/Card";
// import r from "@assets/images/rolli/onigiri.webp";
import "./Menu.css";

export function Menu() {
  const { category } = useParams();
  const menu = useSelector(selectMenu);
  const dispatch = useDispatch();

  const title =
    category === "burgeri"
      ? "Бургеры"
      : category === "pizza"
      ? "Пицца"
      : "Суши и роллы";

  // Получаем товары
  useEffect(() => {
    dispatch(getMenu(category));
  }, [category, dispatch]);

  return (
    <section className="menu">
      <div className="container">
        <div className="menu__wrapper">
          <h2 className="title--2 menu__title--margin">{title}</h2>
          <ul className="menu__list">
            {menu.map((item) => (
              <Card
                key={item.id}
                name={item.name}
                description={item.description}
                img={item.image}
                price={item.price}
                category={item.category}
                {...(item.type && { type: item.type })} // Тип передается при наличии
                {...(item.subCat && { subCat: item.subCat })} // Подкатегория передается при наличии
                slug={item.slug}
                {...(item.size && { size: item.size })} // Size передается при наличии
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
