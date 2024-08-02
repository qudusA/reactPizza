import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartQuantity, getTotalCartPrice } from "./cartSlice";

export default function CartOverview() {
  const totalCartItem = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartPrice) return null;
  return (
    <div className="flex justify-between bg-stone-950 px-6 py-4 uppercase text-stone-100">
      <p className="space-x-5">
        <span>{totalCartItem} pizza </span> <span>${totalCartPrice}</span>
      </p>
      <Link to={`/cart`}>open cart &rarr;</Link>
    </div>
  );
}
