import { createContext, useState } from "react";

// Создаем контекст
export const MobileMenuContext = createContext();

// Провайдер для обертки приложения
export function MobileMenuProvider({ children }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <MobileMenuContext.Provider value={{ showMobileMenu, setShowMobileMenu }}>
      {children}
    </MobileMenuContext.Provider>
  );
}
