import PropTypes from "prop-types";
import DeleteButton from "./DeleteButton";
import UpdateItemButton from "./UpdateItemButton";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";
import { useDispatch } from "react-redux";

export default function CartItem({ cartItem }) {
  const dispatch = useDispatch();
  function handleQuantityIncrease() {
    dispatch(increaseItemQuantity(cartItem.pizzaId));
  }

  function handleQuantityDecrease() {
    dispatch(decreaseItemQuantity(cartItem.pizzaId));
  }
  return (
    <li className="flex justify-between border-b-[1px] border-slate-200 py-2">
      <p className="space-x-4 font-semibold">
        <span>{cartItem.quantity}&times;</span> <span>{cartItem.name}</span>
      </p>
      <div className="flex space-x-6">
        <span className="font-semibold">${cartItem.unitPrice}</span>
        <div className="space-x-1 font-semibold">
          <UpdateItemButton onclick={handleQuantityDecrease} type={"small"}>
            &minus;
          </UpdateItemButton>
          <span>{cartItem.quantity}</span>
          <UpdateItemButton onclick={handleQuantityIncrease} type={"small"}>
            &#43;
          </UpdateItemButton>
        </div>
        <DeleteButton pizzaId={cartItem.pizzaId} />
      </div>
    </li>
  );
}

CartItem.propTypes = {
  cartItem: PropTypes.any,
};
