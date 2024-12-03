// Функция регистрации нового юзера
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function registerUser(auth, email, password) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return {
      email: user.email,
      token: user.accessToken,
      id: user.uid,
    };
  } catch (error) {
    throw error;
  }
}
