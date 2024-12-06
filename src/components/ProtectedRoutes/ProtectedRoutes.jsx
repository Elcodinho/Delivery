import { useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelect } from "@store/userSlice";
import { LoginContext } from "@context/LoginContext";
import { Loader } from "@components/UI/Loader/Loader";

export const ProtectedRoutes = () => {
  const user = useSelector(userSelect);
  const { setShowLogin } = useContext(LoginContext);

  useEffect(() => {
    // Устанавливаем состояние показа логина, только если пользователь не авторизован
    if (!user.isLoading && !user.token) {
      setShowLogin(true);
    }
  }, [user.isLoading, user.token, setShowLogin]);

  // Если данные еще загружаются, то будет отображтся loader
  if (user.isLoading) {
    return <Loader />;
  }

  // Проверка на наличие токена у пользователя
  if (!user.token) {
    return <Navigate to="/" />;
  }

  // Показываем вложенные маршруты
  return <Outlet />;
};
