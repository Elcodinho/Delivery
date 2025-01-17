import { useContext } from "react";
import { Link } from "react-router-dom";
import { MobileMenuContext } from "@context/MobileMenuContext";
import logo from "@assets/images/logo.png";
import { IoMenu } from "react-icons/io5";
import "./MobileHeaderInfo.css";

export function MobileHeaderInfo() {
  const { setShowMobileMenu } = useContext(MobileMenuContext);

  return (
    <section className="mobile-info">
      <div className="mobile-info__wrapper">
        {/* ShowMenu */}
        <button
          className="mobile-info__button"
          type="button"
          aria-label="Открыть мобильное меню"
          onClick={() => setShowMobileMenu(true)}
        >
          <IoMenu className="mobile-info__button-icon" />
        </button>
        {/* Logo */}
        <div className="mobile-info__logo">
          <Link
            to="/"
            className="mobile-info__logo-link"
            aria-label="Перейти на главную страницу"
          >
            <img
              src={logo}
              alt="Логотип главной страницы"
              className="mobile-info__logo-img"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
