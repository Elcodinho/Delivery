import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { LoginProvider } from "@context/LoginContext";
import { MobileMenuProvider } from "@context/MobileMenuContext";

import "./styles/normalize.css";
import "./styles/common.css";

import App from "./App.jsx";

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
