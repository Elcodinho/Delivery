import { Routes, Route } from "react-router-dom";
import { useCartSync } from "@hooks/useCartSync";
import { useUserSync } from "@hooks/useUserSync.js";

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
import { AdminPage } from "@pages/AdminPage";
import { NotFoundpage } from "@pages/NotFoundPage";
import { ProtectedRoutes } from "@components/ProtectedRoutes/ProtectedRoutes";
import { AdminProtectedRoutes } from "@components/ProtectedRoutes/AdminProtectedRoutes";

function App() {
  // Обновляем состтяние state для корзины при любом обновлении local storage
  useCartSync();

  // Установка пользователя
  useUserSync();

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

          {/* Группа страниц доступна только авторизованным пользователям */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/cabinet" element={<CabinetPage />} />
          </Route>
          <Route element={<AdminProtectedRoutes />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          {/*  */}

          <Route path="*" element={<NotFoundpage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
