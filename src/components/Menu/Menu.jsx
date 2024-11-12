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
  // Получаем товары
  useEffect(() => {
    dispatch(getMenu(category));
  }, [category, dispatch]);
  return (
    <section className="menu">
      <div className="container">
        <div className="menu__wrapper">
          <h2 className="title--2">Бургеры</h2>
          <ul className="menu__list">
            {menu.map((item) => (
              <Card
                key={item.id}
                // id={item.id}
                name={item.name}
                description={item.description}
                img={item.image}
                price={item.price}
                category={item.category}
                {...(item.subCat ? { subCat: item.subCat } : {})} // Подкатегория передается при наличии
                slug={item.slug}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
