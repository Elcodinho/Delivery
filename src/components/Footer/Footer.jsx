import { NavLink } from "react-router-dom";
import { Nav } from "@components/Navigations/Nav/Nav";
import { AppBlock } from "@components/AppBlock/AppBlock";
import mastercardImg from "@assets/images/paySystems/mastercard.svg";
import mirImg from "@assets/images/paySystems/mir.svg";
import visaImg from "@assets/images/paySystems/visa.svg";
import "./Footer.css";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <section className="footer__pay">
            <div className="footer__pay-img-wrapper">
              <h4>Мы принимаем:</h4>
              <img
                className="footer__pay-img"
                src={mastercardImg}
                alt="карты мастеркард"
              />
              <img className="footer__pay-img" src={mirImg} alt="карты мир" />
              <img className="footer__pay-img" src={visaImg} alt="карты виза" />
            </div>
            <AppBlock />
          </section>
          <div className="footer__nav-wrapper">
            <Nav socText="Мы в соц. сетях" adClass="f" />
          </div>

          {/*  */}
          <section className="footer__info">
            <div className="footer__info-rights">
              <p className="footer__info-rights__text">
                © 2024-{currentYear} Еда54
              </p>
              <p className="footer__info-rights__text">
                <NavLink to="/privacy">Правовая Информация</NavLink>
              </p>
            </div>
            <p className="footer__info-develop">By ElCodinho</p>
          </section>
        </div>
      </div>
    </footer>
  );
}
