// import { cart } from "@constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "@store/cartSlice";
import { CartItem } from "./CartItem/CartItem";
import "./Cart.css";

export function Cart() {
  const cart = useSelector(selectCart);
  console.log(cart);
  return (
    <section className="cart">
      <div className="container">
        <ul className="cart__list">
          {cart.map((item, index) => (
            <CartItem
              key={index}
              subCat={item.subCat}
              isClassicPizza={item.isClassicPizza}
              name={item.name}
              description={item.description}
              amount={item.amount}
              price={item.price}
              size={item.size}
              image={item.image}
              supplements={item.supplements}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
