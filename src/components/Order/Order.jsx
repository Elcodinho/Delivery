import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearOrderStatus, clearOrderError } from "@store/orderSlice";
import { Cart } from "./Cart/Cart";
import { OrderForm } from "@components/Order/OrderForm/OrderForm";
import { Loader } from "@components/UI/Loader/Loader";
import { Success } from "@components/UI/Popups/Success/Success";
import { WarningError } from "@components/UI/Warnings/WarningError/WarningError";
export function Order() {
  const dispatch = useDispatch();
  const { status: orderStatus, error: orderError } = useSelector(
    (state) => state.order
  ); // Состояние статуса и ошибки запроса отправки формы

  // Сброс ошибки запроса через 8 секунд
  useEffect(() => {
    if (orderError) {
      const timer = setTimeout(() => {
        dispatch(clearOrderError());
      }, 8000);

      return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента
    }
  }, [orderError, dispatch]);

  // Фукнция сброса статуса запроса
  function resetStatus() {
    dispatch(clearOrderStatus());
  }

  return (
    <section style={{ marginBottom: "50px" }}>
      {orderError && <WarningError warning={orderError} />}
      {orderStatus === "loading" && <Loader />}
      {orderStatus === "resolved" && !orderError && (
        <Success text="Заказ успешно отправлен" clearStatus={resetStatus} />
      )}
      <Cart />
      <OrderForm />
    </section>
  );
}
