import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useCartSync } from "@hooks/useCartSync";
import { useUserSync } from "@hooks/useUserSync.js";

// Pages
import { Layout } from "@components/Layout/Layout";

const HomePage = lazy(() => import("@pages/HomePage"));
const AboutPage = lazy(() => import("@pages/AboutPage"));
const ContactsPage = lazy(() => import("@pages/ContactsPage"));
const FeedbackPage = lazy(() => import("@pages/FeedBackPage"));
const PersonalDataPage = lazy(() => import("@pages/PersonalDataPage"));
const DeliveryPage = lazy(() => import("@pages/DeliveryPage"));
const PrivacyPage = lazy(() => import("@pages/PrivacyPage"));
const MenuPage = lazy(() => import("@pages/MenuPage"));
const ProductPage = lazy(() => import("@pages/ProductPage"));
const OrderPage = lazy(() => import("@pages/OrderPage"));
const CabinetPage = lazy(() => import("@pages/CabinetPage"));
const AdminPage = lazy(() => import("@pages/AdminPage"));
const NotFoundpage = lazy(() => import("@pages/NotFoundpage"));
const ProtectedRoutes = lazy(() =>
  import("@components/ProtectedRoutes/ProtectedRoutes")
);
const AdminProtectedRoutes = lazy(() =>
  import("@components/ProtectedRoutes/AdminProtectedRoutes")
);

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
