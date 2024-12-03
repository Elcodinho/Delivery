import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCart } from "@store/cartSlice";
import { setUser, startLoading, removeUser } from "@store/userSlice";

// Pages
import { Layout } from "@components/Layout/Layout";
import { HomePage } from "@pages/HomePage";
import { AboutPage } from "@pages/AboutPage";
import { ContactsPage } from "@pages/ContactsPage";
import { FeedbackPage } from "@pages/FeedBackPage";
import { PersonalDataPage } from "@pages/PersonalDataPage";
import { DeliveryPage } from "@pages/DeliveryPage";
import { PrivacyPage } from "@pages/PrivacyPage";
import { MenuPage } from "@pages/MenuPage";
import { ProductPage } from "@pages/ProductPage";
import { OrderPage } from "@pages/OrderPage";
import { CabinetPage } from "@pages/CabinetPage";
import { NotFoundpage } from "@pages/NotFoundPage";
function App() {
  const dispatch = useDispatch();

  // Обновляем состтяние state для корзины при любом обновлении local storage
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "cart") {
        const updatedCart = JSON.parse(event.newValue) || [];
        dispatch(setCart(updatedCart));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  // Установка user при загрузке приложения
  useEffect(() => {
    dispatch(startLoading()); // Устанавливаем флаг загрузки
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      dispatch(setUser(userData)); // Устанавливаем пользователя
    } else {
      dispatch(removeUser()); // Если данных нет, сбрасываем пользователя
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/personaldata" element={<PersonalDataPage />} />
          <Route path="/delivery-rules" element={<DeliveryPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/menu/:category/:type?" element={<MenuPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/cabinet" element={<CabinetPage />} />
          <Route path="*" element={<NotFoundpage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
