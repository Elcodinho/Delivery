// Функция получения данных пользователя
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.js";

export async function getUserData(uid) {
  try {
    // Получаем ссылку на документ пользователя
    const userDocRef = doc(db, "users", uid);

    // Извлекаем данные из Firestore
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      // Если документ существует, возвращаем его данные
      return userSnapshot.data();
    } else {
      throw new Error("Пользователь с данным UID не найден.");
    }
  } catch (error) {
    throw error; // Перехватываем и передаем ошибки для обработки
  }
}
