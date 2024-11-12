import { Nav } from "@components/Navigations/Nav/Nav";
import { HeaderInfo } from "./HeaderInfo/HeaderInfo";
import { HeaderMenu } from "./HeaderMenu/HeaderMenu";
import "./Header.css";
export function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Nav socText=" Наши соц. сети:" />
          <HeaderInfo />
          <HeaderMenu />
        </div>
      </div>
    </header>
  );
}
