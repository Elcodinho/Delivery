import { useEffect } from "react";

export function useResetWarning(error, setError, timeout) {
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, timeout);

      return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента
    }
  }, [error]);
}
