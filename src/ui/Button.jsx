import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Button({ children, type, to, disabled, onClick }) {
  const base =
    "uppercase inline-block rounded-full font-semibold text-x outline-none cursor-pointer ";

  const style = {
    primaryLink:
      base +
      "  mr-3 bg-yellow-400 px-8 py-3 focus:ring-yellow-400 transition-all duration-300 hover:bg-yellow-300 focus:ring-2 focus:ring-offset-2 px-8 py-3",
    primaryBtn:
      base +
      "inline-block rounded-full bg-white px-8 py-3 uppercase outline-none ring-2 ring-stone-200 transition-all duration-300 hover:bg-stone-300 focus:ring-2 focus:ring-stone-200 focus:ring-offset-2 text-stone-400 ",
    secondaryBtn:
      base +
      "mr-3 bg-yellow-400 focus:ring-yellow-400 transition-all duration-300 hover:bg-yellow-300 focus:ring-2 focus:ring-offset-2 py-[7px] px-4 py-4 text-xs ",
    small: "bg-yellow-400 p-1 rounded-full text-center cursor-pointer",
    medium:
      "bg-yellow-400 px-8 py-2 rounded-full text-center cursor-pointer absolute right-0",
  };
  if (to)
    return (
      <Link className={style[type]} to={to}>
        {children}
      </Link>
    );

  //   if (onClick)
  //     return (
  //       <button
  //         onClick={onClick}
  //         disabled={disabled}
  //         className={`${style[type]} ${disabled ? "cursor-not-allowed" : ""}`}
  //       >
  //         {children}
  //       </button>
  //     );

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${style[type]} ${disabled ? "cursor-not-allowed bg-yellow-200" : ""}`}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  type: PropTypes.any,
  to: PropTypes.any,
  disabled: PropTypes.any,
  onClick: PropTypes.any,
};
