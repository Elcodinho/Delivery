import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function useClearError(error, clearFunc, timeout) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearFunc());
      }, timeout);

      return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента
    }
  }, [error, dispatch]);
}
