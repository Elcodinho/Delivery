import { Cart } from "./Cart/Cart";
import { OrderTotal } from "./OrderTotal/OrderTotal";
export function Order() {
  return (
    <section style={{ marginBottom: "50px" }}>
      <Cart />
      <OrderTotal />
    </section>
  );
}
