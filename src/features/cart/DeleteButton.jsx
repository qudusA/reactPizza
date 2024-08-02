import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

export default function DeleteButton({ pizzaId }) {
  const dispatch = useDispatch();

  function handleClickDelete() {
    dispatch(deleteItem(pizzaId));
  }
  return (
    <Button onClick={handleClickDelete} type={`secondaryBtn`}>
      delete
    </Button>
  );
}

DeleteButton.propTypes = {
  pizzaId: PropTypes.any,
};
