import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "@store/cartSlice";

/**
 * Кастомный хук для синхронизации состояния корзины с localStorage.
 */
export function useCartSync() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "cart") {
        const updatedCart = JSON.parse(event.newValue) || [];
        dispatch(setCart(updatedCart));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);
}
