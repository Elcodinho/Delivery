import { useContext } from "react";
import { useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { MobileMenuContext } from "@context/MobileMenuContext";
import { Header } from "@components/Header/Header";
import { Footer } from "@components/Footer/Footer";
import { MobileNav } from "@components/Mobile/MobileNav/MobileNav";
import { MobileMenu } from "@components/Mobile/MobileMenu/MobileMenu";

export function Layout() {
  const isMobile = useMediaQuery("(max-width:580px)");
  const { showMobileMenu, setShowMobileMenu } = useContext(MobileMenuContext);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {isMobile && showMobileMenu && <MobileMenu />}
      {isMobile && <MobileNav />}
    </>
  );
}
