import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItems, getCart, getUserName } from "./cartSlice";

// const cart = [
//   { num: 1, pizzaName: "matterial", unitPrice: 23 },
//   { num: 1, pizzaName: "matterial1", unitPrice: 23 },
//   { num: 1, pizzaName: "matterial2", unitPrice: 23 },
//   { num: 1, pizzaName: "matterial13", unitPrice: 23 },
// ];

export default function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector(getUserName);
  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCartItems());
  }
  return (
    <div className="p-2">
      <Link
        className="mt-4 inline-block text-blue-400 transition-all duration-300 hover:text-blue-500 hover:underline hover:underline-offset-1"
        to="/menu"
      >
        &larr; Back to menu
      </Link>
      <p className="my-6 text-xl font-semibold capitalize tracking-widest">
        your cart, {username}
      </p>
      <ul>
        {cart.map((cartItem) => (
          <CartItem key={cartItem.pizzaId} cartItem={cartItem} />
        ))}
      </ul>
      {cart.length === 0 || (
        <div className="mt-4">
          <Button to={`/order/new`} type={"primaryLink"}>
            order pizza
          </Button>
          <Button onClick={handleClearCart} type={"primaryBtn"}>
            clear cart
          </Button>
        </div>
      )}
    </div>
  );
}
