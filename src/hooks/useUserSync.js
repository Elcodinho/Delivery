import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, startLoading, removeUser } from "@store/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";

// Проверка авторизации в firebase и установки юзера с local Storage

export function useUserSync() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoading()); // Устанавливаем флаг загрузки

    // Функция для отслеживания состояния пользователя
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
          // Если данные есть в localStorage, проверяем актуальность (например, токен)
          const token = await user.getIdToken();
          if (userData.token !== token) {
            // Обновляем токен, если он устарел
            userData.token = token;
            localStorage.setItem("user", JSON.stringify(userData)); // Обновляем localStorage
          }
          dispatch(setUser(userData)); // Устанавливаем пользователя в Redux
        } else {
          dispatch(removeUser()); // Если данных нет, сбрасываем пользователя
        }
      } else {
        dispatch(removeUser());
        localStorage.removeItem("user");
      }
    });

    // Очистка подписки при размонтировании компонента
    return () => unsubscribe();
  }, [dispatch]);
}
