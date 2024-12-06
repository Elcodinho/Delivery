// Функция авторизации юзера
import { signInWithEmailAndPassword } from "firebase/auth";

export async function loginUser(auth, email, password) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    return {
      email: user.email,
      token: user.accessToken,
      id: user.uid,
    };
  } catch (error) {
    throw error;
  }
}
