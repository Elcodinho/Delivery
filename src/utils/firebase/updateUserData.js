import { doc, updateDoc } from "firebase/firestore";

export async function updateUserData(db, uid, userData) {
  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, { ...userData });
  } catch (error) {
    throw error;
  }
}
