import propTypes from "prop-types";
import { formatCurrency } from "../../utils/helper";

// , isLoadingIngredients, ingredients

function OrderItem({ item }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="flex items-center justify-between py-4">
      <p className="space-x-2">
        <span className="font-bold">{quantity}&times;</span> <span>{name}</span>
      </p>
      <p className="font-semibold">{formatCurrency(totalPrice)}</p>
    </li>
  );
}

export default OrderItem;

OrderItem.propTypes = {
  item: propTypes.any,
};
