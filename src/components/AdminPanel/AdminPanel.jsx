import { useState } from "react";
import { AdminFeedback } from "./AdminFeedback/AdminFeedback";
import { AdminProduct } from "./AdminProduct/AdminProduct";
import { Button } from "@components/UI/Button/Button";
import "./AdminPanel.css";

const adminButtons = [
  { text: "Добавить отзыв", value: "feedback" },
  { text: "Добавить товар", value: "product" },
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
        </div>
      </div>
    </section>
  );
}
