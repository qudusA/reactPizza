import Button from "../../ui/Button";
import PropTypes from "prop-types";

export default function UpdateItemButton({ children, type, onclick }) {
  return (
    <Button onClick={onclick} type={type}>
      {children}
    </Button>
  );
}

UpdateItemButton.propTypes = {
  children: PropTypes.any,
  type: PropTypes.any,
  onclick: PropTypes.any,
};
