import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCart } from "@store/cartSlice";

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
        </Route>
      </Routes>
    </>
  );
}

export default App;
