import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { LoginProvider } from "@context/LoginContext";
import { MobileMenuProvider } from "@context/MobileMenuContext";
import App from "./App.jsx";

import "./styles/normalize.css";
import "./styles/common.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <LoginProvider>
        <MobileMenuProvider>
          <Router>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </Router>
        </MobileMenuProvider>
      </LoginProvider>
    </Provider>
  </StrictMode>
);
