import { Cart } from "./Cart/Cart";
import { OrderForm } from "@components/OrderForm/OrderForm";
import { OrderTotal } from "./OrderTotal/OrderTotal";
export function Order() {
  return (
    <section style={{ marginBottom: "50px" }}>
      <Cart />
      <OrderForm />
      <OrderTotal />
    </section>
  );
}
