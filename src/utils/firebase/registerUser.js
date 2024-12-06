// Функция регистрации нового юзера
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.js";

export async function registerUser(auth, email, password) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Сохранение пользователя в Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date().toISOString(),
    });

    return {
      email: user.email,
      token: user.accessToken,
      id: user.uid,
    };
  } catch (error) {
    throw error;
  }
}
