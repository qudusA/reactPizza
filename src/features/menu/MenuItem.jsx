import PropTypes from "prop-types";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addItems,
  decreaseItemQuantity,
  getIsItemsAlreadyInCart,
  increaseItemQuantity,
} from "../cart/cartSlice";
import DeleteButton from "../cart/DeleteButton";
import UpdateItemButton from "../cart/UpdateItemButton";

//
export default function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const existInCart = useSelector(getIsItemsAlreadyInCart(pizza.id));

  function handleQuantityIncrease() {
    dispatch(increaseItemQuantity(pizza.id));
  }

  function handleQuantityDecrease() {
    dispatch(decreaseItemQuantity(pizza.id));
  }

  function handleAddToCart() {
    const newItem = {
      pizzaId: pizza.id,
      name: pizza.name,
      quantity: 1,
      unitPrice: pizza.unitPrice,
      totalPrice: pizza.unitPrice * 1,
    };

    dispatch(addItems(newItem));
  }
  return (
    <li className="flex gap-4 py-2">
      <img
        className={`h-24 ${pizza.soldOut ? "opacity-70 grayscale" : ""}`}
        src={`${pizza.imageUrl}`}
        alt={`${pizza.name} image`}
      />
      <div className="flex grow flex-col">
        <p className="font-semibold">{pizza.name}</p>
        <p className="capitalize text-stone-500">
          {pizza.ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {pizza.soldOut ? (
            <p className="text-xs font-semibold uppercase text-stone-500">
              sold out
            </p>
          ) : (
            <p className="text-xs font-semibold">
              ${pizza.unitPrice.toFixed(2)}
            </p>
          )}

          <div className="flex items-center justify-center gap-6">
            {existInCart !== 0 ? (
              <>
                <div className="space-x-1 font-semibold">
                  <UpdateItemButton
                    onclick={handleQuantityDecrease}
                    type={"small"}
                  >
                    &minus;
                  </UpdateItemButton>
                  <span>{existInCart}</span>
                  <UpdateItemButton
                    onclick={handleQuantityIncrease}
                    type={"small"}
                  >
                    &#43;
                  </UpdateItemButton>
                </div>

                <DeleteButton pizzaId={pizza.id} />
              </>
            ) : (
              <Button
                onClick={handleAddToCart}
                disabled={pizza.soldOut ? true : false}
                type={`secondaryBtn`}
              >
                add to cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

MenuItem.propTypes = {
  pizza: PropTypes.object,
};
