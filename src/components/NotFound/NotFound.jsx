import { PageLink } from "@components/UI/Link/PageLink";
import notFoundImg from "@assets/images/error-page.webp";
import "./NotFound.css";

export function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <div className="not-found__wrapper">
          <div className="not-found__main">
            <span className="not-found__span">4</span>
            <img className="not-found__img" src={notFoundImg} alt="Тарелка" />
            {!notFoundImg && <span className="not-found__span">0</span>}
            <span className="not-found__span">4</span>
          </div>
          <p className="not-found__text">Страница не найдена...</p>
          <div className="not-found__link-wrapper">
            <PageLink text="На главную" cssClass="not-found__link" adress="/" />
          </div>
        </div>
      </div>
    </section>
  );
}
