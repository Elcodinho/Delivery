import { useState } from "react";
import { AdminFeedback } from "./AdminFeedback/AdminFeedback";
import { AdminProduct } from "./AdminProduct/AdminProduct";
import { AdminStopList } from "./AdminStopList/AdminStopList";
import { AdminRecommends } from "./AdminRecommends/AdminRecommends";
import { Button } from "@components/UI/Button/Button";
import "./AdminPanel.css";

const adminButtons = [
  { text: "Добавить отзыв", value: "feedback" },
  { text: "Добавить или удалить товар", value: "product" },
  { text: "Стоп лист товаров", value: "stop-list" },
  { text: "Рекомендованные товары", value: "recommends-list" },
];

export function AdminPanel() {
  const [shownPage, setShowPage] = useState("feedback");

  return (
    <section className="admin">
      <div className="container">
        <div className="admin__wrapper">
          <div className="admin__buttons-wrapper">
            {adminButtons.map((item) => (
              <Button
                key={item.value}
                text={item.text}
                cssClass={shownPage === item.value ? "" : "button--show-more"}
                handleClick={() => setShowPage(item.value)}
              />
            ))}
          </div>
          {shownPage === "feedback" && <AdminFeedback />}
          {shownPage === "product" && <AdminProduct />}
          {shownPage === "stop-list" && <AdminStopList />}
          {shownPage === "recommends-list" && <AdminRecommends />}
        </div>
      </div>
    </section>
  );
}
