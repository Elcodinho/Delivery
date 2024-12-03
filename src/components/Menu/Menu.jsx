import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "@store/menuSlice";
import { selectMenu } from "@store/menuSlice";
import { Card } from "@components/Card/Card";
import { Loader } from "@components/UI/Loader/Loader";
import { AddedPopup } from "@components/UI/Popups/AddedPopup/AddedPopup";
import "./Menu.css";

export function Menu() {
  const { category, type } = useParams();
  const menu = useSelector(selectMenu);
  const { status: menuStatus, error: menuError } = useSelector(
    (state) => state.menu
  );
  const dispatch = useDispatch();
  const [popups, setPopups] = useState([]); // Хранение активных уведомлений

  const title =
    category === "burgeri"
      ? "Бургеры"
      : category === "pizza"
      ? "Пицца"
      : "Суши и роллы";

  // Получаем товары
  useEffect(() => {
    const params = { category };
    if (type) params.type = type; // Добавляем type, если он существует

    dispatch(getMenu(params));
  }, [category, type, dispatch]);

  return (
    <section className="menu">
      <div className="container">
        <div className="menu__wrapper">
          {popups.length >= 1 &&
            popups.map((name, index) => (
              <AddedPopup key={index} text={name} position={index} />
            ))}
          <h2 className="title--2 menu__title--margin">{title}</h2>
          {menuStatus === "loading" && <Loader />}
          {menuError && <p className="text--error">{menuError}</p>}
          {menuStatus === "resolved" && (
            <ul className="menu__list">
              {menu.map((item) => (
                <Card
                  key={item.id}
                  name={item.name}
                  description={item.description}
                  img={item.image}
                  price={item.price}
                  weight={item.weight}
                  category={item.category}
                  {...(item.subCat && { subCat: item.subCat })} // Тип передается при наличии
                  {...(item.type && { type: item.type })} // Тип передается при наличии
                  slug={item.slug}
                  {...(item.size && { size: item.size })} // Size передается при наличии
                  setPopups={setPopups}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
