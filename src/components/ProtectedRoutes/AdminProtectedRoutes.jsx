import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ADMINEMAIL } from "@constants/constants";
import { userSelect } from "@store/userSlice";
import { Loader } from "@components/UI/Loader/Loader";

export const AdminProtectedRoutes = () => {
  const user = useSelector(userSelect);

  useEffect(() => {
    // Вы можете логировать или отслеживать действия для админов, если нужно
  }, [user]);

  // Если данные еще загружаются, то будет отображаться loader
  if (user.isLoading) {
    return <Loader />;
  }

  // Проверка на наличие токена и роли администратора
  if (!user.token || user.email !== ADMINEMAIL) {
    return <Navigate to="/" />;
  }

  // Показываем вложенные маршруты
  return <Outlet />;
};
