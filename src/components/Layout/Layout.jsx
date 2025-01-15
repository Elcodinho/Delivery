import { useContext, useState, useEffect, Suspense } from "react";
import { useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { MobileMenuContext } from "@context/MobileMenuContext";
import { Header } from "@components/Header/Header";
import { Footer } from "@components/Footer/Footer";
import { MobileNav } from "@components/Mobile/MobileNav/MobileNav";
import { MobileMenu } from "@components/Mobile/MobileMenu/MobileMenu";
import { UpButton } from "@components/UI/UpButton/UpButton";
import { Loader } from "@components/UI/Loader/Loader";

export function Layout() {
  const isMobile = useMediaQuery("(max-width:580px)");
  const { showMobileMenu } = useContext(MobileMenuContext);
  const [showUpButton, setShowUpButton] = useState(false); // Состояние показа кнопки сролла наверх
  const [lastScrollY, setLastScrollY] = useState(0); // Состояние для хранения предыдущей позиции прокрутки

  // Эффект для отслеживания прокрутки

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      setLastScrollY(currentScrollY);
      if (currentScrollY > 300 && currentScrollY <= lastScrollY) {
        setShowUpButton(true);
      } else {
        setShowUpButton(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    // Очистка при размонтировании
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Footer />
      {isMobile && showMobileMenu && <MobileMenu />}
      {isMobile && <MobileNav />}
      {showUpButton && <UpButton />}
    </>
  );
}
