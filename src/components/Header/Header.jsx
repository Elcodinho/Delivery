import { useContext } from "react";
import { useMediaQuery } from "@mui/material";
import { LoginContext } from "@context/LoginContext";
import { Nav } from "@components/Navigations/Nav/Nav";
import { HeaderInfo } from "./HeaderInfo/HeaderInfo";
import { HeaderMenu } from "./HeaderMenu/HeaderMenu";
import { MobileHeaderInfo } from "@components/Mobile/MobileHeaderInfo/MobileHeaderInfo";
import { Auth } from "@components/Auth/AuthBlock/Auth";

import "./Header.css";
export function Header() {
  const { showLogin } = useContext(LoginContext); // Состояния показа popup логина
  const isMobile = useMediaQuery("(max-width:580px)");

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          {!isMobile && <Nav socText=" Наши соц. сети:" />}
          {isMobile ? <MobileHeaderInfo /> : <HeaderInfo />}
          <HeaderMenu />
          {showLogin && <Auth />}
        </div>
      </div>
    </header>
  );
}
