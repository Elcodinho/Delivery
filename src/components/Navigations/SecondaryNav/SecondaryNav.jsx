import { NavLink } from "react-router-dom";
import { getActiveClass } from "@utils/getActiveClass";
import "./SecondaryNav.css";

export function SecondaryNav({ buttons }) {
  return (
    <nav className="secondary__nav">
      <ul className="secondary__nav-list">
        {buttons.map((item, index) => (
          <li className="secondary__nav-item" key={index}>
            <NavLink
              className={({ isActive }) =>
                getActiveClass(
                  { isActive },
                  "secondary__nav-link",
                  "secondary__nav-link--active"
                )
              }
              to={item.path}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
