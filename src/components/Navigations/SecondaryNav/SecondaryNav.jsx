import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { getActiveClass } from "@utils/getClasses/getActiveClass";
import "./SecondaryNav.css";

export function SecondaryNav(props) {
  const { buttons, linkClass = "", activeClass = "" } = props;
  return (
    <nav className="secondary__nav">
      <ul className="secondary__nav-list">
        {buttons.map((item, index) => (
          <li className="secondary__nav-item" key={index}>
            <NavLink
              className={({ isActive }) =>
                getActiveClass(
                  { isActive },
                  clsx("secondary__nav-link", linkClass), // объединяем базовый класс с переданным
                  clsx("secondary__nav-link--active", activeClass)
                )
              }
              to={item.path}
              end // Активно только при точном совпадении url
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
