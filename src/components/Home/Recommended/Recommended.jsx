import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recommendedItems, getRecommendItems } from "@store/recommendSlice";
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter";
import { Card } from "@components/Card/Card";
import { Loader } from "@components/UI/Loader/Loader";
import { AddedPopup } from "@components/UI/Popups/AddedPopup/AddedPopup";
import "./Recommended.css";

export function Recommended() {
  const [popups, setPopups] = useState([]); // Хранение активных уведомлений

  const dispatch = useDispatch();
  const items = useSelector(recommendedItems);
  const { getStatus, getError } = useSelector((state) => state.recommend);

  // Получаем рекомендованные товары
  useEffect(() => {
    dispatch(getRecommendItems());
  }, [dispatch]);

  return (
    <section className="recommend">
      {getStatus === "loading" && <Loader />}
      <div className="container">
        <h3 className="recommend__title">Рекомендуемое</h3>
        {getError && <p className="recommend--error">{getError}</p>}
        <div className="recommend__wrapper">
          {popups.length >= 1 &&
            popups.map((name, index) => (
              <AddedPopup key={index} text={name} position={index} />
            ))}
          <ul className="recommend__list">
            {items.map((item) => (
              <Card
                key={item.id}
                name={capitalizeFirstLetter(item.name)}
                description={item.description}
                img={item.image}
                price={item.price}
                weight={item.weight}
                category={item.category}
                disabled={item.disabled}
                {...(item.subCat && { subCat: item.subCat })} // Тип передается при наличии
                {...(item.type && { type: item.type })} // Тип передается при наличии
                slug={item.slug}
                {...(item.size && { size: item.size })} // Size передается при наличии
                setPopups={setPopups}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
