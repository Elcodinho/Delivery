import { Routes, Route } from "react-router-dom";

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
import { ItemPage } from "@pages/ItemPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          {/* Добавить для feedback /:page? */}
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/personaldata" element={<PersonalDataPage />} />
          <Route path="/delivery-rules" element={<DeliveryPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/menu/:category" element={<MenuPage />} />
          <Route path="/product/:slug" element={<ItemPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
