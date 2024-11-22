import { NavLink } from "react-router-dom";
import { getActiveClass } from "@utils/getClasses/getActiveClass";
import { FaVk } from "react-icons/fa";
import "./Nav.css";

const navItems = [
  { name: "Доставка и оплата", path: "/delivery-rules" },
  { name: "Отзывы", path: "/feedback" },
  { name: "О ресторане", path: "/about" },
];

export function Nav(props) {
  const { socText, adClass } = props;
  return (
    <nav className="nav">
      <ul className="nav__list">
        {navItems.map((item, index) => (
          <li key={index} className="nav__item">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                getActiveClass(
                  { isActive },
                  `nav__link ${adClass}`,
                  "nav__link--active"
                )
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="nav__social">
        {socText}
        <a
          href="https://vk.com/"
          aria-label="Группа вконтакте"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaVk className="vk-icon" />
        </a>
      </div>
    </nav>
  );
}
