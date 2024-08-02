import PropTypes from "prop-types";
import Button from "../../ui/Button";
import { useState } from "react";
import { createUsername } from "./userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.name);
  // console.log("log", username);

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e);
    if (!useDispatch) return;
    dispatch(createUsername(name));
    setName("");
    navigate("/menu");
  }

  return (
    <form className="text-center" action="" onSubmit={handleSubmit}>
      <p className="mb-5 text-xl text-stone-600">
        👋 welcome! please start by telling us your name: {username}
      </p>
      {username === "" ? (
        <input
          className="mb-7 w-64 rounded-full bg-white px-8 py-2 outline-none ring-1 ring-stone-200 transition-all duration-300 placeholder:text-stone-400 focus:ring-[3px] focus:ring-yellow-400"
          placeholder="enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <Button to={"/menu"} type={"primaryLink"}>
          continue your order, {username}
        </Button>
      )}
      <div>{name ? <Button type="primaryLink">order now</Button> : null}</div>
    </form>
  );
}

CreateUser.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.any,
  // placeholder: PropTypes.any,
};
